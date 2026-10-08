import React, { useState, useEffect } from 'react';
import {
  FacultyRoomConfig,
  FacultyTableTopic,
  CohortHeatmapStats,
  MisconceptionSurgeBroadcast,
  MisconceptionChallenge
} from '../../types/facultyAmfi.types';
import {
  facultyAmfiService,
  getCohortPomodoroState
} from '../../services/facultyAmfiService';
import { MisconceptionSurgeBanner } from './MisconceptionSurgeBanner';
import { MisconceptionChallengeModal } from './MisconceptionChallengeModal';

export interface FacultyAmfiLoungeProps {
  initialCourseId?: 'medchem' | 'pharmacology';
  onNavigateToModule?: (moduleId: string, slideNumber?: number) => void;
}

export const FacultyAmfiLounge: React.FC<FacultyAmfiLoungeProps> = ({
  initialCourseId = 'medchem',
  onNavigateToModule
}) => {
  const [faculties] = useState<FacultyRoomConfig[]>(() => facultyAmfiService.getCuratedFaculties());
  const [selectedFacultySlug, setSelectedFacultySlug] = useState<string>(faculties[0]?.slug || 'marmara-eczacilik');
  const [courseId, setCourseId] = useState<'medchem' | 'pharmacology'>(initialCourseId);

  const [activeTables, setActiveTables] = useState<FacultyTableTopic[]>([]);
  const [cohortStats, setCohortStats] = useState<CohortHeatmapStats | null>(null);
  const [activeSurgeAlert, setActiveSurgeAlert] = useState<MisconceptionSurgeBroadcast | null>(null);

  const [studyStatus, setStudyStatus] = useState<'studying' | 'idle'>('studying');
  const [currentMode, setCurrentMode] = useState<'focus' | 'vize_triage' | 'metrobus'>('focus');

  // Pomodoro synchronized timer state
  const [pomodoro, setPomodoro] = useState(() => getCohortPomodoroState());

  // Active Misconception Challenge Modal
  const [activeChallenge, setActiveChallenge] = useState<MisconceptionChallenge | null>(null);

  // Subscribe to room presence & alerts
  useEffect(() => {
    const unsubscribe = facultyAmfiService.subscribeToRoom(
      selectedFacultySlug,
      courseId,
      {
        onPresenceUpdate: (stats, tables) => {
          setCohortStats(stats);
          setActiveTables(tables);
        },
        onSurgeAlert: (alert) => {
          setActiveSurgeAlert(alert);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [selectedFacultySlug, courseId]);

  // Update Pomodoro every second
  useEffect(() => {
    const timer = setInterval(() => {
      setPomodoro(getCohortPomodoroState());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fallbackFaculty: FacultyRoomConfig = faculties[0]!;
  const currentFaculty: FacultyRoomConfig = faculties.find((f) => f.slug === selectedFacultySlug) ?? fallbackFaculty;
  const ephemeralId = facultyAmfiService.getStudentEphemeralId();

  const handleFacultyChange = (slug: string) => {
    setSelectedFacultySlug(slug);
    const config = facultyAmfiService.getFacultyConfig(slug);
    if (config?.currentSurgeAlert) {
      setActiveSurgeAlert(config.currentSurgeAlert);
    } else {
      setActiveSurgeAlert(null);
    }
  };

  const handleOpenChallenge = (trapCode: string) => {
    const challenge = facultyAmfiService.getChallengeForTrap(trapCode);
    if (challenge) {
      setActiveChallenge(challenge);
    }
  };

  const handleChallengeComplete = (isCorrect: boolean) => {
    if (activeChallenge) {
      facultyAmfiService.reportAttempt({
        faculty_slug: selectedFacultySlug,
        course_id: courseId,
        module_id: 'general_curriculum',
        slide_number: activeChallenge.slideNumber,
        trap_code: activeChallenge.trapCode,
        is_correct: isCorrect,
        timestamp: new Date().toISOString()
      });
    }
  };

  const handleStatusToggle = (newStatus: 'studying' | 'idle') => {
    setStudyStatus(newStatus);
    facultyAmfiService.setStudyStatus(newStatus);
  };

  const handleModeToggle = (newMode: 'focus' | 'vize_triage' | 'metrobus') => {
    setCurrentMode(newMode);
    facultyAmfiService.setMode(newMode);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-6 font-sans text-slate-900 dark:text-[#ECECEC]">
      {/* Top Header: Title, Course Switch, and Faculty Pill Selector */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 dark:border-[#2F2F2F] bg-white dark:bg-[#1E1E1E] p-5 sm:p-6 shadow-xs md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-base font-bold">
              🏛️
            </span>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white md:text-2xl">
              Sanal Amfi & Fakülte Masası
            </h1>
          </div>
          <p className="mt-1 text-xs font-medium text-slate-500 dark:text-neutral-400">
            Dönem arkadaşlarınla canlı çalışma ritmi • KVKK No. 6698 Uyumlu • Sıfır İsim / Sıfır Yarışma
          </p>
        </div>

        {/* Course Switcher */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCourseId('medchem')}
            className={`rounded-xl px-4 py-2 text-xs font-semibold border transition-all ${
              courseId === 'medchem'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-slate-100 dark:bg-[#2A2A2A] text-slate-700 dark:text-neutral-300 border-slate-200 dark:border-[#383838] hover:bg-slate-200 dark:hover:bg-[#333333]'
            }`}
          >
            Farmasötik Kimya
          </button>
          <button
            type="button"
            onClick={() => setCourseId('pharmacology')}
            className={`rounded-xl px-4 py-2 text-xs font-semibold border transition-all ${
              courseId === 'pharmacology'
                ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                : 'bg-slate-100 dark:bg-[#2A2A2A] text-slate-700 dark:text-neutral-300 border-slate-200 dark:border-[#383838] hover:bg-slate-200 dark:hover:bg-[#333333]'
            }`}
          >
            Farmakoloji
          </button>
        </div>
      </div>

      {/* Faculty Selector Bar */}
      <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
          Fakülten:
        </span>
        {faculties.map((f) => {
          const isSelected = f.slug === selectedFacultySlug;
          return (
            <button
              key={f.slug}
              type="button"
              onClick={() => handleFacultyChange(f.slug)}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-medium border transition-all ${
                isSelected
                  ? 'bg-[#10A37F] text-white border-[#10A37F] shadow-xs'
                  : 'bg-white dark:bg-[#1E1E1E] text-slate-700 dark:text-neutral-300 border-slate-200 dark:border-[#2F2F2F] hover:bg-slate-50 dark:hover:bg-[#262626]'
              }`}
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: f.logoColor }}
                aria-hidden="true"
              />
              <span>{f.shortName}</span>
              {f.isNationalAggregate && (
                <span className="rounded-md bg-rose-500/20 px-1.5 py-0.2 text-[9px] font-semibold text-rose-700 dark:text-rose-300">
                  {f.slug === 'turkiye-geneli' ? 'Ulusal' : 'k < 10'}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Amfi Live Pulse Banner */}
      <div className="flex flex-col gap-4 rounded-2xl border border-emerald-300/60 dark:border-emerald-800/40 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-emerald-500/10 p-5 shadow-xs dark:bg-[#1A1A1A] md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3.5">
          <div className="relative flex h-6 w-6 shrink-0 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-500" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-white md:text-lg">
                🟢 {cohortStats?.activeStudentsOnline ?? currentFaculty.activeStudentsCount} Dönem Arkadaşın Şu Anda Amfide
              </h2>
              <span className="rounded-md bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 dark:text-emerald-300 uppercase font-mono">
                {currentFaculty.shortName}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-slate-600 dark:text-neutral-400 font-medium">
              {currentFaculty.curriculumFocus} • {currentFaculty.city}
            </p>
          </div>
        </div>

        {/* Ephemeral Salted ID Chip */}
        <div className="flex flex-col items-start gap-1 rounded-xl border border-slate-200 dark:border-[#333333] bg-white/90 dark:bg-[#252525] p-2.5 text-[11px] shadow-2xs md:items-end">
          <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200">
            <span>🛡️ Anonim Kodun:</span>
            <code className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
              {ephemeralId.slice(0, 8)}...{ephemeralId.slice(-4)}
            </code>
          </div>
          <span className="text-[9px] text-slate-400 dark:text-neutral-500">
            HMAC-SHA256 (Günlük Tuz • Sıfır İzleme)
          </span>
        </div>
      </div>

      {/* Misconception Surge Alert Banner (if present) */}
      {activeSurgeAlert && (
        <MisconceptionSurgeBanner
          alert={activeSurgeAlert}
          onOpenChallenge={handleOpenChallenge}
          onDismiss={() => setActiveSurgeAlert(null)}
        />
      )}

      {/* k < 10 Low Cohort Warning Notice */}
      {cohortStats?.isNationalAggregate && selectedFacultySlug !== 'turkiye-geneli' && (
        <div className="rounded-2xl border border-amber-300 dark:border-amber-800/60 bg-amber-50/80 dark:bg-amber-950/30 p-4 text-xs text-amber-900 dark:text-amber-200 shadow-2xs">
          <strong className="font-bold">🛡️ KVKK K-Anonimlik Güvencesi ($k &lt; 10$):</strong> Bu fakültede anlık aktif öğrenci sayısı 10’un altında olduğundan, tek bir öğrencinin cevabının dedüksiyonla tahmin edilmesini önlemek amacıyla amfi istatistikleri <strong>Ulusal Eczacılık Havuz Ortalaması</strong> ile birleştirilmiştir.
        </div>
      )}

      {/* Main Grid: Tables vs Pomodoro & Controls */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column (2 Cols): Active Study Tables */}
        <div className="space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-neutral-400">
              <span>📚 Aktif Çalışma Masaları</span>
              <span className="rounded-full bg-slate-200 dark:bg-[#333333] px-2 py-0.2 font-mono text-xs text-slate-700 dark:text-neutral-300">
                {activeTables.length}
              </span>
            </h3>
            <span className="text-xs text-slate-400 dark:text-neutral-500">
              Konulara göre ayrılmış çalışma grupları
            </span>
          </div>

          <div className="space-y-3">
            {activeTables.map((table) => {
              const hasTrap = !!table.activeTrapCode;
              return (
                <div
                  key={table.tableId}
                  className="rounded-2xl border border-slate-200 dark:border-[#2F2F2F] bg-white dark:bg-[#1E1E1E] p-5 shadow-xs transition-all hover:border-slate-300 dark:hover:border-[#3E3E3E]"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-lg bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20 px-2 py-0.5 text-xs font-semibold">
                          {table.courseId === 'medchem' ? 'Farmasötik Kimya' : 'Farmakoloji'}
                        </span>
                        <span className="rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 text-xs font-semibold">
                          👥 {table.activeStudentCount} Kişi Masada
                        </span>
                        {hasTrap && (
                          <span className="rounded-lg bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20 px-2 py-0.5 text-xs font-semibold">
                            ⚡ Slayt Tuzağı
                          </span>
                        )}
                      </div>
                      <h4 className="mt-2 text-base font-bold text-slate-900 dark:text-white">
                        {table.moduleTitle}
                      </h4>
                      <p className="mt-1 text-xs text-slate-500 dark:text-neutral-400 font-medium">
                        {table.topicDescription}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2 self-end md:self-start">
                      {hasTrap && table.activeTrapCode && (
                        <button
                          type="button"
                          onClick={() => handleOpenChallenge(table.activeTrapCode!)}
                          className="flex items-center gap-1.5 rounded-xl border border-rose-300 dark:border-rose-800/60 bg-rose-50 dark:bg-rose-950/40 px-3.5 py-1.5 text-xs font-semibold text-rose-700 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors"
                        >
                          <span>Tuzağı Gör</span>
                          <span aria-hidden="true">🎯</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          facultyAmfiService.setActiveModule(table.moduleId);
                          if (onNavigateToModule) {
                            onNavigateToModule(table.moduleId, table.currentSlideNumber);
                          }
                        }}
                        className="flex items-center gap-1.5 rounded-xl bg-[#10A37F] hover:bg-[#0E8C6D] px-4 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors"
                      >
                        <span>Masaya Katıl</span>
                        <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (1 Col): Pomodoro + Status + Privacy Shield */}
        <div className="space-y-5">
          {/* Synchronized Cohort Pomodoro Timer */}
          <div className="rounded-2xl border border-slate-200 dark:border-[#2F2F2F] bg-white dark:bg-[#1E1E1E] p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-[#2E2E2E] pb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-neutral-400">
                ⏱️ Senkron Amfi Pomodoro
              </span>
              <span
                className={`rounded-lg px-2.5 py-0.5 text-xs font-semibold ${
                  pomodoro.mode === 'focus'
                    ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30'
                }`}
              >
                {pomodoro.mode === 'focus' ? 'Derin Odak' : 'Amfi Molası'}
              </span>
            </div>

            <div className="my-5 text-center">
              <div className="font-mono text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                {pomodoro.formattedTime}
              </div>
              <p className="mt-1.5 text-xs text-slate-500 dark:text-neutral-400 font-medium">
                {pomodoro.mode === 'focus'
                  ? 'Dönem arkadaşlarınla 25 dk kesintisiz odak'
                  : '5 dk amfi çay/kahve molası'}
              </p>
            </div>

            {/* Status Switcher (Studying vs Idle) */}
            <div className="grid grid-cols-2 gap-2 border-t border-slate-200/80 dark:border-[#2E2E2E] pt-3.5">
              <button
                type="button"
                onClick={() => handleStatusToggle('studying')}
                className={`rounded-xl py-2 text-xs font-semibold border transition-all ${
                  studyStatus === 'studying'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800'
                    : 'bg-slate-100 dark:bg-[#262626] text-slate-600 dark:text-neutral-400 border-slate-200 dark:border-[#333333] hover:bg-slate-200 dark:hover:bg-[#2C2C2C]'
                }`}
              >
                🟢 Odaktayım
              </button>
              <button
                type="button"
                onClick={() => handleStatusToggle('idle')}
                className={`rounded-xl py-2 text-xs font-semibold border transition-all ${
                  studyStatus === 'idle'
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800'
                    : 'bg-slate-100 dark:bg-[#262626] text-slate-600 dark:text-neutral-400 border-slate-200 dark:border-[#333333] hover:bg-slate-200 dark:hover:bg-[#2C2C2C]'
                }`}
              >
                ☕ Moladayım
              </button>
            </div>
          </div>

          {/* Mode Switcher Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-[#2F2F2F] bg-white dark:bg-[#1E1E1E] p-5 shadow-xs">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-neutral-400">
              Çalışma Modu
            </span>
            <div className="mt-3 space-y-2">
              <button
                type="button"
                onClick={() => handleModeToggle('focus')}
                className={`flex w-full items-center justify-between rounded-xl p-2.5 text-xs font-medium border transition-all ${
                  currentMode === 'focus'
                    ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800'
                    : 'bg-slate-50 dark:bg-[#252525] border-slate-200 dark:border-[#333333] text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-[#2C2C2C]'
                }`}
              >
                <span>🎯 Klasik Odaklanma</span>
                <span className="text-[10px] text-slate-500 dark:text-neutral-400">Ders & Slaytlar</span>
              </button>
              <button
                type="button"
                onClick={() => handleModeToggle('vize_triage')}
                className={`flex w-full items-center justify-between rounded-xl p-2.5 text-xs font-medium border transition-all ${
                  currentMode === 'vize_triage'
                    ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                    : 'bg-slate-50 dark:bg-[#252525] border-slate-200 dark:border-[#333333] text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-[#2C2C2C]'
                }`}
              >
                <span>🔥 Vize Triage (Cram)</span>
                <span className="text-[10px] text-slate-500 dark:text-neutral-400">Yüksek İhtimal</span>
              </button>
              <button
                type="button"
                onClick={() => handleModeToggle('metrobus')}
                className={`flex w-full items-center justify-between rounded-xl p-2.5 text-xs font-medium border transition-all ${
                  currentMode === 'metrobus'
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                    : 'bg-slate-50 dark:bg-[#252525] border-slate-200 dark:border-[#333333] text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-[#2C2C2C]'
                }`}
              >
                <span>🚌 Metrobüs Sesli Mod</span>
                <span className="text-[10px] text-slate-500 dark:text-neutral-400">Kulaklıkla Sesli</span>
              </button>
            </div>
          </div>

          {/* KVKK & Mathematical Privacy Shield Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-[#2F2F2F] bg-slate-50/80 dark:bg-[#1A1A1A] p-5 shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="text-lg">🛡️</span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                KVKK & Diferansiyel Gizlilik
              </h4>
            </div>
            <p className="mt-2 text-[11px] font-medium leading-relaxed text-slate-600 dark:text-neutral-400">
              PharmLearn Sanal Amfi, öğrenci mahremiyetini matematiksel olarak garanti eder:
            </p>
            <ul className="mt-2.5 space-y-2 text-[10px] font-medium text-slate-600 dark:text-neutral-400">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-500">✓</span>
                <span><strong>$k$-Anonimlik ($k \ge 10$):</strong> Amfi verisi sadece en az 10 öğrenci varsa yayınlanır.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-500">✓</span>
                <span><strong>Laplace Gürültüsü ($\epsilon = 0.5$):</strong> Hata sayılarına kalibre Laplace gürültüsü eklenir.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-500">✓</span>
                <span><strong>Günlük Tuzlu Hash:</strong> Kimliğin hiçbir sunucuda kaydedilmez veya profillenmez.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Socratic Misconception Challenge Modal */}
      {activeChallenge && (
        <MisconceptionChallengeModal
          challenge={activeChallenge}
          onClose={() => setActiveChallenge(null)}
          onCompleted={handleChallengeComplete}
        />
      )}
    </div>
  );
};
