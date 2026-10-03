import { UserProgress } from '../types';

export type CompetencyCategory = 'foundation' | 'medchem' | 'pharmacology';
export type EdgeType = 'strict_prerequisite' | 'cross_course_bridge';

export interface KnowledgeNode {
  id: string;
  name: string;
  category: CompetencyCategory;
  level: number; // 0 (foundation), 1, 2, 3, 4
  courseModule?: string;
  lessonId?: string;
  description?: string;
}

export interface KnowledgeEdge {
  source: string; // Prerequisite node ID
  target: string; // Dependent node ID
  type: EdgeType;
  rationale?: string;
}

export interface PrerequisiteCheckOptions {
  includeFoundational?: boolean; // If true, foundational nodes must also be in completedProgress
}

export class KnowledgeGraphDAG {
  private nodes: Map<string, KnowledgeNode> = new Map();
  private outgoingEdges: Map<string, KnowledgeEdge[]> = new Map(); // source -> edges
  private incomingEdges: Map<string, KnowledgeEdge[]> = new Map(); // target -> edges

  constructor(nodes: KnowledgeNode[] = [], edges: KnowledgeEdge[] = []) {
    for (const node of nodes) {
      this.addNode(node);
    }
    for (const edge of edges) {
      this.addEdge(edge);
    }
  }

  public addNode(node: KnowledgeNode): void {
    this.nodes.set(node.id, { ...node });
    if (!this.outgoingEdges.has(node.id)) {
      this.outgoingEdges.set(node.id, []);
    }
    if (!this.incomingEdges.has(node.id)) {
      this.incomingEdges.set(node.id, []);
    }
  }

  public addEdge(edge: KnowledgeEdge): void {
    if (!this.nodes.has(edge.source)) {
      throw new Error(`Edge source node "${edge.source}" does not exist in graph.`);
    }
    if (!this.nodes.has(edge.target)) {
      throw new Error(`Edge target node "${edge.target}" does not exist in graph.`);
    }

    const outList = this.outgoingEdges.get(edge.source) || [];
    // Avoid duplicate edges
    if (!outList.some((e) => e.target === edge.target && e.type === edge.type)) {
      outList.push({ ...edge });
      this.outgoingEdges.set(edge.source, outList);
    }

    const inList = this.incomingEdges.get(edge.target) || [];
    if (!inList.some((e) => e.source === edge.source && e.type === edge.type)) {
      inList.push({ ...edge });
      this.incomingEdges.set(edge.target, inList);
    }
  }

  public getNode(id: string): KnowledgeNode | undefined {
    return this.nodes.get(id);
  }

  public getAllNodes(): KnowledgeNode[] {
    return Array.from(this.nodes.values());
  }

  public getAllEdges(): KnowledgeEdge[] {
    const edges: KnowledgeEdge[] = [];
    for (const list of this.outgoingEdges.values()) {
      edges.push(...list);
    }
    return edges;
  }

  public getDirectPrerequisites(targetId: string): string[] {
    const inEdges = this.incomingEdges.get(targetId) || [];
    return inEdges.map((e) => e.source);
  }

  public getAllPrerequisites(targetId: string): string[] {
    const visited = new Set<string>();
    const stack: string[] = [...this.getDirectPrerequisites(targetId)];

    while (stack.length > 0) {
      const current = stack.pop()!;
      if (!visited.has(current)) {
        visited.add(current);
        const prereqs = this.getDirectPrerequisites(current);
        for (const p of prereqs) {
          if (!visited.has(p)) {
            stack.push(p);
          }
        }
      }
    }

    return Array.from(visited);
  }

  public getDirectDependents(sourceId: string): string[] {
    const outEdges = this.outgoingEdges.get(sourceId) || [];
    return outEdges.map((e) => e.target);
  }

  public getAllDependents(sourceId: string): string[] {
    const visited = new Set<string>();
    const stack: string[] = [...this.getDirectDependents(sourceId)];

    while (stack.length > 0) {
      const current = stack.pop()!;
      if (!visited.has(current)) {
        visited.add(current);
        const deps = this.getDirectDependents(current);
        for (const d of deps) {
          if (!visited.has(d)) {
            stack.push(d);
          }
        }
      }
    }

    return Array.from(visited);
  }

  /**
   * Detects all cycles in the graph using Depth-First Search with recursion stack tracking.
   * Returns an array of cycles (each cycle is an array of node IDs showing the loop).
   */
  public detectCycles(): string[][] {
    const visited = new Set<string>();
    const recStack = new Set<string>();
    const parentMap = new Map<string, string>();
    const cycles: string[][] = [];

    const dfs = (nodeId: string) => {
      visited.add(nodeId);
      recStack.add(nodeId);

      const neighbors = this.getDirectDependents(nodeId);
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          parentMap.set(neighbor, nodeId);
          dfs(neighbor);
        } else if (recStack.has(neighbor)) {
          // Cycle found! Reconstruct cycle path
          const cycle: string[] = [neighbor, nodeId];
          let curr = nodeId;
          while (parentMap.has(curr) && parentMap.get(curr) !== neighbor) {
            curr = parentMap.get(curr)!;
            cycle.push(curr);
          }
          cycle.reverse();
          cycles.push(cycle);
        }
      }

      recStack.delete(nodeId);
    };

    for (const nodeId of this.nodes.keys()) {
      if (!visited.has(nodeId)) {
        dfs(nodeId);
      }
    }

    return cycles;
  }

  public hasCycle(): boolean {
    return this.detectCycles().length > 0;
  }

  /**
   * Performs Kahn's algorithm for topological sorting.
   * Throws an error if any cycle is detected.
   */
  public topologicalSort(): string[] {
    const inDegree = new Map<string, number>();
    for (const nodeId of this.nodes.keys()) {
      inDegree.set(nodeId, 0);
    }
    for (const edges of this.outgoingEdges.values()) {
      for (const edge of edges) {
        inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
      }
    }

    const queue: string[] = [];
    for (const [nodeId, deg] of inDegree.entries()) {
      if (deg === 0) {
        queue.push(nodeId);
      }
    }

    const result: string[] = [];
    while (queue.length > 0) {
      // Deterministic sort: sort alphabetically if degrees match
      queue.sort();
      const node = queue.shift()!;
      result.push(node);

      const outgoing = this.outgoingEdges.get(node) || [];
      for (const edge of outgoing) {
        const nextDeg = (inDegree.get(edge.target) || 1) - 1;
        inDegree.set(edge.target, nextDeg);
        if (nextDeg === 0) {
          queue.push(edge.target);
        }
      }
    }

    if (result.length !== this.nodes.size) {
      const cycles = this.detectCycles();
      throw new Error(
        `Circular dependency detected in prerequisite knowledge graph. Cycles: ${JSON.stringify(cycles)}`
      );
    }

    return result;
  }

  private extractCompletedSet(
    progress: UserProgress | { completedLessonIds: string[] } | string[] | Set<string>
  ): Set<string> {
    if (progress instanceof Set) {
      return progress;
    }
    if (Array.isArray(progress)) {
      return new Set(progress);
    }
    if (progress && 'completedLessonIds' in progress) {
      return new Set(progress.completedLessonIds);
    }
    return new Set();
  }

  public getMissingPrerequisites(
    studentProgress: UserProgress | { completedLessonIds: string[] } | string[] | Set<string>,
    targetLessonId: string,
    options: PrerequisiteCheckOptions = {}
  ): string[] {
    const completed = this.extractCompletedSet(studentProgress);
    const directPrereqs = this.getDirectPrerequisites(targetLessonId);

    const missing: string[] = [];
    for (const prereqId of directPrereqs) {
      const node = this.getNode(prereqId);
      // By default, foundational science (level 0) is assumed mastered unless requested
      if (!options.includeFoundational && node?.category === 'foundation') {
        continue;
      }
      if (!completed.has(prereqId)) {
        missing.push(prereqId);
      }
    }

    return missing;
  }

  public isPrerequisiteMet(
    studentProgress: UserProgress | { completedLessonIds: string[] } | string[] | Set<string>,
    targetLessonId: string,
    options: PrerequisiteCheckOptions = {}
  ): boolean {
    return this.getMissingPrerequisites(studentProgress, targetLessonId, options).length === 0;
  }
}

// Canonical Curriculum Knowledge Graph Definition
export const CANONICAL_KNOWLEDGE_NODES: KnowledgeNode[] = [
  // --- Foundational Science (Level 0) ---
  {
    id: 'GENCHEM-01',
    name: 'Acid-Base & pKa Ionization Equilibrium',
    category: 'foundation',
    level: 0,
    description: 'Henderson-Hasselbalch equation and aqueous ionization states.',
  },
  {
    id: 'GENCHEM-02',
    name: 'Thermodynamics & Chemical Potential',
    category: 'foundation',
    level: 0,
    description: 'Gibbs free energy, chemical potential, and Raoult vapor saturation.',
  },
  {
    id: 'CELLBIO-01',
    name: 'Lipid Bilayer Membrane Fluidity',
    category: 'foundation',
    level: 0,
    description: 'Phospholipid bilayer structure, fluidity, and passive partition barriers.',
  },
  {
    id: 'ORGCHEM-01',
    name: 'Functional Groups, Dipoles & Hydrogen Bonding',
    category: 'foundation',
    level: 0,
    description: 'Electronegativity, resonance, and non-covalent bonding geometries.',
  },
  {
    id: 'ORGCHEM-02',
    name: 'Stereochemistry & 3D Spatial Configuration',
    category: 'foundation',
    level: 0,
    description: 'Chiral centers, enantiomers, diastereomers, and Cahn-Ingold-Prelog rules.',
  },
  {
    id: 'PHYS-01',
    name: 'Autonomic & Synaptic Neurotransmission',
    category: 'foundation',
    level: 0,
    description: 'Neuronal action potentials, vesicle release, and synaptic signaling.',
  },

  // --- Course A: Farmasötik Kimya (MedChem) ---
  // Module 1: Introduction & Physicochemical Principles
  {
    id: 'mc-mod1-les1',
    name: 'Thermodynamic Activity & The Ferguson Principle',
    category: 'medchem',
    level: 1,
    courseModule: 'mc-mod-01',
    lessonId: 'mc-mod1-les1',
    description: 'Structurally non-specific vs specific action based on thermodynamic saturation.',
  },
  {
    id: 'mc-mod1-les2',
    name: 'Solubility, Ionization & Dielectric Constant',
    category: 'medchem',
    level: 1,
    courseModule: 'mc-mod-01',
    lessonId: 'mc-mod1-les2',
    description: 'Aqueous solubility, cosolvency, and pH-dependent ionization equilibria.',
  },
  // Module 2: Functional Groups & Intermolecular Bonding
  {
    id: 'mc-mod2-les1',
    name: 'Functional Groups & Intermolecular Bonding Forces',
    category: 'medchem',
    level: 1,
    courseModule: 'mc-mod-02',
    lessonId: 'mc-mod2-les1',
    description: 'Electrostatic, hydrogen bond, pi-stacking, and hydrophobic binding contributions.',
  },
  {
    id: 'mc-mod2-les2',
    name: 'Optical Chirality & The Easson-Stedman 3-Point Attachment',
    category: 'medchem',
    level: 1,
    courseModule: 'mc-mod-02',
    lessonId: 'mc-mod2-les2',
    description: 'Enantiomeric potency differences and the 3-point pharmacophore model.',
  },
  // Module 3: Bioisosterism & Rational Molecular Design
  {
    id: 'mc-mod3-les1',
    name: 'Classical Bioisosterism & Grimm Hydride Displacement',
    category: 'medchem',
    level: 2,
    courseModule: 'mc-mod-03',
    lessonId: 'mc-mod3-les1',
    description: 'Univalent, bivalent, and ring equivalents in lead optimization.',
  },
  {
    id: 'mc-mod3-les2',
    name: 'Non-Classical Bioisosteres: Carboxylic Acid & Tetrazole',
    category: 'medchem',
    level: 2,
    courseModule: 'mc-mod-03',
    lessonId: 'mc-mod3-les2',
    description: 'Bioisosteric replacement of acidic carboxylates with tetrazole rings.',
  },
  // Module 4: Stereochemistry & Optical Isomerism in Drug Action
  {
    id: 'mc-mod4-les1',
    name: "Eutomers, Distomers & Pfeiffer's Rule",
    category: 'medchem',
    level: 2,
    courseModule: 'mc-mod-04',
    lessonId: 'mc-mod4-les1',
    description: 'Eudismic ratio and correlation between affinity and stereoselectivity.',
  },
  {
    id: 'mc-mod4-les2',
    name: 'Conformational Isomerism: Rigid vs Flexible Scaffolds',
    category: 'medchem',
    level: 2,
    courseModule: 'mc-mod-04',
    lessonId: 'mc-mod4-les2',
    description: 'Restricting rotational degrees of freedom to boost receptor binding affinity.',
  },
  // Module 5: Drug Biotransformation & Phase I/II Metabolism
  {
    id: 'mc-mod5-les1',
    name: 'Phase I Functionalization: CYP450 Hydroxylation Mechanisms',
    category: 'medchem',
    level: 2,
    courseModule: 'mc-mod-05',
    lessonId: 'mc-mod5-les1',
    description: 'Aliphatic, aromatic, and heteroatom oxidations catalyzed by Cytochrome P450.',
  },
  {
    id: 'mc-mod5-les2',
    name: 'Phase II Conjugation: Glucuronidation & Sulfate Pathways',
    category: 'medchem',
    level: 2,
    courseModule: 'mc-mod-05',
    lessonId: 'mc-mod5-les2',
    description: 'Transferase-mediated conjugation enhancing water solubility and renal elimination.',
  },

  // --- Course B: Farmakoloji (Pharmacology) ---
  // Module 1: Drug-Receptor Interactions & Binding Forces
  {
    id: 'pharm-mod1-les1',
    name: 'Macromolecular Drug Targets & Mass Action Equilibrium',
    category: 'pharmacology',
    level: 1,
    courseModule: 'ph-mod-01',
    lessonId: 'pharm-mod1-les1',
    description: 'Law of mass action, equilibrium dissociation constant Kd, and fractional occupancy.',
  },
  {
    id: 'pharm-mod1-les2',
    name: 'Reversible Non-Covalent Forces & Binding Affinity',
    category: 'pharmacology',
    level: 1,
    courseModule: 'ph-mod-01',
    lessonId: 'pharm-mod1-les2',
    description: 'Energetics of multi-point reversible receptor binding.',
  },
  // Module 2: Pharmacodynamics & Quantitative Dose-Response
  {
    id: 'pharm-mod2-les1',
    name: 'Graded Dose-Response Curves & Intrinsic Efficacy',
    category: 'pharmacology',
    level: 2,
    courseModule: 'ph-mod-02',
    lessonId: 'pharm-mod2-les1',
    description: 'EC50, Emax, full agonists, partial agonists, and spare receptor reserve.',
  },
  {
    id: 'pharm-mod2-les2',
    name: 'Receptor Antagonism: Competitive vs Non-Competitive Blockade',
    category: 'pharmacology',
    level: 2,
    courseModule: 'ph-mod-02',
    lessonId: 'pharm-mod2-les2',
    description: 'Schild analysis, parallel rightward shifts, and insurmountable depressions.',
  },
  // Module 3: Pharmacokinetics: Absorption, Distribution, Metabolism & Elimination (ADME)
  {
    id: 'pharm-mod3-les1',
    name: 'One-Compartment Pharmacokinetics: Clearance & Half-Life',
    category: 'pharmacology',
    level: 2,
    courseModule: 'ph-mod-03',
    lessonId: 'pharm-mod3-les1',
    description: 'Volume of distribution, total body clearance, and elimination half-life.',
  },
  {
    id: 'pharm-mod3-les2',
    name: 'Bioavailability, First-Pass Elimination & Area Under the Curve',
    category: 'pharmacology',
    level: 2,
    courseModule: 'ph-mod-03',
    lessonId: 'pharm-mod3-les2',
    description: 'Oral bioavailability F, hepatic first-pass extraction, and AUC integration.',
  },
  // Module 4: Autonomic Nervous System & Neurotransmission
  {
    id: 'pharm-mod4-les1',
    name: 'Adrenergic Neurotransmission & Receptor Subtypes',
    category: 'pharmacology',
    level: 3,
    courseModule: 'ph-mod-04',
    lessonId: 'pharm-mod4-les1',
    description: 'Alpha-1, alpha-2, beta-1, beta-2 adrenergic signaling and catecholamine agonists.',
  },
  {
    id: 'pharm-mod4-les2',
    name: 'Cholinergic Transmission & Muscarinic Receptor Modulation',
    category: 'pharmacology',
    level: 3,
    courseModule: 'ph-mod-04',
    lessonId: 'pharm-mod4-les2',
    description: 'Acetylcholine synthesis, muscarinic/nicotinic activation, and organophosphate toxicity.',
  },
  // Module 5: Cardiovascular & Renal Pharmacology
  {
    id: 'pharm-mod5-les1',
    name: 'Renin-Angiotensin-Aldosterone System (RAAS) Inhibition',
    category: 'pharmacology',
    level: 3,
    courseModule: 'ph-mod-05',
    lessonId: 'pharm-mod5-les1',
    description: 'ACE inhibitors, ARBs (losartan), and hemodynamic regulation.',
  },
  {
    id: 'pharm-mod5-les2',
    name: 'Diuretic Mechanisms & Tubular Electrolyte Transport',
    category: 'pharmacology',
    level: 3,
    courseModule: 'ph-mod-05',
    lessonId: 'pharm-mod5-les2',
    description: 'Loop, thiazide, and potassium-sparing diuretics in nephron segments.',
  },
  // Module 6: Central Nervous System & Neuropharmacology
  {
    id: 'pharm-mod6-les1',
    name: 'GABAergic Neurotransmission & Positive Allosteric Modulators',
    category: 'pharmacology',
    level: 4,
    courseModule: 'ph-mod-06',
    lessonId: 'pharm-mod6-les1',
    description: 'GABA-A chloride channel complex and benzodiazepine allosteric gating.',
  },
  {
    id: 'pharm-mod6-les2',
    name: 'Dopaminergic Pathways & Antipsychotic Receptor Profiles',
    category: 'pharmacology',
    level: 4,
    courseModule: 'ph-mod-06',
    lessonId: 'pharm-mod6-les2',
    description: 'Mesolimbic and nigrostriatal dopamine D2 antagonism and extrapyramidal symptoms.',
  },
];

export const CANONICAL_KNOWLEDGE_EDGES: KnowledgeEdge[] = [
  // --- Foundational to Course A ---
  {
    source: 'GENCHEM-02',
    target: 'mc-mod1-les1',
    type: 'strict_prerequisite',
    rationale: 'Thermodynamics and relative saturation are required for Ferguson principle.',
  },
  {
    source: 'CELLBIO-01',
    target: 'mc-mod1-les1',
    type: 'strict_prerequisite',
    rationale: 'Membrane bilayer fluidity is needed to understand physical depressant accumulation.',
  },
  {
    source: 'mc-mod1-les1',
    target: 'mc-mod1-les2',
    type: 'strict_prerequisite',
    rationale: 'Thermodynamic saturation principles precede aqueous solubility and dielectric constant.',
  },
  {
    source: 'GENCHEM-01',
    target: 'mc-mod1-les2',
    type: 'strict_prerequisite',
    rationale: 'Acid-base equilibria and pKa govern pH-dependent solubility.',
  },
  {
    source: 'ORGCHEM-01',
    target: 'mc-mod2-les1',
    type: 'strict_prerequisite',
    rationale: 'Organic functional groups form the basis of intermolecular drug bonding.',
  },
  {
    source: 'mc-mod1-les2',
    target: 'mc-mod2-les1',
    type: 'strict_prerequisite',
    rationale: 'Dielectric shielding and hydration govern intermolecular bond strength.',
  },
  {
    source: 'ORGCHEM-02',
    target: 'mc-mod2-les2',
    type: 'strict_prerequisite',
    rationale: 'Stereochemistry and chirality are foundational to the Easson-Stedman 3-point model.',
  },
  {
    source: 'mc-mod2-les1',
    target: 'mc-mod2-les2',
    type: 'strict_prerequisite',
    rationale: 'Bonding forces must be understood to model 3 distinct contact patches.',
  },
  {
    source: 'mc-mod2-les1',
    target: 'mc-mod3-les1',
    type: 'strict_prerequisite',
    rationale: 'Functional group characteristics govern Grimm hydride bioisosteric substitutions.',
  },
  {
    source: 'mc-mod3-les1',
    target: 'mc-mod3-les2',
    type: 'strict_prerequisite',
    rationale: 'Classical bioisosterism concepts precede non-classical ring replacements.',
  },
  {
    source: 'mc-mod2-les2',
    target: 'mc-mod4-les1',
    type: 'strict_prerequisite',
    rationale: 'Easson-Stedman 3-point attachment explains Pfeiffer eudismic ratio rule.',
  },
  {
    source: 'mc-mod4-les1',
    target: 'mc-mod4-les2',
    type: 'strict_prerequisite',
    rationale: 'Enantiomeric affinity differences precede conformational restriction strategies.',
  },
  {
    source: 'mc-mod2-les1',
    target: 'mc-mod5-les1',
    type: 'strict_prerequisite',
    rationale: 'Chemical functional groups determine sites of CYP450 oxidative vulnerability.',
  },
  {
    source: 'mc-mod5-les1',
    target: 'mc-mod5-les2',
    type: 'strict_prerequisite',
    rationale: 'Phase I functionalization produces reactive nucleophiles for Phase II conjugation.',
  },

  // --- Cross-Course Bridges: Course A to Course B ---
  {
    source: 'mc-mod1-les1',
    target: 'pharm-mod1-les1',
    type: 'cross_course_bridge',
    rationale: 'Thermodynamic saturation distinction is required before modeling mass action equilibrium.',
  },
  {
    source: 'mc-mod2-les1',
    target: 'pharm-mod1-les2',
    type: 'cross_course_bridge',
    rationale: 'Chemical intermolecular forces explain receptor binding affinity energetics.',
  },
  {
    source: 'mc-mod2-les2',
    target: 'pharm-mod2-les1',
    type: 'cross_course_bridge',
    rationale: 'Chiral 3-point attachment explains stereoselective intrinsic efficacy.',
  },
  {
    source: 'mc-mod5-les1',
    target: 'pharm-mod3-les2',
    type: 'cross_course_bridge',
    rationale: 'Hepatic CYP450 oxidation governs first-pass extraction and bioavailability.',
  },
  {
    source: 'mc-mod3-les2',
    target: 'pharm-mod5-les1',
    type: 'cross_course_bridge',
    rationale: 'Tetrazole-carboxylate bioisosterism explains modern orally active ARBs (losartan).',
  },

  // --- Course B Internal Prerequisites ---
  {
    source: 'pharm-mod1-les1',
    target: 'pharm-mod1-les2',
    type: 'strict_prerequisite',
    rationale: 'Mass action occupancy precedes detailed non-covalent force quantification.',
  },
  {
    source: 'pharm-mod1-les1',
    target: 'pharm-mod2-les1',
    type: 'strict_prerequisite',
    rationale: 'Receptor occupancy is the mathematical foundation of dose-response curves.',
  },
  {
    source: 'pharm-mod2-les1',
    target: 'pharm-mod2-les2',
    type: 'strict_prerequisite',
    rationale: 'Graded agonist curves are necessary before modeling competitive antagonism shifts.',
  },
  {
    source: 'mc-mod1-les1',
    target: 'pharm-mod3-les1',
    type: 'cross_course_bridge',
    rationale: 'Physicochemical distribution properties determine pharmacokinetic volume of distribution.',
  },
  {
    source: 'pharm-mod3-les1',
    target: 'pharm-mod3-les2',
    type: 'strict_prerequisite',
    rationale: 'Systemic clearance must be understood before analyzing first-pass bioavailability.',
  },
  {
    source: 'PHYS-01',
    target: 'pharm-mod4-les1',
    type: 'strict_prerequisite',
    rationale: 'Physiological synaptic signaling is required before adrenergic receptor pharmacodynamics.',
  },
  {
    source: 'pharm-mod1-les2',
    target: 'pharm-mod4-les1',
    type: 'strict_prerequisite',
    rationale: 'Binding forces dictate catecholamine subtype selectivity.',
  },
  {
    source: 'pharm-mod4-les1',
    target: 'pharm-mod4-les2',
    type: 'strict_prerequisite',
    rationale: 'Sympathetic adrenergic understanding precedes parasympathetic cholinergic balance.',
  },
  {
    source: 'pharm-mod2-les2',
    target: 'pharm-mod5-les1',
    type: 'strict_prerequisite',
    rationale: 'Antagonist pharmacology is required for Angiotensin II receptor blockers.',
  },
  {
    source: 'pharm-mod5-les1',
    target: 'pharm-mod5-les2',
    type: 'strict_prerequisite',
    rationale: 'Hemodynamic blood pressure control precedes tubular diuretic mechanisms.',
  },
  {
    source: 'GENCHEM-01',
    target: 'pharm-mod5-les2',
    type: 'strict_prerequisite',
    rationale: 'Electrolyte ionization and carbonic acid equilibria govern renal bicarbonate excretion.',
  },
  {
    source: 'pharm-mod4-les1',
    target: 'pharm-mod6-les1',
    type: 'strict_prerequisite',
    rationale: 'Neurotransmission principles are required for central GABAergic modulation.',
  },
  {
    source: 'pharm-mod6-les1',
    target: 'pharm-mod6-les2',
    type: 'strict_prerequisite',
    rationale: 'Central inhibitory pathways precede dopaminergic motor and psychotic circuits.',
  },
];

// Singleton instance with canonical platform knowledge DAG
export const canonicalKnowledgeGraph = new KnowledgeGraphDAG(
  CANONICAL_KNOWLEDGE_NODES,
  CANONICAL_KNOWLEDGE_EDGES
);

export function isPrerequisiteMet(
  studentProgress: UserProgress | { completedLessonIds: string[] } | string[] | Set<string>,
  targetLessonId: string,
  options?: PrerequisiteCheckOptions
): boolean {
  return canonicalKnowledgeGraph.isPrerequisiteMet(studentProgress, targetLessonId, options);
}

export function topologicalSort(): string[] {
  return canonicalKnowledgeGraph.topologicalSort();
}

export function detectCycles(): string[][] {
  return canonicalKnowledgeGraph.detectCycles();
}
