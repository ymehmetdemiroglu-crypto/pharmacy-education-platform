---
name: lesson-authoring
description: Authors bite-sized, interactive learning lessons adhering to cognitive load theory, predict-then-reveal mechanics, worked-example fading, and strict schema validation.
---

# Lesson Authoring Skill

## Purpose
Transforms extracted pharmaceutical concepts into engaging, active learn-by-doing lessons following evidence-based pedagogy.

## Lesson Schema Contract
Every lesson is authored as a JSON or structured TypeScript document adhering to:
```typescript
export type StepType = 
  | 'predict_reveal'
  | 'sar_explorer'
  | 'structure_identifier'
  | 'dose_response_curve'
  | 'pk_simulator'
  | 'receptor_ligand_matcher'
  | 'mechanism_pathway'
  | 'drug_class_sorter'
  | 'metabolism_map'
  | 'worked_example_fading'
  | 'clinical_vignette'
  | 'concept_checkpoint';

export interface Step {
  id: string;
  type: StepType;
  prompt: string;               // Max 40 words prose
  config: Record<string, unknown>; // Validated by widget-specific Zod schema
  hints: string[];              // Exactly 3 hints (nudge, mechanism, complete solution)
  feedback: {
    correct: string;
    incorrect: string;
    misconceptions?: Record<string, string>;
  };
  sources: { file: string; page: number | string }[];
  verified: boolean;
}

export interface Lesson {
  id: string;
  courseId: 'medchem' | 'pharmacology';
  moduleId: string;
  title: string;
  order: number;
  access: 'free' | 'paid';
  objective: string;
  steps: Step[]; // 8-15 steps
  spacedReviewItems: string[]; // Exactly 3 review flashcard IDs
  misconceptions: string[];
}
```

## Workflow Instructions
1. **Anatomy Checklist**: Ensure the 12-stage lesson anatomy is respected (Problem hook -> Prior activation -> Predict-then-reveal -> Faded worked example -> Checkpoint -> Transfer -> Recap).
2. **Word Count Guard**: Enforce maximum 40 words of prose per interactive step.
3. **Misconception Targets**: Draft tailored explanations for each distractor option based on known pharmacy student errors.
4. **Validation**: Run the build-time content linter before proposing lesson for review.
