import OpenAI from 'npm:openai@4.28.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

interface ClashData {
  projectName: string;
  clashes: Array<{
    id: string;
    type: string;
    status: string;
    description: string;
    location: string;
    elements: any;
  }>;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    });

    const { clashData } = await req.json() as { clashData: ClashData };

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert BIM coordinator specializing in clash detection and resolution. Analyze the provided clash data and suggest practical solutions. Focus on providing actionable insights and specific recommendations for each clash."
        },
        {
          role: "user",
          content: `Analyze these clashes and provide detailed resolution suggestions: ${JSON.stringify(clashData)}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    return new Response(
      JSON.stringify({
        analysis: completion.choices[0].message.content,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});