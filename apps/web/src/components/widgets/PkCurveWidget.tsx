import React, { useState, useMemo, useEffect } from 'react';
import { Slider, Tag, Button } from 'antd';
import { LineChartOutlined, WarningOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { realtimeTelemetry } from '../../services/realtimeTelemetryService';

export const PkCurveWidget: React.FC = () => {
  const [dose, setDose] = useState<number>(500); // mg
  const [clearance, setClearance] = useState<number>(50); // mL/min
  const [halfLife, setHalfLife] = useState<number>(4); // hours

  const MEC = 15; // Minimum Effective Concentration (mg/L)
  const MTC = 45; // Maximum Tolerated Concentration (Toxic, mg/L)

  // Calculate curve points for a 24-hour single dose
  const curvePoints = useMemo(() => {
    const points: { t: number; c: number }[] = [];
    const ke = 0.693 / halfLife;
    const ka = 1.8; // absorption rate constant
    const Vd = (clearance * 60) / (ke * 1000) || 15; // Liters
    const F = 0.85;

    for (let t = 0; t <= 24; t += 0.5) {
      // 1-compartment oral absorption model: C(t) = [F*D*ka / (Vd*(ka - ke))] * (e^(-ke*t) - e^(-ka*t))
      const factor = (F * dose * ka) / (Math.max(0.1, Vd) * (ka - ke));
      const conc = Math.max(0, factor * (Math.exp(-ke * t) - Math.exp(-ka * t)));
      points.push({ t, c: conc });
    }
    return points;
  }, [dose, clearance, halfLife]);

  const maxConc = Math.max(...curvePoints.map((p) => p.c), 1);
  const cMax = maxConc.toFixed(1);
  const isToxic = maxConc > MTC;
  const isSubtherapeutic = maxConc < MEC;

  // Broadcast realtime interaction state to Socratic AI Tutor
  useEffect(() => {
    realtimeTelemetry.emitTelemetry({
      widgetId: 'pk_curve',
      action: 'parameters_updated',
      summary: `Doz: ${dose} mg, CL: ${clearance} mL/dk, t1/2: ${halfLife} sa (Cmax: ${cMax} mg/L, ${isToxic ? 'TOKSİK' : isSubtherapeutic ? 'TERAPÖTİK ALTI' : 'TERAPÖTİK'})`,
      metrics: { dose, clearance, halfLife, cMax: Number(cMax), isToxic, isSubtherapeutic },
      misconceptionAlert: isToxic
        ? {
            title: `Kritik Toksisite Uyarısı (Cmax: ${cMax} mg/L)`,
            rationale: `Klerens ${clearance} mL/dk seviyesine gerilediğinde veya aşırı dozda ilaç atılamaz ve MTC (45 mg/L) toksik eşiğini aşar.`,
            suggestedQuestion: `Böbrek yetmezliği durumunda Cmax değerim ${cMax} mg/L oldu ve toksik sınıra ulaştı. Dozlamayı nasıl revize etmeliyiz?`,
            severity: 'high',
          }
        : null,
    });
  }, [dose, clearance, halfLife, cMax, isToxic, isSubtherapeutic]);

  // Generate SVG path
  const svgWidth = 460;
  const svgHeight = 160;
  const padding = 30;

  const pathD = useMemo(() => {
    const scaleX = (svgWidth - padding * 2) / 24;
    const scaleY = (svgHeight - padding * 2) / Math.max(60, maxConc * 1.15);

    return curvePoints
      .map((p, idx) => {
        const x = padding + p.t * scaleX;
        const y = svgHeight - padding - p.c * scaleY;
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  }, [curvePoints, maxConc]);

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131B2A] p-4 sm:p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <h3 className="font-bold text-sm sm:text-base flex items-center gap-1.5 m-0 text-slate-900 dark:text-white">
            <LineChartOutlined className="text-emerald-500" />
            İlaç Konsantrasyonu & Farmakokinetik Eğri Simülatörü
          </h3>
          <p className="text-xs text-gray-500 m-0 mt-0.5">
            Doz, klerens ve eliminasyon yarı ömrünün plazma profiline etkisi
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isToxic ? (
            <Tag color="red" icon={<WarningOutlined className="inline mr-1" />} className="rounded-lg">
              Toksik Eşik Aşıldı (Cmax: {cMax} mg/L)
            </Tag>
          ) : isSubtherapeutic ? (
            <Tag color="orange" icon={<WarningOutlined className="inline mr-1" />} className="rounded-lg">
              Terapötik Altı (Cmax: {cMax} mg/L)
            </Tag>
          ) : (
            <Tag color="green" icon={<SafetyCertificateOutlined className="inline mr-1" />} className="rounded-lg">
              Terapötik Pencerede (Cmax: {cMax} mg/L)
            </Tag>
          )}
        </div>
      </div>

      {/* Quick Clinical Preset Scenarios (Squircle Buttons) */}
      <div className="flex flex-wrap items-center gap-2 py-1">
        <span className="text-[11px] font-medium text-gray-500 mr-1">Hızlı Klinik Senaryolar:</span>
        <Button
          size="small"
          onClick={() => { setDose(500); setClearance(50); setHalfLife(4); }}
          className="rounded-xl text-xs h-7 font-medium"
        >
          Normal Doz (500mg)
        </Button>
        <Button
          size="small"
          onClick={() => { setDose(500); setClearance(15); setHalfLife(10); }}
          className="rounded-xl text-xs h-7 font-medium border-red-300 dark:border-red-900 text-red-700 dark:text-red-300 bg-red-50/50 dark:bg-red-950/30"
        >
          Böbrek Yetmezliği (Düşük CL)
        </Button>
        <Button
          size="small"
          onClick={() => { setDose(1100); setClearance(50); setHalfLife(4); }}
          className="rounded-xl text-xs h-7 font-medium border-amber-300 dark:border-amber-900 text-amber-700 dark:text-amber-300 bg-amber-50/50 dark:bg-amber-950/30"
        >
          Yüksek Doz / Toksisite
        </Button>
      </div>
      <div className="rounded-xl bg-slate-900 p-2 text-white overflow-hidden shadow-inner">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-40">
          {/* Grid lines */}
          <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding} y2={svgHeight - padding} stroke="#334155" strokeWidth="1" />
          <line x1={padding} y1={padding} x2={padding} y2={svgHeight - padding} stroke="#334155" strokeWidth="1" />

          {/* MEC Threshold Line (Green) */}
          <line
            x1={padding}
            y1={svgHeight - padding - (MEC / 60) * (svgHeight - padding * 2)}
            x2={svgWidth - padding}
            y2={svgHeight - padding - (MEC / 60) * (svgHeight - padding * 2)}
            stroke="#10B981"
            strokeDasharray="4 4"
            strokeWidth="1.5"
          />
          <text x={svgWidth - padding - 80} y={svgHeight - padding - (MEC / 60) * (svgHeight - padding * 2) - 4} fill="#10B981" className="text-[9px] font-mono">
            MEC (Etkin Eşik: 15)
          </text>

          {/* MTC Threshold Line (Red) */}
          <line
            x1={padding}
            y1={svgHeight - padding - (MTC / 60) * (svgHeight - padding * 2)}
            x2={svgWidth - padding}
            y2={svgHeight - padding - (MTC / 60) * (svgHeight - padding * 2)}
            stroke="#EF4444"
            strokeDasharray="4 4"
            strokeWidth="1.5"
          />
          <text x={svgWidth - padding - 80} y={svgHeight - padding - (MTC / 60) * (svgHeight - padding * 2) - 4} fill="#EF4444" className="text-[9px] font-mono">
            MTC (Toksik Eşik: 45)
          </text>

          {/* PK Curve */}
          <path d={pathD} fill="none" stroke="#38BDF8" strokeWidth="3" />

          {/* Axis Labels */}
          <text x={svgWidth / 2} y={svgHeight - 8} textAnchor="middle" fill="#94A3B8" className="text-[10px] font-mono">
            Zaman (Saat, 0-24h)
          </text>
          <text x={padding - 5} y={padding + 10} textAnchor="end" fill="#94A3B8" className="text-[9px] font-mono">
            mg/L
          </text>
        </svg>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
        <div>
          <div className="flex justify-between text-xs font-mono mb-1">
            <span>Doz (mg):</span>
            <span className="font-bold text-blue-600">{dose} mg</span>
          </div>
          <Slider min={100} max={1200} step={50} value={dose} onChange={setDose} />
        </div>

        <div>
          <div className="flex justify-between text-xs font-mono mb-1">
            <span>Klerens (CL):</span>
            <span className="font-bold text-emerald-600">{clearance} mL/dk</span>
          </div>
          <Slider min={10} max={150} step={5} value={clearance} onChange={setClearance} />
        </div>

        <div>
          <div className="flex justify-between text-xs font-mono mb-1">
            <span>Yarı Ömür (t1/2):</span>
            <span className="font-bold text-purple-600">{halfLife} saat</span>
          </div>
          <Slider min={1} max={12} step={0.5} value={halfLife} onChange={setHalfLife} />
        </div>
      </div>

      <p className="text-[11px] text-gray-500 bg-slate-50 dark:bg-slate-900/40 p-1.5 rounded">
        <strong>Model İllüstrasyonu:</strong> Tek kompartmanlı oral emilim modeli: C(t) = [F·D·k_a / (V_d·(k_a - k_e))] · (e^(-k_e·t) - e^(-k_a·t)). Klinik teşhis için kullanılmaz.
      </p>
    </div>
  );
};
