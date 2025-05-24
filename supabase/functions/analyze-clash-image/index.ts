import OpenAI from 'npm:openai@4.28.0';
import vision from 'npm:@google-cloud/vision@4.0.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

type Provider = 'openai' | 'google';

async function analyzeWithOpenAI(imageFile: File, base64Image: string): Promise<string> {
  const openai = new OpenAI({
    apiKey: Deno.env.get('OPENAI_API_KEY'),
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
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

  return completion.choices[0].message.content || '';
}

async function analyzeWithGoogleVision(base64Image: string): Promise<string> {
  const client = new vision.ImageAnnotatorClient({
    credentials: JSON.parse(Deno.env.get('GOOGLE_CREDENTIALS') || '{}'),
  });

  const [result] = await client.annotateImage({
    image: {
      content: base64Image
    },
    features: [
      { type: 'OBJECT_LOCALIZATION' },
      { type: 'LABEL_DETECTION' },
      { type: 'TEXT_DETECTION' },
    ]
  });

  // Process Google Vision results into a meaningful analysis
  const objects = result.localizedObjectAnnotations || [];
  const labels = result.labelAnnotations || [];
  const text = result.textAnnotations?.[0]?.description || '';

  let analysis = 'Clash Analysis Results:\n\n';

  if (objects.length > 0) {
    analysis += 'Detected Components:\n';
    objects.forEach(obj => {
      analysis += `- ${obj.name} (Confidence: ${Math.round(Number(obj.score) * 100)}%)\n`;
    });
  }

  if (labels.length > 0) {
    analysis += '\nScene Analysis:\n';
    labels.slice(0, 5).forEach(label => {
      analysis += `- ${label.description} (Confidence: ${Math.round(Number(label.score) * 100)}%)\n`;
    });
  }

  if (text) {
    analysis += '\nDetected Text/Labels:\n' + text;
  }

  return analysis;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const formData = await req.formData();
    const imageFile = formData.get('image') as File;
    const provider = (formData.get('provider') as Provider) || 'openai';
    
    if (!imageFile) {
      throw new Error('No image file provided');
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const base64Image = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

    let analysis: string;
    
    switch (provider) {
      case 'google':
        analysis = await analyzeWithGoogleVision(base64Image);
        break;
      case 'openai':
      default:
        analysis = await analyzeWithOpenAI(imageFile, base64Image);
    }

    return new Response(
      JSON.stringify({ analysis }),
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