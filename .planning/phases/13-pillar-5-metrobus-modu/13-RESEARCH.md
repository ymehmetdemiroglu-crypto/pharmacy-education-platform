# Phase 13 Research: Pillar 5 — "Metrobüs Modu" (Web Audio API & Transit Noise Filtering)

## 1. Acoustic Profile of Turkish Public Transit Vehicles
- **Istanbul Metrobüs (Mercedes-Benz CapaCity / Phileas)**:
  - Diesel combustion harmonics concentrate at $40\text{--}150\text{ Hz}$ (idle $\sim 600\text{ RPM} \to 10\text{ Hz}$ fundamental, 4th/6th harmonics at $40\text{--}60\text{ Hz}$, $80\text{--}120\text{ Hz}$).
  - Cabin baseline RMS level: $0.035\text{--}0.050$ (approx. $72\text{--}78\text{ dB SPL}$).
  - Speech fundamental frequency ($F_0$): Male Turkish speech $\sim 100\text{--}140\text{ Hz}$, female Turkish speech $\sim 180\text{--}240\text{ Hz}$.
  - Vowel formants ($F_1, F_2$): $300\text{--}2500\text{ Hz}$.
- **Filter Design**:
  - Cascaded 4th-order High-Pass (two `BiquadFilterNode` instances in series, both `type: 'highpass'`, `frequency: 180`, `Q: 0.707`): provides $24\text{ dB/octave}$ rolloff. At $90\text{ Hz}$, attenuation is $>24\text{ dB}$, effectively muting the diesel drone without cutting vocal formants.
  - Low-Pass (`type: 'lowpass'`, `frequency: 3800`, `Q: 0.707`): suppresses ultrasonic compressor squeals and wheel screech.
  - Peaking Bandpass (`type: 'peaking'`, `frequency: 1800`, `Q: 1.0`, `gain: 4.0`): boosts Turkish consonant plosives and sibilants ($k, t, p, s, ş, ç$) which carry essential semantic clues in drug names (*prokain, lidokain, pralidoksim, schild*).

## 2. Dynamic Noise-Floor Voice Activity Detection (VAD)
- Fixed threshold VAD fails catastrophically in a bus because the cabin noise exceeds typical quiet room speech thresholds.
- Algorithm:
  $$\text{NoiseFloor}(t) = (1 - \alpha) \cdot \text{NoiseFloor}(t-1) + \alpha \cdot \text{RMS}_{\text{current}}, \quad \alpha = 0.05$$
  - Speech Start Trigger: $\text{RMS} > \text{NoiseFloor} \times 2.5$ ($+8\text{ dB SNR}$) sustained for $\ge 200\text{ms}$.
  - Speech End Trigger: $\text{RMS} \le \text{NoiseFloor} \times 1.2$ for $\ge 1000\text{ms}$.

## 3. Web Speech API & Semantic Fuzzy Matching
- STT Recognition:
  - `window.SpeechRecognition || window.webkitSpeechRecognition` configured with `lang = 'tr-TR'`.
  - In cases where speech recognition is unavailable or denied by browser permissions, fallback keyword buttons or typed input ensure 100% usability.
- Fuzzy Keyword Evaluation:
  - Turkish string normalization: lowercasing with Turkish locale (`toLocaleLowerCase('tr-TR')`), handling `i` vs `İ` and `ı` vs `I`.
  - Checking `expectedKeywords` (e.g. `['paba', 'dihidropteroat', 'sentaz', 'folik asit', 'kompetitif']`).
  - Checking `misconceptionKeywords` (e.g. `['esteraz', 'idrar', 'cyp3a4']`).

## 4. UI/UX: Single-Hand Commuter Thumb-Zone
- Visual layout designed for single-thumb navigation while holding an overhead handrail:
  - Large circular center orb (diameter 110px+) for voice state.
  - Bottom-docked large tactile buttons with 56px minimum touch targets.
  - High contrast Neo-Brutalist cards legible under flickering bus fluorescent lighting or direct daylight through bus windows.
  - Discrete audio visualizer showing filter attenuation in real time.
