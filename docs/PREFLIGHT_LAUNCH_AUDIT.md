# PharmLearn Platform — Pre-Flight Launch Audit & Readiness Certification

**Tarih**: 6 Ekim 2026  
**Durum**: READY FOR USER REVIEW (Yayına Hazır — Canlı Dağıtım Öncesi Son Kontrol)  
**Çalışma Ağacı**: `redesign_webapp_monetization_strategy`  
**Test Durumu**: 18/18 Test Paketi (%100 Başarılı), TypeScript 0 Hata (`tsc --noEmit`), 22 Brave Browser Ekran Görüntüsü  

---

## 1. Yönetici Özeti (Executive Summary)

PharmLearn platformu, Türkiye ve küresel ölçekteki eczacılık fakültesi öğrencilerine (başta 3. ve 4. sınıf lisans öğrencileri) **Farmasötik Kimya** ve **Farmakoloji** alanında ticari düzeyde, interaktif ve pedagojik derinliğe sahip bir öğrenme deneyimi sunmak üzere tasarlanmıştır.

Kullanıcının talimatları doğrultusunda canlı ortama bilinçsiz dağıtım yapılmamış; sistemdeki tüm işlevler, estetik tercihler (ChatGPT Obsidian teması), çevrimdışı dayanıklılık, hukuki güvenlik (FSEK Safe Harbor) ve Sokratik AI Eğitmen mimarisi titizlikle uygulanmış ve doğrulanmıştır.

---

## 2. Temel Mimari & Özellik Denetimi

### 2.1 ChatGPT Stili Arayüz & Squircle Tasarım Dili
- **Renk Paleti**: `#212121` Obsidian tuval, `#171717` kart arka planı, `#2F2F2F` yumuşak kenarlıklar ve `#10A37F` OpenAI Zümrüt Yeşili birincil aksanlar.
- **Geometri**: Tüm buton, kart, girdi ve modallarda ergonomik squircle köşe yarıçapı (`borderRadius: 12px` / `rounded-xl` ve `rounded-2xl`).
- **Çalışma Alanı**: Minimalist 48px üst bar, 2-sütunlu odak tuvali (Sol: İnteraktif ders ve simülatörler; Sağ: Sokratik AI Eğitmen paneli) ve mobil uyumlu alttan kayan çekmece (Drawer).

### 2.2 Minimalist Ders Panosu & Topluluk Tutundurma (Retention)
- **Vize Geri Sayımı**: Bahar Vizesine 28 gün sayacı ve günlük çalışma serisi (Streak) rozeti.
- **Hazırlık Skoru**: Kavram bazlı dairesel ilerleme göstergesi (%60 hazır, 6/10 kavram tamam).
- **Study Pulse Lounge**: Canlı akran mevcudiyeti (39–42 aktif öğrenci), üniversite fakülte rozetleri (Marmara, Hacettepe, İstanbul, Ege, Ankara), 25/5 Pomodoro odak sayacı ve günlük 3 kavram tamamlama hedefi.

### 2.3 Çoklu Ders RAG Bilgi Tabanı & Sokratik AI Eğitmen
- **Atomik Markdown Bilgi Düğümleri**:
  - `courses/medchem/knowledge_nodes/`: 10 atomik Farmasötik Kimya bilgi düğümü (Kovalan bağlar, İyonik, H-Bağları, Salisilik Asit, Dibukain SAR, Şelasyon, vb.).
  - `courses/pharmacology/knowledge_nodes/`: 10 atomik Farmakoloji bilgi düğümü (Reseptör tanımı, Kd, EC50/Emax, Tam vs Parsiyel Agonist, Schild analizi, İrreversibl blokaj & Yedek reseptör, GPCR Gs/Gi/Gq, vb.).
- **Çift Hatlı AI Servisi**:
  - *Hat 1*: OpenRouter ücretsiz modelleri (`meta-llama/llama-3.3-70b-instruct:free`, `google/gemini-2.0-flash-exp:free`, `qwen/qwen-2.5-72b-instruct:free`).
  - *Hat 2 (Çevrimdışı / Hızlı)*: Kesin slayt atıflı (`[Slayt X]`), 3 kademeli (Dürtme, İpucu, Çözüm) deterministik medikal akıl yürütme motoru.
- **Canlı Telemetri & Proaktif Dürtme**: GPCR simülatöründe veya PK eğrisinde yanılgı yapıldığında sohbet alanında beliren *"Tutor bir şey fark etti 💡"* rozeti.

### 2.4 FSEK Safe Harbor Kalkanlı Çıkmış Soru & İkiz Soru Motoru
- **Hukuki Güvenlik**: Ham sınav kağıtları veya profesör isimleri asla sisteme kaydedilmez ya da yayınlanmaz. Regex tabanlı filtreleme ile üniversite ve öğretim üyesi bilgileri temizlenir.
- **İkiz Soru Sentezi**: Orijinal sınav sorusunun farmakolojik mantığını koruyarak yeni bir bileşik üzerinden pedagojik ikiz soru üretilir.
- **Hazır Soru Bankası**: MedChem ve Farmakoloji için 10 adet doğrulanmış, slayt atıflı vize ikiz sorusu (`CURATED_EXAM_BANK`).

### 2.5 Öğrenci Ders Notları Deposu & Akıllı Vize Rehberi
- **Kişisel Doküman Kasası**: Supabase Storage (`student-documents` bucket) ve yerel depolama yedekli PDF/not yükleme alanı.
- **Sokratik Sentez**: Yüklenen nottan otomatik olarak çıkarılan 3 yapısal sütun:
  1. *Vize Kritik İlkeleri*
  2. *Aktif Hatırlama Flaşkartları (3 kademeli ipucu ve cevap açma)*
  3. *Sınav Yanılgı/Tuzak Uyarıları*
- **Tutor Bağlantısı**: Flaşkart veya özet üzerinden tek tıkla Sokratik Eğitmene yönlendirici soru sorma.

### 2.6 Sesli Ders Özeti & Karaoke Vurgusu
- Web Speech API tabanlı slayt bazlı sesli ders anlatımı.
- Oynatılan cümlenin canlı sarı vurgulanması (Karaoke efekti) ve oynatma hızı ayarı (1.0x - 1.5x).

### 2.7 Çevrimdışı Dayanıklılık & Hata Sınırları
- `ConnectivitySentinel.tsx`: Ağ kopmalarında non-intrusive bildirim hapı (*"Çevrimdışı Mod: İlerlemeleriniz yerel olarak kaydediliyor 📶"*).
- `ErrorBoundary.tsx`: Obsidian temalı, WebGL çökmesi veya beklenmeyen durumlarda tek tıkla tuvali yeniden başlatan ve önbelleği sıfırlayan kurtarma mekanizması.

---

## 3. Doğrulama & Test Metrikleri

| Denetim Alanı | Sonuç | Durum |
| :--- | :--- | :--- |
| **Birim & Entegrasyon Testleri** | 18 Test Paketi, 76/76 Test Geçti | ✅ %100 Yeşil |
| **TypeScript Derleme** | `tsc --noEmit` 0 Hata | ✅ %100 Temiz |
| **Brave Browser Görsel Doğrulama** | 22 Adet Tam Ekran Görsel Alındı | ✅ Doğrulandı |
| **Showcase Raporu** | `pharmlearn_showcase.html` (Base64 Gömülü) | ✅ Derlendi |
| **Zero Localhost Kuralı** | İstemci tarafında dinamik `window.location.origin` | ✅ Uyumlu |
| **FSEK Safe Harbor Uyumu** | Ham soru yayınlamama, sentetik ikiz soru üretimi | ✅ Uyumlu |

---

## 4. Kullanıcı Onayı & Dağıtım Kapısı (Gated Release)

Kullanıcının kesin talimatı gereği, platform henüz canlı ortama (`optimusrufus.com`) sürülmemiştir.  
Kullanıcı tüm ekran görüntülerini ve işlevleri `pharmlearn_showcase.html` üzerinden inceledikten sonra onay verdiğinde, canlı dağıtım tek bir komutla (`scripts/deploy-production.sh` / Cloudflare Pages) güvenle gerçekleştirilebilir.
