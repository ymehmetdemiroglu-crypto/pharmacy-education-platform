import React, { useState, useId } from 'react';
import { EassonStedmanConfig, EassonStedmanConfigSchema } from './schema';
import { BaseWidgetProps } from '../types';

export interface EassonStedmanStageProps extends BaseWidgetProps<EassonStedmanConfig> {
  onDockChange?: (isDocked: boolean, contacts: number) => void;
}

export const EassonStedmanStage: React.FC<EassonStedmanStageProps> = ({
  config: rawConfig,
  locale = 'tr',
  className = '',
  onDockChange,
}) => {
  const config = EassonStedmanConfigSchema.parse(rawConfig || {});
  const [enantiomer, setEnantiomer] = useState<'eutomer' | 'distomer'>(config.initialEnantiomer);
  const [rotX, setRotX] = useState<number>(0);
  const [rotY, setRotY] = useState<number>(0);
  const [rotZ, setRotZ] = useState<number>(0);

  const headingId = useId();
  const statusId = useId();

  // Alignment tolerances
  const isAlignedX = Math.abs(rotX % 360) <= 20 || Math.abs(rotX % 360) >= 340;
  const isAlignedY = Math.abs(rotY % 360) <= 20 || Math.abs(rotY % 360) >= 340;
  const isAlignedZ = Math.abs(rotZ % 360) <= 20 || Math.abs(rotZ % 360) >= 340;
  const isOrientationOptimal = isAlignedX && isAlignedY && isAlignedZ;

  // Locus contact checks
  // Locus 1: Aromatic ring docks if X & Y aligned
  const locus1Docked = isAlignedX && isAlignedY;
  // Locus 3: Basic amine docks if orientation is generally aligned
  const locus3Docked = isOrientationOptimal;
  // Locus 2: Hydroxyl OH ONLY docks if eutomer AND orientation optimal.
  // In distomer, the OH projects 109.5° away into bulk solvent!
  const locus2Docked = enantiomer === 'eutomer' && isOrientationOptimal;

  const contactsCount = (locus1Docked ? 1 : 0) + (locus2Docked ? 1 : 0) + (locus3Docked ? 1 : 0);
  const isFullyDocked = contactsCount === 3;

  // Thermodynamics
  // RT at 37°C (310.15 K) = 0.592 kcal/mol (or 0.616 kcal/mol at 310 K)
  const RT = 0.592;
  const currentDeltaG = locus2Docked ? config.deltaGEutomer : (contactsCount === 2 ? config.deltaGDistomer : (locus1Docked ? -4.5 : 0));
  const eudismicRatio = Math.round(Math.exp((Math.abs(config.deltaGEutomer) - Math.abs(config.deltaGDistomer)) / RT));

  const handleSnap = () => {
    setRotX(0);
    setRotY(0);
    setRotZ(0);
  };

  const handleRotate = (axis: 'x' | 'y' | 'z', delta: number) => {
    if (axis === 'x') setRotX((prev) => (prev + delta) % 360);
    if (axis === 'y') setRotY((prev) => (prev + delta) % 360);
    if (axis === 'z') setRotZ((prev) => (prev + delta) % 360);
  };

  return (
    <section
      role="region"
      aria-labelledby={headingId}
      className={`p-6 bg-[#FFF8E7] border-4 border-black shadow-[6px_6px_0px_#000000] rounded-none max-w-3xl mx-auto font-sans text-black ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b-4 border-black gap-2">
        <div>
          <span className="inline-block text-xs uppercase tracking-widest font-black bg-[#4D96FF] text-white px-2 py-0.5 border-2 border-black mb-1">
            3D Kiral Bağlanma Simülatörü
          </span>
          <h3 id={headingId} className="text-xl sm:text-2xl font-black uppercase tracking-tight">
            Easson-Stedman 3-Noktalı Kenetlenme
          </h3>
        </div>

        {/* Enantiomer Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setEnantiomer('eutomer')}
            data-testid="toggle-eutomer"
            className={`px-3 py-1.5 font-bold text-xs sm:text-sm border-2 border-black transition-transform ${
              enantiomer === 'eutomer'
                ? 'bg-[#6BCB77] text-black shadow-[2px_2px_0px_#000000] -translate-y-0.5'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Ötomer ({config.eutomerName})
          </button>
          <button
            type="button"
            onClick={() => setEnantiomer('distomer')}
            data-testid="toggle-distomer"
            className={`px-3 py-1.5 font-bold text-xs sm:text-sm border-2 border-black transition-transform ${
              enantiomer === 'distomer'
                ? 'bg-[#FF6B9D] text-white shadow-[2px_2px_0px_#000000] -translate-y-0.5'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Distomer ({config.distomerName})
          </button>
        </div>
      </div>

      {/* Main 3D Stage & Target Receptor View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* 3D Molecule Visualizer */}
        <div className="flex flex-col items-center justify-center p-4 bg-white border-4 border-black min-h-[260px] relative overflow-hidden">
          <div className="absolute top-2 left-2 text-[10px] font-mono uppercase font-black bg-black text-white px-1.5 py-0.5">
            3D Konfigürasyon: {enantiomer.toUpperCase()}
          </div>

          {/* Perspective viewport */}
          <div
            className="w-48 h-48 relative flex items-center justify-center transition-transform duration-200"
            style={{
              perspective: '600px',
            }}
          >
            <div
              data-testid="molecule-3d-node"
              className="w-32 h-32 relative transition-transform duration-150"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`,
              }}
            >
              {/* Central Chiral Carbon */}
              <div
                className="absolute top-1/2 left-1/2 w-6 h-6 -mt-3 -ml-3 bg-black rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-mono font-bold"
                style={{ transform: 'translateZ(0px)' }}
              >
                C*
              </div>

              {/* Group 1: Aromatic Ring */}
              <div
                data-testid="group-aromatic"
                className={`absolute top-0 left-1/2 -ml-8 px-2 py-1 border-2 border-black text-xs font-bold text-center ${
                  locus1Docked ? 'bg-[#6BCB77] text-black ring-2 ring-black' : 'bg-gray-200'
                }`}
                style={{ transform: 'translateY(-20px) translateZ(25px)' }}
              >
                [A] Aromatik
              </div>

              {/* Group 2: Hydroxyl (-OH) - Chiral Position flips in distomer! */}
              <div
                data-testid="group-hydroxyl"
                className={`absolute bottom-2 left-0 px-2 py-1 border-2 border-black text-xs font-bold text-center ${
                  locus2Docked
                    ? 'bg-[#6BCB77] text-black ring-2 ring-black'
                    : enantiomer === 'distomer'
                    ? 'bg-[#FF6B9D] text-white'
                    : 'bg-gray-200'
                }`}
                style={{
                  transform:
                    enantiomer === 'eutomer'
                      ? 'translateX(-15px) translateY(10px) translateZ(35px)'
                      : 'translateX(-25px) translateY(-10px) translateZ(-45px)', // flipped outward into solvent
                }}
              >
                [B] -OH ({enantiomer === 'eutomer' ? 'Cepte' : 'Dışa Dönük'})
              </div>

              {/* Group 3: Protonated Amine */}
              <div
                data-testid="group-amine"
                className={`absolute bottom-2 right-0 px-2 py-1 border-2 border-black text-xs font-bold text-center ${
                  locus3Docked ? 'bg-[#6BCB77] text-black ring-2 ring-black' : 'bg-gray-200'
                }`}
                style={{ transform: 'translateX(15px) translateY(10px) translateZ(25px)' }}
              >
                [C] -NH₂⁺
              </div>
            </div>
          </div>

          <div className="text-xs font-mono font-bold text-gray-600 mt-2">
            Açı: X:{rotX}° | Y:{rotY}° | Z:{rotZ}°
          </div>
        </div>

        {/* Receptor Cleft & Docking Status */}
        <div className="flex flex-col justify-between p-4 bg-white border-4 border-black">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
              Hedef: {config.targetReceptor}
            </div>
            <h4 className="text-lg font-black uppercase mb-3">Reseptör Bağlanma Cepleri</h4>

            <div className="space-y-2 mb-4">
              <div
                data-testid="locus-1-status"
                className={`p-2 border-2 border-black flex items-center justify-between text-xs font-bold ${
                  locus1Docked ? 'bg-[#E8F5E9] text-green-900 border-green-700' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <span>Nokta 1: π-π Aromatik Çukuru</span>
                <span className="font-mono">{locus1Docked ? '✓ KENETLENDİ (-4.5 kcal)' : '○ AYRI'}</span>
              </div>

              <div
                data-testid="locus-2-status"
                className={`p-2 border-2 border-black flex items-center justify-between text-xs font-bold ${
                  locus2Docked
                    ? 'bg-[#E8F5E9] text-green-900 border-green-700'
                    : enantiomer === 'distomer' && isOrientationOptimal
                    ? 'bg-[#FFEBEE] text-red-900 border-red-700'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <span>Nokta 2: Serin Hidrojen Bağı</span>
                <span className="font-mono">
                  {locus2Docked
                    ? '✓ KENETLENDİ (-3.0 kcal)'
                    : enantiomer === 'distomer' && isOrientationOptimal
                    ? '✗ STERİK ÇATIŞMA / BOŞTA'
                    : '○ AYRI'}
                </span>
              </div>

              <div
                data-testid="locus-3-status"
                className={`p-2 border-2 border-black flex items-center justify-between text-xs font-bold ${
                  locus3Docked ? 'bg-[#E8F5E9] text-green-900 border-green-700' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <span>Nokta 3: Aspartat Tuz Köprüsü</span>
                <span className="font-mono">{locus3Docked ? '✓ KENETLENDİ (-4.0 kcal)' : '○ AYRI'}</span>
              </div>
            </div>
          </div>

          {/* Calculated Output Banner */}
          <div
            id={statusId}
            data-testid="docking-result-banner"
            className={`p-3 border-2 border-black font-mono text-xs ${
              isFullyDocked
                ? 'bg-[#6BCB77] text-black font-black'
                : contactsCount === 2
                ? 'bg-[#FFD93D] text-black font-bold'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span>TEMAS SKORU: {contactsCount} / 3</span>
              <span>ΔG = {currentDeltaG.toFixed(1)} kcal/mol</span>
            </div>
            <div>
              {isFullyDocked
                ? '★ 3-NOKTA EŞLEŞTİ: Maksimal Afinite & Sinyal İletimi!'
                : contactsCount === 2
                ? `⚠ 2-NOKTA EŞLEŞTİ: Distomer zayıf bağlanır (${eudismicRatio}x düşük afinite)!`
                : 'Maksimal kenetlenme için molekülü 3 boyutta döndürün.'}
            </div>
          </div>
        </div>
      </div>

      {/* 3D Rotation Controls & WCAG 2.2 Steppers */}
      <div className="p-4 bg-white border-4 border-black mb-4">
        <div className="text-xs font-black uppercase tracking-wider mb-3">3D Oryantasyon Denetleyicileri</div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {/* Axis X */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold font-mono">X Ekseni (Pitch): {rotX}°</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleRotate('x', -15)}
                aria-label="X ekseninde geriye 15 derece döndür"
                className="px-2.5 py-1 bg-gray-200 border-2 border-black font-mono font-bold hover:bg-gray-300"
              >
                -15°
              </button>
              <button
                type="button"
                onClick={() => handleRotate('x', 15)}
                aria-label="X ekseninde ileriye 15 derece döndür"
                className="px-2.5 py-1 bg-gray-200 border-2 border-black font-mono font-bold hover:bg-gray-300"
              >
                +15°
              </button>
            </div>
          </div>

          {/* Axis Y */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold font-mono">Y Ekseni (Yaw): {rotY}°</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleRotate('y', -15)}
                aria-label="Y ekseninde sola 15 derece döndür"
                className="px-2.5 py-1 bg-gray-200 border-2 border-black font-mono font-bold hover:bg-gray-300"
              >
                -15°
              </button>
              <button
                type="button"
                onClick={() => handleRotate('y', 15)}
                aria-label="Y ekseninde sağa 15 derece döndür"
                className="px-2.5 py-1 bg-gray-200 border-2 border-black font-mono font-bold hover:bg-gray-300"
              >
                +15°
              </button>
            </div>
          </div>

          {/* Axis Z */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold font-mono">Z Ekseni (Roll): {rotZ}°</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleRotate('z', -15)}
                aria-label="Z ekseninde saat yönünün tersine 15 derece döndür"
                className="px-2.5 py-1 bg-gray-200 border-2 border-black font-mono font-bold hover:bg-gray-300"
              >
                -15°
              </button>
              <button
                type="button"
                onClick={() => handleRotate('z', 15)}
                aria-label="Z ekseninde saat yönünde 15 derece döndür"
                className="px-2.5 py-1 bg-gray-200 border-2 border-black font-mono font-bold hover:bg-gray-300"
              >
                +15°
              </button>
            </div>
          </div>
        </div>

        {/* Snap / Reset Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSnap}
            data-testid="snap-bioactive-button"
            className="px-4 py-2 bg-[#FFD93D] border-2 border-black font-bold text-xs uppercase shadow-[2px_2px_0px_#000000] hover:bg-yellow-400 active:translate-y-0.5"
          >
            Biyoaktif Cebe Hizala (Snap to Pocket)
          </button>
        </div>
      </div>

      {/* Model Illustration Notice */}
      <aside
        data-testid="model-illustration-notice"
        className="p-3 bg-[#FFF] border-2 border-black text-xs text-gray-700 font-mono leading-relaxed"
      >
        <span className="font-bold text-black uppercase">Model İllüstrasyonu Notu:</span>{' '}
        Easson-Stedman hipotezine göre kiral bir molekülün spesifik biyolojik aktivite gösterebilmesi için reseptör cebindeki en az 3 nokta ile eşzamanlı etkileşmesi gerekir. Ötomer ((S)-propranolol) 3 temas noktasını da sağlarken, distomer ((R)-propranolol) hidrojen bağı verici hidroksil grubunu çözücüye yönlendirerek yalnızca 2 noktadan bağlanabilir ($ΔΔG = 3.0$ kcal/mol $\implies \sim 150$ kat afinite kaybı). Referans: {config.equationRef}
      </aside>
    </section>
  );
};
