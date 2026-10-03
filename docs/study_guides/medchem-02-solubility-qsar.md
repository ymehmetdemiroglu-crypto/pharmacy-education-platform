# MedChem 02: İlaçlarda Yapı-Aktivite İlişkileri: Çözünürlük, Dağılım Katsayısı ve QSAR

**Kaynak Ders Notu:** `materials/medchem/İlaçlarda Yapı Etki İlişkileri-Çözünürlük.pdf`  
**Öğretim Üyesi:** Prof. Dr. Bedia Kaymakçıoğlu  
**Ham Metin:** `docs/extracted_raw/medchem_İlaçlarda Yapı Etki İlişkileri-Çözünürlük.pdf.txt` (29 Slayt)

---

## Slide 1: İlaçlarda Yapı-Aktivite İlişkileri: Çözünürlük
- **Başlık:** İlaçlarda Yapı-Aktivite İlişkileri (SAR) - Çözünürlük ve Fizikokimyasal Parametreler
- **Eğitmen:** Prof. Dr. Bedia Kaymakçıoğlu
- **Ders Kapsamı:** İlaç moleküllerinin sulu ve lipid fazlardaki çözünürlüğü, dielektrik sabitleri, fonksiyonel grup polariteleri, homolog serilerde kesilme fenomeni (*cutoff*), partisyon katsayısı ($P$ ve $\log P$), Hansch hidrofobik sabiti ($\pi$), sedatif hipnotik etklorvinol hesaplama örneği, tiyopental vs. pentobarbital redistribüsyon kinetiği, Lipinski 5 Kuralı ve kinaz inhibitörleri ("tinibler") istisnaları.

---

## Slide 2: İlaç Aktivitesi ve Biyolojik Süreçler (ADMA Döngüsü)
- **ADMA (ADME) Basamakları:**
  Ağızdan (oral) alınan bir ilaç etken maddesinin spesifik terapötik cevabı oluşturabilmesi için 4 temel farmakokinetik fazı başarıyla tamamlaması gerekir:
  1. **Absorbsiyon (Emilim):** Gastrointestinal kanal lümeninden kan dolaşımına geçiş.
  2. **Dağılma (Distribüsyon):** Kan plazmasından interstisyel sıvıya, dokulara ve hedef reseptör bölgesine ulaşma.
  3. **Metabolizma (Biyotransformasyon):** Karaciğer ve diğer dokularda enzimatik dönüşüm.
  4. **Atılım (Eliminasyon):** Renal, bilier veya pulmoner yolla vücuttan uzaklaştırılma.
- **Fizikokimyasal Faktörlerin Rolü:** İlacın etki gücü yapısına, biyolojik ortamın özelliklerine ve şu kritik fizikokimyasal parametrelere bağlıdır:
  - Çözünürlük ($S$)
  - Partisyon katsayısı ($P, \log P$)
  - Yüzey gerilimi / Yüzey aktivitesi
  - Asidite, bazisite ve iyonizasyon derecesi ($\text{p}K_a, \alpha$)

---

## Slide 3: Membran Bariyeri ve Çözünürlük Paradoksu
- İlaçların hedef biyofaza ulaşabilmesi için hem hidrofilik (kan, sitoplazma, interstisyel sıvı) hem de lipofilik (fosfolipid çift tabakalı biyolojik membranlar) ortamlarda çözünebilme dengesini koruması şarttır.
- Saf hidrofilik maddeler membran lipit fazını aşamazken, aşırı lipofilik maddeler sulu biyolojik sıvılarda çökerek taşınamaz.

---

## Slide 4: Çözünürlük Kavramı ve Termodinamiği
- **Çözünürlük Tanımı:** Bir maddenin, belirli bir sıcaklık ve basınç altında, su gibi polar veya yağ/organik çözücü gibi non-polar bir ortam içerisinde termodinamik olarak kararlı, homojen bir dispersiyon (tek fazlı çözelti) oluşturabilme kapasitesidir.
- **Süspansiyon vs. Çözelti:**
  - Süspansiyonlarda çözünmemiş katı partiküller ve taşıyıcı sıvı olmak üzere **çift faz** mevcuttur.
  - Çözünme sürecinde ise solüt-solüt etkileşimleri kırılarak yerini solüt-solvent etkileşimlerine bırakır ve **tek fazlı** homojen sistem oluşur.
- **Önemi:** Etki bölgesinde ilacın minimal etkin konsantrasyonunu ($C_{\min}$) oluşturabilmesi ve bunu terapötik pencere boyunca sürdürebilmesi tamamen çözünürlüğün kontrolündedir.

---

## Slide 5: Çözünme Mekanizması ve Moleküler Etkileşimler
- Çözünme süreci 3 basamaktan meydana gelir:
  1. Solüt molekülleri arasındaki kristal kafes veya kohezif bağların kırılması ($\Delta H_1 > 0$).
  2. Çözücü molekülleri arasında bir kavite (boşluk) açılması ($\Delta H_2 > 0$).
  3. Solüt molekülünün çözücü kavitesine yerleşerek solvatasyon/hidrasyon bağları kurması ($\Delta H_3 < 0$).
- Toplam entalpi değişimi $\Delta H_{\text{çözünme}} = \Delta H_1 + \Delta H_2 + \Delta H_3$ ve serbest enerji $\Delta G = \Delta H - T\Delta S < 0$ olduğunda spontan çözünme gerçekleşir.

---

## Slide 6: "Benzer Benzeri Çözer" İlkesi ve Dielektrik Sabiti
- **Kural:** *Similia similibus solvuntur* (Benzer benzeri çözer).
  - Polar moleküller polar çözücülerde (hidrofilik),
  - Nonpolar moleküller nonpolar çözücülerde (lipofilik) yüksek oranda çözünür.
- **Polarlık Nedir?** Molekül içindeki atomların elektronegatiflik farklarına bağlı olarak artı ($+$) ve eksi ($-$) elektriksel yüklerin simetrik olmayan biçimde dağılması ve kalıcı bir dipol moment ($\mu$) oluşturmasıdır.
- **Dielektrik Sabiti ($\epsilon$):**
  - Çözücünün, içerisine konulan iki elektriksel yük arasındaki elektrostatik çekim gücünü zayıflatabilme yeteneğidir.
  - Dielektrik sabiti yüksek olan çözücüler polar, düşük olanlar nonpolardır.

---

## Slide 7: Çözücülerin Dielektrik Sabitleri ($\epsilon$) ve Polarite Sıralaması
Laboratuvarda ve biyolojik sistemlerin modellenmesinde yaygın olarak kullanılan çözücülerin $20-25^\circ\text{C}$'deki dielektrik sabitleri:

| Çözücü Bileşik | Dielektrik Sabiti ($\epsilon$) | Karakter / Polarite Sınıfı |
| :--- | :--- | :--- |
| **$n$-Hekzan** | $1.89$ | Tamamen Nonpolar Hidrokarbon |
| **Heptan** | $1.92$ | Nonpolar Hidrokarbon |
| **Siklohekzan** | $2.02$ | Nonpolar Halka |
| **Karbontetraklorür ($\text{CCl}_4$)** | $2.24$ | Nonpolar (simetrik tetrahedral dipol = 0) |
| **Benzen ($\text{C}_6\text{H}_6$)** | $2.28$ | Nonpolar Aromatik |
| **Dietil Eter** | $4.34$ | Düşük Polarite (zayıf dipol) |
| **Kloroform ($\text{CHCl}_3$)** | $4.81$ | Düşük/Orta Polarite |
| **Etil Asetat** | $6.32$ | Orta Polarite (dipol, H-bağ alıcısı) |
| **Piridin** | $12.30$ | Orta Polarite (heteroaromatik baz) |
| **Aseton** | $20.70$ | Yüksek Polarite (polar aprotik) |
| **Etanol** | $24.30$ | Yüksek Polarite (polar protik) |
| **Metanol** | $33.61$ | Çok Yüksek Polarite (güçlü H-bağları) |
| **Su ($\text{H}_2\text{O}$)** | **$80.37$** | En Yüksek Polarite (Fizyolojik çözücü) |

---

## Slide 8: Çözünürlüğe Etki Eden Fonksiyonel Gruplar
Molekülün hidrofilik veya lipofilik karakter kazanması, taşıdığı kimyasal grupların niteliği ve sayısıyla doğrudan belirlenir:

### 1. Hidrofilik Gruplar (Su Çözünürlüğünü Artıranlar - Azalan Hidrofilisite Sırası):
$$-\text{COO}^- \;>\; -\text{COOH} \;>\; -\text{OH} \;>\; -\text{O}^- \;>\; -^+\text{NR}_3 \;>\; -\text{CHO} \;>\; -\text{NH}_3^+ \;>\; -\text{CONH}_2 \;>\; -\text{CONHR} \;>\; -\text{CONRR}' \;>\; -\text{COOR}$$

### 2. Lipofilik Gruplar (Yağ Çözünürlüğünü Artıranlar - Artan Lipofilisite Sırası):
$$-\text{CH}_3 \;<\; -\text{C}_2\text{H}_5 \;<\; -\text{C}_3\text{H}_7 \;<\; -\text{i-C}_3\text{H}_7 \;<\; -\text{Fenil} \;<\; -\text{Naftil}$$

---

## Slide 9: Heteroatomlar, Alkil Zinciri ve Tuz Oluşturma Prensipleri
- **Heteroatom Etkisi:** Moleküle oksijen ($\text{O}$), azot ($\text{N}$), kükürt ($\text{S}$) gibi elektronegatif heteroatomların girmesi, molekülün su molekülleriyle güçlü dipol-dipol ve hidrojen bağları kurmasını sağlayarak polariteyi ve suda çözünürlüğü artırır.
- **Alkil Zinciri Etkisi:** Alifatik karbon zincirleri nonpolar karakterdedir. Karbon zincirinin uzaması molekülün van der Waals etkileşimlerini artırarak su çözünürlüğünü düşürür, lipofilikliğini artırır.
- **Tuz Oluşturma Stratejisi:**
  - Suda çözünmeyen veya çözünürlüğü çok düşük olan zayıf asidik veya bazik ilaçlar farmakopelerde suda çözünen tuzlarına dönüştürülür:
    - Zayıf Asidik İlaçlar (örn. fenobarbital, ibuprofen) $\rightarrow$ Güçlü bazlarla sodyum veya potasyum tuzu ($\text{R-COO}^-\text{Na}^+$).
    - Zayıf Bazik İlaçlar (örn. morfin, lidokain) $\rightarrow$ Güçlü inorganik asitlerle hidroklorür veya sülfat tuzu ($\text{R-NH}_3^+\text{Cl}^-$).
- **Amfoterik Bileşikler:** Yapısında hem asidik ($-\text{COOH}$) hem de bazik ($-\text{NH}_2$) grup taşıyan moleküllerdir (örn. amino asitler, ampisilin, enalapril). Hem asitlerle hem de bazlarla suda çözünen tuzlar oluşturabilirler. İzoelektrik noktalarında zwitterion halinde bulunurlar.

---

## Slide 10: Dallanma ve Kristal Kafes Etkisi
- **Dallanma Kuralı:** Düz zincirli alifatik bileşikler, dallanmış izomerlerinden daha yüksek yağ çözünürlüğüne sahiptir. Yapıda dallanma olması molekülün yüzey alanını küçültür ve su molekülleriyle temasını kolaylaştırarak **suda çözünürlüğü artırır**.
  - **Ders Örneği:** İzopropil alkolün ($(CH_3)_2CH-OH$) suda çözünürlüğü, düz zincirli $n$-propanolden ($CH_3CH_2CH_2-OH$) daha fazladır.
- **Fiziksel Faktörler:** Molekülün partikül büyüklüğü, amorf/kristalin polimorfik formu ve erime noktası da çözünme hızını ve denge çözünürlüğünü doğrudan yönetir.

---

## Slide 11: Membran Geçişi ve Biyolojik Aktivite
- Hücre membranları Singer-Nicolson akışkan mozaik modeline göre amfipatik fosfolipid çift tabakasından ve içerisine gömülü proteinlerden oluşur.
- Lipofilik karakteri yüksek olan maddeler, membran lipid matriksine pasif difüzyonla hızla partisyone olarak hücre içerisine geçerler.

---

## Slide 12: Homolog Seriler ve Aktivite-Çözünürlük Değişimi
Homolog serilerde (her basamakta yapıya bir $-\text{CH}_2-$ birimi eklenen molekül dizilerinde) karbon zincirinin uzaması ile biyolojik aktivite tipik bir parabolik eğri izler:
1. İlk üyeler (düşük karbon sayılı): Aşırı polar/hidrofilik olduklarından lipid membranları aşamazlar $\rightarrow$ Biyolojik aktivite düşüktür.
2. Zincir uzadıkça: Lipofilisite artar, membran penetrasyonu kolaylaşır $\rightarrow$ Biyolojik aktivite düzenli olarak artar.
3. Maksimum Aktivite Noktası (Tepe Değeri).
4. Kesilme Noktası (*Cutoff Phenomenon*): Belli bir karbon sayısından sonra aktivite aniden bıçak gibi kesilir ve hızla düşer.

---

## Slide 13: Kesilme Fenomeni (*Cutoff Phenomenon*) ve Polar Hücreler Arası Sıvı Bariyeri
- **Neden Aktivite Maksimumdan Sonra Aniden Düşer?**
  - Hücreler arası ortam (interstisyel sıvı ve sitozol) **polar sulu bir karakterdedir**.
  - Karbon zinciri aşırı uzayan moleküllerin sulu fazdaki çözünürlüğü neredeyse sıfıra iner.
  - Suda hiç çözünmeyen molekül, interstisyel sıvı matrikste çözünemez; agregat/misel oluşturur veya dokuda çöker.
  - Sonuçta reseptörün aktif bölgesine veya hedef organa taşınması fiziksel olarak imkansız hale gelir.

---

## Slide 14: İzatin-$\beta$-Tiyosemikarbazon Modeli
- İzatin-$\beta$-tiyosemikarbazon türevlerinin antiviral ve antibakteriyel aktiviteleri, kloroformdaki çözünürlükleri (lipofilik özellikleri) ile doğrudan korelasyon gösterir.
- İzatin çekirdeği (indol-2,3-dion):

```
             O
            //
           C
          / \
     6   /   \  2
   5 \  /     C=O
   || \/      |
   4  /\      N-H  (1)
     7  \____/
          3 \
             C = N - NH - CS - NH2  (Tiyosemikarbazon Yan Zinciri)
```

- Kloroformdaki çözünürlüğü artıran sübstitüentler yapıya girdikçe biyolojik aktivite çözünürlük derecesine paralel olarak katlanarak artar.

---

## Slide 15: İzatin Türevlerinin Çözünürlük vs. Biyolojik Aktivite Tablosu
Slaytta verilen orijinal deneysel veri tablosu:

| Sübstitüent Konumu ve Grubu | Kloroformdaki Çözünürlük | Antibakteriyel Etki | SAR Yorumu |
| :--- | :--- | :--- | :--- |
| **7-karboksi** ($-COOH$) | $0$ | $0$ | Güçlü polar grup kloroform çözünürlüğünü sıfırlamış, aktivite tamamen yok olmuştur. |
| **5-metoksi** ($-OCH_3$) | $3$ | $0.03$ | Zayıf çözünürlük, çok düşük aktivite. |
| **4-metil** ($-CH_3$) | $8$ | $3.4$ | Alkil grubu lipofiliteti artırmış, aktivite başlamıştır. |
| **4-fluoro** ($-F$) | $16$ | $39.8$ | Flor atomu lipofiliteti ve membran geçişini belirgin artırmıştır. |
| **7-kloro** ($-Cl$) | **$32$** | **$100$** | En yüksek kloroform çözünürlüğü, referans maksimum (%100) antibakteriyel güç. |

---

## Slide 16: Partisyon Katsayısı ($P$ ve $\log P$) Tanımı
- **Tanım:** Birbiri ile karışmayan iki fazlı bir sistemde (polar su fazı ve nonpolar organik faz), denge anında çözünen ilacın organik fazdaki konsantrasyonunun sulu fazdaki konsantrasyonuna oranıdır:
  $$P = \frac{[\text{İlaç}]_{\text{organik / yağ}}}{[\text{İlaç}]_{\text{su}}}$$
- **Logaritmik İfade:**
  $$\log P = \log C_{\text{yağ}} - \log C_{\text{su}}$$
- **Terapötik Aralık:** İlaç benzeri moleküller için optimal $\log P$ değeri genellikle $0$ ile $5$ arasındadır ($\log P = 0-5$).

---

## Slide 17: İn Vitro Partisyon Belirleme: Neden $n$-Oktanol-Su Sistemi?
- İlaçların in vivo doku dağılımını doğrudan ölçmek teknik olarak zor olduğundan *in vitro* model faz sistemleri kullanılır.
- Organik faz olarak zeytinyağı, kloroform, hekzan veya eter kullanılabilse de, **$n$-oktanol-su** altın standarttır:
  1. $n$-Oktanol 8 karbonlu uzun alkil kuyruğu ve ucundaki polar $-\text{OH}$ grubu ile hücre membranındaki fosfolipidlerin (gliseril-yağ asidi esterleri ve polar baş kısımları) amfipatik mimarisini mükemmel şekilde taklit eder.
  2. Su fazında fizyolojik pH'ı taklit etmek amacıyla **pH 7.4 fosfat tamponu** kullanılır.

---

## Slide 18: Çalkalama Şişesi (*Shake-Flask*) Yöntemi Şeması
- İki fazlı ayrıştırma hunisi veya santrifüj tüpü sistemi.
- Karışım termostatik çalkalayıcıda dengeye ulaştırılır ve fazlar ayrılarak analiz edilir.

---

## Slide 19: Çalkalama Şişesi (*Shake-Flask*) Metodolojisi ve Kromatografik Tayin
- **Metot Basamakları:**
  1. Su ile doyurulmuş $n$-oktanol ve $n$-oktanol ile doyurulmuş pH 7.4 sulu tampon hazırlanır.
  2. Bilinen miktarda bileşik eklenerek fazlar dengeleninceye kadar çalkalanır.
  3. Fazlar santrifüjlenerek ayrılır.
  4. Her iki fazdaki ilaç konsantrasyonu UV-Vis spektrofotometrisi veya HPLC ile ölçülür:
     $$\log P = \log\left(\frac{C_{\text{oktanol}}}{C_{\text{su}}}\right)$$
- **Kromatografik Belirleme (RP-HPLC ve RP-TLC):**
  - Ters Faz HPLC'de (RP-HPLC) stasyoner faz olarak nonpolar **oktadesilsilan ($\text{C}_{18}$ / ODS)**, mobil faz olarak polar su-metanol veya su-asetonitril karışımları kullanılır.
  - İlacın lipofilitesi arttıkça $\text{C}_{18}$ kolonunda daha uzun süre tutunur (alıkonma zamanı / $t_R$ artar).

---

## Slide 20: Kromatografik Alıkonma Kinetiği
- Alıkonma faktörü ($k'$ veya alıkonma zamanı $t_R$), molekülün partisyon katsayısı ile doğrusal bir ilişki sergiler.

---

## Slide 21: QSAR Denklemleri ve Hansch Hidrofobik Sabiti Kavramı
- **Kromatografik Bağıntı:**
  $$\log P = a \cdot (\text{Alıkonma Zamanı}) + b$$
  Burada $a$ doğrunun eğimi, $b$ ise $y$-eksenini kestiği noktadır.
- **Biyolojik Aktivite Bağıntısı:**
  $$\log A = a \cdot (\log \text{Alıkonma Zamanı}) + b$$
  Burada $A$ bağıl biyolojik aktivitedir.
- **Hansch Yaklaşımı:** Corwin Hansch, bir molekülün lipofilitesinin, o molekülü oluşturan atom ve fonksiyonel grupların aditif (toplamsal) bir özelliği olduğunu öne sürerek **sübstitüent hidrofobik bağ sabiti ($\pi$)** kavramını geliştirmiştir.

---

## Slide 22: Hansch Hidrofobik Sübstitüent Sabiti ($\pi$) Formülasyonu
- **Formül:**
  $$\pi_X = \log P_X - \log P_H$$
  - $\pi_X$: $X$ sübstitüentinin hidrofobik sabiti
  - $P_X$: $X$ sübstitüe edilmiş bileşiğin partisyon katsayısı
  - $P_H$: Ana (sübstitüe edilmemiş referans) bileşiğin partisyon katsayısı
- **Örnek - Aromatik Klor Atomu ($\pi_{\text{Cl}}$):**
  $$\begin{aligned}
  \pi_{\text{Cl}} &= \log P_{\text{klorobenzen}} - \log P_{\text{benzen}} \\
  &= 2.84 - 2.13 = +0.71
  \end{aligned}$$
- **İşaret Anlamı:**
  - $\pi > 0$ ($+$ pozitif): Hidrojene göre lipofiliteti / yağda çözünmeyi **artıran** sübstitüentler (örn. $-\text{Cl}, -\text{CH}_3, -\text{Br}$).
  - $\pi < 0$ ($-$ negatif): Hidrojene göre hidrofilisiteyi artıran, yağda çözünmeyi **azaltan** sübstitüentler (örn. $-\text{OH}, -\text{COOH}, -\text{NH}_2$).

---

## Slide 23: Çalışılmış Örnek: Etklorvinol Teoretik $\log P$ Hesabı
Etklorvinol (*Ethchlorvynol*), GABA-A allosterik modülatörü sedatif-hipnotik bir ilaçtır.

```
       Cl-CH = CH \
                   C(OH) - C ≡ CH
      CH3 - CH2  /
```
*(E)-1-kloro-3-etilpent-1-en-4-in-3-ol*

### Fonksiyonel Grup Katkılarının Toplanması ($\Sigma \pi$):
| Moleküler Fragman / Fonksiyonel Grup | $\pi$ Katkısı |
| :--- | :--- |
| Tersiyer Alkol Karbonu ($-\text{C-OH}$) | $-1.16$ |
| Terminal Alkin Grubu ($-\text{C}\equiv\text{CH}$) | $+0.84$ |
| Etil Yan Zinciri ($-\text{CH}_2\text{CH}_3$) | $+1.00$ |
| Klorovinil Grubu ($-\text{CH}=\text{CH-Cl}$) | $+1.32$ |

$$\Sigma \pi = \text{TeoLog } P = (-1.16) + (+0.84) + (+1.00) + (+1.32) = +2.00$$

- **Yorum:** Teoretik $\log P = 2.00$ değeri, ilacın kan-beyin bariyerini (KBB) aşarak santral sinir sisteminde sedatif etki oluşturması için ideal lipofiliklik penceresindedir ($1.5 - 2.5$). SwissADME verileriyle tam uyumludur.

---

## Slide 24: Aşırı Lipofilikliğin Farmakokinetik Sakıncaları
$\log P$ değerinin gereğinden yüksek olması ($> 5$) şu klinik ve farmakokinetik sorunlara yol açar:
1. **Yağ Dokusunda Sekestrasyon:** İlaç periferik adipöz dokuda aşırı birikir ve kanda terapötik düzeye ulaşamaz.
2. **Plazma Proteinlerine Aşırı Bağlanma:** Serum albüminine $\%99$'un üzerinde non-spesifik bağlanarak serbest (aktif) fraksiyonu aşırı düşer.
3. **Metabolik Kararsızlık:** Lipofilik moleküller hepatik sitokrom P450 (CYP450) monooksijenaz enzimlerine yüksek afinite gösterdiğinden hızla ilk-geçiş metabolizmasına uğrarlar.
4. **Zayıf Çözünürlük ve Biyoyararlanım:** Gastrointestinal lümende çözünemediğinden absorbe edilemez.

---

## Slide 25: Redistribüsyon Kinetiği: Tiyopental vs. Pentobarbital
Barbitürat türevi iki sedatif hipnotik ilacın kimyasal ve kinetik karşılaştırması:

```
            Pentobarbital                           Tiyopental
                  O                                       S
                //                                      //
               C                                       C
            HN   NH                                 HN   NH
            |     |                                 |     |
         O=C      C=O                            O=C      C=O
            \    /                                  \    /
              C                                       C
             / \                                     / \
      C2H5 -'   `- CH(CH3)CH2CH2CH3           C2H5 -'   `- CH(CH3)CH2CH2CH3
```

| Parametre | Pentobarbital | Tiyopental |
| :--- | :--- | :--- |
| **C-2 Pozisyonundaki Atom** | Oksijen ($\text{C}=\text{O}$, Oksibarbitürat) | Kükürt ($\text{C}=\text{S}$, Tiyobarbitürat) |
| **Lipofiliklik ($\log P$)** | Orta ($\approx 2.1$) | Çok Yüksek ($\approx 3.0$) |
| **KBB Geçiş Hızı** | Yavaş / Orta | Anlık (Saniyeler içinde) |
| **Klinik Kullanım** | Sedatif - Hipnotik | İntravenöz Genel Anestezi İndüksiyonu |
| **Etki Süresi Mekanizması** | Karaciğerde yavaş metabolizma ile sonlanır ($t_{1/2} \approx 20-50\text{ saat}$). | **Redistribüsyon (Yeniden Dağılım):** Beyne hızla girip anestezi yapar; dakikalar içinde beyinden çıkıp kas ve yağ dokusuna sekestre olur $\rightarrow$ Anestezi etkisi $5-10$ dakikada sonlanır. |
| **Eliminasyon Problemi** | Düzenli renal atılım | Yağ dokusundan kana çok yavaş sızar $\rightarrow$ Postoperatif "akşamdan kalmalık" (*hangover*) etkisi. |

---

## Slide 26: İlaç Benzerliği (*Drug-Likeness*) ve Oral Biyoyararlanım
- Bir kimyasal molekülün hedef reseptöre bağlanabilmesi tek başına ilaç olabileceği anlamına gelmez.
- Molekülün insan gastrointestinal sisteminden absorbe olup sistemik dolaşıma geçebilecek fizikokimyasal sınırları karşılaması gerekir.

---

## Slide 27: Lipinski'nin Beş Kuralı (*Rule of 5 - Ro5*)
1997 yılında Christopher A. Lipinski (Pfizer) tarafından formüle edilmiştir:
- Faz II klinik çalışmalarına geçebilmiş oral biyoyararlanımı yüksek ilaçların fizikokimyasal veri tabanından türetilmiştir.
- Bütün parametreler $5$ sayısının katları olduğu için "Rule of 5" olarak adlandırılmıştır.

---

## Slide 28: Lipinski 5 Kuralının 4 Temel Parametresi
Oral yoldan etkili iyi bir ilaç adayında:
1. **Molekül Ağırlığı ($MW$):** $\le 500\text{ Da}$ olmalı.
2. **Hesaplanmış Lipofiliklik ($\text{cLog} P$):** $\le 5$ olmalı.
3. **Hidrojen Bağı Vericisi ($HBD$):** $-\text{OH}$ ve $-\text{NH}$ gruplarının toplamı $\le 5$ olmalı.
4. **Hidrojen Bağı Alıcısı ($HBA$):** Oksijen ve Azot atomlarının toplamı $\le 10$ olmalı.
*(Not: 2 veya daha fazla kural ihlali durumunda oral biyoyararlanım ciddi biçimde düşer).*

---

## Slide 29: Kanser Tedavisinde Ro5 İstisnaları: Tirozin Kinaz İnhibitörleri ("Tinibler")
Slaytta vurgulanan en modern farmasötik istisna sınıfı kinaz inhibitörleridir:
- **Genel Durum:** Küçük moleküllü kinaz inhibitörlerinin ortalama $MW = 480\text{ Da}$ olup; $306\text{ Da}$ (*ruxolitinib*) ile $615\text{ Da}$ (*trametinib*) arasında değişir.
- **Onaylı 48 Kinaz İnhibitörünün Analizi:**
  - $48$ ilaçtan $38$'inin $\text{cLog} P < 5$ kuralına uyduğu saptanmıştır.
- **$HBA > 10$ İstisnaları:** *Dabrafenib*, *fostamatinib* ve 3 makrolid (*sirolimus, everolimus, temsirolimus*).
- **$MW > 500\text{ Da}$ Kuralını Delen Onaylı İlaçlar:**
  *Abemasiklib, bosutinib, brigatinib, kabozantinib, seritinib, kobimetinib, dabrafenib, enkrafenib, fostamatinib* (vücutta $MW = 470$ olan R406 aktif metabolitine dönüşen ön ilaç), *gilteritinib, lapatinib, midostaurin, neratinib, nilotinib, nintedanib, ponatinib, trametinib* ve 3 makrolid.
- **Neden İhlal Edilir?** Kinazların ATP bağlama cepleri geniştir; yüksek afinite ve izoform seçiciliği sağlayabilmek için molekülün hacimli aromatik/heteroaromatik halkalar taşıması zorunludur.

---

## Sınav Odaklı Kritik Noktalar ve Öğrenci Yanılgıları

> [!IMPORTANT]
> **Fakülte Sınavlarında Sık Sorulan Sorular:**
> 1. **Dallanmanın Çözünürlüğe Etkisi:** Dallanma arttıkça yüzey alanı küçülür, hidrokarbon zincirler arası temas azalır $\rightarrow$ Suda çözünürlük **artar** (İzopropil alkol > $n$-propanol).
> 2. **Hansch $\pi$ Sabiti Hesabı:** $\pi_{\text{Cl}} = \log P_{\text{klorobenzen}} - \log P_{\text{benzen}} = 2.84 - 2.13 = +0.71$. Pozitif değer lipofilisiteyi artırdığını gösterir.
> 3. **Tiyopentalin Kısa Etki Nedeni:** Karaciğerde hızlı metabolizma **değildir**; yüksek lipofilitesi nedeniyle beyinden kas ve yağ dokusuna olan **hızlı redistribüsyondur**.
> 4. **Lipinski Kuralı Parametreleri:** $MW \le 500$, $\text{cLog} P \le 5$, $HBD \le 5$, $HBA \le 10$.

> [!WARNING]
> **Öğrenci Kavram Yanılgıları / Tuzaklar:**
> - *Hata:* "Homolog serilerde karbon sayısı arttıkça antibakteriyel etki daima artar."  
>   *Doğrusu:* Belli bir kritik karbon sayısına kadar artar, ardından *cutoff* (kesilme) noktasına ulaşılır. İnterstisyel sıvı polar olduğundan aşırı hidrofobik molekül suda çözünemez ve reseptöre ulaşamaz.
> - *Hata:* "Lipinski 5 kuralına uymayan hiçbir molekül ilaç olamaz."  
>   *Doğrusu:* Lipinski kuralları pasif difüzyonla emilen oral ilaçlar içindir. İntravenöz ilaçlar, biyolojikler (antikorlar), aktif transportla taşınanlar ve onkolojideki tirozin kinaz inhibitörleri ("tinibler") sıklıkla bu kuralları ihlal eder.
