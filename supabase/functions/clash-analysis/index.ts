import OpenAI from 'npm:openai@4.28.0';
import { TokenBucket } from 'npm:token-bucket@0.1.0';

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

// Create a token bucket for rate limiting
// 50 requests per minute (adjust these values based on your OpenAI plan)
const rateLimiter = new TokenBucket({
  capacity: 50,
  fillPerSecond: 50/60,
});

function summarizeClashData(clashData: ClashData) {
  // Limit the number of clashes to analyze to reduce token usage
  const maxClashes = 5;
  const summarizedClashes = clashData.clashes.slice(0, maxClashes).map(clash => ({
    id: clash.id,
    type: clash.type,
    status: clash.status,
    description: clash.description?.substring(0, 100), // Limit description length
    location: clash.location
  }));

  return {
    projectName: clashData.projectName,
    clashes: summarizedClashes,
    totalClashes: clashData.clashes.length,
    analyzedClashes: summarizedClashes.length
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    // Check rate limit
    if (!rateLimiter.tryRemoveTokens(1)) {
      return new Response(
        JSON.stringify({
          error: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many requests. Please try again in a minute.'
        }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    });

    const { clashData } = await req.json() as { clashData: ClashData };
    const summarizedData = summarizeClashData(clashData);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert BIM coordinator. Provide concise, actionable solutions for clash detection issues. Focus on practical recommendations."
        },
        {
          role: "user",
          content: `Analyze these clashes and provide brief resolution suggestions. Total clashes: ${summarizedData.totalClashes}, Analyzing first ${summarizedData.analyzedClashes}: ${JSON.stringify(summarizedData)}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500 // Reduced from 1000 to optimize token usage
    });

    return new Response(
      JSON.stringify({
        analysis: completion.choices[0].message.content,
        analyzedClashes: summarizedData.analyzedClashes,
        totalClashes: summarizedData.totalClashes
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    const errorMessage = error.message || 'An unexpected error occurred';
    const status = error.status || 500;
    
    return new Response(
      JSON.stringify({
        error: status === 429 ? 'QUOTA_EXCEEDED' : 'ANALYSIS_ERROR',
        message: status === 429 
          ? 'OpenAI API quota exceeded. Please try again later or contact support.'
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