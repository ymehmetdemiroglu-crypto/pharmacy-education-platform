# Phase 12 Context: Pillar 4 — "Sanal Amfi & Fakülte Masası" (Faculty Study Pulse, Anonymized Cohort Co-Presence & Misconception Surge Broadcast)

## 1. Domain Problem & Turkish Pharmacy Student Anxiety
Third-year pharmacy students (*"Eczacılık 3. Sınıf"*) in Turkey suffer from intense isolation and imposter syndrome during midterm (*vize*) and final preparations:
- Students study late into the night in dorm rooms or libraries, looking at hundreds of slides without knowing if their peers understand the concepts or are struggling with the exact same traps.
- WhatsApp groups are flooded with panicked messages 48 hours before the exam (*"Hoca Slayt 28'deki Schild eğimini soracak mı?", "Prokain hidrolizini kim anladı?"*), but discussions are unstructured, chaotic, and create toxic comparison anxiety.
- When students fail a practice question, they assume they alone are falling behind, unaware that $65\%$ of their classmates also tripped on that exact distractor.

## 2. Core Pillars & Pedagogical Architecture
1. **Ambient, Presence-Only Social Layer**:
   - Zero toxic competitive leaderboards, zero public point scoring, zero surveillance.
   - Cohort co-presence focuses exclusively on collective study momentum (*"🟢 42 Dönem Arkadaşın Şu Anda Farmasötik Kimya 1 Çalışıyor"*).
   - Grouped into active virtual tables by lecture and topic (*"Çalışma Masaları"*), allowing students to feel the presence of classmates working on the same slides.
   - Synchronized cohort Pomodoro rhythm (e.g. 25 min deep focus / 5 min amfi break) providing ambient peer accountability.

2. **Mathematical Privacy & KVKK No. 6698 Compliance**:
   - **$k$-Anonymity ($k \ge 10$)**: Cohort misconception percentages and table activity are only released when at least 10 active peers are present. If $n < 10$, the system automatically displays the national aggregate (*"Ulusal Eczacılık Havuz Ortalaması"*), preventing Sybil or algebraic re-identification attacks.
   - **Central Laplace Differential Privacy ($\epsilon = 0.5$)**: Error counts and study statistics receive calibrated Laplace noise ($Lap(2.0)$) to ensure provable differential privacy.
   - **Rolling Daily Salted Ephemeral IDs**: Individual student IDs are never broadcast over WebSockets. Realtime presence payloads transmit only ephemeral hashes:
     $$\text{student\_ephemeral\_id} = \text{HMAC-SHA256}(\text{user\_id}, \text{daily\_faculty\_salt})$$
   - Presence payloads strictly omit raw `active_trap` codes, transmitting only coarse indicators (`studying` vs `idle`).

3. **Class-Wide Misconception Surge Radar (`MISCONCEPTION_SURGE`)**:
   - Automatically monitors error rates across a 15-minute sliding window.
   - When $\ge 50\%$ of active classmates fail a canonical faculty exam trap across $k \ge 10$ students, an ambient squircle pulse alert is broadcast:
     *"🔥 Amfi Uyarısı: Dönem arkadaşlarının %68'i Slayt 28'deki Ester-Amit tuzağında takıldı! (18 kişi) Kendini test et ⚡"*
   - Students tap the alert to launch a synchronized 2-minute Socratic diagnostic challenge with predict-then-reveal hypothesis locking and 3-tier hint ladders.

4. **Faculty Channel Topology**:
   - Channel: `pharmlearn:amfi:{faculty_slug}:{course_id}`
   - Pre-configured university rooms:
     - Marmara Üniversitesi Eczacılık Fakültesi (`marmara-eczacilik`)
     - Hacettepe Üniversitesi Eczacılık Fakültesi (`hacettepe-eczacilik`)
     - İstanbul Üniversitesi Eczacılık Fakültesi (`istanbul-eczacilik`)
     - Ankara Üniversitesi Eczacılık Fakültesi (`ankara-eczacilik`)
     - Türkiye Geneli Eczacılık Havuzu (`turkiye-geneli`)
