# Ders: Farmakodinamik ve Reseptör Sinyal Yolakları

| Alan | Değer |
|---|---|
| Ders kodu | PHARM-01 |
| Ders | Farmakoloji (Prof. Dr. Feyza Arıcıoğlu slaytları) |
| Kaynak dosya | `İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf` (57 slayt) |
| Hedef sınav | Farmakoloji vizesi |
| Durum | **DOĞRULANMIŞ.** Marmara Üniversitesi Farmakoloji kürsüsü slaytlarından aktarılmıştır. |
| Doğrulama ilkesi | Her bilgi yalnızca bu slayt dosyasından alındı. Dışarıdan bilgi eklenmedi. |

> Bu dosyadaki ifadeler slaytlardan özgün cümlelerle yeniden yazıldı. Slayt görselleri kopyalanmadı.

---

<!-- CONCEPT: ph:reseptor_aileleri -->
## Konsept 1: Dört Temel Reseptör Ailesi ve Yanıt Hızları
* **Slayt Kaynağı:** 1, 2, 3, 5, 6, 7
* **Durum:** verified
* **Widget Türü:** `MultipleChoice`

### Bilimsel Öz
- İlaçların bağlandığı 4 temel reseptör süper ailesi mevcuttur (Slayt 1, 2).
- İyonotropik reseptörler (Nikotinik ACh, GABAA) milisaniyeler içinde en hızlı yanıtı üretir (Slayt 3).
- Metabotropik GPCR reseptörleri saniyeler içinde yanıt verir (Slayt 5).
- Enzim kenetli tirozin kinaz reseptörleri dakikalar-saatler sürer (Slayt 6).
- Lipofilik hormonların bağlandığı nükleer reseptörler intraselülerdir ve gen transkripsiyonu ile saatler-günler sürer (Slayt 7).

### Öğrenci Görevi
> Hücre içine doğrudan geçerek gen transkripsiyonunu değiştiren ve etkisi saatler ile günler süren reseptör ailesi hangisidir?

### İskele Merdiveni
1. **Seviye 1 (Dürtme):** Zardan doğrudan geçebilen lipofilik steroid moleküllerin reseptörlerinin nerede yerleştiğini düşün.
2. **Seviye 2 (İpucu):** Bu reseptörler hücre zarında değil; sitozolde veya nükleusta DNA üzerinde yer alır.
3. **Seviye 3 (Çözüm):** Gen transkripsiyonunu yönlendiren nükleer intraselüler reseptörlerdir ve en yavaş yanıta sahiptir. (Slayt 7)

### Yanılgı Haritası
* `ALL_MEMBRANE_TRAP` (Slayt 5, 7): Tüm reseptörlerin hücre zarında olduğu ve iyon akışı başlattığı sanılıyor.
* `KINASE_GENE_TRAP` (Slayt 6): Tirozin kinaz reseptörlerinin birincil gen transkripsiyon faktörü olduğu sanılıyor.

### Widget Yapılandırması
```json
{
  "type": "MultipleChoice",
  "config": {
    "prompt": "Hücre zarı yüzeyinde değil, hücre içinde yer alıp gen ekspresyonunu yönlendiren reseptör ailesi hangisidir?",
    "options": [
      { "id": "correct", "text": "Nükleer / İntraselüler Reseptörler (Glukokortikoid, Tiroid)", "isCorrect": true },
      { "id": "ALL_MEMBRANE_TRAP", "text": "İyonotropik Ligand Kapılı Kanallar", "isCorrect": false, "distractorRationale": "İyonotropik reseptörler hücre zarında yer alır ve milisaniyede iyon akışı başlatır (Slayt 3)." },
      { "id": "KINASE_GENE_TRAP", "text": "Metabotropik G-Proteini Kenetli Reseptörler", "isCorrect": false, "distractorRationale": "GPCR'lar zar reseptörüdür ve saniyeler içinde ikincil haberci üretir (Slayt 5)." }
    ],
    "isMultiSelect": false,
    "explanation": "Steroid ve tiroid hormonları intraselüler nükleer reseptörlere bağlanarak gen transkripsiyonunu saatler-günler içinde değiştirir.",
    "source": { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 7 }
  }
}
```
<!-- END_CONCEPT -->

---

<!-- CONCEPT: ph:kd_ve_afinite -->
## Konsept 2: Kütle Hareketi ve Kd Ayrışma Sabiti
* **Slayt Kaynağı:** 9, 10, 11, 12, 13
* **Durum:** verified
* **Widget Türü:** `MultipleChoice`

### Bilimsel Öz
- İlaç-reseptör bağlanması kütle hareketi kanununa uyar (Slayt 9, 10).
- Kd (ayrışma sabiti) reseptör havuzunun tam %50'sini doyuran serbest ilaç konsantrasyonudur (Slayt 12).
- İlacın reseptöre afinitesi Kd ile ters orantılıdır (1/Kd) (Slayt 11, 13).
- Düşük Kd değeri ilacın reseptöre çok yüksek afiniteyle bağlandığını gösterir (Slayt 13).

### Öğrenci Görevi
> İki ilaçtan İlaç A'nın Kd değeri 1 nM, İlaç B'nin Kd değeri 100 nM'dir. Hangi ilacın afinitesi daha yüksektir?

### İskele Merdiveni
1. **Seviye 1 (Dürtme):** Kd ayrışma sabitidir; ayrışma sabiti küçüldükçe molekül reseptörden kolay mı ayrılır yoksa sıkı mı bağlanır?
2. **Seviye 2 (İpucu):** Afinite 1/Kd bağıntısıyla ters orantılıdır; daha az konsantrasyonda %50 doluluk sağlayan daha güçlü bağlanır.
3. **Seviye 3 (Çözüm):** 1 nM Kd değerine sahip İlaç A, 100 kat daha yüksek afiniteye sahiptir. (Slayt 13)

### Yanılgı Haritası
* `HIGH_KD_HIGH_AFFINITY` (Slayt 11, 13): Yüksek Kd değerinin yüksek afinite anlamına geldiği yanılgısı.
* `EFFICACY_KD_CONFUSION` (Slayt 12): Kd değerinin klinik etkinliği (Emax) belirlediği yanılgısı.

### Widget Yapılandırması
```json
{
  "type": "MultipleChoice",
  "config": {
    "prompt": "Kd değeri 1 nM olan İlaç X ile 50 nM olan İlaç Y karşılaştırıldığında hangisi doğrudur?",
    "options": [
      { "id": "correct", "text": "İlaç X'in reseptöre bağlanma afinitesi İlaç Y'den 50 kat daha yüksektir", "isCorrect": true },
      { "id": "HIGH_KD_HIGH_AFFINITY", "text": "İlaç Y'nin afinitesi daha yüksektir çünkü Kd değeri daha büyüktür", "isCorrect": false, "distractorRationale": "Afinite Kd ile ters orantılıdır; küçük Kd yüksek afinite demektir (Slayt 13)." },
      { "id": "EFFICACY_KD_CONFUSION", "text": "İlaç Y daha yüksek maksimal klinik etki (Emax) üretir", "isCorrect": false, "distractorRationale": "Kd yalnızca bağlanma afinitesini gösterir, intrinsik etkinlik (Emax) hakkında bilgi vermez (Slayt 12)." }
    ],
    "isMultiSelect": false,
    "explanation": "Kd reseptörlerin %50'sini doyuran konsantrasyondur; küçük Kd yüksek afinite demektir.",
    "source": { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 13 }
  }
}
```
<!-- END_CONCEPT -->

---

<!-- CONCEPT: ph:ec50_ve_emax -->
## Konsept 3: Kademeli Doz-Yanıt Eğrileri, EC50 Potens ve Emax
* **Slayt Kaynağı:** 14, 15, 16, 17, 18
* **Durum:** verified
* **Widget Türü:** `MultipleChoice`

### Bilimsel Öz
- Kademeli doz-yanıt eğrileri semilogaritmik eksende sigmoidaldir (Slayt 14).
- Emax ilacın oluşturabileceği tavan biyolojik yanıttır ve intrinsik etkinliği (efficacy) temsil eder (Slayt 16).
- EC50 yarı maksimal yanıta (%50 Emax) yol açan konsantrasyondur ve ilacın potensini yansıtır (Slayt 17).
- Küçük EC50 yüksek potens demektir; klinik tedavide tavan etkinlik (Emax) daima potense tercih edilir (Slayt 18).

### Öğrenci Görevi
> İlaç 1'in EC50'si 2 mg ve Emax'ı %60; İlaç 2'nin EC50'si 20 mg ve Emax'ı %100'dür. Şiddetli ağrıda hangisi üstündür?

### İskele Merdiveni
1. **Seviye 1 (Dürtme):** Klinikte hastanın ağrısını tamamen kesmek için ilacın miligramı mı yoksa tavan etkisi mi önemlidir?
2. **Seviye 2 (İpucu):** Potens (EC50) yalnızca verilecek dozu belirler; klinik tavan cevabı ise Emax belirler.
3. **Seviye 3 (Çözüm):** İlaç 2 daha yüksek Emax (%100) sağladığı için klinik olarak üstündür. (Slayt 18)

### Yanılgı Haritası
* `POTENCY_OVER_EFFICACY` (Slayt 16, 18): Küçük dozda etkili olan (yüksek potensli) ilacın daima daha üstün olduğu yanılgısı.
* `SLOPE_EFFICACY_TRAP` (Slayt 14): Eğrinin eğiminin tavan klinik etkiyi belirlediği sanrısı.

### Widget Yapılandırması
```json
{
  "type": "MultipleChoice",
  "config": {
    "prompt": "Klinik farmakolojide iki analjezik karşılaştırılırken hangisi birincil terapötik üstünlük kriteridir?",
    "options": [
      { "id": "correct", "text": "Maksimal tavan etki kapasitesi (Emax / Efficacy)", "isCorrect": true },
      { "id": "POTENCY_OVER_EFFICACY", "text": "Daha düşük miligramda etki göstermesi (EC50 / Potens)", "isCorrect": false, "distractorRationale": "Potens sadece dozu belirler; yetersiz tavan etki veren bir ilaç doz artırılsa bile ağrıyı dindiremez (Slayt 18)." },
      { "id": "SLOPE_EFFICACY_TRAP", "text": "Doz-yanıt eğrisinin dik eğime sahip olması", "isCorrect": false, "distractorRationale": "Eğim terapötik aralık güvenliğini gösterir, klinik tavan etkiyi yansıtmaz (Slayt 14)." }
    ],
    "isMultiSelect": false,
    "explanation": "Klinik etkinlikte tavan yanıt (Emax) temel belirleyicidir; potens sadece hapın miligram büyüklüğünü değiştirir.",
    "source": { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 18 }
  }
}
```
<!-- END_CONCEPT -->

---

<!-- CONCEPT: ph:tam_ve_parsiyel_agonist -->
## Konsept 4: Tam Agonist, Parsiyel Agonist ve İntrensek Aktivite
* **Slayt Kaynağı:** 20, 21, 22, 23, 24
* **Durum:** verified
* **Widget Türü:** `MultipleChoice`

### Bilimsel Öz
- Tam agonist reseptörleri aktive ederek maksimal tavan yanıt üretir (alfa = 1.0) (Slayt 20, 21).
- Parsiyel agonist tüm reseptörleri doldursa bile submaksimal yanıt verir (0 < alfa < 1.0) (Slayt 22).
- Yüksek doz tam agonist varlığında ortama parsiyel agonist eklenirse net sistem yanıtı düşer (Slayt 23).
- Bu durumda parsiyel agonist kompetitif antagonist gibi davranır (Morfin varlığında Buprenorfin) (Slayt 24).

### Öğrenci Görevi
> Yüksek doz morfin (tam agonist) alan bir hastaya buprenorfin (parsiyel agonist) verilirse ağrı kesici yanıtta ne olur?

### İskele Merdiveni
1. **Seviye 1 (Dürtme):** Buprenorfin reseptöre bağlandığında morfin moleküllerini oradan kovar mı?
2. **Seviye 2 (İpucu):** Morfin %100 yanıt verirken, buprenorfin sadece %50 tavan yanıt verebilir.
3. **Seviye 3 (Çözüm):** Morfini yerinden eden parsiyel agonist toplam yanıtı düşürür ve yoksunluk tetikler. (Slayt 24)

### Yanılgı Haritası
* `ADDITIVE_EFFECT_TRAP` (Slayt 23, 24): İki agonistin birlikte verildiğinde daima sinerjik etkiyle yanıtı artıracağı yanılgısı.
* `PARTIAL_ZERO_ACTIVITY` (Slayt 22): Parsiyel agonistin intrinsik aktivitesinin sıfır (antagonist) olduğu sanrısı.

### Widget Yapılandırması
```json
{
  "type": "MultipleChoice",
  "config": {
    "prompt": "Tam agonist ile doymuş bir biyolojik sisteme parsiyel agonist eklendiğinde ortaya çıkan etki nedir?",
    "options": [
      { "id": "correct", "text": "Tam agonisti reseptörden kovarak sistem yanıtını düşürür ve yarışmalı antagonist gibi davranır", "isCorrect": true },
      { "id": "ADDITIVE_EFFECT_TRAP", "text": "İki agonist birleştiği için tavan etki ve yanıt iki katına çıkar", "isCorrect": false, "distractorRationale": "Parsiyel agonistin içsel etkinliği düşüktür; tam agonistin yerini aldığında net yanıt azalır (Slayt 23)." },
      { "id": "PARTIAL_ZERO_ACTIVITY", "text": "Reseptöre hiç bağlanamaz çünkü tam agonist tarafından geri dönüşümsüz bloke edilmiştir", "isCorrect": false, "distractorRationale": "Parsiyel agonist yüksek afiniteyle reseptöre bağlanıp tam agonisti yerinden edebilir (Slayt 24)." }
    ],
    "isMultiSelect": false,
    "explanation": "Tam agonist varlığında parsiyel agonist kompetitif antagonist gibi etki göstererek yanıtı submaksimal düzeye çeker.",
    "source": { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 24 }
  }
}
```
<!-- END_CONCEPT -->

---

<!-- CONCEPT: ph:kompetitif_antagonizma -->
## Konsept 5: Kompetitif ve Non-Kompetitif Antagonizma (Schild Analizi)
* **Slayt Kaynağı:** 25, 26, 27, 28, 29
* **Durum:** verified
* **Widget Türü:** `MultipleChoice`

### Bilimsel Öz
- Kompetitif antagonist agonist ile aynı ortosterik bağlanma cebi için yarışır (Slayt 25).
- Kompetitif blokaj agonist dozu artırılarak tamamen aşılabilir (surmountable) (Slayt 26).
- Kompetitif antagonist varlığında doz-yanıt eğrisi paralel sağa kayar; Emax değişmez, EC50 artar (Slayt 26).
- Non-kompetitif blokaj allosterik veya kovalenttir; aşılamaz ve Emax çöker (Slayt 28).
- Schild regresyonunda log(DR-1) = log[B] - logKB formülüyle pA2 antagonist gücü ölçülür (Slayt 29).

### Öğrenci Görevi
> Bir antagonist eklendiğinde agonist eğrisi paralel sağa kaymış fakat Emax tavan yanıtı değişmemiştir. Bu hangi blokajdır?

### İskele Merdiveni
1. **Seviye 1 (Dürtme):** Agonist dozu artırıldığında eski tavan etkiye ulaşılabiliyor mu?
2. **Seviye 2 (İpucu):** Aşılabilen ve aynı bölgeye bağlanan antagonist türünü hatırla.
3. **Seviye 3 (Çözüm):** Emax'ı değiştirmeyip eğriyi paralel sağa kaydıran yarışmalı kompetitif antagonizmadır. (Slayt 26)

### Yanılgı Haritası
* `NONCOMP_PARALLEL_TRAP` (Slayt 26, 28): Non-kompetitif antagonizmanın da paralel sağa kayma yaptığı yanılgısı.
* `IRREVERSIBLE_SURMOUNTABLE` (Slayt 28): Kovalent kilitlenen antagonizmanın agonist dozuyla aşılabileceği yanılgısı.

### Widget Yapılandırması
```json
{
  "type": "MultipleChoice",
  "config": {
    "prompt": "Kompetitif (yarışmalı) antagonistlerin doz-yanıt eğrisi üzerindeki tipik etkisi nedir?",
    "options": [
      { "id": "correct", "text": "Eğriyi paralel sağa kaydırır; Emax değişmez, görünür EC50 artar", "isCorrect": true },
      { "id": "NONCOMP_PARALLEL_TRAP", "text": "Emax tavan yanıtını kalıcı olarak düşürür, EC50 değişmez", "isCorrect": false, "distractorRationale": "Emax düşüşü non-kompetitif (aşılmaz) antagonizmanın işaretidir (Slayt 28)." },
      { "id": "IRREVERSIBLE_SURMOUNTABLE", "text": "Eğriyi sola kaydırarak agonistin potensini artırır", "isCorrect": false, "distractorRationale": "Antagonist agonistin potensini düşürür, daha yüksek doz gerektirir (Slayt 26)." }
    ],
    "isMultiSelect": false,
    "explanation": "Kompetitif antagonist agonist ile yarışır; yüksek agonist konsantrasyonu ile blokaj aşılır ve Emax korunur.",
    "source": { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 26 }
  }
}
```
<!-- END_CONCEPT -->

---

<!-- CONCEPT: ph:ters_agonist -->
## Konsept 6: Konstitütif Reseptör Aktivitesi ve Ters Agonistler
* **Slayt Kaynağı:** 31, 32, 33, 34
* **Durum:** verified
* **Widget Türü:** `MultipleChoice`

### Bilimsel Öz
- İki durumlu reseptör modelinde reseptörler inaktif (R) ve aktif (R*) konformasyon dengesindedir (Slayt 31).
- Ligand yokluğunda bile kendiliğinden sinyal üreten bu duruma konstitütif (bazal) aktivite denir (Slayt 31, 32).
- Nötral antagonist her iki duruma eşit bağlanır ve bazal aktiviteyi değiştirmez (Slayt 32).
- Ters agonist (inverse agonist) seçici olarak inaktif R formuna bağlanıp bazal aktiviteyi sıfırın altına düşürür (alfa < 0) (Slayt 33, 34).

### Öğrenci Görevi
> Ligand yokluğunda bile bazal sinyal üreten bir reseptörde, bu bazal sinyali sıfırın altına baskılayan ilaç türü nedir?

### İskele Merdiveni
1. **Seviye 1 (Dürtme):** Nötral antagonist bazal sinyali değiştirmez; sıfırın altına düşüren negatif intrinsik aktiviteye sahip molekülü düşün.
2. **Seviye 2 (İpucu):** Bu molekül inaktif R konformasyonunu seçici olarak stabilize eder.
3. **Seviye 3 (Çözüm):** Bazal konstitütif aktiviteyi sıfırın altına düşüren ters agonisttir (inverse agonist). (Slayt 33)

### Yanılgı Haritası
* `NEUTRAL_INVERSE_CONFUSION` (Slayt 32, 33): Nötral antagonistin de bazal reseptör sinyalini sıfırladığı yanılgısı.
* `PARTIAL_INVERSE_TRAP` (Slayt 22, 33): Ters agonistin zayıf bir parsiyel agonist olduğu yanılgısı.

### Widget Yapılandırması
```json
{
  "type": "MultipleChoice",
  "config": {
    "prompt": "Konstitütif (kendiliğinden bazal sinyal üreten) bir reseptör sisteminde ters agonist (inverse agonist) ne yapar?",
    "options": [
      { "id": "correct", "text": "İnaktif R durumunu stabilize ederek bazal aktiviteyi sıfırın altına baskılar (alfa < 0)", "isCorrect": true },
      { "id": "NEUTRAL_INVERSE_CONFUSION", "text": "Bazal aktiviteyi hiç değiştirmeden sadece dışarıdan gelen agonisti engeller", "isCorrect": false, "distractorRationale": "Bazal aktiviteyi değiştirmeyen ajan nötral antagonisttir, ters agonist değildir (Slayt 32)." },
      { "id": "PARTIAL_INVERSE_TRAP", "text": "Reseptörü kısmen uyararak düşük düzeyde pozitif yanıt üretir", "isCorrect": false, "distractorRationale": "Pozitif submaksimal yanıt üreten ajan parsiyel agonisttir (Slayt 22)." }
    ],
    "isMultiSelect": false,
    "explanation": "Ters agonistler negatif içsel etkinliğe sahiptir ve ligandsız durumdaki konstitütif bazal sinyali sustururlar.",
    "source": { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 33 }
  }
}
```
<!-- END_CONCEPT -->

---

<!-- CONCEPT: ph:yedek_reseptorler -->
## Konsept 7: Yedek Reseptörler (Spare Receptors) ve Furchgott Deneyi
* **Slayt Kaynağı:** 36, 37, 38, 39
* **Durum:** verified
* **Widget Türü:** `MultipleChoice`

### Bilimsel Öz
- Biyokimyasal amplifikasyon nedeniyle maksimal doku yanıtı (Emax) için reseptörlerin tamamının dolması gerekmez (Slayt 36).
- EC50 değeri Kd ayrışma sabitinden belirgin derecede küçüktür (EC50 < Kd) (Slayt 37).
- Furchgott deneyinde doku geri dönüşümsüz blokörle (fenoksibenzamin) muamele edildiğinde yedek reseptörler tükenene kadar Emax korunur (Slayt 38, 39).
- Sadece eğri sağa kayar; ancak yedek reseptör havuzu bittiğinde Emax çökmeye başlar (Slayt 39).

### Öğrenci Görevi
> Reseptör havuzunun yalnızca %10'u dolduğunda %100 tavan yanıt (Emax) elde ediliyorsa bu farmakolojik durum nedir?

### İskele Merdiveni
1. **Seviye 1 (Dürtme):** Geriye kalan ve maksimal yanıtta işgal edilmeyen %90 reseptöre ne ad verilir?
2. **Seviye 2 (İpucu):** Bu durum hücre içi sinyal amplifikasyonu sayesinde oluşur (EC50 < Kd).
3. **Seviye 3 (Çözüm):** Tam yanıt için tüm reseptörlerin dolmasına gerek olmaması yedek reseptör (spare receptor) kavramıdır. (Slayt 36)

### Yanılgı Haritası
* `ALL_MUST_BIND_TRAP` (Slayt 36): Maksimal etki için daima reseptörlerin %100'ünün bağlanması gerektiği yanılgısı.
* `SPARE_IS_INACTIVE` (Slayt 37): Yedek reseptörlerin yapısal olarak kusurlu ve inaktif olduğu sanrısı.

### Widget Yapılandırması
```json
{
  "type": "MultipleChoice",
  "config": {
    "prompt": "Bir dokuda EC50 konsantrasyonunun Kd değerinden çok daha küçük olması (EC50 < Kd) neyi kanıtlar?",
    "options": [
      { "id": "correct", "text": "Dokuda yedek reseptör bulunduğunu ve sinyal kaskadında amplifikasyon olduğunu", "isCorrect": true },
      { "id": "ALL_MUST_BIND_TRAP", "text": "İlacın tüm reseptörleri kovalent olarak kilitlediğini", "isCorrect": false, "distractorRationale": "Kovalent kilitlenme yedek reseptör anlamına gelmez; EC50 < Kd fraksiyonel doluluğun yeterli olduğunu gösterir (Slayt 36)." },
      { "id": "SPARE_IS_INACTIVE", "text": "Dokudaki reseptörlerin çoğunun işlevsiz ve hasarlı olduğunu", "isCorrect": false, "distractorRationale": "Yedek reseptörler tamamen fonksiyoneldir ve yedek kapasite sunar (Slayt 37)." }
    ],
    "isMultiSelect": false,
    "explanation": "EC50 < Kd olması, sistemde yedek reseptör varlığını ve küçük bir dolulukla tam yanıt üretildiğini gösterir.",
    "source": { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 37 }
  }
}
```
<!-- END_CONCEPT -->

---

<!-- CONCEPT: ph:kuantal_ve_terapotik_indeks -->
## Konsept 8: Kuantal Doz-Yanıt, ED50 ve Terapötik İndeks (TI)
* **Slayt Kaynağı:** 41, 42, 43, 44, 45
* **Durum:** verified
* **Widget Türü:** `MultipleChoice`

### Bilimsel Öz
- Kuantal doz-yanıt popülasyonda ya-hep-ya-hiç şeklinde yanıt sıklığını inceler (Slayt 41, 42).
- ED50 popülasyonun %50'sinde terapötik etki gösteren medyan dozdur; TD50 toksik dozdur (Slayt 42).
- Terapötik İndeks TI = TD50 / ED50 güvenlik aralığını belirler (Slayt 43).
- Küçük TI dar terapötik indeksi gösterir ve TDM kan düzeyi izlemi gerektirir (Varfarin, Digoksin, Lityum) (Slayt 44, 45).

### Öğrenci Görevi
> Terapötik İndeksi (TI) çok dar olan ve klinikte rutin terapötik ilaç düzeyi izlemi (TDM) gerektiren ilaç hangisidir?

### İskele Merdiveni
1. **Seviye 1 (Dürtme):** TI formülü TD50 / ED50'dir; bu oran küçükse toksik doz ile tedavi edici doz birbirine çok yakındır.
2. **Seviye 2 (İpucu):** Marmara slaytlarında vurgulanan dar pencereli kardiyak glikozidi hatırla.
3. **Seviye 3 (Çözüm):** Digoksin çok dar terapötik indekse sahiptir ve toksisite riski yüksektir. (Slayt 45)

### Yanılgı Haritası
* `HIGH_TI_DANGEROUS` (Slayt 43): Büyük TI değerinin tehlikeli olduğu yanılgısı.
* `GRADED_QUANTAL_CONFUSION` (Slayt 41): Kuantal eğrinin tek bir bireydeki biyolojik yanıt şiddetini ölçtüğü sanrısı.

### Widget Yapılandırması
```json
{
  "type": "MultipleChoice",
  "config": {
    "prompt": "Bir ilacın Terapötik İndeksi (TI = TD50 / ED50) hakkında hangisi doğrudur?",
    "options": [
      { "id": "correct", "text": "TI değeri küçüldükçe güvenlik aralığı daralır ve toksisite riski artar", "isCorrect": true },
      { "id": "HIGH_TI_DANGEROUS", "text": "TI değeri ne kadar büyükse ilaç o kadar zehirli ve tehlikelidir", "isCorrect": false, "distractorRationale": "TI büyüdükçe toksik doz uzaklaşır ve ilacın güvenliği artar (Slayt 43)." },
      { "id": "GRADED_QUANTAL_CONFUSION", "text": "TI sadece tek bir bireyin kan basıncı düşüş şiddetini temsil eder", "isCorrect": false, "distractorRationale": "TI popülasyon düzeyindeki kuantal ya-hep-ya-hiç oranlarını temsil eder (Slayt 41)." }
    ],
    "isMultiSelect": false,
    "explanation": "Küçük TI değeri toksik doz ile tedavi dozunun birbirine yakın olduğunu gösterir; TDM takibi şarttır.",
    "source": { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 43 }
  }
}
```
<!-- END_CONCEPT -->

---

<!-- CONCEPT: ph:gpcr_yolaklari -->
## Konsept 9: GPCR Sinyal İletim Yolları (Gs, Gi, Gq)
* **Slayt Kaynağı:** 46, 47, 48, 49, 50
* **Durum:** verified
* **Widget Türü:** `MultipleChoice`

### Bilimsel Öz
- GPCR'lar 7 transmembran helezondan oluşan heterotrimerik G-proteini kenetli reseptörlerdir (Slayt 46).
- Gs proteini Adenilat Siklazı aktive eder, cAMP artar ve Protein Kinaz A (PKA) uyarılır (Slayt 47).
- Gi proteini Adenilat Siklazı inhibe eder ve cAMP sentezini baskılar (Slayt 48).
- Gq proteini Fosfolipaz C'yi (PLC) aktive eder; PIP2 yıkılarak IP3 (Ca2+ salınımı) ve DAG (PKC aktivasyonu) üretilir (Slayt 49, 50).

### Öğrenci Görevi
> Gq kenetli bir reseptör aktive edildiğinde hücre içinde üretilen iki temel ikincil haberci molekül hangisidir?

### İskele Merdiveni
1. **Seviye 1 (Dürtme):** Gq proteini adenilat siklazı değil, membran fosfolipitlerini yıkan Fosfolipaz C enzimini uyarır.
2. **Seviye 2 (İpucu):** PIP2 membran fosfolipiti parçalandığında kalsiyum salan bir molekül ve membran enzimi aktive eden bir lipit doğar.
3. **Seviye 3 (Çözüm):** Fosfolipaz C aktivasyonuyla IP3 ve DAG ikincil habercileri üretilir. (Slayt 49)

### Yanılgı Haritası
* `GQ_MAKES_CAMP` (Slayt 47, 49): Gq proteininin de cAMP ve PKA yolağını kullandığı yanılgısı.
* `IP3_BLOCKS_CALCIUM` (Slayt 50): IP3'ün kalsiyum girişini engellediği yanılgısı.

### Widget Yapılandırması
```json
{
  "type": "MultipleChoice",
  "config": {
    "prompt": "Gq proteinine kenetli alfa-1 adrenerjik reseptör uyarıldığında hangi sinyal kaskadı tetiklenir?",
    "options": [
      { "id": "correct", "text": "Fosfolipaz C (PLC) aktivasyonu ile IP3 ve DAG üretimi, intraselüler Ca2+ artışı", "isCorrect": true },
      { "id": "GQ_MAKES_CAMP", "text": "Adenilat siklaz uyarımı ve hücre içi cAMP düzeyinde artış", "isCorrect": false, "distractorRationale": "Adenilat siklaz ve cAMP artışı Gs proteininin yolağıdır, Gq'nun değil (Slayt 47)." },
      { "id": "IP3_BLOCKS_CALCIUM", "text": "İntraselüler kalsiyum kanallarının tamamen kapatılması", "isCorrect": false, "distractorRationale": "IP3 endoplazmik retikulumdan sitozole Ca2+ salınımını güçlü şekilde uyarır (Slayt 50)." }
    ],
    "isMultiSelect": false,
    "explanation": "Gq uyarımı PLC'yi aktive eder; oluşan IP3 kalsiyum salar, DAG ise PKC'yi uyarır.",
    "source": { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 49 }
  }
}
```
<!-- END_CONCEPT -->

---

<!-- CONCEPT: ph:desensitizasyon -->
## Konsept 10: Desensitizasyon, Takifilaksi ve Up/Down Regülasyon
* **Slayt Kaynağı:** 53, 54, 55, 56, 57
* **Durum:** verified
* **Widget Türü:** `MultipleChoice`

### Bilimsel Öz
- Takifilaksi dakikalar içinde hızla gelişen akut desensitizasyondur (efedrin, nitratlar) (Slayt 53).
- Homolog desensitizasyonda GRK reseptörü fosforiller ve beta-arrestin bağlanarak reseptörü kilitler (Slayt 54, 55).
- Sürekli agonist maruziyeti reseptörlerin endositozla yıkılmasına (down-regülasyon) ve toleransa yol açar (Slayt 56).
- Sürekli antagonist maruziyeti reseptör sayısını artırır (up-regülasyon); ilacın ani kesilmesinde tehlikeli rebound kriz doğar (Slayt 57).

### Öğrenci Görevi
> Kronik beta bloker kullanan bir hastada ilacın aniden kesilmesi neden tehlikeli rebound taşikardiye yol açar?

### İskele Merdiveni
1. **Seviye 1 (Dürtme):** Uzun süre reseptörü bloke edilen bir hücre, reseptör sayısını artırır mı azaltır mı?
2. **Seviye 2 (İpucu):** Reseptör sayısı arttığında (up-regülasyon) ortamdaki endojen adrenalin hücreyi aşırı uyarır.
3. **Seviye 3 (Çözüm):** Kronik antagonist maruziyeti up-regülasyon yapar; aniden kesilince aşırı uyarılma krizi gelişir. (Slayt 57)

### Yanılgı Haritası
* `ANTAGONIST_DOWNREG` (Slayt 56, 57): Antagonistlerin reseptörleri yok ederek down-regülasyon yaptığı yanılgısı.
* `TACHYPHYLAXIS_IS_GENETIC` (Slayt 53): Takifilaksinin genetik mutasyonlarla aylarca sürede geliştiği sanrısı.

### Widget Yapılandırması
```json
{
  "type": "MultipleChoice",
  "config": {
    "prompt": "Kronik antagonist kullanımında reseptör yoğunluğunda ne gerçekleşir ve ani ilaç kesiminde neye yol açar?",
    "options": [
      { "id": "correct", "text": "Up-regülasyon gerçekleşir; ilaç aniden kesilirse şiddetli rebound aşırı uyarılma krizi doğar", "isCorrect": true },
      { "id": "ANTAGONIST_DOWNREG", "text": "Down-regülasyon gerçekleşir; reseptör sayısı sıfıra iner ve hücre felç olur", "isCorrect": false, "distractorRationale": "Down-regülasyon kronik agonist maruziyetinde görülür; antagonistler up-regülasyona neden olur (Slayt 56, 57)." },
      { "id": "TACHYPHYLAXIS_IS_GENETIC", "text": "Reseptörlerin genetik DNA yapısı mutasyona uğrayarak kalıcı olarak silinir", "isCorrect": false, "distractorRationale": "Up- ve down-regülasyon fizyolojik homeostazis yanıtıdır, DNA mutasyonu değildir (Slayt 57)." }
    ],
    "isMultiSelect": false,
    "explanation": "Antagonist maruziyeti reseptör sayısını artırır (up-regülasyon); ilaç aniden kesildiğinde endojen aminler rebound kriz yaratır.",
    "source": { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 57 }
  }
}
```
<!-- END_CONCEPT -->
