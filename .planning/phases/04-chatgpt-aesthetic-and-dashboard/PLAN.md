# Plan: Phase 04 — ChatGPT Obsidian/Charcoal Palette, Squircle Tokens & Minimalist Course Dashboard

## Goal
Transform the PharmLearn Studio interface into a sleek, minimalist ChatGPT-inspired workspace (Obsidian/Charcoal dark mode `#212121` / `#171717`, clean light mode `#FFFFFF` / `#F9F9F9`, OpenAI Emerald `#10A37F` accents, subtle 1px borders, squircle 12px corners) and integrate a high-yield Minimalist Course Dashboard with visual exam readiness & progress indicators.

---

## Tasks

### Task 1: Token System & ChatGPT Theme Foundation
- **File**: `apps/web/src/components/layout/PharmLearnShell.tsx`, `apps/web/src/index.css`, `apps/web/tailwind.config.js`
- **Action**:
  - Update Ant Design `ConfigProvider` theme tokens to ChatGPT palette:
    - Dark: Base canvas `#212121`, container `#171717`, layout `#212121`, border `#2F2F2F`, secondary border `#262626`, text `#ECECEC`, textSecondary `#B4B4B4`, primary `#10A37F`.
    - Light: Base canvas `#FFFFFF`, container `#F9F9F9`, layout `#FFFFFF`, border `#E5E5E5`, secondary border `#F0F0F0`, text `#0D0D0D`, textSecondary `#5D5D5D`, primary `#10A37F`.
  - Maintain `borderRadius: 12`, `borderRadiusLG: 16`, `borderRadiusSM: 8`.
  - Update Top Header to a clean 48px bar with ChatGPT-style subtle dividers, quick view switcher (Tuval vs Dashboard), and theme switch.

### Task 2: Minimalist Course Dashboard & Vize Progress Component
- **File**: `apps/web/src/components/dashboard/MinimalCourseDashboard.tsx`
- **Action**:
  - Build a clean dashboard featuring:
    - **Header**: Exam countdown ("Bahar Vizesine 28 Gün Kaldı"), overall readiness score (progress bar).
    - **Course Cards**:
      - MedChem (Active: İlaç Reseptör Etkileşimi, 33 Slayt, 10 Kavram, % tamamlanma çubuğu).
      - Pharmacology (Active: GPCR Sinyal Yolakları & Reseptör Teorisi, % tamamlanma çubuğu).
    - **Study Habit Bar**: Daily goal ("Bugünkü Hedef: 3 Kavram"), streak counter ("🔥 4 Günlük Seri").
    - **Quick Launch**: One-click jump into the interactive canvas.
  - Add seamless tab/view toggle in `PharmLearnShell.tsx` between "Çalışma Tuvali" (Study Canvas) and "Ders Panosu" (Course Dashboard).

### Task 3: ChatGPT Chat Pane & Interactive Widget Theme Harmonization
- **Files**:
  - `apps/web/src/components/layout/TutorChatPane.tsx`
  - `apps/web/src/components/tutor/TutorMessageBubble.tsx`
  - `apps/web/src/components/tutor/PromptSuggestionChips.tsx`
  - `apps/web/src/components/widgets/ReceptorSignalingVisualizer.tsx`
  - `apps/web/src/components/widgets/DualModeMoleculeViewer.tsx`
  - `apps/web/src/components/canvas/MarkdownDocumentViewer.tsx`
- **Action**:
  - Restyle `TutorChatPane` to resemble ChatGPT's clean conversation interface with pill inputs, subtle copy buttons, and sleek markdown styling.
  - Update widgets to use muted `#2F2F2F` / `#E5E5E5` borders and `#10A37F` action buttons.
  - Ensure zero harsh blue backgrounds or high-contrast drop-shadows.

### Task 4: Automated Testing, Brave Visual Capture & Multimodal Audit
- **Files**:
  - `apps/web/src/pages/PharmLearnStudioPage.test.tsx`
  - `apps/web/src/components/dashboard/MinimalCourseDashboard.test.tsx`
  - `scripts/capture-ui-screenshots.mjs`
- **Action**:
  - Write unit tests for `MinimalCourseDashboard`.
  - Run full test suite (`pnpm --filter @pharmacy/web test`) & typecheck (`pnpm --filter @pharmacy/web typecheck`).
  - Capture Brave Browser screenshots across Desktop, Tablet, and Mobile in both Dark & Light themes.
  - Multimodally inspect screenshots and compile updated `pharmlearn_showcase.html`.
