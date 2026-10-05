/**
 * Parser + structural validator for `.teaching.md` lecture blueprints.
 * Format is specified in docs/TEACHING_MD_SPEC.md. Pure JS (no deps) so it runs under plain
 * `node`, under vitest, and inside the ingest script.
 */

export const MAX_WORDS = 40;
export const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length;

const CONCEPT_RE = /<!--\s*CONCEPT:\s*([A-Za-z0-9_:.-]+)\s*-->([\s\S]*?)<!--\s*END_CONCEPT\s*-->/g;

function section(body, heading) {
  const re = new RegExp(`^###\\s+${heading}\\s*$([\\s\\S]*?)(?=^###\\s|$(?![\\s\\S]))`, 'm');
  const m = body.match(re);
  return m ? m[1].trim() : null;
}

function parseSlides(text) {
  return (text.match(/\d+/g) ?? []).map(Number);
}

/**
 * @param {string} markdown file contents
 * @param {{ courseId: string, lectureSlug: string }} ctx
 * @returns {{ concepts: object[], errors: string[], deck: string | null }}
 */
export function parseTeachingMd(markdown, ctx) {
  markdown = (markdown || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const errors = [];
  const deckMatch = markdown.match(/\|\s*Kaynak dosya\s*\|\s*`([^`]+)`/);
  const deck = deckMatch ? deckMatch[1] : null;
  if (!deck) errors.push('Header table is missing the "Kaynak dosya" row with the deck file name in backticks.');

  const concepts = [];
  const seen = new Set();

  for (const match of markdown.matchAll(CONCEPT_RE)) {
    const id = match[1];
    const body = match[2];
    const where = `[${id}]`;
    if (seen.has(id)) errors.push(`${where} duplicate concept id`);
    seen.add(id);

    const titleM = body.match(/^##\s+Konsept\s+(\d+):\s*(.+)$/m);
    if (!titleM) errors.push(`${where} missing "## Konsept N: Başlık" heading`);
    const sortOrder = titleM ? Number(titleM[1]) : 0;
    const conceptTitle = titleM ? titleM[2].trim() : id;

    const slidesM = body.match(/\*\s+\*\*Slayt Kaynağı:\*\*\s*(.+)$/m);
    const slideNumbers = slidesM ? parseSlides(slidesM[1]) : [];
    if (slideNumbers.length === 0) errors.push(`${where} missing "Slayt Kaynağı" slide numbers`);

    const statusM = body.match(/\*\s+\*\*Durum:\*\*\s*(\w+)/m);
    const status = statusM ? statusM[1] : '';
    if (status !== 'draft' && status !== 'verified') errors.push(`${where} "Durum" must be draft or verified`);

    const widgetTypeM = body.match(/\*\s+\*\*Widget Türü:\*\*\s*`([^`]+)`/m);
    const recommendedWidget = widgetTypeM ? widgetTypeM[1] : '';
    if (!recommendedWidget) errors.push(`${where} missing "Widget Türü"`);

    const summaryRaw = section(body, 'Bilimsel Öz');
    const scientificSummary = summaryRaw
      ? summaryRaw
          .split('\n')
          .filter((l) => l.trim().startsWith('- '))
          .map((l) => l.trim().slice(2).trim())
          .join(' ')
      : '';
    if (!scientificSummary) errors.push(`${where} missing "Bilimsel Öz" bullets`);

    const taskRaw = section(body, 'Öğrenci Görevi');
    const studentTask = taskRaw
      ? taskRaw
          .split('\n')
          .filter((l) => l.trim().startsWith('>'))
          .map((l) => l.replace(/^\s*>\s?/, '').trim())
          .join(' ')
      : '';
    if (!studentTask) errors.push(`${where} missing "Öğrenci Görevi" blockquote`);
    else if (countWords(studentTask) > MAX_WORDS) errors.push(`${where} student task exceeds ${MAX_WORDS} words`);

    const ladderRaw = section(body, 'İskele Merdiveni');
    const ladder = [];
    if (ladderRaw) {
      for (const line of ladderRaw.split('\n')) {
        const lm = line.match(/^\s*(\d)\.\s+\*\*Seviye\s+(\d)[^*]*\*\*\s*(.+)$/);
        if (lm) ladder[Number(lm[2]) - 1] = lm[3].trim();
      }
    }
    if (ladder.length !== 3 || ladder.some((l) => !l)) {
      errors.push(`${where} scaffolding ladder must have exactly 3 tiers (Seviye 1-3)`);
    } else {
      ladder.forEach((l, i) => {
        if (countWords(l) > MAX_WORDS) errors.push(`${where} ladder tier ${i + 1} exceeds ${MAX_WORDS} words`);
      });
    }

    const misconceptionMap = {};
    const missRaw = section(body, 'Yanılgı Haritası');
    if (missRaw) {
      for (const line of missRaw.split('\n')) {
        const mm = line.match(/^\*\s+`([A-Z0-9_]+)`\s+\(Slayt\s+([\d,\s]+)\):\s*(.+)$/);
        if (mm) misconceptionMap[mm[1]] = { diagnosis: mm[3].trim(), slides: parseSlides(mm[2]) };
      }
    }
    if (Object.keys(misconceptionMap).length === 0) errors.push(`${where} needs at least one misconception`);

    let widget = null;
    const widgetRaw = section(body, 'Widget Yapılandırması');
    if (widgetRaw) {
      const jm = widgetRaw.match(/```json\s*([\s\S]*?)```/);
      if (!jm) {
        errors.push(`${where} "Widget Yapılandırması" has no json block`);
      } else {
        try {
          widget = JSON.parse(jm[1]);
        } catch (e) {
          errors.push(`${where} widget json is invalid: ${e.message}`);
        }
      }
    }
    if (widget) {
      if (!widget.type || typeof widget.config !== 'object') {
        errors.push(`${where} widget needs { type, config }`);
        widget = null;
      } else {
        if (widget.type !== recommendedWidget) errors.push(`${where} widget type ${widget.type} != Widget Türü ${recommendedWidget}`);
        const options = Array.isArray(widget.config.options) ? widget.config.options : [];
        const correct = options.filter((o) => o.isCorrect);
        if (options.length > 0 && correct.length !== 1) errors.push(`${where} choice widget must have exactly 1 correct option`);
        for (const o of options.filter((o) => !o.isCorrect)) {
          if (!misconceptionMap[o.id]) errors.push(`${where} wrong option id "${o.id}" has no entry in Yanılgı Haritası`);
        }
        if (!widget.config.source || !widget.config.source.file) errors.push(`${where} widget config.source is required (provenance)`);
      }
    }

    concepts.push({
      id,
      courseId: ctx.courseId,
      lectureSlug: ctx.lectureSlug,
      sortOrder,
      sourceDeck: deck ?? '',
      slideNumbers,
      conceptTitle,
      scientificSummary,
      recommendedWidget,
      widget,
      studentTask,
      scaffoldingLadder: ladder,
      misconceptionMap,
      status,
    });
  }

  if (concepts.length === 0) errors.push('No <!-- CONCEPT: id --> blocks found.');
  return { concepts, errors, deck };
}

/** Derive course + lecture slug from `.../courses/<course>/teaching/<slug>.teaching.md`. */
export function contextFromPath(filePath) {
  const norm = filePath.replace(/\\/g, '/');
  const m = norm.match(/courses\/([^/]+)\/teaching\/(.+)\.teaching\.md$/);
  if (!m) throw new Error(`Not a teaching file path: ${filePath}`);
  return { courseId: m[1], lectureSlug: m[2].replace(/^hafta-\d+-/, '') };
}

const sqlStr = (s) => `'${String(s).replace(/'/g, "''")}'`;
const sqlJson = (o) => `${sqlStr(JSON.stringify(o))}::jsonb`;

/** Idempotent upsert SQL for one concept (used for the reviewed seed file). */
export function conceptToSql(c) {
  return `INSERT INTO public.lecture_concepts
  (id, course_id, lecture_slug, sort_order, source_deck, slide_numbers, concept_title, scientific_summary,
   recommended_widget, initial_widget_state, student_task, scaffolding_ladder, misconception_map, status, updated_at)
VALUES (${sqlStr(c.id)}, ${sqlStr(c.courseId)}, ${sqlStr(c.lectureSlug)}, ${c.sortOrder}, ${sqlStr(c.sourceDeck)},
  ARRAY[${c.slideNumbers.join(',')}]::int[], ${sqlStr(c.conceptTitle)}, ${sqlStr(c.scientificSummary)},
  ${sqlStr(c.recommendedWidget)}, ${c.widget ? sqlJson(c.widget) : 'NULL'}, ${sqlStr(c.studentTask)},
  ${sqlJson(c.scaffoldingLadder)}, ${sqlJson(c.misconceptionMap)}, ${sqlStr(c.status)}, now())
ON CONFLICT (id) DO UPDATE SET
  lecture_slug = EXCLUDED.lecture_slug, sort_order = EXCLUDED.sort_order, source_deck = EXCLUDED.source_deck,
  slide_numbers = EXCLUDED.slide_numbers, concept_title = EXCLUDED.concept_title,
  scientific_summary = EXCLUDED.scientific_summary, recommended_widget = EXCLUDED.recommended_widget,
  initial_widget_state = EXCLUDED.initial_widget_state, student_task = EXCLUDED.student_task,
  scaffolding_ladder = EXCLUDED.scaffolding_ladder, misconception_map = EXCLUDED.misconception_map,
  status = EXCLUDED.status, updated_at = now();`;
}

/** snake_case row for PostgREST upsert. */
export function conceptToRow(c) {
  return {
    id: c.id,
    course_id: c.courseId,
    lecture_slug: c.lectureSlug,
    sort_order: c.sortOrder,
    source_deck: c.sourceDeck,
    slide_numbers: c.slideNumbers,
    concept_title: c.conceptTitle,
    scientific_summary: c.scientificSummary,
    recommended_widget: c.recommendedWidget,
    initial_widget_state: c.widget,
    student_task: c.studentTask,
    scaffolding_ladder: c.scaffoldingLadder,
    misconception_map: c.misconceptionMap,
    status: c.status,
  };
}
