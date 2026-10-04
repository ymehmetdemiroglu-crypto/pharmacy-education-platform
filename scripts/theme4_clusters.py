# Theme 4: Friction Reduction, Student Fatigue & Bilingual Usability
# Focus: Bilingual Turkish/English crosswalk & tooltips, pure dark mode, thumb-zone controls, micro-session pacing, non-punitive streak freeze banks, audio pronunciations, cognitive offloading scratchpads, exam day anxiety thermometers, zero-shame error reframing, commute mode.

THEME_4_CLUSTERS = [
    {
        "name": "Bilingual Medical Terminology Tooltip Swapper & Turkish-English Crosswalk",
        "raw_ids": ["ADV-001", "ADV-054", "TEC-020", "ECO-037", "COG-099", "TEA-019"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Clicking or hovering any technical pharmacological or chemical term instantly toggles an inline micro-card displaying its Turkish counterpart (e.g., 'Farmasötik Kimya', 'biyoyararlanım', 'yarılanma ömrü'), phonetics, and standard US/EU international nomenclature.",
        "expected_effect": "Eliminates language friction and foreign-language cognitive hesitation for bilingual Turkish pharmacy undergraduates preparing for domestic EUS or global licensing exams."
    },
    {
        "name": "High-Contrast Pure-Dark Mode & Neo-Brutalist Visual Ergonomics",
        "raw_ids": ["ADV-006", "ADV-045", "TEC-063", "ECO-077"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "A pure-dark theme (#121212 canvas, #000000 high-contrast 3px borders, vibrant neo-brutalist semantic accents) with zero layout-shift toggling and zero blue-light strain, designed specifically for late-night dormitory study sessions.",
        "expected_effect": "Reduces ocular fatigue and photopic visual strain during nocturnal cramming sessions, sustaining student focus without eye exhaustion."
    },
    {
        "name": "Thumb-Zone Mobile Ergonomic Navigation & Subway Single-Handed Mode",
        "raw_ids": ["ADV-017", "ADV-032", "ECO-069"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Positions all primary interaction targets (next step buttons, slider knobs, option cards, hint triggers) in the bottom 40% of the viewport (the physiological thumb-sweep zone), enabling effortless one-handed navigation on crowded public transit.",
        "expected_effect": "Enables frictionless mobile study sessions during Istanbul metro or bus commutes without thumb stretching or dropped devices."
    },
    {
        "name": "Guilt-Free Streak Freeze Bank & Non-Punitive Spaced Review Grace Periods",
        "raw_ids": ["ADV-009", "ADV-042", "ECO-044"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Provides students with 2 automatic streak freezes per month and non-punitive grace windows for missed review days, preventing psychological demoralization and the 'what-the-hell' effect when exam crunch weeks disrupt daily habits.",
        "expected_effect": "Preserves intrinsic motivation and long-term app engagement without punitive streak-breaking anxiety."
    },
    {
        "name": "Bite-Sized Micro-Session Pacing Badges (15-Minute Study Windows)",
        "raw_ids": ["ADV-003", "ADV-033", "ADV-059"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Every module is explicitly partitioned into 5-minute to 15-minute micro-sessions with visual milestone badges, allowing students to complete self-contained learning loops between hospital rounds or lecture classes.",
        "expected_effect": "Lowers activation energy for initiating study sessions and eliminates procrastination caused by daunting multi-hour commitments."
    },
    {
        "name": "Soundless Tactile Haptic Feedback Mode for Silent Study Halls",
        "raw_ids": ["ADV-020", "ADV-036", "TEC-029"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Provides precise Web Vibration API tactile micro-pulses for step affirmation, button snaps, and error alerts with an instant mute toggle, guaranteeing 100% functionality in whisper-quiet university library reading rooms.",
        "expected_effect": "Delivers rich physical sensory confirmation without audible disturbances in strict academic library environments."
    },
    {
        "name": "Native In-Browser Audio Pronunciation Synthesizer for Drug Nomenclature",
        "raw_ids": ["ADV-022", "ADV-037", "TEC-024", "ECO-049"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Uses client-side Web SpeechSynthesis API and lightweight audio phoneme files to pronounce complex Latin IUPAC chemical names and international nonproprietary names (INN) in both English and Turkish.",
        "expected_effect": "Eliminates pronunciation embarrassment during bedside clinical rounds and reinforces auditory memory encoding."
    },
    {
        "name": "One-Click Emergency Formula Sheet Modal & Cognitive Scratchpad Canvas",
        "raw_ids": ["ADV-035", "ADV-040", "ADV-023"],
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "A persistent floating keyboard shortcut / HUD button that opens a non-modal quick-reference drawer containing standard PK/PD equations and an interactive scratchpad for jotting down calculation steps.",
        "expected_effect": "Offloads working memory burden during complex multi-step pharmacokinetics calculations, preventing calculation errors."
    },
    {
        "name": "Anonymous Peer Error Normalization Stats & Solidarity Badges",
        "raw_ids": ["ADV-038", "ADV-083", "ADV-086"],
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Displays subtle, reassuring aggregate stats when a student misses a challenging question (e.g., '68% of pharmacy students also chose this option initially before learning the reflex mechanism'), normalizing failure.",
        "expected_effect": "Dismantles student impostor syndrome and reframes errors as universal developmental milestones rather than personal intellectual inadequacy."
    },
    {
        "name": "Colorblind-Safe Chemical Highlighting & Screen-Reader Accessible Molecules",
        "raw_ids": ["ADV-014", "ADV-074", "ADV-008"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Renders functional groups with distinct geometric dash-patterns and double-redundant shape tags alongside color coding, paired with semantic screen-reader descriptions for all SMILES structures.",
        "expected_effect": "Ensures full WCAG 2.1 AAA accessibility for colorblind and visually impaired pharmacy students."
    },
    {
        "name": "Explain Like I'm Exhausted (ELIE) Emergency Cognitive Mode",
        "raw_ids": ["ADV-081", "ADV-098", "ADV-085"],
        "tier": "wild",
        "evidence_tag": "plausible",
        "mechanism": "A toggle for exhausted students studying past midnight that strips away formal IUPAC nomenclature and dense prose, rendering every concept in bare-bones conversational analogies and simplified visual flowcharts.",
        "expected_effect": "Enables sleep-deprived students to grasp core clinical relationships when their prefrontal cognitive bandwidth is depleted."
    },
    {
        "name": "Personalized Exam-Day Simulation Anxiety Thermometer & Decompression Flow",
        "raw_ids": ["ADV-041", "ADV-094", "ADV-096"],
        "tier": "adjacent",
        "evidence_tag": "plausible",
        "mechanism": "Monitors hesitation velocities and self-reported anxiety levels, offering adaptive pacing, biofeedback breathing intervals, and post-session cognitive closure to prevent panic ahead of licensure exams.",
        "expected_effect": "Builds psychological resilience, downregulates sympathetic autonomic overdrive, and improves testing performance under pressure."
    },
    {
        "name": "Crowd-Sourced Mnemonics Upvoting & Cultural Localization",
        "raw_ids": ["ADV-099", "ECO-090"],
        "tier": "wild",
        "evidence_tag": "plausible",
        "mechanism": "A community-contributed and peer-upvoted repository of catchy Turkish and international mnemonics (e.g. for remembering anticholinergic toxicity or CYP inducers), filtered for scientific accuracy.",
        "expected_effect": "Harnesses peer ingenuity and cultural idioms to make arbitrary drug lists stick permanently."
    },
    {
        "name": "Non-Destructive Lesson Pausing & Ephemeral Session Recovery",
        "raw_ids": ["ADV-004", "ADV-021", "ADV-012"],
        "tier": "proven",
        "evidence_tag": "evidence-backed",
        "mechanism": "Automatically serializes slider positions, scratchpad drawings, and partial input states to local storage every 500ms, restoring the exact state when a student receives a phone call or closes their browser.",
        "expected_effect": "Guarantees zero progress loss when students are interrupted during busy clinical hospital duties."
    },
    {
        "name": "Drug Stem & Suffix Decomposition Widget",
        "raw_ids": ["ADV-050", "ADV-079"],
        "tier": "adjacent",
        "evidence_tag": "evidence-backed",
        "mechanism": "Deconstructs generic drug names into official USAN/INN stems (-olol, -dipine, -stigmine, -zosin), highlighting common pharmacodynamic properties shared across the entire pharmacological class.",
        "expected_effect": "Enables students to deduce the mechanism and adverse effects of unencountered novel drugs on exam questions from word stems alone."
    },
    {
        "name": "Rage-Click Empathy Detector & Instant Pedagogical Intervention",
        "raw_ids": ["ADV-084", "ADV-091"],
        "tier": "wild",
        "evidence_tag": "plausible",
        "mechanism": "Detects rapid erratic tapping (>3 clicks in 1 second on unresponsive elements or sliders) and gently pops up an empathetic modal offering a zero-penalty hint ladder step or an instant plain-language reset.",
        "expected_effect": "Intercepts student frustration loops before they escalate into app abandonment."
    },
    {
        "name": "Audio-Only Eyes-Free Commute Podcast Mode",
        "raw_ids": ["ADV-089", "ECO-090"],
        "tier": "wild",
        "evidence_tag": "plausible",
        "mechanism": "Converts completed interactive lesson summaries into an audio narrative stream that students can listen to while walking or driving, prompting mental visualization of curves and mechanisms.",
        "expected_effect": "Unlocks additional productive study time during non-screen daily activities without eye strain."
    }
]

print(f"Theme 4 loaded: {len(THEME_4_CLUSTERS)} clusters.")
total_ids = sum(len(c['raw_ids']) for c in THEME_4_CLUSTERS)
print(f"Total raw IDs in Theme 4: {total_ids}")
