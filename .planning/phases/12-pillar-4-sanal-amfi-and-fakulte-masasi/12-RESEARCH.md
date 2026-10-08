# Phase 12 Research: Pillar 4 — "Sanal Amfi & Fakülte Masası" (Faculty Study Pulse & Cohort Misconception Broadcast)

## 1. Supabase Realtime Architecture & Channel Strategy
- **Presence vs Broadcast in Supabase**:
  - `channel.track({ ... })`: Used for ephemeral user presence. Automatically handles disconnects with WebSocket ping/pong.
  - `channel.on('presence', { event: 'sync' })`: Used to derive room headcounts, active study modules, and idle counts.
  - `channel.send({ type: 'broadcast', event: 'MISCONCEPTION_SURGE', payload })`: Used for low-latency alerts when a cohort error spike occurs.
- **Client Heartbeat Invariant**:
  - WebSocket heartbeat emitted every 60 seconds with payload updates (e.g. module change or study/idle toggle).
  - 20-second server-side timeout purges ghost connections automatically.
  - Connection reconnect strategy: Exponential backoff with full jitter ($t_{\text{retry}} = \min(30\text{s}, 1.5^{\text{attempt}} \times 1000\text{ms} + \text{random}(0, 500\text{ms}))$).

## 2. Mathematical Differential Privacy & $k$-Anonymity
- **The Sybil & Intersection Attack Risk**:
  - If only 3 students are online in a small faculty room and one fails a question, an adversary could deduce who made the mistake.
  - Mitigation: Strict $k$-anonymity threshold $k \ge 10$. If fewer than 10 students are active in the faculty channel, all aggregate stats are replaced with the national baseline (`isNationalAggregate: true`).
- **Central Laplace Mechanism ($\epsilon = 0.5$)**:
  - Given query sensitivity $\Delta f = 1$ (one student changing their answer alters the count by at most 1):
    $$b = \frac{\Delta f}{\epsilon} = \frac{1}{0.5} = 2.0$$
  - Generating Laplace noise:
    $$U \sim \text{Uniform}(-0.5, 0.5), \quad X = -\text{sgn}(U) \cdot b \cdot \ln(1 - 2|U|)$$
  - Adding $X$ to raw error counts guarantees formal $(\epsilon, 0)$-differential privacy under KVKK No. 6698.

## 3. Misconception Surge Detection Algorithm
- **Sliding Window Parameters**:
  - Window duration: 15 minutes.
  - Minimum attempts threshold: $N \ge 10$.
  - Surge threshold: $\frac{\text{Incorrect Attempts}}{N} \ge 0.50$ ($50\%$).
- **Canonical Trap Ground-Truth (from `/materials/`)**:
  - `TRAP-03-ESTER-AMIDE`: Slayt 28 Prokain/Lidokain hidroliz kinetiği & PABA sülfonamid rekabeti.
  - `TRAP-07-SCHILD-SLOPE`: Slayt 19 Schild eğimi non-lineeritesi ve allosterik modülasyon.
  - `TRAP-08-AChE-AGING`: Slayt 14 Organofosfat yaşlanması (P-O dealkilasyon) ve PAM rezistansı.
  - `TRAP-01-LOGP-PKA`: Slayt 08 İyonizasyon ve gastrointestinal absorpsiyon sınırı.

## 4. UI/UX & Responsive Neo-Brutalist Guidelines
- Neo-Brutalist aesthetic with 3px `#000000` borders and 6px solid drop shadows (`shadow-[6px_6px_0px_#000000]`).
- Emerald `#10B981` / Dark Obsidian `#0B132B` theme accents for live study presence.
- Ambient pulsating radar dot for live presence (`animate-ping`).
- Discrete squircle alert banner that slides into the viewport non-intrusively.
- Challenge modal with predict-then-reveal locking, Socratic 3-tier hint ladders, and cohort comparison verdict.
