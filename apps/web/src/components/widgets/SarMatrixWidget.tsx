import React, { useState } from 'react';
import { Tag, Table, Segmented, Button } from 'antd';
import { InfoCircleOutlined, ExperimentOutlined, RobotOutlined } from '@ant-design/icons';

interface SarRow {
  key: string;
  substituent: string;
  chemicalModification: string;
  bondType: string;
  potencyRatio: string;
  stability: string;
  slideRef: number;
}

const DATA_SERIES: Record<string, { title: string; subtitle: string; rows: SarRow[] }> = {
  esters_vs_amides: {
    title: 'Ester vs Amit Köprüsü Değişimi',
    subtitle: 'Hidrojen bağı ve enzimatik stabilite kıyaslaması (Slayt 20 & 33)',
    rows: [
      {
        key: '1',
        substituent: 'Prokain (-COO- ester)',
        chemicalModification: 'Ester köprüsü',
        bondType: 'Dipol-dipol & H-akseptör',
        potencyRatio: '1.0x (Referans)',
        stability: 'Plazma esterazları ile hızlı hidroliz (Kısa yarı ömür)',
        slideRef: 20,
      },
      {
        key: '2',
        substituent: 'Lidokain / Dibukain (-CONH- amit)',
        chemicalModification: 'Amit izosteri',
        bondType: 'H-donör + H-akseptör & Dipol',
        potencyRatio: '4.0x – 15.0x',
        stability: 'Esterazlara dirençli, karaciğer mikrozomal metabolizma',
        slideRef: 33,
      },
      {
        key: '3',
        substituent: 'Tiyoester (-COS-)',
        chemicalModification: 'Kükürt izosteri',
        bondType: 'Zayıf dipol, düşük elektronegatiflik',
        potencyRatio: '0.3x',
        stability: 'Çok kararsız kimyasal hidroliz',
        slideRef: 15,
      },
    ],
  },
  amine_cation: {
    title: 'Amin Azotu İyonlaşma & Yük Derecesi',
    subtitle: 'İyonik bağ ve membran geçiş dengesi (Slayt 13, 14, 33)',
    rows: [
      {
        key: '4',
        substituent: 'Kuaterner Azot (-N⁺(CH3)3)',
        chemicalModification: 'Kalıcı pozitif yük',
        bondType: 'Güçlü İyonik Bağ (Asp/Glu)',
        potencyRatio: 'Yüksek reseptör afinitesi, sıfır membran geçişi (BBB -)',
        stability: 'Periferik etki, SSS geçemez',
        slideRef: 14,
      },
      {
        key: '5',
        substituent: 'Tersiyer Amin (-N(C2H5)2) [Dibukain]',
        chemicalModification: 'Fizyolojik pH pKa ~8.5',
        bondType: 'Geri dönüşümlü iyonik & dipol',
        potencyRatio: 'Optimum: Nötr form zarı geçer, iyonize form bağlanır',
        stability: 'Lokal anestezik etki için ideal',
        slideRef: 33,
      },
      {
        key: '6',
        substituent: 'Sekonder / Primer Amin',
        chemicalModification: 'Azot üzerinde hidrojen artışı',
        bondType: 'İyonik + H-bağı donörü',
        potencyRatio: 'Düşük lipofiliklik, hızlı oksidatif deaminasyon',
        stability: 'MAO enzimi ile hızlı yıkım',
        slideRef: 13,
      },
    ],
  },
};

export const SarMatrixWidget: React.FC<{ onAskTutor?: (query: string) => void }> = ({ onAskTutor }) => {
  const [selectedSeries, setSelectedSeries] = useState<string>('esters_vs_amides');
  const current = DATA_SERIES[selectedSeries] ?? DATA_SERIES.esters_vs_amides!;

  const columns = [
    {
      title: 'Analog / Yapı',
      dataIndex: 'substituent',
      key: 'substituent',
      render: (text: string) => (
        <span className="font-semibold text-xs sm:text-sm">{text}</span>
      ),
    },
    {
      title: 'Etkileşim Türü',
      dataIndex: 'bondType',
      key: 'bondType',
      render: (text: string) => <Tag color="blue" className="text-[11px] rounded-lg">{text}</Tag>,
    },
    {
      title: 'Biyolojik Yanıt / Potans',
      dataIndex: 'potencyRatio',
      key: 'potencyRatio',
      render: (text: string) => <span className="font-mono text-xs">{text}</span>,
    },
    {
      title: 'Metabolik Stabilite',
      dataIndex: 'stability',
      key: 'stability',
      render: (text: string) => <span className="text-xs text-gray-600 dark:text-gray-300">{text}</span>,
    },
    {
      title: 'Slayt',
      dataIndex: 'slideRef',
      key: 'slideRef',
      render: (slide: number) => (
        <Tag color="cyan" className="font-mono text-[10px] rounded-lg">
          Slayt {slide}
        </Tag>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131B2A] p-4 sm:p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <h3 className="font-bold text-sm sm:text-base flex items-center gap-1.5 m-0 text-slate-900 dark:text-white">
            <ExperimentOutlined className="text-blue-500" />
            Dinamik SAR Matrisi (Yapı-Aktivite İlişkisi)
          </h3>
          <p className="text-xs text-gray-500 m-0 mt-0.5">{current.subtitle}</p>
        </div>

        <Segmented
          value={selectedSeries}
          onChange={(val) => setSelectedSeries(val as string)}
          options={[
            { label: 'Ester vs Amit (S20, S33)', value: 'esters_vs_amides' },
            { label: 'Amin İyonizasyonu (S13, S33)', value: 'amine_cation' },
          ]}
          size="small"
        />
      </div>

      <div className="overflow-x-auto">
        <Table
          dataSource={current.rows}
          columns={columns}
          pagination={false}
          size="small"
          className="text-xs"
          expandable={{
            expandedRowRender: (record) => (
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <div className="font-semibold text-slate-800 dark:text-slate-200">
                    Kimyasal Modifikasyon: <span className="font-normal text-blue-600 dark:text-blue-400">{record.chemicalModification}</span>
                  </div>
                  <div className="text-gray-500">
                    Farmasötik Mekanizma: {record.stability} (Referans: Slayt {record.slideRef})
                  </div>
                </div>
                {onAskTutor && (
                  <Button
                    size="small"
                    type="primary"
                    ghost
                    icon={<RobotOutlined />}
                    onClick={() =>
                      onAskTutor(
                        `${record.substituent} (${record.bondType}) modifikasyonunun farmakolojik etkisini ve Slayt ${record.slideRef}'deki önemini açıklar mısın?`
                      )
                    }
                    className="shrink-0 rounded-xl px-3 py-1 font-medium"
                  >
                    Bu Yapıyı Tutor'a Sor
                  </Button>
                )}
              </div>
            ),
            rowExpandable: () => true,
          }}
        />
      </div>

      <div className="flex items-center justify-between gap-2 text-[11px] text-gray-500 bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-1.5">
          <InfoCircleOutlined className="text-blue-500 shrink-0" />
          <span>Model illüstrasyonu: Bağıntılar ders slaytlarındaki nitel afinite ilkelerine dayanmaktadır.</span>
        </div>
        {onAskTutor && (
          <Button
            type="link"
            size="small"
            icon={<RobotOutlined className="text-blue-500" />}
            onClick={() => onAskTutor(`SAR Matrisindeki '${current.title}' konusunu ve farmakolojik etkisini açıklar mısın?`)}
            className="text-blue-600 dark:text-blue-400 font-bold shrink-0 p-0 h-auto"
          >
            Tutor'a Sor →
          </Button>
        )}
      </div>
    </div>
  );
};
