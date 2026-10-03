# Pharmacology (Course B) — Source Inventory & Curriculum Ledger

## 1. Executive Summary & Dual Ingestion Architecture

- **Direct Ingested Source Decks**: 2 decks (77 slides)
- **Anchor Deck**: `İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf` (33 slides, unique deep-dive into molecular receptor forces, chelation, and multi-point binding)
- **Shared Biotransformation Anchor**: `İlaç metabolizması-2026.pdf` (44 slides, Phase I & II enzymatic pathways)
- **Extensible Pipeline Capability**: Ingestion pipeline (`scripts/ingest_materials.py`) is modular and continuously monitors `materials/pharmacology` for additional incoming lecture decks.
- **Curriculum Reference Standard**: Synthesized against standard medical pharmacology compendia: **Katzung's Basic & Clinical Pharmacology** (15th/16th Ed., Bertram Katzung & Todd Vanderah) and **Goodman & Gilman's The Pharmacological Basis of Therapeutics** (14th Ed., Brunton & Knollmann).
- **IP Classification**: Strictly private reference. 100% originally authored platform content with `/factcheck` verification on every lesson.

---

## 2. Ingested Deck Extraction Ledger

| Deck Filename | Slide Count | Confidence Score | Image-Only Slides | Primary Extracted Scientific Topics |
| :--- | :--- | :--- | :--- | :--- |
| `İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf` | 33 | 90.8% | p.8, p.18 | Receptor definitions, mass action equilibrium, covalent bonding (alkylation, beta-lactam acylation, organophosphate phosphorylation), electrostatic/ionic interactions, hydrogen bonding, charge-transfer pi-pi stacking, van der Waals dispersion, hydrophobic entropic driving force, metal chelation (EDTA, BAL, penicillamine), dibucaine multi-point binding model. |
| `İlaç metabolizması-2026.pdf` | 44 | 93.6% | None (100% text extracted) | Biotransformation principles, Phase I CYP450 oxidation, nitro/azo reduction, ester/amide hydrolysis; Phase II glucuronidation, sulfation, acetylation polymorphisms, glutathione detoxification, drug-drug interactions, induction/inhibition. |

---

## 3. Reference Standard Curriculum Synthesis (Katzung / Goodman & Gilman Alignment)

To deliver a comprehensive 6-module pharmacology learning experience that anchors on the ingested 33-page receptor deck and 44-page metabolism deck, the broader curriculum is structured across the gold-standard divisions of pharmacology:

| Module ID | Module Title | Anchor / Reference Source | Key Core Topics |
| :--- | :--- | :--- | :--- |
| `pharm-mod-1` | **Receptor Dynamics & Chemical Forces** | `İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf` (33 slides) + Katzung Ch. 1-2 | Receptor types, binding forces (covalent to hydrophobic), affinity vs intrinsic activity, mass action, agonists, partial agonists, competitive/noncompetitive antagonism, chelation. |
| `pharm-mod-2` | **Pharmacokinetics & Drug Biotransformation** | `İlaç metabolizması-2026.pdf` (44 slides) + Goodman & Gilman Ch. 2-6 | ADME, clearance, volume of distribution, half-life, bioavailability, CYP450 Phase I functionalization, Phase II conjugation, enzyme induction/inhibition, crystalluria risk. |
| `pharm-mod-3` | **Autonomic Nervous System Pharmacology** | Katzung Ch. 6-10 / Goodman & Gilman Ch. 8-12 | Cholinergic transmission (nicotinic, muscarinic), anticholinesterases, adrenergic transmission (alpha-1, alpha-2, beta-1, beta-2, beta-3), sympathomimetics, sympatholytics. |
| `pharm-mod-4` | **Cardiovascular & Renal Pharmacology** | Katzung Ch. 11-15 / Goodman & Gilman Ch. 25-29 | Antihypertensives (RAAS inhibitors, CCBs), antiarrhythmics (Vaughan Williams classes I-IV), heart failure drugs, diuretics (loop, thiazide, K-sparing). |
| `pharm-mod-5` | **Central Nervous System Pharmacology** | Katzung Ch. 21-30 / Goodman & Gilman Ch. 14-24 | Neurotransmitter systems (GABA, glutamate, dopamine, serotonin), sedatives/hypnotics, anxiolytics, antidepressants (SSRIs, SNRIs, TCAs), antipsychotics, opioid analgesics. |
| `pharm-mod-6` | **Chemotherapy & Antimicrobial Pharmacology** | Katzung Ch. 43-55 / Goodman & Gilman Ch. 52-60 | Cell wall synthesis inhibitors (penicillins, cephalosporins), protein synthesis inhibitors (macrolides, aminoglycosides, tetracyclines), antifolates (sulfonamides), antineoplastics. |

---

## 4. Detailed Slide-by-Slide Extraction Analysis (Ingested Decks)

### Deck: `İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf` (33 slides, Avg Confidence: 90.8%)

| Slide # | Extracted Title / Headline | Chars | Confidence | Quality Status | Key Scientific Concepts / Entities |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Slide  1 | Slide 1: İLAÇ / RESEPTÖR / ETKİLEŞİMİNDE | 72 | 0.85 | `BULLET_SUMMARY` | KİMYASAL, BAĞLAR, Prof, Bedia |
| Slide  2 | Slide 2: LAÇ / RESEPTÖR / ETK | 594 | 0.95 | `FULL_TEXT` | LEŞ, NDE, MYASAL, LAR |
| Slide  3 | Slide 3: Reseptör / Hormonlar / nöromediyatörler | 373 | 0.95 | `FULL_TEXT` | etkin, endojen, maddelere, ilaçlara |
| Slide  4 | Slide 4: laç / Reseptör / Kompleksi | 165 | 0.95 | `FULL_TEXT` | Etki, İlaç, Hedef, Bölgeleri |
| Slide  5 | Slide 5: Reseptörlerin / büyük / kısmı | 420 | 0.95 | `FULL_TEXT` | sitoplazmik, membranın, yüzeyinde, yapılarının |
| Slide  6 | Slide 6: Reseptörlerin / iki / önemli | 284 | 0.95 | `FULL_TEXT` | fonksiyonu, vardır, Belli, endojen |
| Slide  7 | Slide 7: İlaç / reseptör / etkileşiminde | 220 | 0.95 | `FULL_TEXT` | rol, oynayan, kimyasal, bağ |
| Slide  8 | Slide 8: Structural Model | 0 | 0.35 | `IMAGE_ONLY_RECREATION_REQUIRED` | [Chemical Diagram / Active Site Visual] |
| Slide  9 | Slide 9: KOVALAN / LAR / Elektron | 872 | 0.95 | `FULL_TEXT` | çiftlerinin, atomlar, arasında, ortaklanması |
| Slide 10 | Slide 10: Alkilasyon / CH2 / reseptör | 553 | 0.95 | `FULL_TEXT` | protein, nükleik, asitX, COO |
| Slide 11 | Slide 11: Açilasyon / laktam / halkası | 444 | 0.95 | `FULL_TEXT` | taşıyan, penisilin, sefalosporin, antibiyotikler |
| Slide 12 | Slide 12: Organofosfat / bileşikleri / aktif | 400 | 0.95 | `FULL_TEXT` | bölgelerinde, serin, taşıyan, büyük |
| Slide 13 | Slide 13: apılarındaağır / metal / taşıyan | 436 | 0.95 | `FULL_TEXT` | antiparaziter, ilaçlar, etkilerini, enzimin |
| Slide 14 | Slide 14: NH-Reseptör / Zayıf / asit | 263 | 0.95 | `FULL_TEXT` | baz, özellikteki, ilaç, molekülleri |
| Slide 15 | Slide 15: Hidrojen / ları / bağı | 622 | 0.95 | `FULL_TEXT` | hidrojen, atomunun, biri, donör |
| Slide 16 | Slide 16: Hidrojen / atomu / küçük | 312 | 0.95 | `FULL_TEXT` | olması, elektron, bulutundan, yoksun |
| Slide 17 | Slide 17: akseptör / SHR / donör | 309 | 0.95 | `FULL_TEXT` | Hidrojen, bağları, aynı, molekülün |
| Slide 18 | Slide 18: Structural Model | 0 | 0.35 | `IMAGE_ONLY_RECREATION_REQUIRED` | [Chemical Diagram / Active Site Visual] |
| Slide 19 | Slide 19: Hidrojen / bağı / molekülün | 518 | 0.95 | `FULL_TEXT` | fiziksel, kimyasal, özelliklerini, genellikle |
| Slide 20 | Slide 20: yon / dipol / etkileşmeler | 421 | 0.95 | `FULL_TEXT` | Karbonla, oksijen, azot, heteroatomlar |
| Slide 21 | Slide 21: kutuplar / zıt / işaretli | 496 | 0.95 | `FULL_TEXT` | iyonlar, iyon-dipol, diğer, dipol |
| Slide 22 | Slide 22: Yük / Transfer / Etkileşmeleri | 861 | 0.95 | `FULL_TEXT` | çeşit, moleküler, dipol-dipol, etkileşmesidir |
| Slide 23 | Slide 23: donör / OHOCH3 / akseptör | 116 | 0.85 | `BULLET_SUMMARY` | NO2, Reseptör, Fungusit, etkili |
| Slide 24 | Slide 24: Van / der / Waals | 793 | 0.95 | `FULL_TEXT` | Güçleri, Moleküllerin, polarizlenebilme, özelliklerinin |
| Slide 25 | Slide 25: Hidrofobik / Etkileşmeler / İlaç | 1087 | 0.95 | `FULL_TEXT` | molekülünün, belli, konumunda, nonpolar |
| Slide 26 | Slide 26: Şelasyon / Şelat / oluşumu | 556 | 0.95 | `FULL_TEXT` | ilacın, vivo, aktivitesinde, önemli |
| Slide 27 | Slide 27: Metalik / katyon / koordinasyon | 193 | 0.95 | `FULL_TEXT` | sayıları |
| Slide 28 | Slide 28: Metal / birleşen / elektron | 329 | 0.95 | `FULL_TEXT` | donörü, maddeye, ligand, bağ |
| Slide 29 | Slide 29: Nötral / Ligantlar / Anyonik | 296 | 0.95 | `FULL_TEXT` | R-NH2, primer, amin, R2C |
| Slide 30 | Slide 30: Eğer / ligand / iki | 387 | 0.95 | `FULL_TEXT` | fazla, elektron, donörü, grup |
| Slide 31 | Slide 31: şelatların / kararlılıkları / maddenin | 754 | 0.95 | `FULL_TEXT` | fonksiyonu, açısından, önemlidir, Örn |
| Slide 32 | Slide 32: Örnek / EDTA / BAL | 187 | 0.95 | `FULL_TEXT` | verilebilir, hiperkalsemide, kanın, pıhtılaşmasını |
| Slide 33 | Slide 33: Örnek / Dibukain / molekülünün | 259 | 0.95 | `FULL_TEXT` | olası, reseptörle, yapabileceği, bağlar |

### Deck: `İlaç metabolizması-2026.pdf` (44 slides, Avg Confidence: 93.6%)

| Slide # | Extracted Title / Headline | Chars | Confidence | Quality Status | Key Scientific Concepts / Entities |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Slide  1 | Slide 1: ORGANİK / BİLEŞİKLERDE / METABOLİK | 991 | 0.95 | `FULL_TEXT` | REAKSİYONLAR, Organizmamız, ilaçlar, dahil |
| Slide  2 | Slide 2: Örneğin / sülfadiazinin / asetil | 686 | 0.95 | `FULL_TEXT` | metaboliti, suda, çözünmediği, böbrek |
| Slide  3 | Slide 3: İlaç / Metabolizması / Araştırmaları | 739 | 0.95 | `FULL_TEXT` | Neler, Saptanabilir, Organizmanın, kimyasala |
| Slide  4 | Slide 4: Faz / reaksiyonları / molekülde | 476 | 0.95 | `FULL_TEXT` | reaksiyonuna, girebilecek, NH2, tiyol |
| Slide  5 | Slide 5: Metabonat / bileşikler / organizmada | 440 | 0.95 | `FULL_TEXT` | non-enzimatik, kimyasal, değişikliğe, uğrayabilirler |
| Slide  6 | Slide 6: İlaç / Metabolizmasının / Etkileri | 359 | 0.95 | `FULL_TEXT` | Istenen, durum, Istenmeyen, Toksik |
| Slide  7 | Slide 7: ilaç / nedenlerden / dolayı | 175 | 0.95 | `FULL_TEXT` | metabolize, olmayabilir, Gerekli, enzim |
| Slide  8 | Slide 8: Metabolizma / Teknikleri / vitro | 361 | 0.95 | `FULL_TEXT` | teknikler, Deney, hayvanının, ilgili |
| Slide  9 | Slide 9: Metabolitlerin / Ortak / Özellikleri | 419 | 0.95 | `FULL_TEXT` | Çoğu, stabil, değildir, Isı |
| Slide 10 | Slide 10: İlaç / Metabolizması / Araştırmalarındaki | 320 | 0.95 | `FULL_TEXT` | Yöntemler, vivo, vitro, Substrat |
| Slide 11 | Slide 11: Substrat / muhtemel / metabolit | 402 | 0.95 | `FULL_TEXT` | tespiti, sentezi, yapi, aydinlatmasi |
| Slide 12 | Slide 12: Metabolitlerin / Biyolojik / Ortamdan | 587 | 0.95 | `FULL_TEXT` | Ekstraksiyonu, Burada, amaç, sulu |
| Slide 13 | Slide 13: Sıvı / sıvı / ekstraksiyonunda | 1023 | 0.95 | `FULL_TEXT` | maddenin, organik, faza, alınmasında |
| Slide 14 | Slide 14: FAZ / REAKSİYONLARI / Oksidasyon | 244 | 0.95 | `FULL_TEXT` | Redüksiyon, Hidroliz, Karbon, oksidasyonu |
| Slide 15 | Slide 15: CH3CH2CH3 / CH3CH2CH2OH / CH3 | 242 | 0.95 | `FULL_TEXT` | 1-Propanol, 2-Propanol, oksidasyonu, primer |
| Slide 16 | Slide 16: iii / aromatik / karbon | 143 | 0.85 | `BULLET_SUMMARY` | oksidasyonu, epoksit, ara, ürün |
| Slide 17 | Slide 17: alisiklik / karbon / oksidasyonu | 76 | 0.85 | `BULLET_SUMMARY` | tetralin, tetralin-1-ol, tetralin-2-ol |
| Slide 18 | Slide 18: alkol / aldehid / oksidasyonu | 143 | 0.85 | `BULLET_SUMMARY` | CH3CH2OH, CH3CHO, CH3COOH, dehidrogenaz |
| Slide 19 | Slide 19: heterosiklik / karbon / oksidasyonu | 165 | 0.95 | `FULL_TEXT` | CH2, N-benzil, prolidin, karbinolamin |
| Slide 20 | Slide 20: vii / oksidatif / N-dealkilasyon | 332 | 0.95 | `FULL_TEXT` | Eter, tiyoeter, aminlerde, sekonder |
| Slide 21 | Slide 21: viii / oksidatif / deaminasyon | 197 | 0.95 | `FULL_TEXT` | NH3, CH2, NH2, CH3 |
| Slide 22 | Slide 22: kükürt / oksidasyonu / İlgili | 317 | 0.95 | `FULL_TEXT` | enzimler, karmafonksiyonlu, oksidazlardır, tiyol |
| Slide 23 | Slide 23: azot / oksidasyonu / amin | 187 | 0.95 | `FULL_TEXT` | primer, hidroksilamin, sekonder, tersiyer |
| Slide 24 | Slide 24: azo / grubu / oksidasyonu | 152 | 0.95 | `FULL_TEXT` | azoksi, Ilgili, enzim, karma |
| Slide 25 | Slide 25: Redüksiyon / Nitro / grubu | 233 | 0.95 | `FULL_TEXT` | redüksiyonu, İlgili, enzim, nitro |
| Slide 26 | Slide 26: Karbonil / grubu / redüksiyonu | 193 | 0.95 | `FULL_TEXT` | İlgili, enzim, aldehid, redüktaz |
| Slide 27 | Slide 27: Redüktif / dehalojenizasyon / CCl4 | 86 | 0.85 | `BULLET_SUMMARY` | CHCl3, S-S, bağının, kopması |
| Slide 28 | Slide 28: Hidroliz / Ester / hidrolizi | 166 | 0.95 | `FULL_TEXT` | R-COOR1, H2O, R-COOH, R1OH |
| Slide 29 | Slide 29: Epoksid / hidrolizi / İlgili | 184 | 0.95 | `FULL_TEXT` | enzim, epoksid, hidrolazdır, CH2 |
| Slide 30 | Slide 30: Hidrazon / hidrolizi / R-CH | 115 | 0.85 | `BULLET_SUMMARY` | N-NH2, H2O, R-CHO, H2N-NH2 |
| Slide 31 | Slide 31: FAZ / REAKSİYONLARI / Asetilasyon | 199 | 0.95 | `FULL_TEXT` | NH2, grupları, asetilasyona, uğrar |
| Slide 32 | Slide 32: Metilasyon / NH2 / grupları | 333 | 0.95 | `FULL_TEXT` | metilasyona, uğrar, Endojen, madde |
| Slide 33 | Slide 33: Glukuronik / asidle / konjugasyon | 306 | 0.95 | `FULL_TEXT` | grupları, eter, glukuronidlerini, COOH |
| Slide 34 | Slide 34: Aminoasit / konjugasyonu / COOH | 215 | 0.95 | `FULL_TEXT` | grupları, glisin, glutamin, aminoasitlerle |
| Slide 35 | Slide 35: Glutatyon / konjugasyonu / CH2 | 552 | 0.95 | `FULL_TEXT` | GSH, epoksid, glutatyon, konjugati |
| Slide 36 | Slide 36: CH2 / CONH / COOH | 189 | 0.95 | `FULL_TEXT` | NHCOCH2, NH2, glutatyonaz, NHCOCH3 |
| Slide 37 | Slide 37: Reaksiyon / Adı / Fonksiyonel | 499 | 0.95 | `FULL_TEXT` | Gruplar, İlgili, Endojen, Madde |
| Slide 38 | Slide 38: Aminoasit / konjugasyon / COOH | 465 | 0.95 | `FULL_TEXT` | Açil, transferazlar, H2N-CH2-COOH, Glutatyon |
| Slide 39 | Slide 39: METABOLİZMAYIETKİLEYEN / FAKTÖRLER / Endojen | 368 | 0.95 | `FULL_TEXT` | Faktörler, Fizyolojik, patolojik, faktörler |
| Slide 40 | Slide 40: Asetilasyon / Polimorfizmi / Eskimolar | 468 | 0.95 | `FULL_TEXT` | Japonlar, hızlı, asetilatör, Mısırlılar |
| Slide 41 | Slide 41: STEREOKİMYASAL / FAKTÖRLERİN / İLAÇ | 529 | 0.95 | `FULL_TEXT` | BİYOTRANSFORMASYONU, ÜZERİNDEKİ, ETKİLERİ, rasemik |
| Slide 42 | Slide 42: CH2 / CH3 / CH3OH | 94 | 0.85 | `BULLET_SUMMARY` | propranolol, 4-hidroksipropranolol |
| Slide 43 | Slide 43: METABOLİZMA / REAKSİYONLARININ / MEYDANA | 210 | 0.95 | `FULL_TEXT` | GELDİĞİ, BAŞLICA, BÖLGELER, 1-Karaciğer |
| Slide 44 | Slide 44: İdrarda / üriner / sistem | 556 | 0.95 | `FULL_TEXT` | antiseptik, prodrug, Hegzametilen, tetramin |

