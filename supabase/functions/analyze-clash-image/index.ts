import OpenAI from 'npm:openai@4.28.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

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

    const formData = await req.formData();
    const imageFile = formData.get('image') as File;
    
    if (!imageFile) {
      throw new Error('No image file provided');
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const base64Image = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

    const completion = await openai.chat.completions.create({
      model: "gpt-4-vision-preview-v2",
      messages: [
        {
          role: "system",
          content: "You are an expert BIM coordinator specializing in clash detection and resolution. Analyze the provided clash image and suggest practical solutions. Focus on providing actionable insights and specific recommendations."
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this clash image and provide detailed resolution suggestions. Include information about the type of clash, severity, and recommended steps for resolution."
            },
            {
              type: "image_url",
              image_url: `data:${imageFile.type};base64,${base64Image}`
            }
          ]
        }
      ],
      max_tokens: 500
    });

    return new Response(
      JSON.stringify({
        analysis: completion.choices[0].message.content
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