import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

export interface ClashMetadata {
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

export interface FormattedClashText {
  id: string;
  text: string;
}

export interface EmbeddingResult {
  id: string;
  embedding: number[];
  text: string;
}

export function formatClashMetadata(clash: ClashMetadata): FormattedClashText {
  const elements = clash.elements
    .map(el => `${el.type} (${el.name})`)
    .join(', ');

  const text = `
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

  return {
    id: clash.id,
    text
  };
}

export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
    encoding_format: "float"
  });

  return response.data[0].embedding;
}

export async function embedClashMetadata(clash: ClashMetadata): Promise<EmbeddingResult> {
  const formatted = formatClashMetadata(clash);
  const embedding = await generateEmbedding(formatted.text);

  return {
    id: clash.id,
    embedding,
    text: formatted.text
  };
}

export async function embedMultipleClashes(clashes: ClashMetadata[]): Promise<EmbeddingResult[]> {
  return Promise.all(clashes.map(clash => embedClashMetadata(clash)));
}