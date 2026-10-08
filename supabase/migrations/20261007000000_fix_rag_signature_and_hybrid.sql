-- Migration: 20261007000000_fix_rag_signature_and_hybrid.sql
-- Description: Fix RAG query_embedding missing parameter error and enable hybrid keyword/vector search in match_lecture_concepts.

-- Drop previous strict signature if needed or overload with optional vector and text search
CREATE OR REPLACE FUNCTION public.match_lecture_concepts(
    p_course_id TEXT,
    p_lecture_slug TEXT DEFAULT NULL,
    query_embedding extensions.vector(1536) DEFAULT NULL,
    match_threshold FLOAT DEFAULT 0.5,
    match_count INT DEFAULT 3,
    query_text TEXT DEFAULT NULL
)
RETURNS TABLE (
    id TEXT,
    concept_title TEXT,
    slide_numbers INT[],
    scientific_summary TEXT,
    recommended_widget TEXT,
    initial_widget_state JSONB,
    student_task TEXT,
    scaffolding_ladder JSONB,
    misconception_map JSONB,
    similarity FLOAT
)
LANGUAGE plpgsql
STABLE
SECURITY INVOKER
SET search_path = public, extensions
AS $$
BEGIN
    -- Mode A: Vector similarity search when embedding is provided
    IF query_embedding IS NOT NULL THEN
        RETURN QUERY
        SELECT
            lc.id, lc.concept_title, lc.slide_numbers, lc.scientific_summary,
            lc.recommended_widget, lc.initial_widget_state, lc.student_task,
            lc.scaffolding_ladder, lc.misconception_map,
            (1 - (lc.embedding <=> query_embedding))::FLOAT AS similarity
        FROM public.lecture_concepts lc
        WHERE lc.course_id = p_course_id
          AND lc.status = 'verified'
          AND lc.embedding IS NOT NULL
          AND (p_lecture_slug IS NULL OR lc.lecture_slug = p_lecture_slug)
          AND (1 - (lc.embedding <=> query_embedding)) > match_threshold
        ORDER BY lc.embedding <=> query_embedding
        LIMIT match_count;

    -- Mode B: Keyword & Semantic Text matching when query_text is provided without embedding
    ELSIF query_text IS NOT NULL AND trim(query_text) <> '' THEN
        RETURN QUERY
        SELECT
            lc.id, lc.concept_title, lc.slide_numbers, lc.scientific_summary,
            lc.recommended_widget, lc.initial_widget_state, lc.student_task,
            lc.scaffolding_ladder, lc.misconception_map,
            (
                CASE
                    WHEN lc.concept_title ILIKE '%' || query_text || '%' THEN 0.95
                    WHEN lc.scientific_summary ILIKE '%' || query_text || '%' THEN 0.85
                    ELSE 0.60
                END
            )::FLOAT AS similarity
        FROM public.lecture_concepts lc
        WHERE lc.course_id = p_course_id
          AND lc.status = 'verified'
          AND (p_lecture_slug IS NULL OR lc.lecture_slug = p_lecture_slug)
          AND (
              lc.concept_title ILIKE '%' || query_text || '%'
              OR lc.scientific_summary ILIKE '%' || query_text || '%'
              OR lc.student_task ILIKE '%' || query_text || '%'
          )
        ORDER BY similarity DESC
        LIMIT match_count;

    -- Mode C: Fallback to most relevant verified concepts for lecture
    ELSE
        RETURN QUERY
        SELECT
            lc.id, lc.concept_title, lc.slide_numbers, lc.scientific_summary,
            lc.recommended_widget, lc.initial_widget_state, lc.student_task,
            lc.scaffolding_ladder, lc.misconception_map,
            0.50::FLOAT AS similarity
        FROM public.lecture_concepts lc
        WHERE lc.course_id = p_course_id
          AND lc.status = 'verified'
          AND (p_lecture_slug IS NULL OR lc.lecture_slug = p_lecture_slug)
        ORDER BY lc.sort_order ASC
        LIMIT match_count;
    END IF;
END;
$$;
