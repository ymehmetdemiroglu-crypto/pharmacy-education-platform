# Phase 09 Research: Pillar 1 Slayt Isı Haritası & 1-Click Vize Cram Mode

## 1. Domain & Pedagogical Context
Turkish pharmacy students in Year 3 face intense cognitive load in *Farmasötik Kimya* and *Farmakoloji*. In Vize exam periods, students typically have <72 hours to review hundreds of slides. 
Learning science principles (Sweller's Cognitive Load Theory, Bjork's Desirable Difficulties, Roediger's Retrieval Practice) dictate that passive slide flipping yields near-zero long-term retention. 
By ranking slides via the **High-Yield Score ($HYS_s$)** and coupling them to a 1-click active recall carousel, students prioritize the highest-probability exam traps.

## 2. Mathematical Architecture & Edge-Case Resilience

### 2.1 Normalized HYS Formula
$$z(s) = 0.35 \cdot C_{\text{past}} + 0.25 \cdot E_{\text{prof}} + 0.20 \cdot S_{\text{eq}} + 0.20 \cdot M_{\text{cohort}}$$
$$HYS_{\text{base}}(s) = \min(100, \max(0, \text{round}(100 \cdot z(s))))$$

To ensure full span $[0, 100]$:
- When all factors are 0: $z(s) = 0 \implies HYS = 0$ (Cool Gray).
- When factors are maximal: $z(s) = 1.0 \implies HYS = 100$ (Thermal Red).

### 2.2 Bidirectional Post-Exam Decay Function
$$\gamma_{\text{cal}}(t) = 1.0 + 0.25 \cdot \exp\left(-\frac{|T_{\text{exam}} - t|}{7}\right)$$
- At exam date ($t = T_{\text{exam}}$): $\gamma_{\text{cal}} = 1.25$ (maximum surge).
- 7 days before/after exam: $\gamma_{\text{cal}} = 1.092$.
- 30 days before/after exam: $\gamma_{\text{cal}} \approx 1.003$.
- Resolves the bug identified in empirical tests where one-sided decay stayed stuck at 1.25 post-exam.

### 2.3 Division-by-Zero Guards
- Cohort vulnerability factor:
  $$M_{\text{cohort}} = \begin{cases} \frac{N_{\text{failed}}}{N_{\text{attempts}}}, & \text{if } N_{\text{attempts}} \ge 5 \\ 0.50, & \text{otherwise (neutral prior)} \end{cases}$$
- Slide embedding cosine similarity safely defaults to 0.0 if vectors are unpopulated.

## 3. High-Yield Slide Ontology (Initial Verified Catalog)

### 3.1 Farmasötik Kimya (MedChem: İlaç Reseptör Etkileşimi)
1. **Slide 9 (Kovalent Bağlar)**: Organofosfat vs Karbamat asetilkolinesteraz serin bağlanması ($HYS = 92$, Thermal Red). Trap: `TRAP-01-ESTER-VS-AMIDE`.
2. **Slide 13 (İyonik Bağ & Mesafe)**: $\Delta G = -e_1 e_2 / (\epsilon r)$ formülü ve su ortamında dielektrik zayıflama ($HYS = 84$, Thermal Red).
3. **Slide 19 (Hidrojen Bağı & Salisilik Asit)**: Molekül içi vs moleküller arası hidrojen bağı ve antibakteriyel aktivite farkı ($HYS = 88$, Thermal Red). Trap: `TRAP-05-CHELATION-DENTICITY`.
4. **Slide 25 (Hidrofobik Etkileşim & Entropi)**: Bağ enerjisi değil, su moleküllerinin serbestleşmesiyle $\Delta S > 0$ entropi artışı ($HYS = 95$, Thermal Red).
5. **Slide 33 (Dibukain Çoklu Etkileşim Entegrasyonu)**: Kinolin (yük transferi), amid (H-bağı), bütoksi (VdW), tersiyer amin (iyonik) ($HYS = 96$, Thermal Red).

### 3.2 Farmakoloji (Pharmacology: Farmakodinami & GPCR)
1. **Slide 14 (Schild Regresyonu & Kompetitif Antagonizma)**: $\log(CR - 1) = \log[B] - \log K_B$, eğim = 1.0 kuralı ($HYS = 98$, Thermal Red). Trap: `TRAP-03-SCHILD-SLOPE`.
2. **Slide 21 (Parsiyel Agonist & İntrensek Etkinlik)**: $\alpha = 0 < \alpha < 1$, tam agonist varlığında kompetitif antagonist gibi davranma tuzağı ($HYS = 94$, Thermal Red).
3. **Slide 27 (Furchgott Yedek Reseptör Deneyi)**: Alkilleyici geri dönüşümsüz antagonist ile $E_{\max}$ hemen düşmez; eğri önce sağa kayar ($HYS = 92$, Thermal Red). Trap: `TRAP-02-SPARE-RECEPTORS`.
4. **Slide 35 (Kuantal Doz Yanıt & Terapötik İndeks)**: $TI = TD_{50} / ED_{50}$, eğrilerin paralel olmaması durumunda örtüşme riski ($HYS = 86$, Thermal Red).
5. **Slide 42 (GPCR Gs vs Gi vs Gq İkincil Haberciler)**: $G_q \to PLC \to IP_3/DAG \to Ca^{2+}/PKC$ ($HYS = 90$, Thermal Red).

## 4. UI/UX Interaction Standards
- Minimalist Obsidian squircle theme tokens (`#171717`, `#212121`, `#2F2F2F`, `#10A37F`, `rounded-xl`).
- High-contrast thermal badge indicators (`bg-red-500/20 text-red-400 border-red-500/40` for Red; `bg-amber-500/20 text-amber-400` for Amber; `bg-neutral-800 text-neutral-400` for Gray).
- Keyboard shortcuts: `[1-4]` for options, `[Space]` to reveal hint, `[ArrowRight]` for next slide, `[Escape]` to close cram modal.
- Zero layout shift (CLS = 0.00) during hint ladder reveals and feedback animations.
