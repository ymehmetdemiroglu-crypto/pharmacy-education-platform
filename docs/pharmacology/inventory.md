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
| Slide  1 | İLAÇ RESEPTÖR ETKİLEŞİMİNDE | 72 | 0.85 | `BULLET_SUMMARY` | İLAÇ RESEPTÖR ETKİLEŞİMİNDE, KİMYASAL BAĞLAR |
| Slide  2 | İ | 594 | 0.95 | `FULL_TEXT` | İ, LAÇ RESEPTÖR ETK |
| Slide  3 | Reseptör: Hormonlar, nöromediyatörler gibi etkin endojen | 373 | 0.95 | `FULL_TEXT` | Reseptör: Hormonlar, nöromediyatörler gibi etkin endojen, maddelere ve |
| Slide  4 | İ | 165 | 0.95 | `FULL_TEXT` | İ, laç+Reseptör ......... |
| Slide  5 | Reseptörlerin büyük kısmı sitoplazmik membranın | 420 | 0.95 | `FULL_TEXT` | Reseptörlerin büyük kısmı sitoplazmik membranın, yüzeyinde, yapılarını |
| Slide  6 | Reseptörlerin iki önemli fonksiyonu vardır. | 284 | 0.95 | `FULL_TEXT` | Reseptörlerin iki önemli fonksiyonu vardır., • Belli endojen maddeleri |
| Slide  7 | İlaç reseptör etkileşiminde rol oynayan kimyasal | 220 | 0.95 | `FULL_TEXT` | İlaç reseptör etkileşiminde rol oynayan kimyasal, bağ/etkileşimler |
| Slide  8 | Slide 8 (Diagram/Structure) | 0 | 0.35 | `IMAGE_ONLY_RECREATION_REQUIRED` | [Raster Image / Structure] |
| Slide  9 | KOVALAN BA | 872 | 0.95 | `FULL_TEXT` | KOVALAN BA, Ğ |
| Slide 10 | Alkilasyon | 553 | 0.95 | `FULL_TEXT` | Alkilasyon, R N |
| Slide 11 | Açilasyon | 444 | 0.95 | `FULL_TEXT` | Açilasyon, -laktam halkası taşıyan penisilin ve sefalosporin gibi |
| Slide 12 | Organofosfat bileşikleri ise aktif bölgelerinde serin | 400 | 0.95 | `FULL_TEXT` | Organofosfat bileşikleri ise aktif bölgelerinde serin, taşıyan büyük b |
| Slide 13 | Y apılarındaağır metal (As, Bi, Sb vb.) taşıyan antiparazite | 436 | 0.95 | `FULL_TEXT` | Y apılarındaağır metal (As, Bi, Sb vb.) taşıyan antiparaziter ilaçlar, |
| Slide 14 | +NH-Reseptör C | 263 | 0.95 | `FULL_TEXT` | +NH-Reseptör C, O |
| Slide 15 | Hidrojen ba | 622 | 0.95 | `FULL_TEXT` | Hidrojen ba, ğ |
| Slide 16 | N:O H | 312 | 0.95 | `FULL_TEXT` | N:O H, N H :N |
| Slide 17 | akseptör | 309 | 0.95 | `FULL_TEXT` | akseptör, C |
| Slide 18 | Slide 18 (Diagram/Structure) | 0 | 0.35 | `IMAGE_ONLY_RECREATION_REQUIRED` | [Raster Image / Structure] |
| Slide 19 | Hidrojen bağı molekülün fiziksel ve kimyasal | 518 | 0.95 | `FULL_TEXT` | Hidrojen bağı molekülün fiziksel ve kimyasal, özelliklerini genellikle |
| Slide 20 | İ | 421 | 0.95 | `FULL_TEXT` | İ, yon |
| Slide 21 | Bu kutuplar zıt işaretli iyonlar (iyon-dipol) veya diğer kut | 496 | 0.95 | `FULL_TEXT` | Bu kutuplar zıt işaretli iyonlar (iyon-dipol) veya diğer kutuplar (dip |
| Slide 22 | Yük Transfer Etkileşmeleri | 861 | 0.95 | `FULL_TEXT` | Yük Transfer Etkileşmeleri, Bir çeşit moleküler dipol-dipol etkileşmes |
| Slide 23 | donör | 116 | 0.85 | `BULLET_SUMMARY` | donör, OHOCH3 |
| Slide 24 | Van der Waals Güçleri | 793 | 0.95 | `FULL_TEXT` | Van der Waals Güçleri, Moleküllerin polarizlenebilme özelliklerinin ya |
| Slide 25 | Hidrofobik Etkileşmeler | 1087 | 0.95 | `FULL_TEXT` | Hidrofobik Etkileşmeler, İlaç molekülünün belli bir konumunda var olan |
| Slide 26 | Şelasyon | 556 | 0.95 | `FULL_TEXT` | Şelasyon, Şelat oluşumu, ilacın in vivo aktivitesinde önemli bağ |
| Slide 27 | Metalik katyon ve koordinasyon sayıları | 193 | 0.95 | `FULL_TEXT` | Metalik katyon ve koordinasyon sayıları, Cr+++ 6 Ni+++ 6 Ag+ 2 |
| Slide 28 | Metal ile birleşen elektron donörü maddeye ligand denir, ve  | 329 | 0.95 | `FULL_TEXT` | Metal ile birleşen elektron donörü maddeye ligand denir, ve bağ, için  |
| Slide 29 | Nötral Ligantlar Anyonik | 296 | 0.95 | `FULL_TEXT` | Nötral Ligantlar Anyonik, R-NH2 |
| Slide 30 | Eğer ligand iki üç veya daha fazla elektron donörü grup taşı | 387 | 0.95 | `FULL_TEXT` | Eğer ligand iki üç veya daha fazla elektron donörü grup taşıyorsa, sır |
| Slide 31 | Bu şelatların kararlılıkları maddenin fonksiyonu açısından ö | 754 | 0.95 | `FULL_TEXT` | Bu şelatların kararlılıkları maddenin fonksiyonu açısından önemlidir.  |
| Slide 32 | Örnek olarak EDTA ve BAL verilebilir. | 187 | 0.95 | `FULL_TEXT` | Örnek olarak EDTA ve BAL verilebilir., •EDTA hiperkalsemide ve kanın p |
| Slide 33 | Örnek olarak Dibukain molekülünün olası bir reseptörle | 259 | 0.95 | `FULL_TEXT` | Örnek olarak Dibukain molekülünün olası bir reseptörle, yapabileceği b |

### Deck: `İlaç metabolizması-2026.pdf` (44 slides, Avg Confidence: 93.6%)

| Slide # | Extracted Title / Headline | Chars | Confidence | Quality Status | Key Scientific Concepts / Entities |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Slide  1 | ORGANİK BİLEŞİKLERDE METABOLİK REAKSİYONLAR | 991 | 0.95 | `FULL_TEXT` | ORGANİK BİLEŞİKLERDE METABOLİK REAKSİYONLAR, Organizmamız ilaçlar dahi |
| Slide  2 | Örneğin sülfadiazinin asetil metaboliti suda çözünmediği içi | 686 | 0.95 | `FULL_TEXT` | Örneğin sülfadiazinin asetil metaboliti suda çözünmediği için böbrek,  |
| Slide  3 | İlaç Metabolizması Araştırmaları ile Neler Saptanabilir? | 739 | 0.95 | `FULL_TEXT` | İlaç Metabolizması Araştırmaları ile Neler Saptanabilir?, 1 – Organizm |
| Slide  4 | Faz I reaksiyonları ile molekülde Faz II reaksiyonuna girebi | 476 | 0.95 | `FULL_TEXT` | Faz I reaksiyonları ile molekülde Faz II reaksiyonuna girebilecek –, O |
| Slide  5 | Metabonat | 440 | 0.95 | `FULL_TEXT` | Metabonat, Bazı bileşikler organizmada non-enzimatik (kimyasal olarak) |
| Slide  6 | İlaç Metabolizmasının Etkileri | 359 | 0.95 | `FULL_TEXT` | İlaç Metabolizmasının Etkileri, Istenen bir durum 1.Istenmeyen bir dur |
| Slide  7 | Bir ilaç bazı nedenlerden dolayı metabolize olmayabilir; | 175 | 0.95 | `FULL_TEXT` | Bir ilaç bazı nedenlerden dolayı metabolize olmayabilir;, - Gerekli en |
| Slide  8 | Metabolizma Teknikleri | 361 | 0.95 | `FULL_TEXT` | Metabolizma Teknikleri, İn vitro teknikler |
| Slide  9 | Metabolitlerin Ortak Özellikleri | 419 | 0.95 | `FULL_TEXT` | Metabolitlerin Ortak Özellikleri, - Çoğu stabil değildir. Isı, ışık ve |
| Slide 10 | İlaç Metabolizması Araştırmalarındaki Yöntemler | 320 | 0.95 | `FULL_TEXT` | İlaç Metabolizması Araştırmalarındaki Yöntemler, (in vivo – in vitro) |
| Slide 11 | Substrat ve muhtemel | 402 | 0.95 | `FULL_TEXT` | Substrat ve muhtemel, metabolit tespiti, sentezi |
| Slide 12 | Metabolitlerin Biyolojik Ortamdan Ekstraksiyonu | 587 | 0.95 | `FULL_TEXT` | Metabolitlerin Biyolojik Ortamdan Ekstraksiyonu, Burada amaç sulu fazd |
| Slide 13 | Sıvı – sıvı ekstraksiyonunda maddenin organik faza alınmasın | 1023 | 0.95 | `FULL_TEXT` | Sıvı – sıvı ekstraksiyonunda maddenin organik faza alınmasında sorun,  |
| Slide 14 | FAZ I REAKSİYONLARI | 244 | 0.95 | `FULL_TEXT` | FAZ I REAKSİYONLARI, 1) Oksidasyon |
| Slide 15 | CH3CH2CH3 | 242 | 0.95 | `FULL_TEXT` | CH3CH2CH3, CH3CH2CH2OH |
| Slide 16 | iii – aromatik karbon oksidasyonu | 143 | 0.85 | `BULLET_SUMMARY` | iii – aromatik karbon oksidasyonu, ( O ) O |
| Slide 17 | iv – alisiklik karbon oksidasyonu | 76 | 0.85 | `BULLET_SUMMARY` | iv – alisiklik karbon oksidasyonu, OH |
| Slide 18 | v – alkol ve aldehid oksidasyonu | 143 | 0.85 | `BULLET_SUMMARY` | v – alkol ve aldehid oksidasyonu, CH3CH2OH CH3CHO CH3COOH |
| Slide 19 | vi – heterosiklik karbon oksidasyonu | 165 | 0.95 | `FULL_TEXT` | vi – heterosiklik karbon oksidasyonu, Ar CH2 N N |
| Slide 20 | vii – oksidatif O, S, N-dealkilasyon | 332 | 0.95 | `FULL_TEXT` | vii – oksidatif O, S, N-dealkilasyon, Eter, tiyoeter ve aminlerde (sek |
| Slide 21 | viii – oksidatif deaminasyon | 197 | 0.95 | `FULL_TEXT` | viii – oksidatif deaminasyon, +NH3 |
| Slide 22 | ix – kükürt oksidasyonu | 317 | 0.95 | `FULL_TEXT` | ix – kükürt oksidasyonu, İlgili enzimler karmafonksiyonlu oksidazlardı |
| Slide 23 | x – azot oksidasyonu | 187 | 0.95 | `FULL_TEXT` | x – azot oksidasyonu, --- amin oksidasyonu |
| Slide 24 | --- azo grubu oksidasyonu | 152 | 0.95 | `FULL_TEXT` | --- azo grubu oksidasyonu, R N N R R N N R |
| Slide 25 | 2.- Redüksiyon | 233 | 0.95 | `FULL_TEXT` | 2.- Redüksiyon, a) Nitro grubu redüksiyonu |
| Slide 26 | c) Karbonil grubu redüksiyonu | 193 | 0.95 | `FULL_TEXT` | c) Karbonil grubu redüksiyonu, İlgili enzim aldehid redüktaz ve keton  |
| Slide 27 | e) Redüktif dehalojenizasyon | 86 | 0.85 | `BULLET_SUMMARY` | e) Redüktif dehalojenizasyon, CCl4  CHCl3 |
| Slide 28 | 3.- Hidroliz | 166 | 0.95 | `FULL_TEXT` | 3.- Hidroliz, a) Ester hidrolizi |
| Slide 29 | c) Epoksid hidrolizi | 184 | 0.95 | `FULL_TEXT` | c) Epoksid hidrolizi, İlgili enzim epoksid hidrolazdır. |
| Slide 30 | f) Hidrazon hidrolizi | 115 | 0.85 | `BULLET_SUMMARY` | f) Hidrazon hidrolizi, R-CH=N-NH2 + H2O  R-CHO + H2N-NH2 |
| Slide 31 | FAZ II REAKSİYONLARI | 199 | 0.95 | `FULL_TEXT` | FAZ II REAKSİYONLARI, 1. Asetilasyon |
| Slide 32 | 2. Metilasyon | 333 | 0.95 | `FULL_TEXT` | 2. Metilasyon, -OH, -SH ve -NH2 grupları metilasyona uğrar. Endojen |
| Slide 33 | 4. Glukuronik asidle konjugasyon | 306 | 0.95 | `FULL_TEXT` | 4. Glukuronik asidle konjugasyon, -OH grupları eter glukuronidlerini,  |
| Slide 34 | 5. Aminoasit konjugasyonu | 215 | 0.95 | `FULL_TEXT` | 5. Aminoasit konjugasyonu, -COOH grupları, glisin ve glutamin gibi ami |
| Slide 35 | 6. Glutatyon konjugasyonu | 552 | 0.95 | `FULL_TEXT` | 6. Glutatyon konjugasyonu, R CH CH2 |
| Slide 36 | R S CH2 CH | 189 | 0.95 | `FULL_TEXT` | R S CH2 CH, CONH CH2 COOH |
| Slide 37 | Reaksiyon Adı ve | 499 | 0.95 | `FULL_TEXT` | Reaksiyon Adı ve, Fonksiyonel Gruplar |
| Slide 38 | Aminoasit ile | 465 | 0.95 | `FULL_TEXT` | Aminoasit ile, konjugasyon |
| Slide 39 | METABOLİZMAYIETKİLEYEN FAKTÖRLER | 368 | 0.95 | `FULL_TEXT` | METABOLİZMAYIETKİLEYEN FAKTÖRLER, 1) Endojen Faktörler |
| Slide 40 | Asetilasyon Polimorfizmi : Eskimolar ve Japonlar hızlı aseti | 468 | 0.95 | `FULL_TEXT` | Asetilasyon Polimorfizmi : Eskimolar ve Japonlar hızlı asetilatör,, Mı |
| Slide 41 | STEREOKİMYASAL FAKTÖRLERİN | 529 | 0.95 | `FULL_TEXT` | STEREOKİMYASAL FAKTÖRLERİN, İLAÇ BİYOTRANSFORMASYONU ÜZERİNDEKİ |
| Slide 42 | O CH2 CH CH2 NH CH | 94 | 0.85 | `BULLET_SUMMARY` | O CH2 CH CH2 NH CH, CH3 |
| Slide 43 | METABOLİZMA REAKSİYONLARININ MEYDANA | 210 | 0.95 | `FULL_TEXT` | METABOLİZMA REAKSİYONLARININ MEYDANA, GELDİĞİ BAŞLICA BÖLGELER |
| Slide 44 | İdrarda : Bir üriner sistem antiseptik prodrug olan | 556 | 0.95 | `FULL_TEXT` | İdrarda : Bir üriner sistem antiseptik prodrug olan, Hegzametilen tetr |

