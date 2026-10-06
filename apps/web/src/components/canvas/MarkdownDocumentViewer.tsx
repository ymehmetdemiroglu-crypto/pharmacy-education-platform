import React from 'react';
import { Tag } from 'antd';
import { ExperimentOutlined, BookOutlined } from '@ant-design/icons';
import { DualModeMoleculeViewer } from '../widgets/DualModeMoleculeViewer';
import { SarMatrixWidget } from '../widgets/SarMatrixWidget';
import { PkCurveWidget } from '../widgets/PkCurveWidget';
import { ConceptQuizWidget } from '../widgets/ConceptQuizWidget';
import { ReceptorSignalingVisualizer } from '../widgets/ReceptorSignalingVisualizer';
import generatedConcepts from '../../data/teaching.concepts.generated.json';
import type { LectureConcept } from '@pharmacy/widgets';

interface MarkdownDocumentViewerProps {
  onAskTutor: (query: string) => void;
  activeConceptId?: string | undefined;
}

export const MarkdownDocumentViewer: React.FC<MarkdownDocumentViewerProps> = ({
  onAskTutor,
  activeConceptId,
}) => {
  const conceptsMap = React.useMemo(() => {
    const map = new Map<string, LectureConcept>();
    (generatedConcepts as unknown as LectureConcept[]).forEach((c) => {
      map.set(c.id, c);
    });
    return map;
  }, []);

  return (
    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 font-sans">
      {/* Lecture Title & Provenance Header */}
      <header className="mb-8 border-b border-slate-200 dark:border-[#2F2F2F] pb-5">
        <div className="flex flex-wrap items-center gap-2 mb-2.5">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 font-medium border border-emerald-200 dark:border-emerald-900/60">
            Farmasötik Kimya 1
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 dark:bg-[#2A2A2A] dark:text-[#B4B4B4] font-medium border border-slate-200 dark:border-[#2F2F2F]">
            Ders 01 • Vize Konusu
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 font-medium border border-emerald-200 dark:border-emerald-900/60">
            Doğrulanmış Slayt Özeti (33 Slayt)
          </span>
        </div>
        <h1 className="font-bold text-2xl sm:text-3xl text-slate-900 dark:text-[#ECECEC] tracking-tight mb-2">
          İlaç Reseptör Etkileşimi (Kimyasal Bağlar)
        </h1>
        <p className="text-sm text-slate-500 dark:text-[#8E8E8E] font-normal m-0">
          Marmara Üniversitesi Eczacılık Fakültesi — <strong>Prof. Dr. Bedia Kaymakçıoğlu</strong> ders notlarından derlenmiştir.
        </p>
      </header>

      {/* Flagship 2D/3D Molecule Canvas Showcase */}
      <section className="my-8">
        <div className="flex items-center gap-2 mb-2">
          <ExperimentOutlined className="text-[#10A37F]" />
          <h2 className="font-bold text-lg m-0 text-slate-900 dark:text-[#ECECEC]">
            İnteraktif Moleküler Yapı & Reseptör Etkileşim Haritası
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-[#8E8E8E] mb-3">
          Aşağıdaki 3D rotatable WebGL ve 2D modelinde molekülleri fareyle döndürebilir, farmakofor bağlanma bölgelerine tıklayarak AI Tutor'dan anlık açıklama alabilirsiniz.
        </p>
        <DualModeMoleculeViewer
          initialMolecule="dibucaine"
          onAskAboutSite={(siteQuery) => onAskTutor(siteQuery)}
        />
      </section>

      {/* Concept 1 */}
      <section
        id="concept-1"
        className={`my-8 p-5 rounded-xl border transition-colors ${
          activeConceptId === 'rr:receptor_tanimi'
            ? 'border-[#10A37F] bg-emerald-50/20 dark:bg-emerald-950/20'
            : 'border-slate-200 dark:border-[#2F2F2F]'
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="font-bold text-base sm:text-lg m-0 text-slate-900 dark:text-[#ECECEC]">
            1. Reseptör Tanımı ve Bağ Gücü Dengesi
          </h3>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/60">
            Slayt 2, 3, 5, 6
          </span>
        </div>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          İlaç etkisini anlamak için ilaç ile reseptör arasındaki bağ kuvvetlerini bilmek gerekir <strong>[Slayt 2]</strong>. Bu bağlar reseptörün konformasyonunu değiştirebilecek kadar <em>güçlü</em> olmalı; sinyal iletildikten sonra ilacı kolayca serbest bırakacak kadar da <em>geri dönüşümlü</em> olmalıdır <strong>[Slayt 2]</strong>.
        </p>
        <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
          <li>Reseptörlerin çoğu hücre zarı yüzeyindedir; steroit ve tiroit hormon reseptörleri ise hücre içindedir <strong>[Slayt 5]</strong>.</li>
          <li>İki temel işlevi vardır: ligandı seçici tanımak ve kimyasal sinyali biyolojik yanıta çevirmek <strong>[Slayt 6]</strong>.</li>
        </ul>

        {/* Embedded GPCR Signaling Visualizer (Gs, Gi, Gq Cascades) */}
        <div className="my-6 not-prose">
          <ReceptorSignalingVisualizer onAskTutor={onAskTutor} />
        </div>

        {conceptsMap.get('rr:receptor_tanimi') && (
          <div className="mt-4">
            <ConceptQuizWidget
              concept={conceptsMap.get('rr:receptor_tanimi')!}
              onAskTutor={onAskTutor}
            />
          </div>
        )}
      </section>

      {/* Concept 2 */}
      <section
        id="concept-2"
        className={`my-8 p-5 rounded-xl border transition-colors ${
          activeConceptId === 'rr:kovalan_baglar'
            ? 'border-[#10A37F] bg-emerald-50/20 dark:bg-emerald-950/20'
            : 'border-slate-200 dark:border-[#2F2F2F]'
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="font-bold text-base sm:text-lg m-0 text-slate-900 dark:text-white">
            2. Kovalan Bağlar (Geri Dönüşümsüz İnhibisyon)
          </h3>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
            Slayt 9, 10, 11, 12, 13
          </span>
        </div>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Kovalan bağlar elektron çiftlerinin ortaklanmasıyla oluşur ve ilaç-reseptör arasındaki <strong>en kuvvetli</strong> bağlardır (40–140 kcal/mol) <strong>[Slayt 9]</strong>. Geri dönüşümsüz etki oluşturduğu için çoğu ilaçta istenmez; ancak antibakteriyel, antiparaziter ve antikanser etkilerde aranır.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-3 text-xs">
          <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
            <strong className="text-blue-600 dark:text-blue-400 block mb-1">Alkilasyon [Slayt 10]</strong>
            <span className="text-gray-600 dark:text-gray-400">Alkilleyici kanser ilaçları protein amino veya nükleik asit fosfat gruplarını alkiler.</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
            <strong className="text-emerald-600 dark:text-emerald-400 block mb-1">Açilasyon [Slayt 11]</strong>
            <span className="text-gray-600 dark:text-gray-400">Beta-laktam antibiyotikler transpeptidaz enziminin serin hidroksilini açiller.</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
            <strong className="text-purple-600 dark:text-purple-400 block mb-1">Fosforilasyon [Slayt 12]</strong>
            <span className="text-gray-600 dark:text-gray-400">Organofosfat insektisitler asetilkolin esterazın aktif serinini fosforiller.</span>
          </div>
        </div>
        {conceptsMap.get('rr:kovalan_baglar') && (
          <div className="mt-4">
            <ConceptQuizWidget
              concept={conceptsMap.get('rr:kovalan_baglar')!}
              onAskTutor={onAskTutor}
            />
          </div>
        )}
      </section>

      {/* Concept 3 */}
      <section
        id="concept-3"
        className={`my-8 p-5 rounded-xl border transition-colors ${
          activeConceptId === 'rr:iyonik_bag'
            ? 'border-[#10A37F] bg-emerald-50/20 dark:bg-emerald-950/20'
            : 'border-slate-200 dark:border-[#2F2F2F]'
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="font-bold text-base sm:text-lg m-0 text-slate-900 dark:text-white">
            3. İyonik Bağ & Dielektrik Sabiti
          </h3>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
            Slayt 13, 14
          </span>
        </div>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          İyonik bağ, zıt yüklü iyonlar arasındaki elektrostatik çekim kuvvetidir (5–10 kcal/mol) <strong>[Slayt 13]</strong>. Bağın kuvveti yük miktarına bağlıdır; <strong>yükler arası mesafe (r) ve ortamın dielektrik sabiti (ε) arttıkça bağ zayıflar</strong> <strong>[Slayt 13]</strong>.
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Zayıf asit veya baz özellikli ilaçlar fizyolojik pH'da iyonlaşarak reseptördeki zıt yüklü amino asitlerle (örn. Aspartat-, Glutamat- ile protonlanmış aminler) bağlanır <strong>[Slayt 14]</strong>.
        </p>
        {conceptsMap.get('rr:iyonik_bag') && (
          <div className="mt-4">
            <ConceptQuizWidget
              concept={conceptsMap.get('rr:iyonik_bag')!}
              onAskTutor={onAskTutor}
            />
          </div>
        )}
      </section>

      {/* Concept 4 & 5: Hydrogen Bond & Salicylic Acid */}
      <section
        id="concept-4"
        className={`my-8 p-5 rounded-xl border transition-colors ${
          activeConceptId === 'rr:hidrojen_bagi' || activeConceptId === 'rr:hbag_ozellik_etkisi'
            ? 'border-[#10A37F] bg-emerald-50/20 dark:bg-emerald-950/20'
            : 'border-slate-200 dark:border-[#2F2F2F]'
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="font-bold text-base sm:text-lg m-0 text-slate-900 dark:text-white">
            4 & 5. Hidrojen Bağı ve İzomerik Etki (Salisilik Asit)
          </h3>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
            Slayt 15, 17, 19
          </span>
        </div>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Hidrojen bağında hidrojen atomu bir donör (X) ile bir akseptör (Y) arasında ortaklanır: <code>X–H···Y</code> <strong>[Slayt 15]</strong>. Donör tarafı elektron eksikliği olan hidrojeni taşıyan hidroksil, amino veya tiyol grubudur; akseptör serbest elektron çifti taşıyan heteroatomdur (O, N, S).
        </p>
        <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg my-3 text-xs">
          <strong className="text-amber-900 dark:text-amber-300 block mb-1">
            Önemli Vize Örneği: Salisilik Asit vs İzomerleri [Slayt 19]
          </strong>
          <span className="text-amber-950 dark:text-amber-200">
            <strong>Salisilik asit (o-hidroksibenzoik asit)</strong> molekül içi hidrojen bağı kurabildiği için lipofilikliği artar ve güçlü antibakteriyel etki gösterir. Yapısal izomerleri olan <strong>m- ve p-hidroksibenzoik asit</strong> ise moleküller arası hidrojen bağlarıyla polimerleştiğinden bu biyolojik etkiyi göstermez!
          </span>
        </div>
        {conceptsMap.get('rr:hbag_ozellik_etkisi') && (
          <div className="mt-4">
            <ConceptQuizWidget
              concept={conceptsMap.get('rr:hbag_ozellik_etkisi')!}
              onAskTutor={onAskTutor}
            />
          </div>
        )}
      </section>

      {/* SAR Matrix Embedded in Lecture */}
      <section className="my-8">
        <SarMatrixWidget onAskTutor={onAskTutor} />
      </section>

      {/* Concept 6: Dipole interactions */}
      <section
        id="concept-6"
        className={`my-8 p-5 rounded-xl border transition-colors ${
          activeConceptId === 'rr:iyon_dipol_dipol_dipol'
            ? 'border-[#10A37F] bg-emerald-50/20 dark:bg-emerald-950/20'
            : 'border-slate-200 dark:border-[#2F2F2F]'
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="font-bold text-base sm:text-lg m-0 text-slate-900 dark:text-white">
            6. İyon-Dipol ve Dipol-Dipol Etkileşimleri
          </h3>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
            Slayt 20, 21
          </span>
        </div>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Heteroatomlar ile karbon arasındaki elektronegatiflik farkı molekülde dipol momenti oluşturur (C=O, ester, amit, eter) <strong>[Slayt 20]</strong>. Bu kutuplar zıt iyonlarla (iyon-dipol) veya diğer dipollerle (dipol-dipol) zayıf ve geri dönüşümlü bağlar kurar <strong>[Slayt 21]</strong>. Mesafe dipol-dipol etkileşimlerinde çok daha hassastır.
        </p>
        {conceptsMap.get('rr:iyon_dipol_dipol_dipol') && (
          <div className="mt-4">
            <ConceptQuizWidget
              concept={conceptsMap.get('rr:iyon_dipol_dipol_dipol')!}
              onAskTutor={onAskTutor}
            />
          </div>
        )}
      </section>

      {/* Concept 7: Charge Transfer */}
      <section
        id="concept-7"
        className={`my-8 p-5 rounded-xl border transition-colors ${
          activeConceptId === 'rr:yuk_transferi'
            ? 'border-[#10A37F] bg-emerald-50/20 dark:bg-emerald-950/20'
            : 'border-slate-200 dark:border-[#2F2F2F]'
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="font-bold text-base sm:text-lg m-0 text-slate-900 dark:text-white">
            7. Yük Transfer Etkileşimleri (Pi-Pi Orbitalleri)
          </h3>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
            Slayt 22, 23
          </span>
        </div>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Elektron donörü molekülden akseptör moleküle yük aktarımıyla yük transfer kompleksi kurulur <strong>[Slayt 22]</strong>. Elektron veren sübstitüentli (örn. metoksi, amino) aromatik halkalar <strong>donör</strong>; elektron çeken sübstitüentli (örn. nitro, siyano) halkalar <strong>akseptör</strong> rolünü üstlenir <strong>[Slayt 22]</strong>.
        </p>
        {conceptsMap.get('rr:yuk_transferi') && (
          <div className="mt-4">
            <ConceptQuizWidget
              concept={conceptsMap.get('rr:yuk_transferi')!}
              onAskTutor={onAskTutor}
            />
          </div>
        )}
      </section>

      {/* Concept 8: Van der Waals & Hydrophobic */}
      <section
        id="concept-8"
        className={`my-8 p-5 rounded-xl border transition-colors ${
          activeConceptId === 'rr:vdw_hidrofobik'
            ? 'border-[#10A37F] bg-emerald-50/20 dark:bg-emerald-950/20'
            : 'border-slate-200 dark:border-[#2F2F2F]'
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="font-bold text-base sm:text-lg m-0 text-slate-900 dark:text-white">
            8. Van der Waals Güçleri & Hidrofobik Etkileşim (Entropi İlkesi)
          </h3>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
            Slayt 24, 25
          </span>
        </div>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Van der Waals güçleri, moleküllerin polarizlenebilme özelliğinden doğar ve apolar atomlar 4–6 Å yaklaştığında geçici zıt dipoller indükler <strong>[Slayt 24]</strong>.
        </p>
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 rounded-lg my-3 text-xs">
          <strong className="text-emerald-900 dark:text-emerald-300 block mb-1">
            Slayt 25 Entropi İlkesi:
          </strong>
          <span className="text-emerald-950 dark:text-emerald-200">
            Hidrofobik etkileşimin enerjisi oluşan bir kimyasal bağla doğrudan ilgili değildir; apolar yüzeyler birleşirken çevrelerindeki organize su moleküllerinin serbest kalarak sistemin <strong>entropisinde oluşturduğu artışla (ΔS &gt; 0)</strong> ilgilidir!
          </span>
        </div>
        {conceptsMap.get('rr:vdw_hidrofobik') && (
          <div className="mt-4">
            <ConceptQuizWidget
              concept={conceptsMap.get('rr:vdw_hidrofobik')!}
              onAskTutor={onAskTutor}
            />
          </div>
        )}
      </section>

      {/* Concept 9: Chelation & Denticity */}
      <section
        id="concept-9"
        className={`my-8 p-5 rounded-xl border transition-colors ${
          activeConceptId === 'rr:selasyon'
            ? 'border-[#10A37F] bg-emerald-50/20 dark:bg-emerald-950/20'
            : 'border-slate-200 dark:border-[#2F2F2F]'
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="font-bold text-base sm:text-lg m-0 text-slate-900 dark:text-white">
            9. Şelasyon ve Dişlilik
          </h3>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
            Slayt 26, 28, 30
          </span>
        </div>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Geçiş metalleri (akseptör) ile ligandın donör atomları arasında koordine kovalan bağlarla siklik kompleks oluşumuna <strong>şelat</strong> denir <strong>[Slayt 26]</strong>. Ligandın taşıdığı elektron donörü grup sayısına göre dişlilik sınıflanır:
        </p>
        <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
          <li><strong>Bidentat (İki Dişli):</strong> Etilen diamin (2 azot donörü) <strong>[Slayt 30]</strong>.</li>
          <li><strong>Tridentat (Üç Dişli):</strong> Dietilentriamin (3 azot donörü) <strong>[Slayt 30]</strong>.</li>
        </ul>
        {conceptsMap.get('rr:selasyon') && (
          <div className="mt-4">
            <ConceptQuizWidget
              concept={conceptsMap.get('rr:selasyon')!}
              onAskTutor={onAskTutor}
            />
          </div>
        )}
      </section>

      {/* PK Simulator Embedded in Lecture */}
      <section className="my-8">
        <PkCurveWidget />
      </section>

      {/* Concept 10: Integration Task - Dibucaine */}
      <section
        id="concept-10"
        className={`my-8 p-5 rounded-xl border transition-colors ${
          activeConceptId === 'rr:dibukain_entegrasyon'
            ? 'border-[#10A37F] bg-emerald-50/20 dark:bg-emerald-950/20'
            : 'border-slate-200 dark:border-[#2F2F2F]'
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="font-bold text-base sm:text-lg m-0 text-slate-900 dark:text-white">
            10. Entegrasyon Görevi: Dibukain Çoklu Etkileşim Haritası
          </h3>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
            Slayt 33
          </span>
        </div>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Prof. Dr. Bedia Kaymakçıoğlu'nun dersindeki zirve entegrasyon örneği <strong>Dibukain</strong> lokal anestezik molekülüdür <strong>[Slayt 33]</strong>. Tek bir bileşik üzerinde öğrendiğimiz tüm bağ türleri aynı anda işlev görür:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs my-3">
          <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
            <strong className="block text-slate-900 dark:text-slate-100 mb-1">Kinolin Çekirdeği:</strong>
            <span className="text-gray-600 dark:text-gray-400">Yük transferi, pi-pi aromatik etkileşim ve hidrofobik bağlanma.</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
            <strong className="block text-slate-900 dark:text-slate-100 mb-1">Bütoksi Kuyruğu:</strong>
            <span className="text-gray-600 dark:text-gray-400">Lipofilik membrana uyum ve Van der Waals güçleri.</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
            <strong className="block text-slate-900 dark:text-slate-100 mb-1">Amit Fonksiyonu:</strong>
            <span className="text-gray-600 dark:text-gray-400">Hidrojen bağı donör/akseptörü ve dipol-dipol çekimi.</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
            <strong className="block text-slate-900 dark:text-slate-100 mb-1">Tersiyer Amin Azotu:</strong>
            <span className="text-gray-600 dark:text-gray-400">Fizyolojik pH'da protonlanarak iyonik bağ ve iyon-dipol kuvveti.</span>
          </div>
        </div>
      </section>

      {/* Mandatory End-of-Lesson Provenance Attribution (AGENTS.md Rule 2) */}
      <footer className="mt-12 p-5 rounded-2xl border border-slate-200 dark:border-[#2F2F2F] bg-slate-50 dark:bg-[#1A1A1A] text-xs transition-colors">
        <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-[#ECECEC] flex items-center gap-1.5 mb-3">
          <BookOutlined className="text-[#10A37F]" />
          Kaynak ve Atıf Tablosu (Provenance Attribution)
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-[11px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-[#2F2F2F] text-slate-500 dark:text-[#8E8E8E]">
                <th className="py-1.5">Konsept</th>
                <th className="py-1.5">Başlık</th>
                <th className="py-1.5">Kaynak</th>
                <th className="py-1.5">Slayt No</th>
              </tr>
            </thead>
            <tbody>
              {generatedConcepts.map((c, i) => (
                <tr key={c.id} className="border-b border-slate-200 dark:border-[#2F2F2F]">
                  <td className="py-1.5 font-bold text-slate-700 dark:text-[#ECECEC]">{i + 1}</td>
                  <td className="py-1.5 text-slate-800 dark:text-[#ECECEC]">{c.conceptTitle}</td>
                  <td className="py-1.5 text-slate-500 dark:text-[#8E8E8E] truncate max-w-[200px]">{c.sourceDeck}</td>
                  <td className="py-1.5 text-[#10A37F] font-semibold">Slayt {c.slideNumbers.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </footer>
    </div>
  );
};
