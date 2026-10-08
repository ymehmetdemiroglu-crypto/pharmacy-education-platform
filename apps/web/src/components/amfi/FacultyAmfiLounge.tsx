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
        module_id: activeChallenge.challengeId,
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
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-6">
      {/* Top Header: Title, Course Switch, and Faculty Pill Selector */}
      <div className="flex flex-col gap-4 rounded-2xl border-4 border-black bg-white p-5 shadow-[6px_6px_0px_#000000] dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border-2 border-black bg-emerald-400 font-mono text-sm font-black shadow-[2px_2px_0px_#000000]">
              🏛️
            </span>
            <h1 className="font-heading text-xl font-black text-slate-900 dark:text-white md:text-2xl">
              Sanal Amfi & Fakülte Masası
            </h1>
          </div>
          <p className="mt-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
            Dönem arkadaşlarınla canlı çalışma ritmi • KVKK No. 6698 Uyumlu • Sıfır İsim / Sıfır Yarışma
          </p>
        </div>

        {/* Course Switcher */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCourseId('medchem')}
            className={`rounded-xl border-2 border-black px-3.5 py-1.5 font-heading text-xs font-black shadow-[2px_2px_0px_#000000] transition ${
              courseId === 'medchem'
                ? 'bg-blue-400 text-black'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            Farmasötik Kimya
          </button>
          <button
            type="button"
            onClick={() => setCourseId('pharmacology')}
            className={`rounded-xl border-2 border-black px-3.5 py-1.5 font-heading text-xs font-black shadow-[2px_2px_0px_#000000] transition ${
              courseId === 'pharmacology'
                ? 'bg-amber-400 text-black'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            Farmakoloji
          </button>
        </div>
      </div>

      {/* Faculty Selector Bar */}
      <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-300">
          Fakülten:
        </span>
        {faculties.map((f) => {
          const isSelected = f.slug === selectedFacultySlug;
          return (
            <button
              key={f.slug}
              type="button"
              onClick={() => handleFacultyChange(f.slug)}
              className={`flex items-center gap-1.5 rounded-xl border-2 border-black px-3 py-1.5 text-xs font-black transition-all ${
                isSelected
                  ? 'bg-black text-white shadow-[3px_3px_0px_#059669]'
                  : 'bg-white text-slate-800 shadow-[2px_2px_0px_#000000] hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200'
              }`}
            >
              <span
                className="h-2.5 w-2.5 rounded-full border border-black"
                style={{ backgroundColor: f.logoColor }}
                aria-hidden="true"
              />
              <span>{f.shortName}</span>
              {f.isNationalAggregate && (
                <span className="rounded bg-rose-500/20 px-1 py-0.2 text-[9px] font-bold text-rose-700 dark:text-rose-300">
                  {f.slug === 'turkiye-geneli' ? 'Ulusal' : 'k < 10'}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Amfi Live Pulse Banner */}
      <div className="flex flex-col gap-4 rounded-2xl border-4 border-black bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 p-5 shadow-[6px_6px_0px_#000000] dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative flex h-6 w-6 shrink-0 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-black bg-emerald-500" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-heading text-base font-black text-slate-900 dark:text-white md:text-lg">
                🟢 {cohortStats?.activeStudentsOnline ?? currentFaculty.activeStudentsCount} Dönem Arkadaşın Şu Anda Amfide
              </h2>
              <span className="rounded border border-black bg-emerald-300 px-2 py-0.5 text-[10px] font-black uppercase text-black">
                {currentFaculty.shortName}
              </span>
            </div>
            <p className="mt-0.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
              {currentFaculty.curriculumFocus} • {currentFaculty.city}
            </p>
          </div>
        </div>

        {/* Ephemeral Salted ID Chip */}
        <div className="flex flex-col items-start gap-1 rounded-xl border-2 border-black bg-white/90 p-2.5 text-[11px] shadow-[2px_2px_0px_#000000] dark:bg-slate-800 md:items-end">
          <div className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-200">
            <span>🛡️ Anonim Kodun:</span>
            <code className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
              {ephemeralId.slice(0, 8)}...{ephemeralId.slice(-4)}
            </code>
          </div>
          <span className="text-[9px] text-slate-500 dark:text-slate-400">
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
        <div className="rounded-xl border-2 border-amber-600 bg-amber-50 p-3.5 text-xs text-amber-900 shadow-[3px_3px_0px_#000000] dark:bg-amber-950/40 dark:text-amber-200">
          <strong className="font-black">🛡️ KVKK K-Anonimlik Güvencesi ($k &lt; 10$):</strong> Bu fakültede anlık aktif öğrenci sayısı 10’un altında olduğundan, tek bir öğrencinin cevabının dedüksiyonla tahmin edilmesini önlemek amacıyla amfi istatistikleri <strong>Ulusal Eczacılık Havuz Ortalaması</strong> ile birleştirilmiştir.
        </div>
      )}

      {/* Main Grid: Tables vs Pomodoro & Controls */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column (2 Cols): Active Study Tables */}
        <div className="space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-heading text-sm font-black uppercase tracking-wider text-slate-700 dark:text-slate-200">
              <span>📚 Aktif Çalışma Masaları</span>
              <span className="rounded-full border border-black bg-slate-200 px-2 py-0.2 font-mono text-xs dark:bg-slate-800">
                {activeTables.length}
              </span>
            </h3>
            <span className="text-xs font-semibold text-slate-500">
              Konulara göre ayrılmış çalışma grupları
            </span>
          </div>

          <div className="space-y-3">
            {activeTables.map((table) => {
              const hasTrap = !!table.activeTrapCode;
              return (
                <div
                  key={table.tableId}
                  className="rounded-2xl border-3 border-black bg-white p-5 shadow-[5px_5px_0px_#000000] transition-all hover:translate-x-0.5 hover:translate-y-0.5 dark:bg-slate-900"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded border border-black bg-blue-100 px-2 py-0.5 text-xs font-black text-blue-900 dark:bg-blue-950 dark:text-blue-200">
                          {table.courseId === 'medchem' ? 'Farmasötik Kimya' : 'Farmakoloji'}
                        </span>
                        <span className="rounded border border-black bg-emerald-100 px-2 py-0.5 text-xs font-black text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">
                          👥 {table.activeStudentCount} Kişi Masada
                        </span>
                        {hasTrap && (
                          <span className="rounded border border-black bg-rose-500 px-2 py-0.5 text-xs font-black text-white">
                            ⚡ Slayt Tuzağı
                          </span>
                        )}
                      </div>
                      <h4 className="mt-2 font-heading text-base font-black text-slate-900 dark:text-white">
                        {table.moduleTitle}
                      </h4>
                      <p className="mt-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                        {table.topicDescription}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2 self-end md:self-start">
                      {hasTrap && table.activeTrapCode && (
                        <button
                          type="button"
                          onClick={() => handleOpenChallenge(table.activeTrapCode!)}
                          className="flex items-center gap-1 rounded-xl border-2 border-black bg-rose-400 px-3 py-1.5 font-heading text-xs font-black text-black shadow-[2px_2px_0px_#000000] transition hover:bg-rose-300"
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
                        className="flex items-center gap-1.5 rounded-xl border-2 border-black bg-emerald-400 px-4 py-1.5 font-heading text-xs font-black text-black shadow-[3px_3px_0px_#000000] transition hover:bg-emerald-300 active:translate-x-0.5 active:translate-y-0.5"
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
          <div className="rounded-2xl border-3 border-black bg-white p-5 shadow-[5px_5px_0px_#000000] dark:bg-slate-900">
            <div className="flex items-center justify-between border-b-2 border-black/10 pb-3 dark:border-white/10">
              <span className="font-heading text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-200">
                ⏱️ Senkron Amfi Pomodoro
              </span>
              <span
                className={`rounded px-2 py-0.5 text-xs font-black uppercase ${
                  pomodoro.mode === 'focus'
                    ? 'border-2 border-black bg-emerald-400 text-black'
                    : 'border-2 border-black bg-amber-400 text-black'
                }`}
              >
                {pomodoro.mode === 'focus' ? 'Derin Odak' : 'Amfi Molası'}
              </span>
            </div>

            <div className="my-4 text-center">
              <div className="font-mono text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl">
                {pomodoro.formattedTime}
              </div>
              <p className="mt-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
                {pomodoro.mode === 'focus'
                  ? 'Dönem arkadaşlarınla 25 dk kesintisiz odak'
                  : '5 dk amfi çay/kahve molası'}
              </p>
            </div>

            {/* Status Switcher (Studying vs Idle) */}
            <div className="grid grid-cols-2 gap-2 border-t-2 border-black/10 pt-3 dark:border-white/10">
              <button
                type="button"
                onClick={() => handleStatusToggle('studying')}
                className={`rounded-xl border-2 border-black py-2 text-xs font-black transition ${
                  studyStatus === 'studying'
                    ? 'bg-emerald-400 text-black shadow-[2px_2px_0px_#000000]'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                🟢 Odaktayım
              </button>
              <button
                type="button"
                onClick={() => handleStatusToggle('idle')}
                className={`rounded-xl border-2 border-black py-2 text-xs font-black transition ${
                  studyStatus === 'idle'
                    ? 'bg-amber-300 text-black shadow-[2px_2px_0px_#000000]'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                ☕ Moladayım
              </button>
            </div>
          </div>

          {/* Mode Switcher Card */}
          <div className="rounded-2xl border-3 border-black bg-white p-4 shadow-[4px_4px_0px_#000000] dark:bg-slate-900">
            <span className="font-heading text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-200">
              Çalışma Modu
            </span>
            <div className="mt-2.5 space-y-1.5">
              <button
                type="button"
                onClick={() => handleModeToggle('focus')}
                className={`flex w-full items-center justify-between rounded-xl border-2 border-black p-2 text-xs font-black transition ${
                  currentMode === 'focus'
                    ? 'bg-blue-300 text-black shadow-[2px_2px_0px_#000000]'
                    : 'bg-white hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200'
                }`}
              >
                <span>🎯 Klasik Odaklanma</span>
                <span className="text-[10px] text-slate-600 dark:text-slate-300">Ders & Slaytlar</span>
              </button>
              <button
                type="button"
                onClick={() => handleModeToggle('vize_triage')}
                className={`flex w-full items-center justify-between rounded-xl border-2 border-black p-2 text-xs font-black transition ${
                  currentMode === 'vize_triage'
                    ? 'bg-rose-300 text-black shadow-[2px_2px_0px_#000000]'
                    : 'bg-white hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200'
                }`}
              >
                <span>🔥 Vize Triage (Cram)</span>
                <span className="text-[10px] text-slate-600 dark:text-slate-300">Yüksek İhtimal</span>
              </button>
              <button
                type="button"
                onClick={() => handleModeToggle('metrobus')}
                className={`flex w-full items-center justify-between rounded-xl border-2 border-black p-2 text-xs font-black transition ${
                  currentMode === 'metrobus'
                    ? 'bg-yellow-300 text-black shadow-[2px_2px_0px_#000000]'
                    : 'bg-white hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200'
                }`}
              >
                <span>🚌 Metrobüs Sesli Mod</span>
                <span className="text-[10px] text-slate-600 dark:text-slate-300">Kulaklıkla Sesli</span>
              </button>
            </div>
          </div>

          {/* KVKK & Mathematical Privacy Shield Card */}
          <div className="rounded-2xl border-3 border-black bg-gradient-to-br from-slate-50 to-slate-100 p-4 shadow-[4px_4px_0px_#000000] dark:from-slate-800 dark:to-slate-900">
            <div className="flex items-center gap-2">
              <span className="text-lg">🛡️</span>
              <h4 className="font-heading text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                KVKK & Diferansiyel Gizlilik
              </h4>
            </div>
            <p className="mt-2 text-[11px] font-medium leading-relaxed text-slate-600 dark:text-slate-300">
              PharmLearn Sanal Amfi, öğrenci mahremiyetini matematiksel olarak garanti eder:
            </p>
            <ul className="mt-2 space-y-1.5 text-[10px] font-semibold text-slate-700 dark:text-slate-300">
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
