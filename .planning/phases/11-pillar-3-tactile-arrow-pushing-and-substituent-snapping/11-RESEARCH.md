# Phase 11 Research: Pillar 3 — Tactile "Çizerek Öğren"

## 1. Chemoinformatics & Geometry Research

### 1.1 Bézier Arrow Curve Generation
In chemistry pedagogy, mechanism arrows are curved to indicate the movement of electrons, curving away from crowded sterics.
For an arrow from donor $P_0$ to acceptor $P_1$:
- Midpoint: $M = \frac{P_0 + P_1}{2}$
- Vector $\vec{v} = P_1 - P_0$, distance $d = \|\vec{v}\|$
- Normal vector perpendicular to chord: $\hat{n} = \left(-\frac{v_y}{d}, \frac{v_x}{d}\right)$
- Curvature factor $h = 0.25 \times d$ (or $-0.25 \times d$ depending on desired arc convexity)
- Control Point: $P_{\text{ctrl}} = M + h \cdot \hat{n}$
- Quadratic Bézier path: `M P0.x P0.y Q Pctrl.x Pctrl.y P1.x P1.y`
- Arrowhead: 2 barbs at angle $\theta = \text{atan2}(P_{1,y} - P_{\text{ctrl},y}, P_{1,x} - P_{\text{ctrl},x})$:
  - Barb length: $12\text{px}$, barb angle: $30^\circ$ ($0.523\text{ rad}$)
  - Full double barb for 2-electron transfer; single hook barb for radical mechanisms.

### 1.2 Voronoi Snap Target Partitioning
On a $56\text{px}$ bond baseline:
- Atoms have center coordinates $(x_i, y_i)$.
- Covalent bonds have center coordinates $(x_{i,j}, y_{i,j}) = \frac{(x_i + x_j)}{2}, \frac{(y_i + y_j)}{2}$.
- An input point $P(x,y)$ computes Euclidean distances to all atom centers and bond centers.
- Snap threshold: $r_{\text{snap}} = \min(28\text{px}, 0.5 \times \text{bondLength})$.
- If $\min(d) \le r_{\text{snap}}$, the point snaps to the closest target without equidistant oscillation.

### 1.3 Valence & Octet Enforcement Logic
- **Period 2 Elements (C, N, O, F)**:
  - Max valence electrons: 8 (4 electron pairs / bonds).
  - Carbon with 4 existing single bonds receiving an incoming electron pair forms a 5th bond $\implies$ `VALENCE_OCTET_VIOLATION` (Texas Carbon).
  - Remedy: A simultaneous secondary arrow must originate from the carbonyl $\pi$-bond to the Oxygen atom.
- **Hypervalent Period 3 Elements (P, S)**:
  - Phosphorus ($P$): Normal valence 3 or 5. In organophosphates ($O=P(OR)_2F$ or Sarin), $P$ has 5 bonds (10 electrons). During nucleophilic attack by Ser-203, a pentacoordinate transition state forms before fluoride departure. Allowed max valence: 5 (or 6 in transition states).
  - Sulfur ($S$): In sulfonamides ($-SO_2NH_2$), Sulfur has 6 bonds (12 valence electrons, hexavalent). Allowed max valence: 6.
- **Formal Charge Balance**:
  $$\text{Formal Charge} = V - N - \frac{B}{2}$$
  Where $V$ is valence electrons of free atom, $N$ is non-bonding electrons, and $B$ is bonding electrons.
  - When Serine $-OH$ ($O$ neutral) attacks, $O$ becomes positively charged (or oxonium) until proton transfer.
  - When carbonyl $C=O$ $\pi$-bond opens to Oxygen, $O$ gains negative formal charge (alkoxide).

### 1.4 Hammett $\Delta pK_a$ & Wildman-Crippen $\Delta \log P$ Models
1. **Hammett Equation**:
   $$\log(K / K_0) = \rho \cdot \sigma_x \implies \Delta pK_a = -\rho \cdot \sigma_x$$
   - For benzoic acid / aniline ionization:
     - $-H$: $\sigma = 0.00 \implies \Delta pK_a = 0.0$
     - $-CH_3$: $\sigma_p = -0.17 \implies \Delta pK_a = +0.17$
     - $-Cl$: $\sigma_p = +0.23 \implies \Delta pK_a = -0.23$
     - $-OCH_3$: $\sigma_p = -0.27 \implies \Delta pK_a = +0.27$
     - $-NO_2$: $\sigma_p = +0.78 \implies \Delta pK_a = -0.78$ (strongly electron withdrawing, acidifies phenol/acid)
     - $-CF_3$: $\sigma_p = +0.54 \implies \Delta pK_a = -0.54$
     - $-N(CH_3)_2$: $\sigma_p = -0.83 \implies \Delta pK_a = +0.83$ (strong electron donating resonance)
     - $-SO_2NH_2$: $\sigma_p = +0.57 \implies \Delta pK_a = -0.57$
2. **Wildman-Crippen Lipophilicity ($\Delta \log P$)**:
   - $-H$: $0.00$
   - $-CH_3$: $+0.56$ (hydrophobic boost)
   - $-Cl$: $+0.71$ (lipophilic halogen)
   - $-OCH_3$: $-0.02$
   - $-NO_2$: $-0.28$ (polar)
   - $-CF_3$: $+0.88$ (heavy lipophilicity and metabolic shielding)
   - $-N(CH_3)_2$: $+0.18$
   - $-SO_2NH_2$: $-1.20$ (highly hydrophilic)
