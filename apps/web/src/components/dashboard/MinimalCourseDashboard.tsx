import React, { useState } from 'react';
import { Card, Progress, Button, Tag } from 'antd';
import {
  ExperimentOutlined,
  BookOutlined,
  FireFilled,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
  ThunderboltOutlined,
  CalendarOutlined,
  SafetyCertificateOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons';
import { StudyPulseLounge } from '../study/StudyPulseLounge';
import { PastExamPracticeModal } from '../exam/PastExamPracticeModal';
import { StudentDocumentVaultModal } from '../vault/StudentDocumentVaultModal';
import { DailyChallengeModal } from '../study/DailyChallengeModal';

interface MinimalCourseDashboardProps {
  onSelectLecture: (lectureId: string) => void;
  completedConceptsCount?: number;
  totalConceptsCount?: number;
  onAskTutor?: (prompt: string) => void;
}

export const MinimalCourseDashboard: React.FC<MinimalCourseDashboardProps> = ({
  onSelectLecture,
  completedConceptsCount = 6,
  totalConceptsCount = 10,
  onAskTutor,
}) => {
  const [isDailyChallengeOpen, setIsDailyChallengeOpen] = useState(false);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [isVaultModalOpen, setIsVaultModalOpen] = useState(false);
  const readinessPercent = Math.round((completedConceptsCount / totalConceptsCount) * 100);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 flex flex-col gap-8 animate-fadeIn">
      {/* Top Banner: Exam Readiness & Countdown */}
      <section className="bg-white dark:bg-[#171717] rounded-2xl border border-slate-200 dark:border-[#2F2F2F] p-6 sm:p-8 shadow-xs transition-colors">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-200 dark:border-emerald-900/60">
                <CalendarOutlined /> Bahar Vizesine 28 Gün Kaldı
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs font-semibold border border-amber-200 dark:border-amber-900/60">
                <FireFilled className="text-amber-500" /> 4 Günlük Seri
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-[#ECECEC] m-0">
              Eczacılık Vize Hazırlık Panosu
            </h1>
            <p className="text-sm text-slate-500 dark:text-[#B4B4B4] mt-2 mb-0 max-w-xl">
              Ders notlarındaki vize konularını interaktif 3D modeller, GPCR simülatörleri ve Sokratik AI desteği ile adım adım pekiştirin.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button
                type="primary"
                onClick={() => setIsDailyChallengeOpen(true)}
                icon={<ThunderboltOutlined />}
                className="rounded-xl text-xs font-semibold h-9 px-4 bg-[#10A37F] hover:bg-[#0E8C6D] border-0 text-white shadow-xs flex items-center gap-1.5"
              >
                Günün 10 Sorusuna Başla ⚡
              </Button>
              <Button
                onClick={() => setIsVaultModalOpen(true)}
                icon={<FolderOpenOutlined className="text-[#10A37F]" />}
                className="rounded-xl text-xs font-semibold h-9 px-4 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 hover:border-emerald-500 shadow-xs flex items-center gap-1.5"
              >
                Ders Notlarım & Doküman Deposu 📂
              </Button>
              <Button
                onClick={() => setIsExamModalOpen(true)}
                icon={<SafetyCertificateOutlined className="text-emerald-500" />}
                className="rounded-xl text-xs font-semibold h-9 px-4 bg-slate-50 dark:bg-[#212121] border border-slate-200 dark:border-[#2F2F2F] text-slate-800 dark:text-[#ECECEC] hover:border-emerald-500 shadow-xs flex items-center gap-1.5"
              >
                Çıkmış Soru Analizi & İkiz Soru Motoru 🛡️
              </Button>
            </div>

          </div>

          {/* Readiness Circle & Quick Metric */}
          <div className="flex items-center gap-6 bg-slate-50 dark:bg-[#212121] px-5 py-4 rounded-xl border border-slate-200 dark:border-[#2F2F2F] shrink-0">
            <div className="flex flex-col items-center">
              <Progress
                type="circle"
                percent={readinessPercent}
                size={68}
                strokeColor="#10A37F"
                trailColor="rgba(128, 128, 128, 0.2)"
                format={(percent) => (
                  <span className="text-xs font-bold text-slate-800 dark:text-[#ECECEC]">
                    %{percent}
                  </span>
                )}
              />
              <span className="text-[11px] font-medium text-slate-500 dark:text-[#8E8E8E] mt-1.5">
                Vize Hazırlığı
              </span>
            </div>

            <div className="flex flex-col gap-2 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircleOutlined className="text-emerald-600 dark:text-emerald-400" />
                <span className="text-slate-700 dark:text-[#ECECEC]">
                  <strong>{completedConceptsCount}</strong> / {totalConceptsCount} Kavram Tamam
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ClockCircleOutlined className="text-blue-500" />
                <span className="text-slate-700 dark:text-[#ECECEC]">
                  <strong>45 dk</strong> Çalışma Süresi
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ThunderboltOutlined className="text-amber-500" />
                <span className="text-slate-700 dark:text-[#ECECEC]">
                  <strong>3</strong> Yanılgı Teşhis Edildi
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Co-Presence & Focus Lounge */}
      <StudyPulseLounge onStartStudySession={() => onSelectLecture('medchem-1')} />

      {/* Courses Section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-[#ECECEC] m-0">
            Aktif Kurslar & Ders Modülleri
          </h2>
          <span className="text-xs text-slate-500 dark:text-[#8E8E8E]">2 Temel Kurs Mevcut</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Course 1: Farmasötik Kimya */}
          <div className="bg-white dark:bg-[#171717] rounded-2xl border border-slate-200 dark:border-[#2F2F2F] p-6 shadow-xs flex flex-col justify-between transition-colors">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                  <ExperimentOutlined /> Farmasötik Kimya 1
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 font-bold">
                  AKTİF MODÜL
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#ECECEC] mb-1">
                İlaç Reseptör Etkileşimi (Kimyasal Bağlar)
              </h3>
              <p className="text-xs text-slate-500 dark:text-[#B4B4B4] mb-4">
                Prof. Dr. Bedia Kaymakçıoğlu • 33 Slayt • Kovalan, İyonik, H-Bağları, Şelasyon ve Dibukain SAR Analizi
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#2A2A2A] text-slate-700 dark:text-[#B4B4B4]">
                  3D WebGL Molekül
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#2A2A2A] text-slate-700 dark:text-[#B4B4B4]">
                  Dinamik SAR Matrisi
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#2A2A2A] text-slate-700 dark:text-[#B4B4B4]">
                  Sokratik İpuçları
                </span>
              </div>

              {/* Progress */}
              <div className="mb-5">
                <div className="flex justify-between text-xs text-slate-600 dark:text-[#B4B4B4] mb-1">
                  <span>Modül İlerlemesi</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">%70</span>
                </div>
                <Progress percent={70} showInfo={false} strokeColor="#10A37F" trailColor="rgba(128,128,128,0.2)" />
              </div>
            </div>

            <Button
              type="primary"
              size="large"
              icon={<ArrowRightOutlined />}
              onClick={() => onSelectLecture('medchem-1')}
              className="w-full bg-[#10A37F] hover:bg-[#0E8C6D] text-white font-semibold rounded-xl h-11 border-0 shadow-xs flex items-center justify-center gap-2"
            >
              Çalışmaya Devam Et
            </Button>
          </div>

          {/* Course 2: Farmakoloji */}
          <div className="bg-white dark:bg-[#171717] rounded-2xl border border-slate-200 dark:border-[#2F2F2F] p-6 shadow-xs flex flex-col justify-between transition-colors">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400">
                  <BookOutlined /> Farmakoloji 1
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 font-bold">
                  AKTİF SİMÜLATÖR
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#ECECEC] mb-1">
                Farmakodinamik & Reseptör Sinyal Yolakları
              </h3>
              <p className="text-xs text-slate-500 dark:text-[#B4B4B4] mb-4">
                Gs, Gi, Gq heterotrimerik protein kaskatları, cAMP/IP₃ ikincil habercileri ve PK/PD plazma simülasyonu
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#2A2A2A] text-slate-700 dark:text-[#B4B4B4]">
                  GPCR Kaskad Simülatörü
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#2A2A2A] text-slate-700 dark:text-[#B4B4B4]">
                  PK/PD Doz-Yanıt Eğrisi
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#2A2A2A] text-slate-700 dark:text-[#B4B4B4]">
                  Yanılgı Telemetrisi
                </span>
              </div>

              {/* Progress */}
              <div className="mb-5">
                <div className="flex justify-between text-xs text-slate-600 dark:text-[#B4B4B4] mb-1">
                  <span>Modül İlerlemesi</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">%50</span>
                </div>
                <Progress percent={50} showInfo={false} strokeColor="#10A37F" trailColor="rgba(128,128,128,0.2)" />
              </div>
            </div>

            <Button
              type="default"
              size="large"
              icon={<ArrowRightOutlined />}
              onClick={() => onSelectLecture('pharm-1')}
              className="w-full bg-slate-100 dark:bg-[#2A2A2A] hover:bg-slate-200 dark:hover:bg-[#333333] text-slate-800 dark:text-[#ECECEC] font-semibold rounded-xl h-11 border-slate-200 dark:border-[#2F2F2F] shadow-xs flex items-center justify-center gap-2"
            >
              Simülatörü Başlat
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Curriculum Pipeline */}
      <section className="bg-slate-50 dark:bg-[#1A1A1A] rounded-2xl border border-slate-200 dark:border-[#2F2F2F] p-6 transition-colors">
        <h3 className="text-sm font-bold text-slate-800 dark:text-[#ECECEC] uppercase tracking-wider mb-3">
          Öne Çıkan Vize Ders Modülleri
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div
            onClick={() => onSelectLecture('medchem-2')}
            className="p-3.5 rounded-xl bg-white dark:bg-[#212121] border border-slate-200 dark:border-[#2F2F2F] hover:border-emerald-500 cursor-pointer transition-all shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-semibold text-slate-800 dark:text-[#ECECEC]">
                Fizikokimyasal Özellikler
              </div>
              <div className="text-[11px] text-slate-500 dark:text-[#8E8E8E] mt-1">
                pKa, logP, Henderson-Hasselbalch dengesi
              </div>
            </div>
            <span className="inline-block mt-3 text-[11px] font-medium text-[#10A37F]">
              Derse Başla →
            </span>
          </div>

          <div
            onClick={() => onSelectLecture('medchem-3')}
            className="p-3.5 rounded-xl bg-white dark:bg-[#212121] border border-slate-200 dark:border-[#2F2F2F] hover:border-emerald-500 cursor-pointer transition-all shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-semibold text-slate-800 dark:text-[#ECECEC]">
                Lokal Anestezikler SAR
              </div>
              <div className="text-[11px] text-slate-500 dark:text-[#8E8E8E] mt-1">
                Ester vs Amit izosterizmi ve QSAR
              </div>
            </div>
            <span className="inline-block mt-3 text-[11px] font-medium text-[#10A37F]">
              Derse Başla →
            </span>
          </div>

          <div
            onClick={() => onSelectLecture('pharm-7')}
            className="p-3.5 rounded-xl bg-white dark:bg-[#212121] border border-slate-200 dark:border-[#2F2F2F] hover:border-emerald-500 cursor-pointer transition-all shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-semibold text-slate-800 dark:text-[#ECECEC]">
                Kolinerjik Sistem & Reseptörler
              </div>
              <div className="text-[11px] text-slate-500 dark:text-[#8E8E8E] mt-1">
                Muskarinik / Nikotinik alt tipler
              </div>
            </div>
            <span className="inline-block mt-3 text-[11px] font-medium text-[#10A37F]">
              Derse Başla →
            </span>
          </div>
        </div>
      </section>

      {/* Safe-Harbor Past Exam & Twin Question Practice Modal */}
      <PastExamPracticeModal
        open={isExamModalOpen}
        onClose={() => setIsExamModalOpen(false)}
      />

      {/* Student Personal Notes Vault & AI Study Guide Synthesizer */}
      <StudentDocumentVaultModal
        open={isVaultModalOpen}
        onClose={() => setIsVaultModalOpen(false)}
        onAskTutorAboutExcerpt={onAskTutor}
      />

      {/* Daily 10 High-Yield Challenge Loop Modal */}
      <DailyChallengeModal
        open={isDailyChallengeOpen}
        onClose={() => setIsDailyChallengeOpen(false)}
      />
    </div>
  );
};

