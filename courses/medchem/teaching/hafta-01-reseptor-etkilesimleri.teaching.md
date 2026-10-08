# Ders: İlaç Reseptör Etkileşiminde Kimyasal Bağlar

| Alan | Değer |
|---|---|
| Ders kodu | MEDCHEM-01 |
| Ders | Farmasötik Kimya (Prof. Dr. Bedia Kaymakçıoğlu slaytları) |
| Kaynak dosya | `İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf` (33 slayt) |
| Hedef sınav | Farmasötik Kimya vizesi |
| Durum | **TASLAK.** Her konseptin `Durum` satırı, siz ve hoca slaytlarla karşılaştırıp `verified` yapana kadar `draft` kalır. |
| Doğrulama ilkesi | Her bilgi yalnızca bu slayt dosyasından alındı. Dışarıdan bilgi eklenmedi. |

> Bu dosyadaki ifadeler slaytlardan özgün cümlelerle yeniden yazıldı. Slayt görselleri kopyalanmadı.
> Kapsam dışı / doğrulanmamış noktalar en altta **Doğrulama Günlüğü**'nde listelidir ve widget'lara alınmamıştır.

---

<!-- CONCEPT: rr:receptor_tanimi -->
## Konsept 1: Reseptör ve bağ gücü dengesi
* **Slayt Kaynağı:** 2, 3, 5, 6
* **Durum:** verified
* **Widget Türü:** `MultipleChoice`

### Bilimsel Öz
- İlaç etkisini anlamak için ilaç ile reseptör arasındaki bağ kuvvetlerini bilmek gerekir (Slayt 2).
- Bu bağlar reseptörün şeklini değiştirebilecek kadar güçlü olmalı; sinyal iletildikten sonra ilacı kolayca serbest bırakacak kadar da geri dönüşümlü olmalıdır (Slayt 2).
- Reseptör, hormon ve nöromediyatör gibi endojen maddelere ve ilaçlara seçici afinite gösteren, fizyolojik etkiyi başlatan hücresel biyomakromoleküldür (Slayt 3).
- Reseptörlerin çoğu hücre zarı yüzeyindedir; steroit ve tiroit hormon reseptörleri ise hücre içindedir (Slayt 5).
- İki işlevi vardır: ligandı seçici tanımak ve kimyasal sinyali biyolojik sinyale çevirmek (Slayt 6).

### Öğrenci Görevi
> İlaç reseptöre bağlandı ve sinyal iletilecek. Sence ilaç-reseptör bağları nasıl olmalı? Önce tahmin et, sonra seçimini kontrol et.

### İskele Merdiveni
1. **Seviye 1 (Dürtme):** Düşün: ilaç sinyali verdikten sonra reseptörde sonsuza kadar kalsaydı ne olurdu? Reseptör bir sonraki sinyale hazır olabilir miydi?
2. **Seviye 2 (İpucu):** İki şartı birlikte ara: bağ reseptörün şeklini değiştirebilmeli, ama iş bitince ilaç serbest kalabilmeli. Hangi seçenek ikisini birden sağlıyor?
3. **Seviye 3 (Çözüm):** Bağlar reseptörün şeklini değiştirecek kadar güçlü, sinyalden sonra ilacı kolayca bırakacak kadar geri dönüşümlü olmalıdır. (Slayt 2)

### Yanılgı Haritası
* `STRONGEST_IS_BEST` (Slayt 2, 9): En güçlü ve kalıcı bağ en iyisi sanılıyor. Slayta göre kalıcı, geri dönüşümsüz etki genellikle istenmez; yalnızca antibakteriyel, antiparaziter, antifungal ve antikanser gibi bazı etkilerde aranır.
* `MISSING_SHAPE_CHANGE` (Slayt 2): Çok zayıf bağ yeterli sanılıyor. Slayt, bağların reseptörün şeklini değiştirebilecek kadar güçlü olmasını da şart koşar.

### Widget Yapılandırması
```json
{
  "type": "MultipleChoice",
  "config": {
    "prompt": "İlaç reseptöre bağlandı ve sinyal iletilecek. İlaç-reseptör bağları nasıl olmalıdır?",
    "options": [
      { "id": "correct", "text": "Reseptörün şeklini değiştirecek kadar güçlü, sinyalden sonra ilacı bırakacak kadar geri dönüşümlü", "isCorrect": true },
      { "id": "STRONGEST_IS_BEST", "text": "Mümkün olan en güçlü ve kalıcı bağlar; böylece etki en uzun sürer", "isCorrect": false, "distractorRationale": "Kalıcı etki genellikle istenmez; yalnızca bazı ilaç gruplarında aranır (Slayt 9)." },
      { "id": "MISSING_SHAPE_CHANGE", "text": "Çok zayıf bağlar; böylece ilaç reseptörden hep kolayca ayrılır", "isCorrect": false, "distractorRationale": "Bağlar reseptörün şeklini değiştirebilecek kadar güçlü de olmalıdır (Slayt 2)." }
    ],
    "isMultiSelect": false,
    "explanation": "Bağlar, reseptörün şeklini değiştirebilecek kadar güçlü, sinyal iletildikten sonra ilacı kolayca serbest bırakacak kadar geri dönüşümlü olmalıdır.",
    "source": { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 2 }
  }
}
```
<!-- END_CONCEPT -->

---

<!-- CONCEPT: rr:kovalan_baglar -->
## Konsept 2: Kovalan bağlar
* **Slayt Kaynağı:** 9, 10, 11, 12, 13
* **Durum:** verified
* **Widget Türü:** `MultipleChoice`

### Bilimsel Öz
- Kovalan bağlar elektron çiftlerinin ortaklanmasıyla oluşur ve ilaç-reseptör arasındaki en kuvvetli bağlardır; ancak ilaçların çoğu geri dönüşümsüz kovalan bağ yapabilecek fonksiyonel gruplar taşımadığı için seyrek görülür (Slayt 9).
- Uzun süreli, geri dönüşümsüz etki yaptığı için genelde istenmez; bazı antibakteriyel, antiparaziter, antifungal ve antikanser etkilerde istenir (Slayt 9).
- Üç reaksiyon türü: alkilasyon, açilasyon, fosforilasyon (Slayt 9).
- Alkilleyici kanser ilaçları reseptör proteinlerin serbest amino gruplarını veya nükleik asitlerin adenil ya da fosfat gruplarını alkiler; çoğu seçici değildir (Slayt 10).
- Beta-laktam halkalı antibiyotikler, transpeptidaz enziminin serin hidroksilini açiller (Slayt 11).
- Organofosfatlar, aktif bölgesinde serin taşıyan enzimleri fosforiller (Slayt 12).
- Ağır metal (As, Bi, Sb vb.) taşıyan antiparaziter ilaçlar enzimin tiyol gruplarıyla kovalan bağ yapar (Slayt 13).

### Öğrenci Görevi
> Organofosfat insektisitler asetilkolin esteraz enzimine nasıl bağlanır? Reaksiyon adını ve enzimdeki hedef grubu düşün.

### İskele Merdiveni
1. **Seviye 1 (Dürtme):** Önce reaksiyon adını düşün: alkilasyon, açilasyon ve fosforilasyon. Organofosfat bileşiğinin adı hangisini düşündürüyor?
2. **Seviye 2 (İpucu):** Slaytta serin hidroksili iki ilaç grubunun hedefi. Biri transpeptidaz enzimini, öbürü asetilkolin esteraz gibi enzimleri etkiliyor. Organofosfat hangisi?
3. **Seviye 3 (Çözüm):** Organofosfatlar, aktif bölgesinde serin taşıyan enzimleri fosforiller ve geri dönüşümsüz kovalan bağ oluşturur. (Slayt 12)

### Yanılgı Haritası
* `CONFUSES_ACYLATION` (Slayt 11, 12): Açilasyon ile fosforilasyon karıştırılıyor. Serin hidroksilini açilleyenler beta-laktam antibiyotiklerdir; organofosfatlar fosforiller.
* `CONFUSES_THIOL_TARGET` (Slayt 13, 12): Hedef grup karıştırılıyor. Tiyol gruplarıyla bağ kuranlar ağır metalli antiparaziter ilaçlardır; organofosfatın hedefi enzimdeki serindir.
* `TREATS_COVALENT_AS_WEAK` (Slayt 9, 12): Kovalan bağ geri dönüşümlü sanılıyor. Slayta göre kovalan bağlar en kuvvetli ve geri dönüşümsüz etkileşimlerdir.

### Widget Yapılandırması
```json
{
  "type": "MultipleChoice",
  "config": {
    "prompt": "Organofosfat insektisitler asetilkolin esteraz enzimine hangi reaksiyonla bağlanır?",
    "options": [
      { "id": "correct", "text": "Aktif bölgedeki serini fosforiller; kovalan bağ oluşur", "isCorrect": true },
      { "id": "CONFUSES_ACYLATION", "text": "Enzimdeki serin hidroksilini açiller", "isCorrect": false, "distractorRationale": "Açilasyon beta-laktam antibiyotiklerin mekanizmasıdır (Slayt 11); organofosfatlar fosforiller (Slayt 12)." },
      { "id": "CONFUSES_THIOL_TARGET", "text": "Enzimin tiyol gruplarıyla kovalan bağ yapar", "isCorrect": false, "distractorRationale": "Tiyol hedefi ağır metalli antiparaziter ilaçlara aittir (Slayt 13)." },
      { "id": "TREATS_COVALENT_AS_WEAK", "text": "Zayıf ve geri dönüşümlü bir bağ kurar", "isCorrect": false, "distractorRationale": "Kovalan bağlar en kuvvetli ve geri dönüşümsüz bağlardır (Slayt 9)." }
    ],
    "isMultiSelect": false,
    "explanation": "Organofosfatlar, aktif bölgesinde serin taşıyan enzimleri fosforiller; örnek olarak asetilkolin esteraz ve butiril kolin esteraz verilir.",
    "source": { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 12 }
  }
}
```
<!-- END_CONCEPT -->

---

<!-- CONCEPT: rr:iyonik_bag -->
## Konsept 3: İyonik bağ
* **Slayt Kaynağı:** 13, 14
* **Durum:** verified
* **Widget Türü:** `PredictThenReveal`

### Bilimsel Öz
- İyonik bağ, zıt yüklü iyonlar arasındaki elektrostatik çekimle oluşur (Slayt 13).
- Gücü zıt yüklerin miktarına, yükler arasındaki mesafeye ve ortamın dielektrik sabitine bağlıdır (Slayt 13).
- Mesafe ve ortamın dielektrik sabiti arttıkça bağın gücü zayıflar (Slayt 13).
- Zayıf asit veya baz özellikli ilaçlar ve reseptörler fizyolojik pH'da iyonlaşabilen gruplar taşır; zıt yüklü iyonlar belli bir mesafeye yaklaşınca iyonik bağ oluşur (Slayt 14).
- Slaytlarda sayısal formül veya değer yoktur. [NOT IN MATERIALS]

### Öğrenci Görevi
> Zıt yüklü iki grup birbirinden uzaklaşıyor ve ortamın dielektrik sabiti artıyor. Önce iyonik bağın gücüne ne olacağını tahmin et.

### İskele Merdiveni
1. **Seviye 1 (Dürtme):** Zıt yüklere uzaktan baktığını düşün. Aradaki mesafe büyüdükçe çekim aynı mı kalır?
2. **Seviye 2 (İpucu):** Bağ gücü üç şeye bağlı: yük miktarı, mesafe ve dielektrik sabiti. Bu soruda hangi ikisi artıyor, gücü hangi yöne iter?
3. **Seviye 3 (Çözüm):** Mesafe ve ortamın dielektrik sabiti arttıkça iyonik bağın gücü zayıflar. (Slayt 13)

### Yanılgı Haritası
* `DISTANCE_NO_EFFECT` (Slayt 13): Yükler zıtsa mesafe önemsiz sanılıyor. Slayta göre mesafe arttıkça bağ zayıflar.
* `DISTANCE_STRENGTHENS` (Slayt 13): Uzaklaşınca bağın güçleneceği sanılıyor. Slayta göre mesafe ve dielektrik sabiti arttıkça bağ zayıflar.
* `SOLVENT_IRRELEVANT` (Slayt 13): Ortamın etkisiz olduğu sanılıyor. Slayta göre ortamın dielektrik sabiti de bağ gücünü belirler.

### Widget Yapılandırması
```json
{
  "type": "PredictThenReveal",
  "config": {
    "prompt": "Mesafe ve ortamın dielektrik sabiti artarsa iyonik bağın gücüne ne olur?",
    "scenarioDescription": "Fizyolojik pH'da iyonlaşmış bir ilaç grubu ile reseptördeki zıt yüklü grup arasında iyonik bağ var. Gruplar birbirinden uzaklaşıyor ve çevrenin dielektrik sabiti artıyor.",
    "options": [
      { "id": "correct", "label": "Bağ zayıflar", "isCorrect": true },
      { "id": "DISTANCE_NO_EFFECT", "label": "Değişmez; zıt yükler her mesafede aynı çeker", "isCorrect": false, "misconceptionFeedback": "Slayta göre mesafe arttıkça iyonik bağın gücü zayıflar (Slayt 13)." },
      { "id": "DISTANCE_STRENGTHENS", "label": "Bağ güçlenir", "isCorrect": false, "misconceptionFeedback": "Slayta göre mesafe ve dielektrik sabiti arttıkça bağ zayıflar (Slayt 13)." },
      { "id": "SOLVENT_IRRELEVANT", "label": "Yalnızca mesafe etkiler; ortamın etkisi yoktur", "isCorrect": false, "misconceptionFeedback": "Ortamın dielektrik sabiti de bağ gücünü etkiler (Slayt 13)." }
    ],
    "revealedOutcome": "Mesafe ve ortamın dielektrik sabiti arttıkça iyonik bağın gücü zayıflar.",
    "explanation": "İyonik bağın gücü yük miktarına, yükler arası mesafeye ve ortamın dielektrik sabitine bağlıdır.",
    "source": { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 13 }
  }
}
```
<!-- END_CONCEPT -->

---

<!-- CONCEPT: rr:hidrojen_bagi -->
## Konsept 4: Hidrojen bağı (donör ve akseptör)
* **Slayt Kaynağı:** 15, 16, 17
* **Durum:** verified
* **Widget Türü:** `MultipleChoice`

### Bilimsel Öz
- Hidrojen bağında hidrojen atomu bir donör (X) ile bir akseptör (Y) arasında ortaklanır; X–H···Y biçiminde gösterilir (Slayt 15).
- X ve Y, elektronegatifliği yüksek veya serbest elektron çifti taşıyan heteroatomlardır: oksijen, azot, kükürt (Slayt 15).
- Elektron çifti C=O, –OH, –NH2, imino gibi gruplardan gelir; elektron eksikliği olan hidrojen hidroksil, tiyol ve amino gruplarındadır (Slayt 15).
- Hidrojen atomu küçük olduğu ve elektron bulutundan yoksun olduğu için bu etkileşim için idealdir (Slayt 16).
- Aynı molekülün iki grubu arasındaki bağ molekül içi, farklı moleküller arasındaki bağ moleküller arası hidrojen bağıdır (Slayt 17).
- Slayt 16'daki kararlılık sıralaması bu kopyada **kullanılmadı**: sıra işaretleri metin çıkarmada kayboldu. [NOT IN MATERIALS]

### Öğrenci Görevi
> X–H···Y hidrojen bağında donör tarafı hangisidir? Hangi grubun hidrojeni bağ verebilir, düşün.

### İskele Merdiveni
1. **Seviye 1 (Dürtme):** Donör, hidrojeni "veren" taraf. Hangi grupta hidrojen elektron eksikliğine sahip olur?
2. **Seviye 2 (İpucu):** Slayta göre hidrojen, hidroksil, tiyol veya amino gibi gruplarda elektron eksikliği taşır. Bu gruplardaki ortak atom türüne bak.
3. **Seviye 3 (Çözüm):** Donör, elektron eksikliği olan hidrojeni taşıyan hidroksil, tiyol veya amino grubudur; akseptör serbest elektron çifti taşıyan O, N, S'dir. (Slayt 15)

### Yanılgı Haritası
* `ANY_H_IS_DONOR` (Slayt 15): Karbona bağlı herhangi bir hidrojenin donör olacağı sanılıyor. Slayta göre X ve Y elektronegatifliği yüksek heteroatomlardır (O, N, S).
* `ROLES_SWAPPED` (Slayt 15): Donör ile akseptör rolleri karıştırılıyor. Serbest elektron çifti taşıyan taraf akseptör, elektron eksikliği olan hidrojeni taşıyan taraf donördür.

### Widget Yapılandırması
```json
{
  "type": "MultipleChoice",
  "config": {
    "prompt": "X–H···Y hidrojen bağında donör (X) tarafı aşağıdakilerden hangisidir?",
    "options": [
      { "id": "correct", "text": "Elektron eksikliği olan hidrojeni taşıyan hidroksil, tiyol veya amino grubu", "isCorrect": true },
      { "id": "ANY_H_IS_DONOR", "text": "Karbona bağlı herhangi bir hidrojen", "isCorrect": false, "distractorRationale": "Slayta göre X ve Y elektronegatifliği yüksek heteroatomlardır (O, N, S) (Slayt 15)." },
      { "id": "ROLES_SWAPPED", "text": "Serbest elektron çifti taşıyan karbonil oksijeni", "isCorrect": false, "distractorRationale": "Serbest elektron çifti veren taraf akseptördür; donör hidrojeni taşıyan taraftır (Slayt 15)." }
    ],
    "isMultiSelect": false,
    "explanation": "Hidrojen bağında donör hidrojeni taşıyan hidroksil, tiyol veya amino grubudur; akseptör serbest elektron çifti taşıyan O, N veya S atomudur.",
    "source": { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 15 }
  }
}
```
<!-- END_CONCEPT -->

---

<!-- CONCEPT: rr:hbag_ozellik_etkisi -->
## Konsept 5: Hidrojen bağı özellikleri ve etkiyi değiştirir
* **Slayt Kaynağı:** 19
* **Durum:** verified
* **Widget Türü:** `MultipleChoice`

### Bilimsel Öz
- Hidrojen bağı molekülün fiziksel ve kimyasal özelliklerini genellikle önemli ölçüde değiştirir: çözünürlük, erime derecesi, pKa, partisyon katsayısı ve bazı spektral özellikler (Slayt 19).
- Bu değişiklikler farmakolojik özelliklerde de fark yaratır (Slayt 19).
- Molekül içi hidrojen bağı yapabilen salisilik asit antibakteriyel etki gösterir; yapısal izomerleri m- ve p-hidroksibenzoik asit moleküller arası hidrojen bağlarıyla polimer oluşturur ve bu etkiyi göstermez (Slayt 19).
- Slayt 18'de çıkarılabilen metin yok (muhtemelen yalnızca görsel); bu konseptte kullanılmadı. [NOT IN MATERIALS]

### Öğrenci Görevi
> Salisilik asit antibakteriyel, yapısal izomerleri m- ve p-hidroksibenzoik asit değil. Hidrojen bağının türüne bakarak nedenini seç.

### İskele Merdiveni
1. **Seviye 1 (Dürtme):** Üçü de izomer; fark atomlarda değil. Hidrojen bağının nerede kurulduğuna bak.
2. **Seviye 2 (İpucu):** Biri bağı kendi molekülü içinde, diğer ikisi başka moleküllerle kuruyor. Polimer oluşturan hangisi, kendi içinde bağ kuran hangisi?
3. **Seviye 3 (Çözüm):** Salisilik asit molekül içi, m- ve p- izomerler moleküller arası hidrojen bağı yapar. Bu fark özellikleri ve etkiyi değiştirir. (Slayt 19)

### Yanılgı Haritası
* `REVERSED_INTRA_INTER` (Slayt 19): Bağ türleri ters yerleştiriliyor. Salisilik asit molekül içi, m- ve p-hidroksibenzoik asit moleküller arası hidrojen bağı yapar.
* `HBOND_ONLY_PHYSICAL` (Slayt 19): Hidrojen bağının yalnızca fiziksel özellikleri etkilediği sanılıyor. Slayta göre fark farmakolojik özelliklere de yansır.

### Widget Yapılandırması
```json
{
  "type": "MultipleChoice",
  "config": {
    "prompt": "Yalnızca salisilik asit antibakteriyel etkilidir; m- ve p-hidroksibenzoik asit değildir. Slayta göre neden?",
    "options": [
      { "id": "correct", "text": "Salisilik asit molekül içi, m- ve p- izomerler moleküller arası hidrojen bağı yapar", "isCorrect": true },
      { "id": "REVERSED_INTRA_INTER", "text": "Salisilik asit moleküller arası, m- ve p- izomerler molekül içi hidrojen bağı yapar", "isCorrect": false, "distractorRationale": "Bağ türleri ters: salisilik asit molekül içi bağ yapar (Slayt 19)." },
      { "id": "HBOND_ONLY_PHYSICAL", "text": "Hidrojen bağı yalnızca erime derecesini etkiler; fark başka bir nedenden gelir", "isCorrect": false, "distractorRationale": "Hidrojen bağı fiziksel özelliklerle birlikte farmakolojik özellikleri de değiştirir (Slayt 19)." }
    ],
    "isMultiSelect": false,
    "explanation": "Molekül içi hidrojen bağı yapan salisilik asit antibakteriyeldir; moleküller arası bağlarla polimer oluşturan m- ve p-hidroksibenzoik asit bu etkiyi göstermez.",
    "source": { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 19 }
  }
}
```
<!-- END_CONCEPT -->

---

<!-- CONCEPT: rr:iyon_dipol_dipol_dipol -->
## Konsept 6: İyon-dipol ve dipol-dipol etkileşimleri
* **Slayt Kaynağı:** 20, 21
* **Durum:** verified
* **Widget Türü:** `MultipleChoice`

### Bilimsel Öz
- Karbonla oksijen veya azot gibi heteroatomlar arasındaki elektronegatiflik farkı elektronların asimetrik dağılmasına, yani dipol oluşmasına yol açar (Slayt 20).
- Dipol gösteren gruplara karbonil bileşikleri (amit, ester, keton), nitriller ve eterler örnektir (Slayt 20).
- Bu kutuplar zıt işaretli iyonlarla (iyon-dipol) veya diğer kutuplarla (dipol-dipol) zayıf ve geri dönüşümlü bağlar kurar (Slayt 21).
- Dielektrik sabiti, dipoller arası mesafe ve grupların yerleşimi önemlidir; mesafe dipol-dipol etkileşmelerinde iyon-dipol etkileşmelerine göre daha önemli ve daha küçüktür (Slayt 21).

### Öğrenci Görevi
> İyon-dipol ve dipol-dipol etkileşimlerinin ortak özelliği nedir? Bağ gücü ve kalıcılığı üzerinden düşün.

### İskele Merdiveni
1. **Seviye 1 (Dürtme):** Dipol, iki atom arasındaki elektronegatiflik farkından doğar; kısmi yük taşır, tam iyon değildir. Bu, bağın gücü hakkında ne düşündürüyor?
2. **Seviye 2 (İpucu):** Slaytta bu iki etkileşim için iki sıfat geçiyor: biri güç, biri kalıcılık hakkında. İyonik ve kovalan bağlarla kıyasla.
3. **Seviye 3 (Çözüm):** İyon-dipol ve dipol-dipol etkileşimleri zayıf ve geri dönüşümlü bağlardır. (Slayt 21)

### Yanılgı Haritası
* `DIPOLE_EQUALS_IONIC` (Slayt 21): Dipol etkileşiminin iyonik bağ kadar güçlü olduğu sanılıyor. Slayta göre zayıf ve geri dönüşümlüdür.
* `DIPOLE_IS_COVALENT` (Slayt 21, 9): Dipol etkileşimi kovalan bağ gibi kalıcı sanılıyor. Geri dönüşümsüz etki kovalan bağlara özgüdür; dipol etkileşimleri geri dönüşümlüdür.

### Widget Yapılandırması
```json
{
  "type": "MultipleChoice",
  "config": {
    "prompt": "İyon-dipol ve dipol-dipol etkileşimlerinin ortak özelliği hangisidir?",
    "options": [
      { "id": "correct", "text": "Zayıf ve geri dönüşümlü bağlardır", "isCorrect": true },
      { "id": "DIPOLE_EQUALS_IONIC", "text": "İyonik bağ kadar güçlüdür", "isCorrect": false, "distractorRationale": "Slayta göre bu etkileşimler zayıftır (Slayt 21)." },
      { "id": "DIPOLE_IS_COVALENT", "text": "Kovalan bağ gibi geri dönüşümsüzdür", "isCorrect": false, "distractorRationale": "Geri dönüşümsüzlük kovalan bağlara özgüdür; dipol etkileşimleri geri dönüşümlüdür (Slayt 21, 9)." }
    ],
    "isMultiSelect": false,
    "explanation": "Karbonil bileşikleri, nitriller ve eterler gibi gruplardaki kutuplar zıt yüklü bölgelerle zayıf ve geri dönüşümlü bağlar kurar.",
    "source": { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 21 }
  }
}
```
<!-- END_CONCEPT -->

---

<!-- CONCEPT: rr:yuk_transferi -->
## Konsept 7: Yük transfer etkileşimleri
* **Slayt Kaynağı:** 22, 23
* **Durum:** verified
* **Widget Türü:** `MultipleChoice`

### Bilimsel Öz
- Yük transferi, bir tür moleküler dipol-dipol etkileşmesidir: elektron donörü molekülden akseptör moleküle yük geçer ve yük transfer kompleksi oluşur (Slayt 22).
- Gücü, donörün iyonizasyon potansiyeli ile akseptörün elektron afinitesi arasındaki farkla orantılıdır (Slayt 22).
- Zayıf bir etkileşimdir; ancak diğer bağ tipleriyle birlikte toplam ilaç etkisinde rol oynar (Slayt 22).
- Elektron veren sübstitüentli alken, alkin ve aromatik gruplar ile ortaklanmamış elektron çifti taşıyan gruplar donör; elektron çeken sübstitüentli alken, alkin ve aromatik yapılar ile zayıf asidik protonlar akseptördür (Slayt 22).
- Klasik örnek, aromatik halkaların pi sistemlerinin üst üste gelmesidir (Slayt 22). Klorotalonil örneğinin yapısı bu kopyada kullanılmadı. [NOT IN MATERIALS]

### Öğrenci Görevi
> Yük transfer kompleksinde elektron veren taraf hangisidir? Sübstitüentin elektron verip vermediğine göre karar ver.

### İskele Merdiveni
1. **Seviye 1 (Dürtme):** Donör elektron verir, akseptör elektron alır. Hangi sübstitüent elektron çekmez, tam tersine elektron kazandırır?
2. **Seviye 2 (İpucu):** Metoksi gibi elektron veren sübstitüentli halka donör rolüne, nitro gibi elektron çeken sübstitüentli halka akseptör rolüne uyar. Hangi seçenek donörü anlatıyor?
3. **Seviye 3 (Çözüm):** Elektron veren sübstitüentli aromatik, alken veya alkin gruplar ile ortaklanmamış elektron çifti taşıyan gruplar donördür. (Slayt 22)

### Yanılgı Haritası
* `EWG_IS_DONOR` (Slayt 22): Elektron çeken sübstitüentli yapı donör sanılıyor. Slayta göre bu yapılar akseptördür.
* `WEAK_ACID_PROTON_IS_DONOR` (Slayt 22): Zayıf asidik proton donör sanılıyor. Slayta göre zayıf asidik protonlar elektron akseptörüdür.

### Widget Yapılandırması
```json
{
  "type": "MultipleChoice",
  "config": {
    "prompt": "Yük transfer etkileşiminde elektron donörü rolünü hangi yapı üstlenir?",
    "options": [
      { "id": "correct", "text": "Elektron veren sübstitüentli aromatik halka", "isCorrect": true },
      { "id": "EWG_IS_DONOR", "text": "Elektron çeken sübstitüentli aromatik halka", "isCorrect": false, "distractorRationale": "Elektron çeken sübstitüentli yapılar akseptördür (Slayt 22)." },
      { "id": "WEAK_ACID_PROTON_IS_DONOR", "text": "Zayıf asidik proton", "isCorrect": false, "distractorRationale": "Zayıf asidik protonlar elektron akseptörüdür (Slayt 22)." }
    ],
    "isMultiSelect": false,
    "explanation": "Donör, elektron veren sübstitüentli alken, alkin ve aromatik gruplar veya ortaklanmamış elektron çifti taşıyan gruplardır. Akseptör, elektron çeken yapılar ve zayıf asidik protonlardır.",
    "source": { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 22 }
  }
}
```
<!-- END_CONCEPT -->

---

<!-- CONCEPT: rr:vdw_hidrofobik -->
## Konsept 8: Van der Waals ve hidrofobik etkileşimler
* **Slayt Kaynağı:** 24, 25
* **Durum:** verified
* **Widget Türü:** `PredictThenReveal`

### Bilimsel Öz
- Van der Waals güçleri, moleküllerin polarizlenebilme özelliğinden doğar ve yüksüz atomlar birbirine çok yaklaşınca ortaya çıkar (Slayt 24).
- Apolar kısımlardaki elektron yoğunluğunun asimetrik dağılımı geçici dipoller oluşturur; apolar gruplar yaklaşık 4–6 Å yaklaşınca bir molekülün geçici dipolü diğerinde zıt dipol indükler (Slayt 24).
- Zayıf güçlerdir, ama diğer etkileşimlerle birlikte ilaç-reseptör kompleksi için önemlidir (Slayt 24).
- Hidrofobik etkileşimde apolar bölgeler yaklaşırken çevrelerindeki su molekülleri sıkıştırılıp dışarı itilir (Slayt 25).
- Etkileşimin enerjisi oluşan bağla doğrudan ilgili değildir; esas olarak sistemin entropisindeki artışla ilgilidir (Slayt 25).

### Öğrenci Görevi
> İki apolar bölge yaklaşırken aralarındaki sular dışarı itiliyor. Önce tahmin et: bu etkileşimin enerjisi nereden geliyor?

### İskele Merdiveni
1. **Seviye 1 (Dürtme):** Burada iki grup arasında klasik bir bağ kurulmuyor. Suyun ne yaptığına bak.
2. **Seviye 2 (İpucu):** Sıkışmış sular serbest kalınca sistemin düzensizliği değişiyor. Bu hangi termodinamik büyüklükle ilgili?
3. **Seviye 3 (Çözüm):** Hidrofobik etkileşimin enerjisi bağ oluşumuyla doğrudan ilgili değildir; esas olarak sistemin entropisindeki artışla ilgilidir. (Slayt 25)

### Yanılgı Haritası
* `HYDROPHOBIC_IS_A_BOND` (Slayt 25): Hidrofobik etkileşim bir bağ gibi düşünülüyor. Slayta göre enerji, oluşan bağla doğrudan ilgili değildir.
* `CONFUSES_WITH_VDW` (Slayt 24, 25): Hidrofobik etkileşim ile Van der Waals çekimi karıştırılıyor. Van der Waals geçici dipollerden doğar; hidrofobik etkileşimin enerjisi entropi artışından gelir.

### Widget Yapılandırması
```json
{
  "type": "PredictThenReveal",
  "config": {
    "prompt": "Hidrofobik etkileşimin enerjisi esas olarak nereden gelir?",
    "scenarioDescription": "Bir ilacın lipofilik sübstitüenti, reseptörün apolar bölgesine yaklaşıyor. Aradaki su molekülleri sıkıştırılıp dışarı itiliyor.",
    "options": [
      { "id": "correct", "label": "Sistemin entropisindeki artıştan", "isCorrect": true },
      { "id": "HYDROPHOBIC_IS_A_BOND", "label": "İki grup arasında oluşan güçlü bir bağdan", "isCorrect": false, "misconceptionFeedback": "Enerji, oluşan bağla doğrudan ilgili değildir; entropi artışıyla ilgilidir (Slayt 25)." },
      { "id": "CONFUSES_WITH_VDW", "label": "Apolar gruplar arasındaki geçici dipol çekiminden", "isCorrect": false, "misconceptionFeedback": "Geçici dipol çekimi Van der Waals güçleridir (Slayt 24); hidrofobik etkileşimin enerjisi entropi artışından gelir (Slayt 25)." }
    ],
    "revealedOutcome": "Hidrofobik etkileşimin enerjisi bağ oluşumundan değil, esas olarak sistemin entropisindeki artıştan gelir.",
    "explanation": "Apolar bölgeler yaklaşırken çevrelerindeki su molekülleri dışarı itilir; bu, sistemin entropisini artırır.",
    "source": { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 25 }
  }
}
```
<!-- END_CONCEPT -->

---

<!-- CONCEPT: rr:selasyon -->
## Konsept 9: Şelasyon ve dişlilik
* **Slayt Kaynağı:** 26, 28, 30
* **Durum:** verified
* **Widget Türü:** `MultipleChoice`

### Bilimsel Öz
- Şelat oluşumu, ilacın in vivo aktivitesinde önemli bağ oluşumlarından biridir (Slayt 26).
- Geçiş metal katyonları ile elektron donörü gruplar arasında koordine kovalan bağlarla oluşan bileşiğe kompleks denir; kompleks siklik yapıdaysa şelat adını alır (Slayt 26).
- Koordine kovalan bağda bağı oluşturan iki elektron aynı atomdan gelir; elektron eksikliği ve boş orbitali olan metal katyonu akseptördür (Slayt 26).
- Metale elektron çifti veren maddeye ligand denir; iki veya daha fazla elektron donörü grup taşıyan ligand şelat oluşturur (Slayt 28).
- İki, üç veya daha fazla donör grup taşıyan ligandlar sırasıyla bidentat, tridentat, polidentat adını alır (Slayt 30).
- Slayt 30'a göre etilen diamin, glisin ve 8-hidroksikinolin anyonu bidentat, dietilentriamin tridentat ligandlara örnektir (Slayt 30).
- Slayt 27'deki koordinasyon sayıları tablosunun yük işaretleri doğrulanmadığı için kullanılmadı. [NOT IN MATERIALS]

### Öğrenci Görevi
> Etilen diamin ile dietilentriamin ligandları dişlilik açısından nasıl sınıflanır? Donör grup sayısına göre karar ver.

### İskele Merdiveni
1. **Seviye 1 (Dürtme):** Dişlilik, ligandın taşıdığı elektron donörü grup sayısına bağlı. Her iki ligandda kaç azot donörü var, say.
2. **Seviye 2 (İpucu):** İki donör grup bidentat, üç donör grup tridentat demek. Etilen diamin iki, dietilentriamin üç azot taşır; hangi seçenek buna uyuyor?
3. **Seviye 3 (Çözüm):** Etilen diamin bidentat, dietilentriamin tridentattır; dişlilik donör grup sayısına göre belirlenir. (Slayt 30)

### Yanılgı Haritası
* `DENTICITY_REVERSED` (Slayt 30): Dişlilik sıralaması ters kuruluyor. Slayta göre etilen diamin bidentat, dietilentriamin tridentattır.
* `SAME_DENTICITY` (Slayt 30): Aynı tür grup taşıyan ligandlar aynı dişlilikte sanılıyor. Dişlilik grup türüne değil, donör grup sayısına göre belirlenir.

### Widget Yapılandırması
```json
{
  "type": "MultipleChoice",
  "config": {
    "prompt": "Etilen diamin ve dietilentriamin ligandları dişlilik açısından nasıl sınıflanır?",
    "options": [
      { "id": "correct", "text": "Etilen diamin bidentat, dietilentriamin tridentat", "isCorrect": true },
      { "id": "DENTICITY_REVERSED", "text": "Etilen diamin tridentat, dietilentriamin bidentat", "isCorrect": false, "distractorRationale": "Dişlilik, donör grup sayısına göre belirlenir; etilen diamin iki, dietilentriamin üç donör taşır (Slayt 30)." },
      { "id": "SAME_DENTICITY", "text": "İkisi de bidentat, çünkü ikisi de amin grubu taşır", "isCorrect": false, "distractorRationale": "Dişlilik grup türüne değil, donör grup sayısına bağlıdır (Slayt 30)." }
    ],
    "isMultiSelect": false,
    "explanation": "İki donör grup taşıyan ligand bidentat, üç donör grup taşıyan tridentattır. Slayt 30 etilen diamini bidentat, dietilentriamini tridentat örnek olarak verir.",
    "source": { "file": "İlaç Reseptör Etkileşimi-Kimyasal Bağlar.pdf", "page": 30 }
  }
}
```
<!-- END_CONCEPT -->

---

<!-- CONCEPT: rr:dibukain_entegrasyon -->
## Konsept 10: Entegrasyon görevi: Dibukain
* **Slayt Kaynağı:** 33
* **Durum:** verified
* **Widget Türü:** `ReceptorLigandMatcher`

### Bilimsel Öz
- Slayt 33, dibukain molekülünün olası bir reseptörle kurabileceği etkileşimleri gösterir: hidrofobik, hidrojen bağı, dipol-dipol, iyon-dipol, yük transferi, iyon veya iyon-dipol (Slayt 33).
- Hangi molekül bölgesinin hangi etkileşimi kurduğu yalnızca çizimde verilmiştir ve metinden güvenilir biçimde okunamadı. [NOT IN MATERIALS]
- Dibukain SMILES'i slayttan çıkarılamadı; RDKit ile doğrulanana kadar `verified: false`. [NOT IN MATERIALS]

### Öğrenci Görevi
> Dibukainin her bölgesini seç ve bu bölgenin reseptörle kurabileceği etkileşim türünü belirle.

### İskele Merdiveni
1. **Seviye 1 (Dürtme):** Önce molekülün apolar bölgelerini bul. Bu bölgeler hangi etkileşimi kurar?
2. **Seviye 2 (İpucu):** Amit grubuna bak: hem hidrojen verebilir hem alabilir. Bu özellik hangi etkileşimlere izin verir?
3. **Seviye 3 (Çözüm):** Bölge-etkileşim eşlemesi, slayt 33'ün çizimi hoca ve siz tarafınızdan doğrulandıktan sonra gösterilecek.

### Yanılgı Haritası
* `ONE_GROUP_ONE_BOND` (Slayt 33): Bir fonksiyonel grubun yalnızca tek tür etkileşim kurduğu sanılıyor. Slayt 33, aynı molekülün birden fazla etkileşim türü kurabildiğini gösterir.
* `FORGET_HYDROPHOBIC` (Slayt 25, 33): Apolar bölgeler atlanıyor. Slayt 33'te hidrofobik etkileşim açıkça listelenir.

<!-- END_CONCEPT -->

---

## Doğrulama Günlüğü (sizin kontrol etmeniz gerekenler)

| # | Konu | Sorun | Durum |
|---|---|---|---|
| 1 | Slayt 8 | Çıkarılan metinde içerik yok | Kullanılmadı. Slayta bakılmalı. |
| 2 | Slayt 16 | OH···N, OH···O, NH···N, NH···O kararlılık sırasındaki karşılaştırma işaretleri kayıp | **Kullanılmadı**, `[NOT IN MATERIALS]`. Slayttan doğrulanmalı. |
| 3 | Slayt 18 | Çıkarılan metinde içerik yok | Kullanılmadı. |
| 4 | Slayt 10, 11, 12 | Reaksiyon şemaları metinde parçalı | Yalnızca açıklama paragrafları kullanıldı. |
| 5 | Slayt 27 | Koordinasyon sayıları tablosunun yük işaretleri doğrulanmadı | **Kullanılmadı.** |
| 6 | Slayt 33 | SMILES ve bölge-bağ eşlemesi yalnızca çizimde | Konsept 10'da widget yok; `verified: false`. |
| 7 | Slayt 23, 29 | Yapı çizimleri metinde yok | Kullanılmadı. |
| 8 | Dosya konumu | PDF `materials/pharmacology/` altında, konu Farmasötik Kimya | Taşınsın mı? (açık soru) |
| 9 | Hoca onayı | Slaytlar Prof. Kaymakçıoğlu'na ait | Yazılı izin ve bu dosyanın incelenmesi gerekli. |
| 10 | Yeni widget | `DistanceDielectricSlider` (Konsept 3 için ideal) | Henüz yok; v1'de PredictThenReveal kullanıldı. Slaytlarda sayısal formül olmadığından sayı gösterilmeyecek. |
