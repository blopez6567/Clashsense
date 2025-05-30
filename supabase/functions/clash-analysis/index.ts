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

interface MlSuggestion {
  id: string;
  confidence: number;
  suggestion: string;
  precedents: Array<{
    description: string;
    similarity: number;
  }>;
}

// Simulated ML model response - in a real implementation, this would call your trained model
const getMlSuggestions = async (clash: any): Promise<MlSuggestion> => {
  // This is where you would integrate with your actual ML model
  // For now, we'll return simulated data based on clash characteristics
  
  const confidence = Math.floor(Math.random() * 30) + 70; // Random confidence between 70-99%
  
  // Generate suggestion based on clash type
  let suggestion = '';
  let precedents = [];
  
  if (clash.type?.toLowerCase().includes('hard')) {
    suggestion = "Recommend adjusting the elevation of the interfering component by 150mm and verify clearance requirements are met. Consider adding offset fittings if space allows.";
    precedents = [
      {
        description: "Similar MEP-Structural clash resolved by lowering ductwork and using rectangular-to-round transitions",
        similarity: 89
      },
      {
        description: "Comparable conflict resolved through strategic placement of offset fittings",
        similarity: 85
      }
    ];
  } else {
    suggestion = "Consider rerouting the affected services through an alternative path. Verify available space in adjacent zones and coordinate with other trades.";
    precedents = [
      {
        description: "Similar MEP clash resolved by consolidating services and creating dedicated service zone",
        similarity: 92
      },
      {
        description: "Related interference addressed through systematic rerouting and trade coordination",
        similarity: 87
      }
    ];
  }

  return {
    id: clash.id,
    confidence,
    suggestion,
    precedents
  };
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

    const { clashData, enableMl = false } = await req.json() as { clashData: ClashData; enableMl: boolean };

    // Limit the number of clashes to analyze to reduce token usage
    const maxClashes = 5;
    const analyzedClashes = clashData.clashes.slice(0, maxClashes);
    const totalClashes = clashData.clashes.length;

    // Get ML suggestions if enabled
    let mlSuggestions: MlSuggestion[] = [];
    if (enableMl) {
      mlSuggestions = await Promise.all(
        analyzedClashes.map(clash => getMlSuggestions(clash))
      );
    }

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
        totalClashes: totalClashes,
        mlSuggestions: enableMl ? mlSuggestions : undefined
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