# PharmLearn Studio — Tasarım Sistemi, Mimari & Başlangıç Kılavuzu (Design System & Agent Starter Guide)

> **DİKKAT (TÜM AJANLAR İÇİN KESİN KURAL):**  
> Bu proje, eski "Neo-Brutalist (3-4px sert siyah kenarlıklar, #FFF8E7 krem arka plan, keskin 0px köşeler)" stilinden, **OpenAI Codex esintili, Ant Design tabanlı, modern ve ergonomik "Squircle" (Round with Corners - `borderRadius: 12px`)** tasarım diline geçmiştir. Eski `ui-guidelines.md` dosyasındaki keskin köşeli kurallar hükümsüzdür; bu belgedeki kurallar esastır.

---

## 1. Tasarım Dili & Görsel Standartlar ("Round with Corners")

### 1.1 Köşe Yuvarlatma (Squircle Yarıçapları)
* **Temel Standart**: Belirgin köşelere sahip yumuşak squircle estetiği:
  - `Button`, `Input`, `Tag`, `Badge`: `borderRadius: 12px` (`rounded-xl`).
  - Kartlar, Modal ve Konteynerler: `borderRadiusLG: 16px` (`rounded-2xl`).
  - Küçük etiketler, çipler, açılır menüler: `borderRadiusSM: 8px` (`rounded-lg`).
* Asla keskin `rounded-none` veya aşırı dairesel hap `rounded-full` kullanılmamalıdır; tutarlı şekilde `rounded-xl` (`12px`) tercih edilmelidir.

### 1.2 Renk Paleti & Tema Sistemi
* **Açık Tema (Light Mode)**:
  - Sayfa zemin: Saf beyaz `#FFFFFF` veya nötr gri `#F8FAFC` (`bg-slate-50`).
  - Kart yüzeyleri: `#FFFFFF` ile ince kenarlık `border border-slate-200`.
  - Birincil Vurgu (Primary): Ant Design Blue `#2563EB` / `#1D4ED8`.
* **Koyu Tema (Dark Mode)**:
  - Sayfa zemin: Ultra derin lacivert/siyah `#0B0F17`.
  - Kart yüzeyleri: `#131B2A` (`border border-slate-800`).
  - Metin: Yüksek kontrastlı `#F1F5F9` ve `#94A3B8`.
* **Semantik Vurgular**:
  - Yeşil (Doğru / Başarı): `#10B981` (`emerald`).
  - Kehribar (Sokratik Dürtme / İpucu): `#F59E0B` (`amber`).
  - Kırmızı/Pembe (Yanılgı / MTC Toksisite): `#EF4444` (`red`).
  - Mor (İkincil Haberciler / Gi Kaskadı): `#8B5CF6` (`purple`).

### 1.3 Ant Design Entegrasyonu & İkonlar
* Tüm buton, sekme, segmented control, steps ve tablo bileşenleri Ant Design (`antd`) ve `@ant-design/icons` üzerinden yönetilir:
  - İkonlar: `RobotOutlined`, `SendOutlined`, `ExperimentOutlined`, `ThunderboltOutlined`, `BulbOutlined`, `CheckCircleFilled`, `CloseCircleFilled`, `LineChartOutlined`, `BookOutlined`, `ArrowRightOutlined`.
* Tüm bileşenler `apps/web/src/pages/PharmLearnStudioPage.tsx` içindeki Ant Design `ConfigProvider` tokenları (`colorPrimary: '#2563EB'`, `borderRadius: 12`, `borderRadiusLG: 16`) ile sarmalanmıştır.

---

## 2. Çalışma Alanı Düzeni & Sayfa Mimarisi

* **Ana Rota**: `/` rotasında `apps/web/src/pages/PharmLearnStudioPage.tsx` çalışır.
* **2 Sütunlu Odak Düzeni (Spacious 2-Pane Canvas)**:
  1. **Üst Bar (Header)**: Logo, vize dersi konu seçici sekmeleri (`CheckableTag`), slayt doğrulama rozeti (`33 Slayt Doğrulandı`), koyu mod anahtarı ve kullanıcı profili.
  2. **Sol Sütun (Ders Tuvali - Canvas)**:
     - Kaynak slayt metinleri (Markdown formatında, 40-50 kelimelik net bloklar).
     - **3D/2D Molekül Görüntüleyici** (`DualModeMoleculeViewer.tsx`): 3D WebGL rotatable model (Dibukain Slayt 33), tıklanabilir farmakofor bağlanma noktaları.
     - **GPCR Sinyal Kaskad Simülatörü** (`ReceptorSignalingVisualizer.tsx`): $G_s, G_i, G_q$ yolları, hücre zarı şeması, 4 aşamalı Ant Design Steps ve tahmin-doğrulama kartları.
     - **Dinamik SAR Matrisi** (`SarMatrixWidget.tsx`): Tıklanabilir genişletilebilir satırlar.
     - **PK/PD Plazma Eğrisi** (`PkCurveWidget.tsx`): Normal, Toksisite ve Böbrek Yetmezliği senaryoları, interaktif sliderlar.
     - **Kavram Kontrolü** (`ConceptQuizWidget.tsx`): 3 kademeli iskele ipucu merdiveni (Steps).
  3. **Sağ Sütun (Sokratik AI Eğitmen Paneli - `TutorChatPane.tsx`)**:
     - Slayt atıflı Sokratik rehberlik ([Slayt 2], [Slayt 6], [Slayt 33]).
     - **Proaktif Sokratik Dürtme Rozeti ("Tutor bir şey fark etti 💡")**: Öğrencinin tuvaldeki hamlelerini dinler. Hata durumunda beliren kehribar rozet üzerinden tek tıkla canlı bağlamı AI'a aktarır.

---

## 3. Görsel Referanslar & Ekran Görüntüleri

Yeni ajan tasarımdan şüphe duyarsa veya görsel olarak teyit etmek isterse aşağıdaki dosyalara bakmalıdır:

* **Tüm Ekranların İnteraktif Vitrini**: [pharmlearn_showcase.html](file:///C:/Users/hp/.gemini/antigravity/brain/33e95f3d-5b4d-4363-a44d-b2b0e8953cfc/pharmlearn_showcase.html) (Tarayıcıda açılabilir, tüm ekranlar Base64 gömülüdür).
* **Masaüstü Açık Tema**: `C:\Users\hp\.gemini\antigravity\brain\33e95f3d-5b4d-4363-a44d-b2b0e8953cfc\screenshots\02_study_workspace_desktop.png`
* **Masaüstü Koyu Tema**: `C:\Users\hp\.gemini\antigravity\brain\33e95f3d-5b4d-4363-a44d-b2b0e8953cfc\screenshots\03_study_workspace_dark.png`
* **3D Molekül & Farmakofor**: `C:\Users\hp\.gemini\antigravity\brain\33e95f3d-5b4d-4363-a44d-b2b0e8953cfc\screenshots\04_molecule_viewer_sar.png`
* **Sokratik AI Eğitmen**: `C:\Users\hp\.gemini\antigravity\brain\33e95f3d-5b4d-4363-a44d-b2b0e8953cfc\screenshots\05_socratic_ai_tutor.png`
* **GPCR Sinyal Simülatörü**: `C:\Users\hp\.gemini\antigravity\brain\33e95f3d-5b4d-4363-a44d-b2b0e8953cfc\screenshots\12_gpcr_signaling_cascade.png`
* **Canlı Telemetri & Sokratik Dürtme Rozeti**: `C:\Users\hp\.gemini\antigravity\brain\33e95f3d-5b4d-4363-a44d-b2b0e8953cfc\screenshots\13_realtime_socratic_nudge.png`
* **Mobil Görünüm (390x844)**: `C:\Users\hp\.gemini\antigravity\brain\33e95f3d-5b4d-4363-a44d-b2b0e8953cfc\screenshots\06_mobile_study_workspace.png`

---

## 4. Yeni Ajanın Başlayacağı Nokta (Where to Start Next)

Yeni bir ajan görevi devraldığında:

1. **Önce Durumu Doğrula**:
   - `git status`
   - `pnpm --filter @pharmacy/web typecheck` (0 hata olmalı)
   - `pnpm --filter @pharmacy/web test` (7 test paketi, 41 test geçmeli)
2. **Mevcut Tasarımı ASLA Bozma**:
   - Asla 3-4px kalın siyah brutalist kenarlıklar veya 0px keskin köşeler ekleme.
   - Her yeni buton ve kartta `borderRadius: 12px` / `rounded-xl` kullan.
3. **PRD Kapsamında Sıradaki Görevler**:
   - **Görev A (Öncelikli)**: **Sesli Ders Özeti ve Transkript Çaları (PRD 3.3 Audio Summary Pipeline)**:
     Ders notunun sağ üst köşesine veya tuvalin başına senkronize ses çaları eklemek (`AudioSummaryPlayer.tsx`).
   - **Görev B**: **Supabase Storage ile Ders Notu / PDF Yükleme (PRD 3.1)**:
     Öğrencilerin kendi ders slaytlarını yükleyebileceği minimalist modal ve dosya yükleme hattı.
   - **Görev C**: **Canlı Ortam Dağıtımı (Cloudflare Pages)**:
     `pnpm build` çıktısının `optimusrufus.com` alan adına senkronize edilmesi.
