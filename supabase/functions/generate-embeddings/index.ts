import OpenAI from 'npm:openai@4.28.0';
import { corsHeaders } from '../_shared/cors.ts';

interface ClashMetadata {
  id: string;
  description: string;
  type: string;
  status: string;
  severity: string;
  location: string;
  discipline: string;
  elements: {
    type: string;
    id: string;
    name: string;
  }[];
  coordinates: string;
  resolution?: string;
}

function formatClashMetadata(clash: ClashMetadata): string {
  const elements = clash.elements
    .map(el => `${el.type} (${el.name})`)
    .join(', ');

  return `
Clash ID: ${clash.id}
Type: ${clash.type}
Status: ${clash.status}
Severity: ${clash.severity}
Location: ${clash.location}
Discipline: ${clash.discipline}
Elements Involved: ${elements}
Description: ${clash.description}
${clash.resolution ? `Resolution: ${clash.resolution}` : ''}
`.trim();
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    });

    const { clashes } = await req.json() as { clashes: ClashMetadata[] };

    if (!Array.isArray(clashes)) {
      throw new Error('Invalid input: clashes must be an array');
    }

    const results = await Promise.all(
      clashes.map(async (clash) => {
        const text = formatClashMetadata(clash);
        const response = await openai.embeddings.create({
          model: "text-embedding-3-small",
          input: text,
          encoding_format: "float"
        });

        return {
          id: clash.id,
          embedding: response.data[0].embedding,
          text
        };
      })
    );

    return new Response(
      JSON.stringify({ results }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    
    return new Response(
      JSON.stringify({
        error: 'EMBEDDING_ERROR',
        message: errorMessage
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