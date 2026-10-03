# Pharm 02: İlaç Metabolizması ve Temel Farmakokinetik Prensipler (ADME / PK)

**Kaynak Ders Notu:** `materials/pharmacology/İlaç metabolizması-2026.pdf`  
**Öğretim Üyesi:** Prof. Dr. Bedia Kaymakçıoğlu  
**Ham Metin:** `docs/extracted_raw/pharmacology_İlaç metabolizması-2026.pdf.txt` (44 Slayt) & Temel Kantitatif Farmakokinetik Prensipleri

---

## Slide 1: Ksenobiyotikler ve Farmakokinetiğe Giriş
- **Ksenobiyotik Kavramı:** Organizmaya dışarıdan uygulanan, vücudun endojen biyokimyasal yapısına yabancı tüm kimyasal moleküllerdir (ilaçlar, toksinler, pestisitler, katkı maddeleri).
- **Farmakokinetik (PK) Tanımı:** "Vücudun ilaca ne yaptığıdır" (What the body does to the drug). İlacın absorbsiyonu, dokulara dağılımı, enzimatik biyotransformasyonu ve atılımının zamana bağlı matematiksel kinetiğini inceler.
- **Farmakodinamik (PD) Tanımı:** "İlacın vücuda ne yaptığıdır" (What the drug does to the body). İlacın reseptöre bağlanması, etki gücü, efikasitesi ve toksisitesidir.

---

## Slide 2: Toksik Metabolitler ve Renal Klerens Sorunları: Sülfadiazin Modeli
- Sülfadiazin karaciğerde NAT-2 ile asetillendiğinde oluşan $N^4$-asetilsülfadiazin metabolitinin suda çözünürlüğü aşırı düşüktür.
- Asidik idrarda ($pH < 5.5$) tübüllerde çökelerek kristalüriye yol açar.
- **Farmakokinetik Çıkarım:** Renal klerensin sağlıklı işlemesi için metabolitlerin idrar pH'sında iyonize ve yüksek oranda hidrofilik kalması şarttır. İdrar alkalileştirilerek ($NaHCO_3$) zayıf asit metabolitlerin tübüler geri emilimi engellenir (**iyon tuzağı**).

---

## Slide 3: Farmakokinetik ve Metabolizma Araştırmalarının Rolü
1. İlacın kanda ve dokulardaki zamana karşı konsantrasyon eğrisini ($C_p - t$) modellemek.
2. Karaciğer ilk-geçiş eliminasyonunu ve sistemik dolaşıma geçen fraksiyonu (biyoyararlanım) hesaplamak.
3. İlacın vücuttan temizlenme hızını (klerens) ve yarı ömrünü ($t_{1/2}$) saptamak.
4. Bireye özgü rasyonel dozaj rejimleri (yükleme dozu, idame dozu) oluşturmak.

---

## Slide 4: Biyotransformasyon Döngüsü: Faz I ve Faz II'nin PK Entegrasyonu
- **Faz I (Hazırlık):** Polariteyi hafif artırır; moleküle reaktif tutunma noktaları ($-\text{OH}, -\text{NH}_2, -\text{SH}, -\text{COOH}$) kazandırır.
- **Faz II (Konjugasyon):** Klerensi devasa artırır; molekülü polar anyonik formlara dönüştürerek böbrek glomerüler filtrasyonu ve tübüler sekresyonu ile hızla vücuttan uzaklaştırır.

---

## Slide 5: Non-Enzimatik Dönüşümler (Metabonatlar)
- İlacın vücutta enzime ihtiyaç duymadan, biyolojik pH ve sıcaklığın etkisiyle kendiliğinden parçalanmasıdır.
- **Örnek:** İdrarda formaldehite dönüşen Metenamin veya plazmada Hofmann eliminasyonuyla kendiliğinden inaktive olan nöromusküler bloker **Atrakuryum**. Karaciğer ve böbrek yetmezliği olan hastalarda metabolik organlara yük getirmediği için büyük avantaj sağlar.

---

## Slide 6: Biyotransformasyonun Farmakolojik Çıktıları
- **Aktif İlaç $\longrightarrow$ İnaktif Metabolit:** Klasik eliminasyon yolu.
- **Aktif İlaç $\longrightarrow$ Aktif Metabolit:** Kümülasyon ve uzamış etki riski:
  - Diazepam $\rightarrow$ Nordiazepam ($t_{1/2} \approx 60-100\text{ saat}$).
- **Ön İlaç $\longrightarrow$ Aktif İlaç (Bioactivation):**
  - Kodein $\xrightarrow{\text{CYP2D6}} $ Morfin
  - Klopidogrel $\xrightarrow{\text{CYP2C19}} $ Aktif Tiyol Metaboliti (Trombosit agregasyon inhibisyonu)
- **Aktif İlaç $\longrightarrow$ Toksik Metabolit:** Parasetamol $\rightarrow$ NAPQI.

---

## Slide 7: Metabolizma Eksikliği ve Renal Eliminasyona Bağımlılık
- Bir ilacın metabolize olmadan doğrudan böbrekten atılması durumunda (örn. Gentamisin, Atenolol, Lityum):
  - Hasta böbrek yetmezliğine girdiğinde klerens dramatik düşer; plazma konsantrasyonu hızla toksik sınıra fırlar.
  - Doz mutlaka glomerüler filtrasyon hızına (GFR / Kreatinin Klerensi) göre azaltılmalıdır.

---

## Slide 8-13: Biyoanalitik PK Yöntemleri
- Plazma ve idrar numunelerinden ilaç ve metabolitlerin ekstraksiyonu, protein çöktürme (asetonitril/metanol) ve LC-MS/MS veya HPLC ile zamana karşı kantitatif kromatografik ölçümler.

---

## Slide 14-24: Faz I Oksidasyon Yolaklarının Farmakokinetik Önemi
- **Sitokrom P450 (CYP450) İzoformları:** İlaçların $\%75$'inin Faz I metabolizmasını yönetir.
  - **CYP3A4:** En baskın enzimdir (ilaçların $\%50$'sini yıkar).
  - **CYP2D6:** Polimorfik enzim (antidepresanlar, $\beta$-blokerler, opioidler).
  - **CYP2C9:** Dar terapötik indeksli ilaçlar (Varfarin, Fenitoin).
- **Alifatik Hidroksilasyon ($\omega / \omega-1$):** Karbon zincirini oksitleyerek eliminasyonu hızlandırır.
- **Aromatik Hidroksilasyon ve NIH Kayması:** Reaktif aren oksit ara ürünleri üzerinden fenol türevlerinin oluşumu.
- **Oksidatif Dealkilasyon:** $O$-, $N$-, $S$-bağlı metil/etil gruplarının aldehit olarak koparılması.
- **Deaminasyon:** Primer aminlerin ketonlara dönüştürülerek inaktivasyonu.

---

## Slide 25-27: Faz I Redüksiyon ve İlaç Etkileşimleri
- **Azo ve Nitro Redüksiyonu:** Prontosil'in sülfanilamide dönüşmesi; anaerobik kolon bakterileri tarafından sülfasalazinin 5-ASA (mesalazin) ve sülfapiridine indirgenmesi.
- **Redüktif Dehalojenasyon:** Halojenli hidrokarbonların serbest radikal oluşturma riski.

---

## Slide 28-30: Faz I Hidrolitik Yolaklar
- **Esterazlar ve Amidazlar:**
  - Plazma psödokolinesterazı (bütirilkolinesteraz) suksinilkolin ve prokaini saniyeler içinde hidroliz eder ($t_{1/2} < 1\text{ dakika}$).
  - Genetik atipik kolinesteraz enzim varyantı taşıyan bireylerde suksinilkolin hidroliz edilemez; dakikalar sürmesi gereken kas felci saatlerce uzar (**Prolonge Apne**).

---

## Slide 31-38: Faz II Konjugasyon Yolakları ve Biyokimyasal Kofaktörler
- **Glukuronidasyon (UGT + UDPGA):** Yüksek kapasiteli ana yolak.
- **Sülfasyon (SULT + PAPS):** Düşük kapasiteli, yüksek afiniteli yolak (aşırı dozda hızla doyar).
- **Asetilasyon (NAT-2 + Asetil-KoA):** İzoniyazid, sülfonamidler.
- **Metilasyon (COMT/TPMT + SAM):** Katekolaminler, 6-merkaptopürin.
- **Glutatyon (GST + GSH):** Reaktif elektrofillerin ve parasetamol toksik metaboliti NAPQI'nin detoksifikasyonu $\rightarrow$ Merkaptürik asit atılımı.

---

## Slide 39-42: Farmakokinetik Değişkenlik: İndüksiyon, İnhibisyon ve Genetik Polimorfizm
1. **Enzim İndüksiyonu:**
   - İlacın CYP450 gen transkripsiyonunu (PXR, CAR reseptörleri aracılığıyla) artırmasıdır.
   - Enzim miktarı artar $\rightarrow$ Birlikte verilen diğer ilacın metabolizması hızlanır, kan seviyesi düşer $\rightarrow$ **Tedavi Başarısızlığı**.
   - **Güçlü İndükleyiciler:** Rifampisin, Karbamazepin, Fenitoin, Fenobarbital, St. John's Wort (Sarı Kantaron).
2. **Enzim İnhibisyonu:**
   - İlacın CYP enzimine bağlanarak onu bloke etmesidir. Anlık başlar.
   - Diğer ilacın metabolizması durur $\rightarrow$ Kan seviyesi fırlar $\rightarrow$ **Aşırı Toksisite**.
   - **Güçlü İnhibitörler:** Ketokonazol, Klaritromisin, Eritromisin, Simetidin, Ritonavir, Greyfurt Suyu.
3. **NAT-2 Asetilasyon Polimorfizmi:**
   - Hızlı asetilatörler (Eskimolar, Japonlar) vs. Yavaş asetilatörler (Mısırlılar, Kafkasyalılar). Yavaş asetilatörlerde izoniyazid toksisitesi ve nöropati.

---

## Slide 43-44: İlk-Geçiş Etkisi (*First-Pass Metabolism*) ve Karaciğer Ekstraksiyonu
- Ağızdan alınan bir ilaç portal ven yoluyla doğrudan karaciğere ulaşır. Karaciğer enzimleri ilacın bir kısmını sistemik dolaşıma ulaşamadan yıkar.
- **Hepatik Ekstraksiyon Oranı ($E_H$):**
  $$E_H = \frac{C_{\text{giriş}} - C_{\text{çıkış}}}{C_{\text{giriş}}} = \frac{C_A - C_V}{C_A}$$
  - $E_H > 0.7$ ise: **Yüksek hepatik ekstraksiyonlu ilaç** (örn. Propranolol, Lidokain, Morfin, Verapamil). Biyoyararlanımları çok düşüktür; karaciğer kan akımına ($Q_H$) bağımlıdırlar.
  - $E_H < 0.3$ ise: **Düşük hepatik ekstraksiyonlu ilaç** (örn. Varfarin, Diazepam, Teofilin). Karaciğer enzim kapasitesine bağımlıdırlar.

---

## Slide 45: TEMEL TEK KOMPARTMANLI FARMAKOKİNETİK DENKLEMLERİ (Quantitative PK)

```
                            İNTRAVENÖZ DOZ (D)
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   SİSTEMİK DOLAŞIM   │ ──(Vd)──> DOKULAR
                         │  Konsantrasyon: Cp   │
                         └──────────────────────┘
                                    │
                                    │ Klerens (CL = ke · Vd)
                                    ▼
                                ELİMİNASYON
```

### 1. Dağılma Hacmi (Volume of Distribution - $V_d$):
Vücuttaki toplam ilaç miktarını ($D$), plazmadaki ilaç konsantrasyonuna ($C_0$) bağlayan fiktif (kuramsal) orantı katsayısıdır:
$$V_d = \frac{\text{Doz}}{C_0}$$
- $V_d \approx 3 - 5\text{ L}$ (Düşük): İlaç plazma proteinlerine aşırı bağlanmış ve vasküler yatakta hapsolmuştur (örn. Varfarin).
- $V_d \approx 15\text{ L}$ (Orta): İlaç hücre dışı sıvılara dağılmıştır.
- $V_d > 40 - 500\text{ L}$ (Çok Yüksek): İlaç aşırı lipofiliktir ve periferik dokularda sekestre olmuştur (örn. Digoksin, Klorokin).

### 2. Klerens (Clearance - $\text{CL}$):
Birim zamanda ksenobiyotikten tamamen temizlenen sanal plazma hacmidir:
$$\text{CL} = k_e \cdot V_d = \frac{\text{Doz}}{\text{AUC}}$$
Toplam klerens renal ve hepatik klerenslerin toplamıdır:
$$\text{CL}_{\text{toplam}} = \text{CL}_{\text{renal}} + \text{CL}_{\text{hepatik}} + \text{CL}_{\text{diğer}}$$

- **Hepatik Klerens:**
  $$\text{CL}_H = Q_H \cdot E_H$$
  Burada $Q_H$ karaciğer kan akımı ($\approx 1.5\text{ L/dak}$).

### 3. Eliminasyon Hız Sabiti ($k_e$) ve Yarı Ömür ($t_{1/2}$):
Birinci derece kinetiğe uyan eliminasyonda:
$$C(t) = C_0 \cdot e^{-k_e \cdot t}$$
$$\ln C(t) = \ln C_0 - k_e \cdot t$$
- **Eliminasyon Yarı Ömrü ($t_{1/2}$):** Plazma konsantrasyonunun yarıya inmesi için geçen süre:
  $$t_{1/2} = \frac{\ln(2)}{k_e} = \frac{0.693}{k_e} = \frac{0.693 \cdot V_d}{\text{CL}}$$

### 4. Biyoyararlanım ($F$) ve Eğri Altındaki Alan (AUC):
- **Biyoyararlanım ($F$):** Değişmemiş ilacın sistemik kan dolaşımına ulaşan fraksiyonudur:
  $$F = \frac{\text{AUC}_{\text{oral}} \cdot \text{Doz}_{\text{IV}}}{\text{AUC}_{\text{IV}} \cdot \text{Doz}_{\text{oral}}}$$
  (İntravenöz uygulamada $F = 1.0$, yani $\%100$'dür).
- **AUC Hesabı (Yamuk / Trapezoid Kuralı):**
  $$\text{AUC}_{0 \rightarrow t_n} = \sum_{i=1}^{n} \frac{C_i + C_{i-1}}{2} \cdot (t_i - t_{i-1})$$
  Sonsuza ekstrapolasyon:
  $$\text{AUC}_{0 \rightarrow \infty} = \text{AUC}_{0 \rightarrow t_n} + \frac{C_n}{k_e}$$

### 5. Klinik Rejim Formülleri:
- **Yükleme Dozu ($LD$):**
  $$LD = \frac{V_d \cdot C_{ss}}{F}$$
- **İdame Dozu İtfa Hızı ($MD$):**
  $$MD = \frac{\text{CL} \cdot C_{ss} \cdot \tau}{F}$$
  Burada $C_{ss}$ kararlı durum hedef plazma konsantrasyonu, $\tau$ ise dozlama aralığıdır.

---

## Sınav Odaklı Kritik Noktalar ve Öğrenci Yanılgıları

> [!IMPORTANT]
> **Fakülte Sınavlarında Sık Sorulan PK Soruları:**
> 1. **$t_{1/2}$ Formülü:** $t_{1/2} = \frac{0.693 \cdot V_d}{\text{CL}}$. Yarı ömür $V_d$ ile doğru, klerens ile ters orantılıdır. Bir hastada klerens yarıya inerse $t_{1/2}$ iki katına çıkar!
> 2. **Biyoyararlanım ($F$):** $\text{AUC}_{\text{oral}} / \text{AUC}_{\text{IV}}$ oranıyla ölçülür; yüksek hepatik ekstraksiyonlu ilaçlarda ilk-geçiş etkisi nedeniyle $F$ düşüktür.
> 3. **CYP3A4 İnhibisyonu vs İndüksiyonu:** İnhibisyon (ketokonazol) anında toksisite yaratır; indüksiyon (rifampisin) protein sentezi gerektirdiği için günler içinde gelişir ve tedavi yetersizliğine neden olur.
> 4. **Yüksek Dağılma Hacmi ($V_d$):** İlacın kanda değil dokularda (yağ, kas) toplandığını gösterir (Digoksin, Klorokin). Bu ilaçlar hemodiyalizle temizlenemez!

> [!WARNING]
> **Öğrenci Kavram Yanılgıları / Tuzaklar:**
> - *Hata:* "$V_d$ gerçek anatomik bir sıvı hacmini gösterir."  
>   *Doğrusu:* $V_d$ fiktif bir orantı sabitidir. Dokulara aşırı bağlanan bir ilacın $V_d$'si insan vücut hacminin kat kat üzerinde ($500\text{ L}$) çıkabilir.
> - *Hata:* "Kararlı duruma ($C_{ss}$) ulaşma süresi doz büyüklüğüne bağlıdır."  
>   *Doğrusu:* Birinci derece kinetikte kararlı duruma ulaşma süresi sadece ilacın **yarı ömrüne ($t_{1/2}$)** bağlıdır; dozu artırmak sadece ulaşılan $C_{ss}$ konsantrasyonunu yükseltir, süreyi değiştirmez ($4-5 \times t_{1/2}$).
