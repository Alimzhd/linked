import type { Build, Charm } from '../types';
import charmsData from '../data/charms.json';

const GEMINI_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

function apiKey(): string {
  return import.meta.env.VITE_GEMINI_API_KEY || '';
}

async function generateText(prompt: string): Promise<string> {
  const key = apiKey();
  if (!key) {
    throw new Error('Gemini API key is not configured. Add VITE_GEMINI_API_KEY to .env');
  }

  const response = await fetch(`${GEMINI_ENDPOINT}?key=${encodeURIComponent(key)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 320 },
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini request failed (${response.status})`);
  }

  const data = (await response.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!text) throw new Error('Gemini returned an empty response');
  return text;
}

function localArrangementFallback(build: Build): string {
  const filled = build.slots.filter(Boolean).length;
  const empty = build.slots.length - filled;
  return `Balance ${filled} statement charms with ${empty} plain 316L links. Keep heavier glyphs near the clasp and leave breathing room every 3–4 slots so the bracelet stays wearable, not crowded.`;
}

export async function recommendCharmArrangement(build: Build): Promise<string> {
  const charms = charmsData as Charm[];
  const placed = build.slots
    .map((id, idx) => {
      if (!id) return null;
      const charm = charms.find((c) => c.id === id);
      return `Slot ${idx + 1}: ${charm?.name ?? id}`;
    })
    .filter(Boolean)
    .join('\n');

  const catalog = charms
    .filter((c) => c.inStock)
    .map((c) => `${c.id} (${c.name}, ${c.category})`)
    .join(', ');

  try {
    return await generateText(
      `You are a LINKED! 316L Italian charm bracelet stylist. Size ${build.size} has ${build.slots.length} slots.\nCurrent build:\n${placed || '(all plain links)'}\nCatalog: ${catalog}\nGive a concise 2-3 sentence arrangement recommendation. Name specific catalog charms. No markdown.`
    );
  } catch {
    return localArrangementFallback(build);
  }
}

export async function generateCharmCopy(charm: Charm): Promise<string> {
  try {
    return await generateText(
      `Write one short product line (max 28 words) for a 316L stainless Italian charm named "${charm.name}" in the ${charm.category} category. Editorial, no hype adjectives banned by luxury jewelry houses. No markdown.`
    );
  } catch {
    return charm.description || `${charm.name} in surgical-grade 316L steel.`;
  }
}
