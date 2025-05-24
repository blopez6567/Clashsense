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

    // Limit the number of clashes to analyze to reduce token usage
    const maxClashes = 5;
    const analyzedClashes = clashData.clashes.slice(0, maxClashes);
    const totalClashes = clashData.clashes.length;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert BIM coordinator specializing in clash detection and resolution. Analyze the provided clash data and suggest practical solutions. Focus on providing actionable insights and specific recommendations for each clash."
        },
        {
          role: "user",
          content: `Analyze these clashes and provide detailed resolution suggestions: ${JSON.stringify({
            projectName: clashData.projectName,
            clashes: analyzedClashes
          })}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return new Response(
      JSON.stringify({
        analysis: completion.choices[0].message.content,
        analyzedClashes: analyzedClashes.length,
        totalClashes: totalClashes
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Analysis error:', error);

    const errorMessage = error.message || 'An unexpected error occurred';
    const status = error.status || 500;
    
    return new Response(
      JSON.stringify({
        error: status === 429 ? 'QUOTA_EXCEEDED' : 'ANALYSIS_ERROR',
        message: status === 429 
          ? 'API rate limit exceeded. Please try again later.'
          : errorMessage
      }),
      {
        status,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});