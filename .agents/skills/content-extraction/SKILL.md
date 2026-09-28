---
name: content-extraction
description: Ingests raw pharmaceutical lecture PDFs and textbooks from /materials, runs OCR and text parsing, extracts concepts, mechanisms, and structures, and generates course inventories and concept maps.
---

# Content Extraction Skill

## Purpose
Systematically extracts domain knowledge from source lecture documents (`/materials/medchem` and `/materials/pharmacology`) without inventing external facts or copying text verbatim.

## Workflow Instructions
1. **Source Inspection & OCR**:
   - Inspect PDF structure and identify text vs raster scanned slides.
   - For image-heavy or scanned slides, run OCR extracting raw text with per-page confidence logging.
2. **Concept & Mechanism Mining**:
   - Extract primary concepts: drug classes, target receptors, chemical bonds, SAR (Structure-Activity Relationships), PK/PD parameters, Phase I/II metabolism pathways.
   - Capture exact source citations: file name, slide/page number, section title.
3. **Synthesis & Graph Construction**:
   - Build `/docs/<course>/inventory.md`: table of all source files, slide counts, extracted topics, and confidence scores.
   - Build `/docs/<course>/concept-map.json`: graph structure containing:
     - Nodes: `id`, `name`, `definition` (original rephrasing), `category`, `source: { file, page }`.
     - Edges: `source`, `target`, `relation` (`prerequisite`, `enhances`, `contrasts_with`).
4. **Strict Gap Logging**:
   - If an equation or constant is mentioned without its mathematical form or parameters, mark `[NOT IN MATERIALS]` and append immediately to `/docs/open-questions.md`.
