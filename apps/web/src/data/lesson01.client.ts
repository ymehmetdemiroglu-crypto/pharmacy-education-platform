import type { LessonData } from '@pharmacy/platform';

/**
 * Production-ready client lesson data for Course A Lesson 1.
 * Free of internal audit tokens, unverified notes, or developer review tags.
 */
export const clientLesson01: LessonData = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "id": "mc-mod1-les1",
  "courseId": "medchem",
  "moduleId": "mc-mod-01",
  "title": "Thermodynamic Activity & The Ferguson Principle",
  "order": 1,
  "access": "free",
  "objective": "Differentiate structurally specific from structurally non-specific drugs using thermodynamic activity thresholds.",
  "misconceptions": [
    "All drugs bind specific stereoselective receptor pockets.",
    "Lower effective dose always indicates higher intrinsic toxicity.",
    "Structurally non-specific drugs lack biological activity."
  ],
  "sources": [
    {
      "file": "Farmasötik ve Medisinal Kimya 1-Giriş.pdf",
      "page": 17
    },
    {
      "file": "Farmasötik ve Medisinal Kimya 1-Giriş.pdf",
      "page": 18
    },
    {
      "file": "Farmasötik ve Medisinal Kimya 1-Giriş.pdf",
      "page": 19
    },
    {
      "file": "Farmasötik ve Medisinal Kimya 1-Giriş.pdf",
      "page": 20
    },
    {
      "file": "Farmasötik ve Medisinal Kimya 1-Giriş.pdf",
      "page": 23
    }
  ],
  "citations": [
    {
      "id": "cit-ref-01",
      "book": "Foye's Principles of Medicinal Chemistry",
      "edition": "8th ed.",
      "topic": "Thermodynamic Activity and Ferguson's Principle"
    },
    {
      "id": "cit-ref-02",
      "book": "An Introduction to Medicinal Chemistry",
      "edition": "6th ed.",
      "topic": "Ferguson's Principle of Non-Specific Action"
    },
    {
      "id": "cit-ref-03",
      "book": "The Practice of Medicinal Chemistry",
      "edition": "4th ed.",
      "topic": "Physicochemical Properties and Biological Activity"
    }
  ],
  "spacedReviewCards": [
    {
      "cardId": "mc-mod1-les1-card1",
      "courseId": "medchem",
      "drugOrConcept": "Ferguson Saturation Threshold",
      "prompt": "What is the relative thermodynamic saturation range (a = Pt/P0 or St/S0) defining structurally non-specific drug action?",
      "answer": "High relative saturation threshold (substantial fraction of saturation equilibrium)",
      "box": 1,
      "intervalDays": 1
    },
    {
      "cardId": "mc-mod1-les1-card2",
      "courseId": "medchem",
      "drugOrConcept": "Chemical Structure Alteration",
      "prompt": "How does altering the chemical core affect structurally specific vs structurally non-specific drugs?",
      "answer": "Structurally specific drugs lose potency or abolish activity completely; structurally non-specific drugs retain similar biological effect but alter pharmacokinetic properties.",
      "box": 1,
      "intervalDays": 1,
      "status": "verified"
    },
    {
      "cardId": "mc-mod1-les1-card3",
      "courseId": "medchem",
      "drugOrConcept": "Clinical Classification",
      "prompt": "Classify inhalation anesthetics (halothane, nitrous oxide) vs stereoselective beta-blockers (propranolol) according to Ferguson's principle.",
      "answer": "Inhalation anesthetics are structurally non-specific (physical membrane depression at high relative saturation); beta-blockers are structurally specific (3D receptor binding at low thermodynamic activity).",
      "box": 1,
      "intervalDays": 1,
      "status": "verified"
    }
  ],
  "translations": {
    "tr": {
      "title": "Termodinamik Aktivite ve Ferguson İlkesi",
      "objective": "Termodinamik aktivite eşiklerini kullanarak yapısal olarak özgül olan ve özgül olmayan ilaçları ayırt etmek."
    },
    "ar": {
      "title": "النشاط الديناميكي الحراري ومبدأ فيرجسون",
      "objective": "التمييز بين الأدوية النوعية وغير النوعية بنيوياً باستخدام عتبات النشاط الديناميكي الحراري."
    }
  },
  "steps": [
    {
      "id": "step-1",
      "type": "clinical_vignette",
      "title": "Two Drugs, Vastly Different Quantities",
      "prompt": "Why does general anesthesia with ether require tens of grams, while beta-blocker propranolol acts at tiny milligram doses?",
      "predictThenReveal": false,
      "widgetType": "vignette",
      "config": {
        "drugA": {
          "name": "Diethyl Ether",
          "dose": "Tens of grams (high molar concentration)",
          "target": "Cellular lipid membranes (physical volume alteration)"
        },
        "drugB": {
          "name": "Propranolol",
          "dose": "Milligrams (micromolar to nanomolar)",
          "target": "Beta-adrenergic receptor pocket (stereoselective binding)"
        }
      },
      "hints": [
        "Think about where each drug molecule travels and whether it requires a specific lock-and-key receptor binding site.",
        "Ether alters physical properties of membranes; propranolol targets high-affinity cell surface adrenergic receptors.",
        "Large molar quantities reflect non-specific physical accumulation; nanomolar affinity allows minute doses to trigger physiological responses."
      ],
      "feedback": {
        "correct": "Exactly! Some drugs require bulk physical saturation of membranes, whereas others selectively target high-affinity cellular receptors.",
        "incorrect": "Consider whether both drugs act on specific receptors, or if one relies on physical presence."
      },
      "sources": [
        {
          "file": "Farmasötik ve Medisinal Kimya 1-Giriş.pdf",
          "page": 17
        }
      ],
      "verified": false
    },
    {
      "id": "step-2",
      "type": "predict_reveal",
      "title": "Thermodynamic Activity of Vapors",
      "prompt": "Ferguson related biological activity to relative saturation: a = Pt / P0. If vapor pressure Pt approaches saturation P0, what happens to thermodynamic activity a?",
      "predictThenReveal": true,
      "widgetType": "predict_reveal",
      "config": {
        "formula": "a = P_t / P_0",
        "options": [
          {
            "id": "opt-2",
            "label": "a drops to 0, because saturated vapors cannot dissolve into membranes.",
            "isCorrect": false,
            "misconceptionFeedback": "Saturation maximizes escaping tendency; it does not stop dissolution."
          },
          {
            "id": "opt-1",
            "label": "a approaches unity (complete saturation), maximizing physical escaping tendency into biophase tissues.",
            "isCorrect": true
          },
          {
            "id": "opt-3",
            "label": "a remains completely unaffected by partial vapor pressure.",
            "isCorrect": false,
            "misconceptionFeedback": "Thermodynamic activity is directly proportional to partial vapor pressure."
          }
        ],
        "revealedOutcome": "a = Pt / P0 approaches unity. Thermodynamic activity reaches maximum escaping tendency.",
        "explanation": "As partial pressure Pt nears saturated vapor pressure P0, chemical potential reaches its peak, driving drug molecules into cell biophases."
      },
      "hints": [
        "Review the ratio a = Pt / P0 as the numerator approaches the denominator.",
        "When Pt = P0, the ratio equals unity, signifying complete thermodynamic saturation.",
        "Thermodynamic activity a scales from 0 to 1; equal activity produces equal biological effect regardless of chemical structure."
      ],
      "feedback": {
        "correct": "Correct! As Pt approaches P0, relative saturation a approaches unity, driving drug partition into biophase membranes.",
        "incorrect": "Remember that thermodynamic activity is defined as the ratio Pt / P0, scaling directly with vapor pressure toward unity."
      },
      "sources": [
        {
          "file": "Farmasötik ve Medisinal Kimya 1-Giriş.pdf",
          "page": 18
        }
      ],
      "verified": false
    },
    {
      "id": "step-3",
      "type": "predict_reveal",
      "title": "The Non-Specific Activity Threshold",
      "prompt": "Structurally non-specific drugs produce biological depression only at high thermodynamic activity. Predict the relative saturation range where general anesthesia occurs.",
      "predictThenReveal": true,
      "widgetType": "predict_reveal",
      "config": {
        "options": [
          {
            "id": "opt-1",
            "label": "High relative saturation (substantial saturation needed to alter membranes)",
            "isCorrect": true
          },
          {
            "id": "opt-2",
            "label": "a < 0.0001 (Extreme dilution suffices for non-specific physical action)",
            "isCorrect": false,
            "misconceptionFeedback": "Extreme dilution (a < 0.001) only works for structurally specific receptor ligands."
          },
          {
            "id": "opt-3",
            "label": "a > 10.0 (Requires supersaturated physical states impossible in physiology)",
            "isCorrect": false,
            "misconceptionFeedback": "Thermodynamic activity at standard equilibrium does not exceed unity."
          }
        ],
        "revealedOutcome": "Non-specific depressants act within a high relative saturation range, requiring substantial physical accumulation.",
        "explanation": "Without specific receptor binding, drugs must achieve 1% to 100% of their saturation limit to alter biophase membrane fluidity."
      },
      "hints": [
        "Non-specific drugs need a substantial fraction of their maximum solubility or vapor pressure.",
        "Ferguson observed diverse depressants induce anesthesia at substantial relative saturation.",
        "Because action depends on physical presence rather than receptor affinity, high thermodynamic activity is obligatory."
      ],
      "feedback": {
        "correct": "Accurate! Non-specific agents require high relative saturation to physically perturb membranes.",
        "incorrect": "Non-specific drugs do not possess high-affinity receptor targets, so they require substantial relative saturation."
      },
      "sources": [
        {
          "file": "Farmasötik ve Medisinal Kimya 1-Giriş.pdf",
          "page": 18
        }
      ],
      "verified": false
    },
    {
      "id": "step-4",
      "type": "predict_reveal",
      "title": "Exobiophase to Endobiophase Equilibrium",
      "prompt": "Ferguson posited dynamic equilibrium between exobiophase (blood) and endobiophase (membrane). At equilibrium, how does thermodynamic activity in blood compare to the target membrane?",
      "predictThenReveal": true,
      "widgetType": "predict_reveal",
      "config": {
        "phases": [
          "Exobiophase (Extracellular/Blood)",
          "Endobiophase (Cellular Membrane)"
        ],
        "options": [
          {
            "id": "opt-2",
            "label": "Much higher in blood because blood volume exceeds membrane volume.",
            "isCorrect": false,
            "misconceptionFeedback": "Volume does not dictate chemical potential; thermodynamic activity equalizes across phases."
          },
          {
            "id": "opt-3",
            "label": "Zero in membrane because lipids repel volatile compounds.",
            "isCorrect": false,
            "misconceptionFeedback": "Volatile anesthetics are lipophilic and readily partition into lipid bilayers."
          },
          {
            "id": "opt-1",
            "label": "Equal: thermodynamic activity a is identical in both phases at equilibrium.",
            "isCorrect": true
          }
        ],
        "revealedOutcome": "Chemical potential and thermodynamic activity a are identical across all phases in dynamic equilibrium.",
        "explanation": "Though molar concentrations differ across phases, chemical potential equalizes at equilibrium, so measuring blood activity directly reflects membrane biophase activity."
      },
      "hints": [
        "Recall the thermodynamic definition of phase equilibrium.",
        "At chemical equilibrium, partial molar free energy (chemical potential) equalizes across phases.",
        "Since chemical potential is uniform across phases at equilibrium, thermodynamic activity in the exobiophase equals that in the endobiophase."
      ],
      "feedback": {
        "correct": "Spot on! At thermodynamic equilibrium, chemical potential and activity are identical across both phases.",
        "incorrect": "At dynamic equilibrium, thermodynamic activity is equal across phases, even when molar concentrations differ."
      },
      "sources": [
        {
          "file": "Farmasötik ve Medisinal Kimya 1-Giriş.pdf",
          "page": 18
        }
      ],
      "verified": false
    },
    {
      "id": "step-5",
      "type": "concept_checkpoint",
      "title": "Classify Mystery Compounds",
      "prompt": "Four experimental compounds were tested for sedative action. Which compound exhibits characteristics of a structurally non-specific agent?",
      "predictThenReveal": false,
      "widgetType": "multiple_choice",
      "config": {
        "options": [
          {
            "id": "opt-b",
            "text": "Compound Y: Active at a = 0.00005; (R)-enantiomer is 500-fold more potent than (S)-enantiomer.",
            "isCorrect": false,
            "distractorRationale": "Extreme stereoselectivity and nanomolar potency indicate a structurally specific receptor agonist."
          },
          {
            "id": "opt-a",
            "text": "Compound X: Active at a = 0.15; activity persists despite replacing alkyl branches with rings.",
            "isCorrect": true,
            "distractorRationale": "Correct! High thermodynamic activity (a = 0.15) and broad structural tolerance identify non-specific action."
          },
          {
            "id": "opt-c",
            "text": "Compound Z: Acts at nanomolar concentration; blocked competitively by a selective antagonist.",
            "isCorrect": false,
            "distractorRationale": "Competitive antagonism at nanomolar concentrations signifies specific receptor binding."
          },
          {
            "id": "opt-d",
            "text": "Compound W: Tiny chemical modification abolishes all sedative activity completely.",
            "isCorrect": false,
            "distractorRationale": "High sensitivity to subtle structural changes is the defining hallmark of structurally specific drugs."
          }
        ],
        "explanation": "Compound X requires high thermodynamic activity (a = 0.15) and tolerates structural alterations without losing sedative action, classic hallmarks of non-specific agents."
      },
      "hints": [
        "Look for high thermodynamic activity and tolerance to structural alteration.",
        "Structurally specific drugs exhibit stereoselectivity and nanomolar potency (a < 0.001); non-specific drugs act via bulk physical presence.",
        "Compound X acts at a = 0.15 and retains effect across diverse scaffolds, identifying it as structurally non-specific."
      ],
      "feedback": {
        "correct": "Brilliant! Compound X operates at high thermodynamic saturation (a = 0.15) and tolerates scaffold changes, typical of non-specific drugs.",
        "incorrect": "Look for the compound acting at high thermodynamic activity whose effect is insensitive to structural changes."
      },
      "sources": [
        {
          "file": "Farmasötik ve Medisinal Kimya 1-Giriş.pdf",
          "page": 19
        }
      ],
      "verified": false
    },
    {
      "id": "step-6",
      "type": "predict_reveal",
      "title": "Core Structural Sensitivity",
      "prompt": "In structurally specific drugs like adrenergic agonists, what typically happens when you invert a stereocenter or replace a key hydrogen-bonding group?",
      "predictThenReveal": true,
      "widgetType": "predict_reveal",
      "config": {
        "options": [
          {
            "id": "opt-1",
            "label": "Biological activity is drastically reduced or completely abolished.",
            "isCorrect": true
          },
          {
            "id": "opt-2",
            "label": "Activity increases invariably because all changes enhance membrane fluidity.",
            "isCorrect": false,
            "misconceptionFeedback": "Membrane fluidity changes occur with non-specific drugs, not receptor-targeted stereospecific ligands."
          },
          {
            "id": "opt-3",
            "label": "No effect whatsoever, because receptors adapt flexibly to any substituent.",
            "isCorrect": false,
            "misconceptionFeedback": "Receptor binding sites have rigid 3D geometries that require precise molecular complementarity."
          }
        ],
        "revealedOutcome": "Activity drops sharply or converts into antagonism when key binding groups are altered.",
        "explanation": "Structurally specific drugs depend on 3D spatial complementarity with receptor amino acids. Minor changes destroy binding affinity."
      },
      "hints": [
        "Consider how lock-and-key receptor binding responds to geometric distortions.",
        "Receptor binding requires complementary hydrogen bonds, ionic pairs, and hydrophobic fits.",
        "Altering a chiral center or essential pharmacophore group eliminates binding interactions, reducing affinity by orders of magnitude."
      ],
      "feedback": {
        "correct": "Exactly! In structurally specific drugs, even subtle modifications like enantiomeric inversion can abolish biological activity.",
        "incorrect": "Receptors demand precise 3D spatial fit; modifying pharmacophore elements severely impairs binding affinity."
      },
      "sources": [
        {
          "file": "Farmasötik ve Medisinal Kimya 1-Giriş.pdf",
          "page": 20
        }
      ],
      "verified": false
    },
    {
      "id": "step-7",
      "type": "predict_reveal",
      "title": "Chemical Diversity in Anesthesia",
      "prompt": "Nitrous oxide (N2O), diethyl ether, and chloroform produce similar general anesthesia despite having completely different structures. Why?",
      "predictThenReveal": true,
      "widgetType": "predict_reveal",
      "config": {
        "compounds": [
          "N2O (Nitrous Oxide)",
          "CH3-CH2-O-CH2-CH3 (Diethyl Ether)",
          "CHCl3 (Chloroform)"
        ],
        "options": [
          {
            "id": "opt-2",
            "label": "All three bind the identical single stereoselective allosteric receptor pocket.",
            "isCorrect": false,
            "misconceptionFeedback": "These structurally disparate molecules do not fit into one identical stereospecific receptor pocket."
          },
          {
            "id": "opt-3",
            "label": "They all metabolize in vivo into the identical active chemical intermediate.",
            "isCorrect": false,
            "misconceptionFeedback": "Inhalation anesthetics are mostly excreted unchanged and do not form a shared active metabolite."
          },
          {
            "id": "opt-1",
            "label": "They act non-specifically by physically accumulating into lipid membranes at comparable thermodynamic activities.",
            "isCorrect": true
          }
        ],
        "revealedOutcome": "Non-specific depressants produce equal biological effects at equal thermodynamic activities, independent of structure.",
        "explanation": "When thermodynamic activity a reaches a threshold saturation, membrane lipids undergo physical volume expansion, impairing neuronal ion conduction regardless of chemical structure."
      },
      "hints": [
        "Think about Ferguson's core deduction: biological effect tracks thermodynamic saturation, not chemical structure.",
        "Molecules with disparate chemical structures produce similar CNS depression when they attain similar thermodynamic activity.",
        "Non-specific anesthetics partition into hydrophobic membrane bilayers, inducing physical disorder once thermodynamic threshold is crossed."
      ],
      "feedback": {
        "correct": "Spot on! Ferguson showed that chemically diverse depressants act similarly because they achieve comparable thermodynamic saturation.",
        "incorrect": "These diverse agents do not bind a single lock-and-key receptor; their shared action arises from physical membrane saturation."
      },
      "sources": [
        {
          "file": "Farmasötik ve Medisinal Kimya 1-Giriş.pdf",
          "page": 23
        }
      ],
      "verified": false
    },
    {
      "id": "step-8",
      "type": "predict_reveal",
      "title": "Differentiating Affinity from Saturation",
      "prompt": "Drug A acts at a = 0.00001 (10 µg dose). Drug B acts at a = 0.20 (500 mg dose). How do their mechanisms classify?",
      "predictThenReveal": true,
      "widgetType": "predict_reveal",
      "config": {
        "comparison": {
          "drugA": {
            "a": 0.00001,
            "dose": "10 µg"
          },
          "drugB": {
            "a": 0.2,
            "dose": "500 mg"
          }
        },
        "options": [
          {
            "id": "opt-2",
            "label": "Drug B is more potent because its thermodynamic activity is much higher.",
            "isCorrect": false,
            "misconceptionFeedback": "Higher thermodynamic activity requirement means lower potency/affinity, not higher."
          },
          {
            "id": "opt-1",
            "label": "Drug A is structurally specific (high-affinity receptor ligand); Drug B is structurally non-specific (bulk physical depressant).",
            "isCorrect": true
          },
          {
            "id": "opt-3",
            "label": "Both drugs act on identical receptors through different allosteric states.",
            "isCorrect": false,
            "misconceptionFeedback": "A four orders of magnitude difference in thermodynamic activity reflects fundamentally different mechanism classes."
          }
        ],
        "revealedOutcome": "Drug A is structurally specific (low thermodynamic activity); Drug B is structurally non-specific (high relative saturation).",
        "explanation": "A low thermodynamic activity requirement reflects high-affinity stereospecific binding. A high thermodynamic activity requirement indicates physical membrane accumulation."
      },
      "hints": [
        "Compare the thermodynamic activities to the Ferguson cutoff (low thermodynamic activity vs high relative saturation).",
        "Structurally specific drugs act at very low thermodynamic activity because receptor affinity concentrates their biological effect.",
        "Drug A acts at a = 10^-5 (specific receptor target); Drug B requires a = 0.20 (20% saturation, non-specific action)."
      ],
      "feedback": {
        "correct": "Correct! Low thermodynamic activity (a = 10^-5) denotes specific receptor affinity; high activity (a = 0.20) denotes non-specific physical action.",
        "incorrect": "Review the Ferguson cutoffs: low thermodynamic activity identifies structurally specific drugs, whereas high relative saturation indicates non-specific physical depressants."
      },
      "sources": [
        {
          "file": "Farmasötik ve Medisinal Kimya 1-Giriş.pdf",
          "page": 20
        }
      ],
      "verified": false
    },
    {
      "id": "step-9",
      "type": "worked_example_fading",
      "title": "Calculate Thermodynamic Activity",
      "prompt": "A volatile hypnotic has saturated vapor pressure P0 = 200 mmHg. Inhalation anesthesia occurs at partial pressure Pt = 10 mmHg. Calculate thermodynamic activity a = Pt / P0.",
      "predictThenReveal": true,
      "widgetType": "faded_calculation",
      "config": {
        "given": {
          "P0": "200 mmHg",
          "Pt": "10 mmHg",
          "formula": "a = Pt / P0"
        },
        "options": [
          {
            "id": "opt-2",
            "label": "a = 20.0 (Inverting the numerator and denominator)",
            "isCorrect": false,
            "misconceptionFeedback": "Thermodynamic activity is Pt / P0, not P0 / Pt."
          },
          {
            "id": "opt-3",
            "label": "a = 0.0005 (Dividing by extra power of ten)",
            "isCorrect": false,
            "misconceptionFeedback": "10 / 200 = 1 / 20 = 0.05, not 0.0005."
          },
          {
            "id": "opt-1",
            "label": "a = 0.05 (5% relative saturation)",
            "isCorrect": true
          }
        ],
        "revealedOutcome": "a = 10 / 200 = 0.05. The agent achieves anesthesia at 5% of its saturation limit.",
        "explanation": "Using a = Pt / P0: 10 / 200 = 0.05. The calculated value represents 5% relative saturation."
      },
      "hints": [
        "Divide partial vapor pressure Pt by saturated vapor pressure P0.",
        "Calculate: a = 10 mmHg / 200 mmHg = 1 / 20.",
        "1 / 20 = 0.05, representing 5% relative saturation."
      ],
      "feedback": {
        "correct": "Outstanding! 10 / 200 gives a = 0.05 (5% relative saturation).",
        "incorrect": "Calculate 10 divided by 200. The result is 0.05 (5% relative saturation)."
      },
      "sources": [
        {
          "file": "Farmasötik ve Medisinal Kimya 1-Giriş.pdf",
          "page": 18
        }
      ],
      "verified": false
    },
    {
      "id": "step-10",
      "type": "recap",
      "title": "Synthesis & Spaced Review",
      "prompt": "You have mastered Ferguson's Principle! Structurally specific drugs act at low thermodynamic activity via receptors; non-specific drugs require high relative saturation through membrane saturation. 3 review cards added to Box 1.",
      "predictThenReveal": false,
      "widgetType": "recap_summary",
      "config": {
        "keyTakeaways": [
          "Structurally Specific Drugs: Act at low thermodynamic activity (a < 0.001) via stereoselective 3D receptor fit.",
          "Structurally Non-Specific Drugs: Act at high relative saturation through bulk physical membrane alteration.",
          "Equal Thermodynamic Activity = Equal Biological Effect across structurally diverse non-specific agents."
        ],
        "reviewCardsEnqueued": [
          "Ferguson Saturation Threshold",
          "Chemical Structure Alteration",
          "Clinical Classification"
        ],
        "xpAwarded": 50
      },
      "hints": [
        "Review the contrast: receptor complementarity at low activity vs physical saturation.",
        "Remember that non-specific action is independent of chemical structure and sensitive to thermodynamic activity.",
        "Your review cards will reappear tomorrow to reinforce long-term memory via Leitner spacing."
      ],
      "feedback": {
        "correct": "Congratulations on completing Lesson 1! 50 XP awarded and 3 cards added to your spaced review queue.",
        "incorrect": "Review the summary cards to consolidate your understanding of Ferguson's principle."
      },
      "sources": [
        {
          "file": "Farmasötik ve Medisinal Kimya 1-Giriş.pdf",
          "page": 19
        }
      ],
      "verified": false
    }
  ]
} as unknown as LessonData;
