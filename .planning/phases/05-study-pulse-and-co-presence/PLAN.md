# Phase 2: Study Pulse & Co-Presence Lounge (Canlı Sessiz Çalışma Salonu)

## Executive Summary
Students study longer and return daily when they feel co-presence with peers. This phase introduces:
1. **Canlı Çalışma Nabzı (Study Pulse & Co-Presence)**: Realtime peer counter and faculty avatar stack ("Şu anda 42 eczacılık öğrencisi MedChem ve Farmakoloji çalışıyor").
2. **Minimalist Pomodoro Odak Sayacı**: 25 dk odaklanma / 5 dk mola, ChatGPT Obsidian estetiğinde, sesli dikkat dağıtıcı olmadan görsel odak animasyonu.
3. **Günlük 3 Kavram Hedefi & Streak Koruma**: Günlük çalışma ivmesini ödüllendiren ve terk oranını düşüren mikro-hedef mekanizması.

---

## Technical Specifications
- **Service**: `apps/web/src/services/studyPulseService.ts`
  - Utilizes `supabase.channel('pharmlearn:study_pulse', { config: { presence: { key: userId } } })`
  - Graceful fallback with realistic simulation for offline/guest mode (30–65 active students across Marmara, Hacettepe, İstanbul, Ege, Ankara).
  - Syncs focus timer ticks and daily concept completions.
- **UI Components**:
  - `apps/web/src/components/study/StudyPulseLounge.tsx`: Comprehensive lounge card rendered in `MinimalCourseDashboard.tsx`.
  - `apps/web/src/components/study/CompactPulseIndicator.tsx`: Minimalist 24px pill rendered in the top bar of `PharmLearnShell.tsx`.
- **Theme & Standards**:
  - ChatGPT Obsidian `#212121` / `#171717`, subtle `#2F2F2F` borders, OpenAI Emerald `#10A37F` accents.
  - Squircle `borderRadius: 12px` / `rounded-xl`.
  - 100% test coverage with Vitest + Brave screenshot verification.
