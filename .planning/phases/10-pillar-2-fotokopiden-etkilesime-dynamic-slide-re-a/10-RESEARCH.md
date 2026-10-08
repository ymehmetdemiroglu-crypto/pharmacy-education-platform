# Phase 10 Research: Pillar 2 Fotokopiden Etkileşime (Dynamic Slide Re-Animator)

## 1. Slide Ingestion & Cloud Storage Pipeline

### 1.1 Storage Architecture
Per the user's explicit directive ("no need we can host them its ot that serious i going to grt ythe necesarry permissions"), PharmLearn utilizes cloud persistence:
1. **Supabase Storage Integration**:
   - Bucket: `documents` / `slides`.
   - File naming: `${userId}/${Date.now()}_${sanitizedFileName}`.
   - Public URL / signed URL generated for high-performance slide rendering.
2. **Offline-First Resilience**:
   - If Supabase credentials are not configured or the network drops, fallback to in-memory `Blob` and IndexedDB storage (`pharmlearn_reanimated_slides_v1`).
3. **Pre-Loaded Authentic Slide Library**:
   - To provide immediate "magic" out of the box, include 4 authentic pre-loaded slide exemplars from Marmara and Hacettepe curricula:
     - *Slide A (MedChem - Marmara)*: Dibukain & Lokal Anestezik Amit/Ester SAR Karşılaştırması.
     - *Slide B (Pharmacology - Marmara)*: Hill-Langmuir, Furchgott Yedek Reseptör Deneyi ve EC50 < Kd.
     - *Slide C (MedChem - Hacettepe)*: Salisilik Asit İntramoleküler Hidrojen Bağı ve İyonlaşma Tuzağı.
     - *Slide D (Pharmacology - Hacettepe)*: Schild Regresyonu ve Kompetitif Antagonizma Doğru Eğimi (m = 1.0).

---

## 2. Chemical & Pharmacological Entity Lexer

### 2.1 Regex & Token Extraction Patterns
```typescript
export interface ExtractedSlideEntities {
  pKa?: number;
  pH?: number;
  logP?: number;
  kd?: number;
  ec50?: number;
  emax?: number;
  drugClass?: 'local_anesthetic' | 'cholinergic' | 'adrenergic' | 'general';
  functionalGroups: string[];
  canonicalTraps: string[];
  detectedScaffold?: string;
  recommendedWidget: 'IonizationChamber' | 'DoseResponseCurve' | 'SarExplorer' | 'ReceptorOperationalModel' | 'DualModeMoleculeViewer';
}
```

- **pKa**: `/pka\s*[:=]?\s*([0-9]+\.?[0-9]*)/i`
- **pH**: `/ph\s*[:=]?\s*([0-9]+\.?[0-9]*)/i`
- **Kd / EC50**: `/(?:kd|ec50)\s*[:=]?\s*([0-9]+\.?[0-9]*\s*(?:nm|µm|um|mm)?)/i`
- **Functional Groups**: `ester`, `amit`, `karbamat`, `fosfat`, `organofosfat`, `piridin`, `kinolin`, `tersiyer amin`, `kuaterner amonyum`.
- **Exam Traps**: Mapped to canonical codes (`TRAP-01` to `TRAP-10`).

---

## 3. Anki Flashcard Format Specification

Anki natively supports importing Tab-Separated Values (TSV) with custom metadata headers:
```tsv
#separator:tab
#html:true
#tags column:4
Question (HTML) <TAB> Answer (HTML) <TAB> Hint Ladder (HTML) <TAB> Tags (Space-separated)
```

### Anki Card Template Structure:
- **Front**: Socratic question + slide reference badge + predict hypothesis prompt.
- **Back**: Core answer explanation + 3-tier hint ladder in expandable `<details>` elements + exam trap warning box.
- **Tags**: `PharmLearn Marmara Hacettepe FarmasotikKimya Farmakoloji Vize Hazirlik TRAP_CODE`.
- Export format: `.txt` (UTF-8) with direct browser download attachment and `.json` schema export.

---

## 4. Component Layout & Interaction

### Layout: Obsidian 2-Column Study Desk
- **Left Column**:
  - Upload Dropzone / Quick Select Exemplar.
  - Slide Image Canvas with interactive bounding box entity chips (`pKa 8.9`, `Amit Köprüsü`, `EC50 = 12 nM`).
  - Extracted Text Summary & Academic Provenance badge.
- **Right Column (Re-Animated Engine)**:
  - **Tab 1: İnteraktif Simülatör (Widget)**: Renders the dynamically mounted biophysical/chemical widget configured specifically with the parameters extracted from the slide.
  - **Tab 2: Vize Sokratik Meydan Okuma**: 3-step predict-then-reveal challenge with 3-tier scaffolding hints and diagnostic feedback.
  - **Tab 3: Anki & Kartlar**: Preview of synthesized flashcards with 1-click "Anki'ye İndir (.txt)" and "Karta Ekle" actions.
