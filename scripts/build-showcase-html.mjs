import fs from 'fs';
import path from 'path';

const brainDir = 'C:\\Users\\hp\\.gemini\\antigravity\\brain\\33e95f3d-5b4d-4363-a44d-b2b0e8953cfc';
const screenshotsDir = path.join(brainDir, 'screenshots');

const items = [
  {
    id: 'landing-hero',
    title: 'Minimalist Giriş & Tanıtım Sayfası (Squircle Butonlar)',
    tag: 'Hero Landing',
    file: '01_landing_hero.png',
    desc: 'Ant Design yuvarlatılmış köşeli squircle (rounded-xl) butonlar, @ant-design/icons (RightOutlined, BookOutlined, ExperimentOutlined, RobotOutlined) ve 3 temel değer sütunu.'
  },
  {
    id: 'desktop-light',
    title: 'Masaüstü Odak Çalışma Alanı (Açık Tema)',
    tag: 'Desktop 1440x900',
    file: '02_study_workspace_desktop.png',
    desc: '3D WebGL molekül tuvali (Dibukain Slayt 33), Ant Design CheckableTag bölüm çubuğu, kopyalanabilir SMILES ve Sokratik AI Eğitmen sağ paneli.'
  },
  {
    id: 'desktop-dark',
    title: 'Gece Çalışma Modu (Koyu Tema)',
    tag: 'Ant Design Token Dark',
    file: '03_study_workspace_dark.png',
    desc: '#0B0F17 derin arka plan, #131B2A kart yüzeyleri ve yüksek kontrastlı tipografi ile gece çalışma modu.'
  },
  {
    id: 'molecule-sar',
    title: '3D Molekül & Farmakofor Rozetleri',
    tag: 'WebGL + AntD Tooltip',
    file: '04_molecule_viewer_sar.png',
    desc: 'Rotatable 3D WebGL moleküler yapı, tıklanabilir squircle farmakofor bağlanma grupları ve Sokratik soru tetikleyicisi.'
  },
  {
    id: 'ai-tutor',
    title: 'Sokratik AI Eğitmen & Slayt Atıfları',
    tag: 'AI Tutor + Slide Citations',
    file: '05_socratic_ai_tutor.png',
    desc: 'Sokratik rehberlik, pedagojik kademe etiketleri (Dürtme, İpucu, Çözüm) ve kesin Slayt 13, 14 atıf hapları.'
  },
  {
    id: 'sar-matrix',
    title: 'Dinamik SAR Matrisi (Genişletilebilir Satır)',
    tag: 'Table Expandable + Segmented',
    file: '09_sar_matrix_widget.png',
    desc: 'Ant Design Table satırına tıklandığında açılan kimyasal modifikasyon, plazma stabilitesi mekanizması ve satır içi Tutor squircle butonu.'
  },
  {
    id: 'quiz-hints',
    title: 'Kavram Kontrolü & 3 Kademeli İskele İpucu',
    tag: 'Ant Design Steps',
    file: '10_concept_quiz_hints.png',
    desc: 'Ant Design Steps bileşeni ile görselleştirilen Sezgi (Nudge) -> İpucu (Clue) -> Çözüm İskelesi merdiveni ve tanısal geri bildirim.'
  },
  {
    id: 'pk-curve',
    title: 'Farmakokinetik Plazma Eğrisi & Klinik Senaryolar',
    tag: 'PK Simulator + Presets',
    file: '11_pk_curve_simulator.png',
    desc: 'Tek tıkla Normal Doz, Böbrek Yetmezliği ve Toksisite senaryoları (squircle butonlar); MEC/MTC eşik çizgileri ve model illüstrasyonu.'
  },
  {
    id: 'gpcr-cascade',
    title: 'GPCR Sinyal İletim Yolağı Simülatörü (Gs / Gi / Gq)',
    tag: 'Flagship Dynamic Widget',
    file: '12_gpcr_signaling_cascade.png',
    desc: 'Hücre zarı lipit çift katmanı, 7-TM GPCR reseptörü, heterotrimerik G-proteinleri (Gα, Gβγ), efektör enzimler (AC, PLC), ikincil haberci kaskadları (cAMP vs IP3/DAG/Ca²⁺) ve 4 aşamalı Ant Design Steps tahmin-doğrulama motoru.'
  },
  {
    id: 'realtime-nudge',
    title: 'Gerçek Zamanlı Telemetri & Proaktif Sokratik Dürtme ("Tutor bir şey fark etti 💡")',
    tag: 'Supabase Realtime Innovation',
    file: '13_realtime_socratic_nudge.png',
    desc: 'Öğrencinin tuval etkileşimlerini (yanlış GPCR eşleşmesi veya toksik Cmax) arka planda dinleyen ve sohbet paneli üzerinde beliren proaktif yönlendirici squircle rozet. Tek tıkla canlı tuval bağlamını AI Eğitmen promptuna enjekte eder.'
  },
  {
    id: 'mobile-workspace',
    title: 'Mobil Odak Çalışma Tuvali',
    tag: 'Mobile 390x844',
    file: '06_mobile_study_workspace.png',
    desc: 'Sıfır yatay taşma, başparmak erişimli yüzen AI Tutor squircle butonu ve kompakt ders notu akışı.'
  },
  {
    id: 'mobile-drawer',
    title: 'Mobil Sokratik Eğitmen Çekmecesi (Drawer)',
    tag: 'Ant Design Drawer',
    file: '07_mobile_tutor_drawer.png',
    desc: 'Alttan/sağdan tam ekran kayan Sokratik sohbet arayüzü, 33 slayt doğrulama rozeti ve hızlı soru etiketleri.'
  }
];

const encoded = items.map(item => {
  const filePath = path.join(screenshotsDir, item.file);
  const data = fs.readFileSync(filePath);
  const b64 = data.toString('base64');
  return {
    ...item,
    dataUri: 'data:image/png;base64,' + b64
  };
});

const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PharmLearn UI Görsel Galerisi</title>
  <script src="https://www.gstatic.com/antigravity/web/dev/tailwindcss.min.js"></script>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    .tab-btn.active { background-color: #2563EB; color: #FFFFFF; font-weight: 600; }
    .thumb.active { border-color: #2563EB; transform: scale(1.03); }
  </style>
</head>
<body class="bg-slate-900 text-slate-100 p-4 sm:p-6 min-h-screen flex flex-col items-center">
  <div class="w-full max-w-6xl flex flex-col gap-4">
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
      <div>
        <div class="flex items-center gap-2">
          <span class="px-2 py-0.5 rounded bg-blue-600 text-white font-bold text-xs">PL</span>
          <h1 class="text-lg sm:text-xl font-bold tracking-tight text-white m-0">PharmLearn Studio — Arayüz Galerisi</h1>
        </div>
        <p class="text-xs text-slate-400 mt-1 m-0">Prof. Dr. Bedia Kaymakçıoğlu Vize Dersi • Ant Design Entegrasyonu</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
          ✓ 7 Yüksek Çözünürlüklü Görünüm
        </span>
      </div>
    </div>

    <!-- Tab Pills -->
    <div class="flex flex-wrap gap-1.5 p-1 bg-slate-800/80 rounded-xl border border-slate-700/60 overflow-x-auto" id="tabBar">
    </div>

    <!-- Active Image Stage -->
    <div class="relative bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col items-center">
      <div class="w-full flex items-center justify-between px-4 py-2.5 bg-slate-800/60 border-b border-slate-800 text-xs">
        <div class="flex items-center gap-2">
          <span id="stageTag" class="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-900/60 text-blue-300 border border-blue-700"></span>
          <span id="stageTitle" class="font-semibold text-slate-200"></span>
        </div>
        <div class="flex items-center gap-2">
          <button id="prevBtn" class="px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 text-white font-bold transition-colors cursor-pointer">← Önceki</button>
          <span id="counter" class="text-slate-400 font-mono text-[11px]"></span>
          <button id="nextBtn" class="px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 text-white font-bold transition-colors cursor-pointer">Sonraki →</button>
        </div>
      </div>
      <div class="w-full flex items-center justify-center p-2 sm:p-4 bg-[#0B0F17] min-h-[460px]">
        <img id="stageImg" src="" alt="UI Preview" class="max-w-full max-h-[75vh] rounded-lg shadow-lg object-contain transition-opacity duration-150" />
      </div>
      <div class="w-full p-4 bg-slate-800/40 border-t border-slate-800 text-xs sm:text-sm text-slate-300">
        <p id="stageDesc" class="m-0 leading-relaxed font-normal"></p>
      </div>
    </div>

    <!-- Thumbnails Strip -->
    <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 pt-2" id="thumbStrip">
    </div>
  </div>

  <script>
    const items = ${JSON.stringify(encoded)};
    let currentIndex = 0;

    const tabBar = document.getElementById("tabBar");
    const thumbStrip = document.getElementById("thumbStrip");
    const stageImg = document.getElementById("stageImg");
    const stageTitle = document.getElementById("stageTitle");
    const stageTag = document.getElementById("stageTag");
    const stageDesc = document.getElementById("stageDesc");
    const counter = document.getElementById("counter");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    function render() {
      const cur = items[currentIndex];
      stageImg.src = cur.dataUri;
      stageTitle.textContent = cur.title;
      stageTag.textContent = cur.tag;
      stageDesc.textContent = cur.desc;
      counter.textContent = (currentIndex + 1) + " / " + items.length;

      document.querySelectorAll(".tab-btn").forEach((btn, idx) => {
        btn.classList.toggle("active", idx === currentIndex);
      });
      document.querySelectorAll(".thumb").forEach((th, idx) => {
        th.classList.toggle("active", idx === currentIndex);
      });
    }

    items.forEach((item, idx) => {
      const btn = document.createElement("button");
      btn.className = "tab-btn px-3 py-1.5 rounded-lg text-xs transition-all text-slate-300 hover:text-white cursor-pointer";
      btn.textContent = (idx + 1) + ". " + item.title.split(" (")[0];
      btn.onclick = () => { currentIndex = idx; render(); };
      tabBar.appendChild(btn);

      const th = document.createElement("div");
      th.className = "thumb p-1 bg-slate-800 rounded-lg border-2 border-slate-700 cursor-pointer transition-all hover:border-slate-500 overflow-hidden flex flex-col items-center";
      th.innerHTML = \`<img src="\${item.dataUri}" class="w-full h-16 object-cover rounded" /><span class="text-[10px] text-slate-300 mt-1 truncate max-w-full">\${idx + 1}. \${item.tag}</span>\`;
      th.onclick = () => { currentIndex = idx; render(); };
      thumbStrip.appendChild(th);
    });

    prevBtn.onclick = () => {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      render();
    };
    nextBtn.onclick = () => {
      currentIndex = (currentIndex + 1) % items.length;
      render();
    };

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") prevBtn.click();
      if (e.key === "ArrowRight") nextBtn.click();
    });

    render();
  </script>
</body>
</html>`;

const outPath = path.join(brainDir, 'pharmlearn_showcase.html');
fs.writeFileSync(outPath, html, 'utf8');
console.log('Successfully written self-contained showcase to:', outPath);
