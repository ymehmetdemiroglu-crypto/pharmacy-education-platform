import { describe, it, expect } from 'vitest';
import {
  KnowledgeGraphDAG,
  canonicalKnowledgeGraph,
  isPrerequisiteMet,
  topologicalSort,
  detectCycles,
  CANONICAL_KNOWLEDGE_NODES,
  CANONICAL_KNOWLEDGE_EDGES,
} from './knowledgeGraph';
import { UserProgress } from '../types';

describe('Prerequisite Knowledge Graph DAG', () => {
  it('contains all 28 canonical nodes across foundational science, MedChem, and Pharmacology', () => {
    const nodes = canonicalKnowledgeGraph.getAllNodes();
    expect(nodes.length).toBe(28);

    const foundationNodes = nodes.filter((n) => n.category === 'foundation');
    const medchemNodes = nodes.filter((n) => n.category === 'medchem');
    const pharmacologyNodes = nodes.filter((n) => n.category === 'pharmacology');

    expect(foundationNodes.length).toBe(6);
    expect(medchemNodes.length).toBe(10);
    expect(pharmacologyNodes.length).toBe(12);
  });

  it('guarantees 0 circular dependencies (acyclic DAG verification)', () => {
    const cycles = detectCycles();
    expect(cycles).toEqual([]);
    expect(canonicalKnowledgeGraph.hasCycle()).toBe(false);
  });

  it('computes a valid topological ordering of all competencies', () => {
    const sortedOrder = topologicalSort();
    expect(sortedOrder.length).toBe(CANONICAL_KNOWLEDGE_NODES.length);

    // Verify every edge is respected: source must precede target in sortedOrder
    const positionMap = new Map(sortedOrder.map((id, index) => [id, index]));
    for (const edge of CANONICAL_KNOWLEDGE_EDGES) {
      const sourcePos = positionMap.get(edge.source);
      const targetPos = positionMap.get(edge.target);
      expect(
        sourcePos,
        `Edge source ${edge.source} missing from topological sort`
      ).toBeDefined();
      expect(
        targetPos,
        `Edge target ${edge.target} missing from topological sort`
      ).toBeDefined();
      expect(
        sourcePos!,
        `Topological violation: source ${edge.source} (pos ${sourcePos}) must precede target ${edge.target} (pos ${targetPos})`
      ).toBeLessThan(targetPos!);
    }
  });

  it('verifies cross-course bridges between Farmasötik Kimya and Farmakoloji', () => {
    const bridges = CANONICAL_KNOWLEDGE_EDGES.filter(
      (e) => e.type === 'cross_course_bridge'
    );
    expect(bridges.length).toBeGreaterThanOrEqual(5);

    // Bridge 1: Thermodynamic Saturation -> Mass Action
    const b1 = bridges.find(
      (e) => e.source === 'mc-mod1-les1' && e.target === 'pharm-mod1-les1'
    );
    expect(b1).toBeDefined();

    // Bridge 2: Intermolecular Bonding -> Non-Covalent Forces
    const b2 = bridges.find(
      (e) => e.source === 'mc-mod2-les1' && e.target === 'pharm-mod1-les2'
    );
    expect(b2).toBeDefined();

    // Bridge 3: 3-Point Attachment -> Graded Dose-Response
    const b3 = bridges.find(
      (e) => e.source === 'mc-mod2-les2' && e.target === 'pharm-mod2-les1'
    );
    expect(b3).toBeDefined();

    // Bridge 4: Phase I CYP450 -> First-Pass Bioavailability
    const b4 = bridges.find(
      (e) => e.source === 'mc-mod5-les1' && e.target === 'pharm-mod3-les2'
    );
    expect(b4).toBeDefined();

    // Bridge 5: Tetrazole Bioisosteres -> RAAS Inhibition
    const b5 = bridges.find(
      (e) => e.source === 'mc-mod3-les2' && e.target === 'pharm-mod5-les1'
    );
    expect(b5).toBeDefined();
  });

  it('evaluates prerequisite completion accurately with isPrerequisiteMet', () => {
    // Lesson with no course prerequisites (only foundational science)
    const emptyProgress: string[] = [];
    expect(isPrerequisiteMet(emptyProgress, 'mc-mod1-les1')).toBe(true);

    // Lesson 2 requires Lesson 1
    expect(isPrerequisiteMet(emptyProgress, 'mc-mod1-les2')).toBe(false);

    // Once Lesson 1 is completed:
    const progressWithL1 = ['mc-mod1-les1'];
    expect(isPrerequisiteMet(progressWithL1, 'mc-mod1-les2')).toBe(true);

    // Target requiring multiple prerequisites: pharm-mod1-les2 requires pharm-mod1-les1 and mc-mod2-les1
    expect(isPrerequisiteMet(['pharm-mod1-les1'], 'pharm-mod1-les2')).toBe(false);
    expect(isPrerequisiteMet(['mc-mod2-les1'], 'pharm-mod1-les2')).toBe(false);
    expect(
      isPrerequisiteMet(['pharm-mod1-les1', 'mc-mod2-les1'], 'pharm-mod1-les2')
    ).toBe(true);
  });

  it('supports UserProgress object and Set<string> inputs', () => {
    const userProgress: UserProgress = {
      courseId: 'medchem',
      completedLessonIds: ['mc-mod1-les1', 'mc-mod1-les2'],
      currentModuleId: 'mc-mod-02',
      currentLessonId: 'mc-mod2-les1',
      currentStepIndex: 0,
      streakDays: 3,
      lastStreakDate: '2026-09-30',
      totalXP: 100,
      accuracyRate: 0.95,
    };

    expect(isPrerequisiteMet(userProgress, 'mc-mod2-les1')).toBe(true);
    expect(isPrerequisiteMet(userProgress, 'mc-mod2-les2')).toBe(false);

    const setProgress = new Set(['mc-mod1-les1', 'mc-mod1-les2', 'mc-mod2-les1']);
    expect(isPrerequisiteMet(setProgress, 'mc-mod2-les2')).toBe(true);
  });

  it('retrieves transitive prerequisite closure with getAllPrerequisites', () => {
    const allPrereqs = canonicalKnowledgeGraph.getAllPrerequisites('pharm-mod5-les1');

    // pharm-mod5-les1 depends on pharm-mod2-les2 and mc-mod3-les2
    // mc-mod3-les2 transitively depends on mc-mod3-les1, mc-mod2-les1, mc-mod1-les2, mc-mod1-les1, GENCHEM-02
    expect(allPrereqs).toContain('pharm-mod2-les2');
    expect(allPrereqs).toContain('mc-mod3-les2');
    expect(allPrereqs).toContain('mc-mod3-les1');
    expect(allPrereqs).toContain('mc-mod2-les1');
    expect(allPrereqs).toContain('mc-mod1-les2');
    expect(allPrereqs).toContain('mc-mod1-les1');
    expect(allPrereqs).toContain('GENCHEM-02');
  });

  it('detects and rejects intentional cyclic dependencies (adversarial test)', () => {
    const testGraph = new KnowledgeGraphDAG();
    testGraph.addNode({ id: 'A', name: 'Concept A', category: 'foundation', level: 0 });
    testGraph.addNode({ id: 'B', name: 'Concept B', category: 'foundation', level: 0 });
    testGraph.addNode({ id: 'C', name: 'Concept C', category: 'foundation', level: 0 });

    testGraph.addEdge({ source: 'A', target: 'B', type: 'strict_prerequisite' });
    testGraph.addEdge({ source: 'B', target: 'C', type: 'strict_prerequisite' });
    expect(testGraph.hasCycle()).toBe(false);

    // Introduce cycle: C -> A
    testGraph.addEdge({ source: 'C', target: 'A', type: 'strict_prerequisite' });
    expect(testGraph.hasCycle()).toBe(true);

    const cycles = testGraph.detectCycles();
    expect(cycles.length).toBeGreaterThan(0);
    expect(() => testGraph.topologicalSort()).toThrow(/Circular dependency detected/);
  });
});
