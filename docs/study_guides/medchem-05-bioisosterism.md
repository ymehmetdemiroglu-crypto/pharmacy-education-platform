# MedChem 05: Biyoizosterizm ve Moleküler Modifikasyon

**Kaynak Ders Notu:** `materials/medchem/Biyoizosterizm.pdf`  
**Öğretim Üyesi:** Prof. Dr. Bedia Kaymakçıoğlu  
**Ham Metin:** `docs/extracted_raw/medchem_Biyoizosterizm.pdf.txt` (15 Slayt)

---

## Slide 1: Giriş ve Tarihsel Temeller: Langmuir'in İzosteri İlkesi
- **Biyoizosterizmin Amacı:** Aktivitesi bilinen bir öncü molekülden (*lead compound*), rasyonel moleküler modifikasyonla daha yüksek potansiye sahip, metabolik olarak daha stabil, yan etkisi ve toksisitesi azaltılmış ve hedef reseptöre seçiciliği artırılmış yeni ilaç etken maddeleri tasarlamaktır.
- **Tarihsel Gelişim (Langmuir, 1919):**
  - Irving Langmuir kimyasal **izosteri** kavramını ilk kez tanımlamıştır.
  - **Langmuir İlkesi:** Dış değerlik kabuklarında aynı sayıda ve benzer uzaysal dağılımda elektron (özellikle valans elektronu) taşıyan atom, iyon, radikal veya moleküllere **izoster** denir.
  - Örnek moleküler izosterler: $N_2$ ile $CO$, $N_2O$ ile $CO_2$, $N_3^-$ ile $NCO^-$.

---

## Slide 2: Langmuir İzoster Çifti İncelemesi: Azot Protoksit ($N_2O$) vs. Karbondioksit ($CO_2$)
Her iki molekül de 16 değerlik elektronu ve 22 toplam elektron içeren doğrusal moleküllerdir:

| Fizikokimyasal Parametre | Azot Protoksit ($N_2O$) | Karbondioksit ($CO_2$) | Benzerlik Derecesi |
| :--- | :--- | :--- | :--- |
| **Viskozite ($20^\circ\text{C}$)** | $148 \times 10^{-6}\text{ Pa}\cdot\text{s}$ | $148 \times 10^{-6}\text{ Pa}\cdot\text{s}$ | **Birebir Eşit** |
| **Dansite ($10^\circ\text{C}$)** | $0.856\text{ g/cm}^3$ | $0.858\text{ g/cm}^3$ | $\%99.8$ Uyum |
| **Refraktif İndeks ($16^\circ\text{C}$)** | $1.193$ | $1.190$ | $\%99.7$ Uyum |
| **Dielektrik Sabiti ($0^\circ\text{C}$)** | $1.593$ | $1.582$ | $\%99.3$ Uyum |
| **Alkolde Çözünürlük ($15^\circ\text{C}$)** | $3.250$ | $3.130$ | $\%96.3$ Uyum |

- **Çıkarım:** Dış yörünge elektron konfigürasyonları aynı veya çok yakın olan moleküllerin fiziksel, termodinamik ve sterik özellikleri neredeyse özdeştir.

---

## Slide 3: Grimm'in Hidrür Katımı Kanunu (1925) ve Psödoatomlar (Erlenmeyer, 1932)
- H. G. Grimm, periyodik sistemdeki bir atoma, bir proton ve bir elektron içeren **hidrür ($\text{H}^\bullet$)** eklendiğinde, oluşan moleküler fragmanın bir sonraki gruptaki atomun fiziksel ve kimyasal özelliklerini taklit ettiğini keşfetmiştir (**Grimm'in Hidrür Deplasman Kanunu**).
- Hans Erlenmeyer (1932) bu fragmanları **psödoatomlar (yalancı atomlar)** olarak adlandırmış ve izosteri kavramını biyolojik sistemlere uyarlamıştır.
- **Klasik Örnek:** Piridin halkasındaki azot atomu ($-N=$) yerine metin ($-CH=$) grubu girmesi $\rightarrow$ **Piridin-Benzen izosterizmi**:

```
        Piridin (Azotlu Halka)              Benzen (Metin İzosteri)
                 N                                   CH
               // \                                // \
              CH   CH                             CH   CH
              |     |                             |     |
              CH == CH                            CH == CH
```

---

## Slide 4: Grimm'in Hidrür Deplasman Serisi Tablosu
Slaytta yer alan orijinal değerlik ve elektron sayısı tablosu:

| Valans Elektron Sayısı | Ana Atom | $+1\text{H}$ Katımı | $+2\text{H}$ Katımı | $+3\text{H}$ Katımı | $+4\text{H}$ Katımı | İyonik Formlar |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **6** | $\text{C}$ | — | — | — | — | — |
| **7** | $\text{N}$ | $-\text{CH}$ | — | — | — | — |
| **8** | $\text{O}$ | $-\text{NH}-$ | $-\text{CH}_2-$ | — | — | — |
| **9** | $\text{F}$ | $-\text{OH}$ | $-\text{NH}_2$ | $-\text{CH}_3$ | — | — |
| **10** | $\text{Ne}$ | $\text{HF}$ | $\text{H}_2\text{O}$ | $\text{NH}_3$ | $\text{CH}_4$ | — |
| **11** | — | — | — | — | — | $\text{Na}^+, \text{H}_2\text{F}^+, \text{H}_3\text{O}^+, \text{NH}_4^+$ |

- **Hansberg Kuralı:** Aromatik sistemlerde köprü oluşturan iki karbonlu vinilen grubu ($-\text{CH}=\text{CH}-$) ile tek bir kükürt atomu ($-\text{S}-$) birbirinin tam elektronik ve sterik izosteridir:
  $$\text{Benzen } (-\text{CH}=\text{CH}-) \;\longleftrightarrow\; \text{Tiyofen } (-\text{S}-)$$

---

## Slide 5: Friedman'ın Biyoizosterizm Tanımı (1951) ve İki Büyük Sınıf
H. L. Friedman (1951), sadece fiziksel benzerliği değil, **biyolojik hedefe uyumu** merkeze alan modern "Biyoizosterizm" tanımını yapmıştır:
- **Biyoizoster:** Bir ilaç molekülünde yer değiştirdiğinde, benzer fizikokimyasal/sterik özellikler kazandırarak **aynı biyolojik aktiviteyi sürdüren** veya hedeflenen yönde modüle eden atom veya fonksiyonel grup çiftleridir.

### 1. Klasik Biyoizosterler:
- Grimm serisine ve Erlenmeyer kurallarına tam uyarlar.
- Atom sayısı, dış kabuk değerlik elektronu, moleküler geometri, hacim ve aromatiklik açısından birbirine neredeyse özdeştir.

### 2. Non-Klasik Biyoizosterler:
- Klasik atom sayısı veya valans elektron kurallarına **uymazlar**.
- Ancak uzaysal yönelim, dipol moment, $\text{p}K_a$ (asitlik derecesi), elektrostatik potansiyel yüzeyi ve hidrojen bağı donör/akseptör örüntüleri açısından hedef reseptör/enzim cebiyle tam biyoaktivite uyumluluğu sergilerler.

---

## Slide 6: Klasik Biyoizosterlerin Ayrıntılı Sınıflandırması
Slaytta sistematik olarak listelenen klasik gruplar:

### i. Monovalan (Tek Değerlikli) Atom veya Gruplar:
a) $-\text{CH}_3, -\text{NH}_2, -\text{OH}, -\text{F}, -\text{Cl}$  
b) $-\text{Cl}, -\text{PH}_2, -\text{SH}$  
c) $-\text{Br}, -\text{i-C}_3\text{H}_7$ (İzopropil)  
d) $-\text{I}, -\text{t-C}_4\text{H}_9$ ($ter$-Bütil)

### ii. Bivalan (İki Değerlikli) Atom veya Gruplar:
a) $-\text{CH}_2-, -\text{NH}-, -\text{O}-, -\text{S}-, -\text{Se}-$ (Eter, tiyoeter, amin köprüleri)  
b) $-\text{CO-CH}_2-, -\text{CO-NH}-, -\text{CO-O}-$ (Keton, amit, ester izosterizmi)

### iii. Trivalan (Üç Değerlikli) Atom veya Gruplar:
a) $-\text{CH}=, -\text{N}=$ (Metin ve aza grupları)  
b) $-\text{P}=, -\text{As}=$

---

## Slide 7: Klasik Biyoizosterler: Tetravalan Atomlar ve Halka Ekivalanları
### iv. Tetravalan (Dört Değerlikli) Atomlar:
a) Karbon ve Silisyum: $\text{C} \longleftrightarrow \text{Si}$ (*Sila-ikamesi*)  
b) Kuaterner Merkezler: $\text{R}_4\text{N}^+ \longleftrightarrow \text{R}_4\text{P}^+$

### v. Halka Ekivalanları (Halka İzosterleri):
- **Benzen Halkası $\longleftrightarrow$ Tiyofen Halkası:**
  Benzen halkasındaki $-\text{CH}=\text{CH}-$ parçası yerine $-\text{S}-$ atomunun yerleştirilmesi:
  $$\text{Benzen } (\text{C}_6\text{H}_6) \;\longleftrightarrow\; \text{Tiyofen } (\text{C}_4\text{H}_4\text{S})$$
  Tiyofendeki kükürt atomunun d-orbitalleri aromatik $\pi$-delokalizasyonuna katılır; benzen ile rezonans enerjisi ve van der Waals çevresi çok yakındır.

---

## Slide 8: Heterosiklik Halka Ekivalanları
- **Aza Grubu Ekivalanları:**
  $$-\text{CH}= \;\longleftrightarrow\; -\text{N}= \quad (\text{Benzen } \longleftrightarrow \text{ Piridin})$$
- **5-Üyeli Heterohalkalar Arası İzosterizm:**
  $$-\text{O}- \text{ (Furan)} \;\longleftrightarrow\; -\text{S}- \text{ (Tiyofen)} \;\longleftrightarrow\; -\text{NH}- \text{ (Pirol)} \;\longleftrightarrow\; -\text{CH}_2- \text{ (Siklopentadien)}$$

---

## Slide 9: Non-Klasik Biyoizosterler 1: Karbonil ve Karboksil İzosterleri
Klasik kurallara uymayan, ancak ilaç keşfinde devrim yaratan fonksiyonel grup eşdeğerleri:

### i. Karbonil ($C=O$) Non-Klasik Biyoizosterleri:
$$C=O \;\longleftrightarrow\; S=O \;\longleftrightarrow\; SO_2 \;\longleftrightarrow\; C=C(CN)_2 \;\longleftrightarrow\; C=N-R$$

### ii. Karboksilik Asit ($-COOH$) Non-Klasik Biyoizosterleri:
Karboksilik asitler gastrointestinal yoldan zayıf emilir, hızla glukuronidasyona uğrar ve metabolik kararsızlık gösterir. İlaç kimyasında $-\text{COOH}$ yerine şu gruplar geçirilir:
1. **Tetrazol Halkası:** En başarılı karboksil izosteridir:
   ```
          Karboksil Grubu                     Tetrazol Halkası
                 O                                   N ─── N
                //                                   ||    |
             ─ C                                   ─ C     N
                \                                    \\   /
                 OH                                   NH
             (pKa ≈ 4.5)                          (pKa ≈ 4.5 - 4.9)
   ```
   - Karboksilik asit ile neredeyse aynı $\text{p}K_a$'ya sahiptir (fizyolojik pH 7.4'te deprotonlanarak negatif yük taşır).
   - Ancak tetrazol halkası düzlemseldir, 10 kat daha lipofiliktir ($\log P$ artar), membran geçirgenliği mükemmeldir ve metabolik glukuronidasyona dirençlidir.
   - **Klinik Örnek:** Anjiyotensin II Reseptör Blokeri (ARB) **Losartan**, tetrazol halkası taşır.
2. **Diğer Asidik İzosterler:**
   - Sülfonamidler ($-\text{SO}_2\text{NHR}$)
   - Sülfonik asit ($-\text{SO}_3\text{H}$)
   - Fosfonik / Fosfinik asitler ($-\text{PO(OH)}_2, -\text{PO(OH)(OEt)}$)
   - Açil siyanoamidler ($-\text{CO-NH-CN}$)
   - Hidroksamik asit ($-\text{CO-NH-OH}$)

---

## Slide 10: Non-Klasik Biyoizosterler 2: Hidroksil, Halojen ve Tiyoeter
### iii. Fenolik Hidroksil ($-OH$) İzosterleri:
Katekolamin metabolizmasını (COMT) bloke etmek veya H-bağı ağını korumak amacıyla $-\text{OH}$ yerine:
$$-\text{NH-CO-R}, \quad -\text{NH-SO}_2\text{R}, \quad -\text{CH}_2\text{OH}, \quad -\text{NH-CN}, \quad -\text{CH(CN)}_2$$
- **Örnek - Salbütamol:** Adrenalindeki meta-$OH$ yerine $-\text{CH}_2\text{OH}$ getirilerek COMT enzimine dirençli uzun etkili $\beta_2$-agonisti geliştirilmiştir.

### iv. Halojen İzosterleri:
$$-\text{Cl} \;\longleftrightarrow\; -\text{CF}_3 \;\longleftrightarrow\; -\text{CN} \;\longleftrightarrow\; -\text{N(CN)}_2 \;\longleftrightarrow\; -\text{C(CN)}_3$$
- Triflorometil ($-\text{CF}_3$) ve siyano ($-\text{CN}$) grupları, halojenler gibi güçlü elektron çekici ($-I$) ve lipofilik fragmanlardır.

### v. Tiyoeter ve vi. Azometin İzosterleri:
- $-S- \longleftrightarrow -O- \longleftrightarrow -C(CN)_2-$
- $-N=C- \longleftrightarrow -C(CN)=C(CN)-$

---

## Slide 11: Non-Klasik Biyoizosterler 3: Piridin, Hacim ve Hidrojen/Flor
### vii. Piridin İzosterleri:
Aromatik halkaya bağlı nitro ($-\text{NO}_2$) grubu veya kuaterner amonyum ($-N^+R_3$) merkezleri elektron çekicilikleri nedeniyle piridin azotunu taklit eder.

### viii. Hacim Artışı:
Moleküle eklenen alifatik $-(CH_2)_3-$ köprüleri sterik hacmi doldurarak reseptör hidrofobik ceplerini kilitler.

### ix. Hidrojen $\longleftrightarrow$ Flor Değişimi:
- Flor atomunun van der Waals yarıçapı ($1.47\text{ \AA}$) hidrojene ($1.20\text{ \AA}$) en yakın atomdur.
- Ancak $\text{C-F}$ bağı karbonun oluşturduğu en güçlü kovalent bağdır ($116\text{ kcal/mol}$).
- İlaçta metabolizmaya hassas bir pozisyondaki $-\text{H}$ yerine $-\text{F}$ konulması (örn. sitokrom oksidasyonunu engellemek), reseptör boyutunu bozmadan moleküle **metabolik zırh** kazandırır (örn. Ezetimib, 5-FU).

---

## Slide 12: Halka-Zincir Biyoizosterizmi: Dietilstilbestrol vs. Estradiol
- Siklik bir yapının, açık zincirli esnek bir analogla yer değiştirmesi veya tersine açık zincirin rijit bir halkaya dönüştürülmesi izosterik kabul edilir.
- **Vaka:** $17\beta$-Estradiol 4 halkalı rijit steroid çekirdeğine sahipken; trans-Dietilstilbestrol (DES) açık zincirli bir difenil türevidir.
- DES'in iki etil grubu fenol halkalarını sterik olarak öyle bir açıyla kilitler ki, estradiolün $12.1\text{ \AA}$ mesafeli iki hidroksil grubu uzayda birebir taklit edilir.

---

## Slide 13: Antihistaminiklerde Biyoizosterik Gelişim
Klasik $H_1$-antihistaminiklerin genel farmakofor formülü:
$$\text{Ar}_1(\text{Ar}_2)\text{CH} \;-\; X \;-\; (\text{CH}_2)_n \;-\; Y$$
Burada $Y = -\text{N(CH}_3)_2$ ve $n = 2$ iken $X$ köprü atomunun biyoizosterik değişimi ile farklı ilaç sınıfları doğmuştur:

| Köprü Grubu ($X$) | Antihistaminik Alt Sınıfı | Temsilci İlaç Örneği | Klinik Karakteristik |
| :--- | :--- | :--- | :--- |
| **$X = -\text{O}-$** | **Aminoalkil Eterler (Etanolaminler)** | **Difenhidramin** (*Benadryl*) | Yüksek sedatif ve antikolinerjik etki |
| **$X = -\text{NH}-$** | **Etilendiaminler** | **Pirilamin, Tripelenamin** | Orta sedatif, belirgin lokal anestezi |
| **$X = -\text{CH}_2-$** | **Propilaminler (Alkilaminler)** | **Klorfeniramin, Deksklorfeniramin** | Düşük sedasyon, yüksek $H_1$ potansiyeli |

---

## Slide 14: Kolinerjik Ajanlar ve Biyoizosterik Antimetabolitler
- **Kolinerjik Blokerler:** $R-X-\text{CH}_2\text{CH}_2-N(CH_3)_2$ genel yapısında:
  - $X = -\text{COO}-$ girerse: **Aminoalkol esterleri** (Atropin benzeri antimuskarinikler).
  - $X = -\text{O}-$ girerse: **Aminoalkol eterleri** (Benzatropin).
- **Biyoizosterik Antagonizma (Antimetabolitler):**
  Biyoizosterler her zaman benzer agonist etki oluşturmaz; bazen enzimi veya reseptörü kilitlererek tam tersi **antagonist/antimetabolit** etki doğururlar:
  - **2-Tiyenilalanin:** Doğal bir amino asit olan **Fenilalanin**'in benzen halkası yerine tiyofen halkası konulmuş biyoizosteridir; fenilalanin t-RNA sentetaz enzimini yarışmalı bloke eder.
  - **5-Bromourasil:** Timin'in (5-metilurasil) metil grubu yerine hacimce izosteri olan brom atomu ($-\text{Br}$) konulmuş antimetabolitidir; DNA replikasyonunda mutasyonlara yol açar.

---

## Slide 15: Fenotiyazin $\longrightarrow$ Dibenzazepin Dönüşümü ve Klasik Vaka İncelemeleri
- **Sülfür $\rightarrow$ Etilen İzosterizmi ile Farmakolojik Profil Değişimi:**
  - **Fenotiyazin Çekirdeği:** İki benzen halkası bir azot ($-NH-$) ve bir kükürt ($-\text{S}-$) köprüsüyle birbirine bağlıdır. Bu çekirdeğe sahip moleküller (örn. **Klorpromazin**) **nöroleptik (antipsikotik)** etki gösterir.
  - **Dibenzazepin (İminodibenzil) Çekirdeği:** Fenotiyazindeki $-\text{S}-$ atomu yerine biyoizosteri olan iki karbonlu doymuş etilen köprüsü ($-\text{CH}_2-\text{CH}_2-$) veya vinilen ($-\text{CH}=\text{CH}-$) geçirildiğinde molekülün düzlemsel bükülme açısı değişir:
    $$\text{Fenotiyazin (Antipsikotik: Klorpromazin)} \;\xrightarrow{-\text{S}- \;\rightarrow\; -\text{CH}_2\text{CH}_2-} \; \text{Dibenzazepin (Trisiklik Antidepresan: İmipramin)}$$
  - Antipsikotik dopamin bloker etki ortadan kalkar; yerini noradrenalin ve serotonin geri alım inhibisyonu (antidepresan etki) alır!

### Ekstra Klasik İlaç Vakaları:
1. **PABA vs. Sülfanilamid:**
   - Bakteriler folik asit sentezinde $p$-aminobenzoik asit (PABA, $p\text{-NH}_2\text{-C}_6\text{H}_4\text{-COOH}$) kullanır.
   - Sülfanilamid ($p\text{-NH}_2\text{-C}_6\text{H}_4\text{-SO}_2\text{NH}_2$), PABA'nın $-\text{COOH}$ grubu yerine $-\text{SO}_2\text{NH}_2$ konulmuş klasik biyoizosteridir.
   - Dihidropteroat sentaz enzimini kompetitif inhibe ederek bakteriyostatik etki sağlar.
2. **Prokain vs. Prokainamid:**
   - **Prokain (Ester):** $p\text{-NH}_2\text{-C}_6\text{H}_4\text{-COO-CH}_2\text{CH}_2\text{-N(C}_2\text{H}_5)_2$. Plazma bütirilkolinesteraz enzimiyle saniyeler içinde hidroliz olur $\rightarrow$ sadece lokal anesteziktir.
   - **Prokainamid (Amit Biyoizosteri):** Ester oksijeni ($-\text{O}-$) yerine amit azotu ($-\text{NH}-$) konulmuştur. Plazma esterazları amiti parçalayamaz; molekül kanda saatlerce stabil kalır ve sistemik **Sınıf IA antiaritmik** olarak kalpte kullanılır.

---

## Sınav Odaklı Kritik Noktalar ve Öğrenci Yanılgıları

> [!IMPORTANT]
> **Fakülte Sınavlarında Sık Sorulan Biyoizosterizm Soruları:**
> 1. **Grimm Hidrür Katımı:** Karbon ($C=6$) $\rightarrow$ $N, CH=7$ $\rightarrow$ $O, NH, CH_2=8$ $\rightarrow$ $F, OH, NH_2, CH_3=9$.
> 2. **Benzen - Tiyofen Eşdeğerliği:** $-\text{CH}=\text{CH}-$ çift bağı ile $-\text{S}-$ atomu biyoizosterik halka ekivalanıdır.
> 3. **Tetrazolün $-\text{COOH}$ Karşısındaki Üstünlüğü:** $\text{p}K_a$ değerleri benzerdir (asidiktir), ancak tetrazol daha lipofiliktir ve glukuronidasyona dirençlidir (Losartan).
> 4. **Prokain $\rightarrow$ Prokainamid Dönüşümü:** Esteraz hidrolizine karşı direnç kazandırmak amacıyla ester grubunun amit grubuyla izosterik değişimidir.
> 5. **Fenotiyazin $\rightarrow$ Dibenzazepin:** $-\text{S}-$ yerine $-\text{CH}_2\text{CH}_2-$ gelmesi antipsikotik etkiyi antidepresan etkiye çevirir.

> [!WARNING]
> **Öğrenci Kavram Yanılgıları / Tuzaklar:**
> - *Hata:* "Biyoizosterik değişiklik yapıldığında molekül mutlaka ana molekülle aynı farmakolojik aktiviteyi (agonist) gösterir."  
>   *Doğrusu:* Biyoizosterizm bazen antagonist veya antimetabolit oluşturur (örn. Urasil $\rightarrow$ 5-FU; PABA $\rightarrow$ Sülfanilamid; Fenilalanin $\rightarrow$ Tiyenilalanin).
> - *Hata:* "Tetrazol halkası bir bazdır çünkü 4 tane azot atomu taşır."  
>   *Doğrusu:* Tetrazoldeki 4 azotun elektron çekici rezonansı nedeniyle N-H protonu asidiktir ($\text{p}K_a \approx 4.5-4.9$); bu nedenle zayıf asit olan karboksilik asitlerin non-klasik biyoizosteridir.
