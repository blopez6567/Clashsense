import { ClashMetadata } from '../types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export interface FormattedClashText {
  id: string;
  text: string;
}

export interface EmbeddingResult {
  id: string;
  embedding: number[];
  text: string;
}

export async function embedMultipleClashes(clashes: ClashMetadata[]): Promise<EmbeddingResult[]> {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/generate-embeddings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ clashes }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to generate embeddings');
  }

  const { results } = await response.json();
  return results;
}