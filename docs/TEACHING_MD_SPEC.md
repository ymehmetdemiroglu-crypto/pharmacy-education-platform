# `.teaching.md` format — lecture knowledge for the Whiteboard Tutor

One file per lecture: `courses/<course>/teaching/<hafta-NN-slug>.teaching.md`.
The tutor teaches **only** what is written in these files; a concept that is not here, or is still
`draft`, is not served to students (unless `ALLOW_DRAFT_CONCEPTS=true` is set on the Edge Function for the pilot).

Parser/validator: [`scripts/lib/teaching-md.mjs`](../scripts/lib/teaching-md.mjs).
Commands:

| Command | Effect |
|---|---|
| `pnpm check:teaching` | validate only (CI-safe, no writes) |
| `pnpm ingest:teaching` | validate, then write `apps/web/src/data/teaching.concepts.generated.json` (bundled in the web app) and `supabase/seed/lecture_concepts.generated.sql` |
| `node scripts/ingest-teaching-md.mjs --apply` | upsert into the remote DB. Needs `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` in the environment. **Owner-run only; never commit keys.** |

## File header

```markdown
# Ders: <title>

| Alan | Değer |
| Kaynak dosya | `<exact source PDF name>.pdf` (<n> slayt) |
```

The `Kaynak dosya` value becomes the `sources.file` of every concept. The course id comes from the folder
(`courses/medchem/…`), the lecture slug from the file name without the `hafta-NN-` prefix.

## Concept block

```markdown
<!-- CONCEPT: rr:<stable_id> -->
## Konsept N: <title>
* **Slayt Kaynağı:** 2, 3, 5          <- slide numbers the concept is built from
* **Durum:** draft                     <- draft | verified
* **Widget Türü:** `MultipleChoice`    <- MultipleChoice | PredictThenReveal (others only after a widget exists + is tested)

### Bilimsel Öz            <- bullet list; every bullet ends with (Slayt N)
### Öğrenci Görevi         <- one blockquote, <= 40 words
### İskele Merdiveni       <- EXACTLY 3 numbered tiers: Seviye 1 (Dürtme), 2 (İpucu), 3 (Çözüm); each <= 40 words
### Yanılgı Haritası       <- * `MISCONCEPTION_KEY` (Slayt N, M): diagnosis
### Widget Yapılandırması  <- one ```json block: { "type": ..., "config": { ... } }
<!-- END_CONCEPT -->
```

Hard rules enforced by the validator (a violation fails `check:teaching`):

1. Exactly 3 scaffolding tiers, each ≤ 40 words (AGENTS.md cognitive-load ceiling).
2. The student task is ≤ 40 words.
3. Every **wrong** option `id` in the widget config is a key in the misconception map (the key *is* the diagnosed
   misconception), and every misconception cites at least one slide.
4. `config.source = { file, page }` is present, `file` equals the header's source file, and `page` is one of the
   concept's slides.
5. Widget `type` is one the runtime can evaluate server-side.
6. No unverified items: anything the slides do not show clearly is **not** turned into a widget and is listed in the
   *Doğrulama Günlüğü* at the bottom of the file as `[NOT IN MATERIALS]` (and in `docs/open-questions.md`).

## Source fidelity

* Rewrite in original wording; never paste slide text or embed slide images (AGENTS.md rule 3).
* Never add facts from general knowledge. If a number, symbol or structure is unreadable in the slides, leave it out.
* Chemical structures: only SMILES that appear in the materials, otherwise `verified: false` until human sign-off.

## Review flow (lean pilot process)

1. Author/AI drafts the block → `Durum: draft`.
2. You (or the professor) compare it with the slides and flip `Durum: verified` — that is the only gate.
3. `pnpm ingest:teaching` regenerates the bundled JSON/SQL; commit the `.teaching.md` and generated files.
4. Owner applies the SQL/`--apply` to Supabase (billable/irreversible remote changes are never done by agents).
