export const MAX_WORDS: number;
export function countWords(text: string): number;
export interface ParsedConcept {
  id: string;
  courseId: string;
  lectureSlug: string;
  sortOrder: number;
  sourceDeck: string;
  slideNumbers: number[];
  conceptTitle: string;
  scientificSummary: string;
  recommendedWidget: string;
  widget: { type: string; config: Record<string, unknown> } | null;
  studentTask: string;
  scaffoldingLadder: string[];
  misconceptionMap: Record<string, { diagnosis: string; slides: number[] }>;
  status: string;
}
export function parseTeachingMd(
  markdown: string,
  ctx: { courseId: string; lectureSlug: string }
): { concepts: ParsedConcept[]; errors: string[]; deck: string | null };
export function contextFromPath(filePath: string): { courseId: string; lectureSlug: string };
export function conceptToSql(c: ParsedConcept): string;
export function conceptToRow(c: ParsedConcept): Record<string, unknown>;
