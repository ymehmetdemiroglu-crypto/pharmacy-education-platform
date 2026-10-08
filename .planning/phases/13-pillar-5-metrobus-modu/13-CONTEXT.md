# Phase 13 Context: Pillar 5 — "Metrobüs Modu" (Audio Socratic Micro-Dosing & Web Audio API Transit Filtering)

## 1. Domain Problem & Turkish Pharmacy Student Commuter Reality
Pharmacy students at universities in Istanbul (Marmara Haydarpaşa/Başıbüyük, İstanbul Beyazıt, Bezmialem), Ankara (Hacettepe Sıhhiye, Ankara Tandoğan, Gazi), and Izmir endure 60 to 90 minutes of daily transit on crowded public transit (Metrobüs, Marmaray, M2/M4 Metro, EGO bus):
- Standing in jammed vehicles while holding handrails prevents holding an iPad, drawing chemical structures, or reading small slide text (which induces motion sickness).
- Students have headphones (AirPods or wired earphones) plugged in, but passive podcast listening results in near-zero retention for technical exams.
- Ambient vehicle noise: Low-frequency engine rumble and chassis vibrations (40–160 Hz, diesel harmonics), pneumatic door hiss, and passenger chatter swamp typical phone microphones.

## 2. Core Pillars & Pedagogical Architecture
1. **Auditory Modality Question Scope Constraint (Learning Science Invariant)**:
   - Respecting Baddeley's phonological loop: complex 3D spatial stereochemistry (Cahn-Ingold-Prelog $(R)/(S)$ priority inversions, dihedral angles, multi-substituent SAR matrices) is **strictly excluded** from audio-only mode, as spatial mental rotation cannot be reliably sustained without visual representation amidst auditory transit noise.
   - Question scope is **strictly restricted** to conceptual pharmacology (ADME, receptor dynamics, autonomy, Schild regressions) and non-spatial medicinal chemistry (ester vs amide hydrolysis kinetics, organophosphate aging, prodrug bioactivation).
   - Conversational brevity: Turkish audio prompts are strictly $\le 25$ words, affirmations $\le 20$ words, verbal nudges $\le 22$ words.

2. **Web Audio API Acoustic Filter Pipeline (Cascaded 4th-Order Biquad)**:
   - High-Pass Biquad Filter (180 Hz cutoff, Q = 0.707, 24 dB/octave): Two cascaded 2nd-order stages attenuate diesel engine rumble (<150 Hz) by over $18\text{ dB}$ while preserving Turkish speech fundamentals ($F_0 \sim 100\text{--}250\text{ Hz}$).
   - Low-Pass Biquad Filter (3800 Hz cutoff, Q = 0.707): Cuts out high-frequency screech and pneumatic brake hiss.
   - Peaking Formant Boost (1000–2500 Hz, Gain = +4 dB): Amplifies human vocal clarity.
   - Dynamic Noise-Floor Voice Activity Detector (VAD): Exponential moving average tracking ($\alpha = 0.05$) preventing the "infinite listening trap" in high-noise cabins.

3. **Hands-Free Commuter Interaction Loop**:
   - Single-hand thumb-friendly controls or fully hands-free voice trigger.
   - Synthesizer earcons: Pleasant chime tones for correct answer, subtle nudge tone for hint, gentle tone for misconception.
   - 1-Tap "Tekrar Et" audio repeat loop and whisper/touch fallback for crowded vehicles where talking aloud is socially uncomfortable.
   - Subway tunnel offline cache (Marmaray / M2): Pre-caches 10 high-yield daily audio cards.
