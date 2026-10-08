import { getSupabase } from '@pharmacy/platform';
import {
  AmfiPresencePayload,
  CohortErrorTelemetryReport,
  CohortHeatmapStats,
  FacultyRoomConfig,
  FacultyTableTopic,
  MisconceptionChallenge,
  MisconceptionSurgeBroadcast
} from '../types/facultyAmfi.types';
import { CanonicalTrapCode } from '../types/vizeTriage.types';
import {
  CURATED_FACULTY_ROOMS,
  CURATED_MISCONCEPTION_CHALLENGES
} from '../data/facultyAmfi.data';

// ============================================================================
// PURE SYNCHRONOUS SHA-256 FOR KVKK ROLLING DAILY EPHEMERAL IDS
// ============================================================================

function sha256(ascii: string): string {
  function rightRotate(value: number, amount: number) {
    return (value >>> amount) | (value << (32 - amount));
  }

  const lengthProperty = 'length';
  let i = 0;
  let j = 0;

  let result = '';
  const words: number[] = [];
  const asciiBitLength = ascii[lengthProperty] * 8;

  for (i = 0; i < asciiBitLength; i += 8) {
    words[i >> 5] = (words[i >> 5] || 0) | ((ascii.charCodeAt(i / 8) & 255) << (24 - (i % 32)));
  }

  const hash: number[] = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
  ];

  const k: number[] = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];

  words[asciiBitLength >> 5] = (words[asciiBitLength >> 5] || 0) | (0x80 << (24 - (asciiBitLength % 32)));
  words[(((asciiBitLength + 64) >> 9) << 4) + 15] = asciiBitLength;

  for (i = 0; i < words[lengthProperty]; i += 16) {
    const w: number[] = [];
    for (j = 0; j < 64; j++) {
      if (j < 16) {
        w[j] = words[i + j] ?? 0;
      } else {
        const wj15 = w[j - 15] ?? 0;
        const wj2 = w[j - 2] ?? 0;
        const wj16 = w[j - 16] ?? 0;
        const wj7 = w[j - 7] ?? 0;
        const s0 = rightRotate(wj15, 7) ^ rightRotate(wj15, 18) ^ (wj15 >>> 3);
        const s1 = rightRotate(wj2, 17) ^ rightRotate(wj2, 19) ^ (wj2 >>> 10);
        w[j] = ((wj16 + s0 + wj7 + s1) & 0xffffffff);
      }
    }

    let a = hash[0] ?? 0;
    let b = hash[1] ?? 0;
    let c = hash[2] ?? 0;
    let d = hash[3] ?? 0;
    let e = hash[4] ?? 0;
    let f = hash[5] ?? 0;
    let g = hash[6] ?? 0;
    let h = hash[7] ?? 0;

    for (j = 0; j < 64; j++) {
      const kj = k[j] ?? 0;
      const wj = w[j] ?? 0;
      const s1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (h + s1 + ch + kj + wj) & 0xffffffff;
      const s0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (s0 + maj) & 0xffffffff;

      h = g;
      g = f;
      f = e;
      e = (d + temp1) & 0xffffffff;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) & 0xffffffff;
    }

    hash[0] = ((hash[0] ?? 0) + a) & 0xffffffff;
    hash[1] = ((hash[1] ?? 0) + b) & 0xffffffff;
    hash[2] = ((hash[2] ?? 0) + c) & 0xffffffff;
    hash[3] = ((hash[3] ?? 0) + d) & 0xffffffff;
    hash[4] = ((hash[4] ?? 0) + e) & 0xffffffff;
    hash[5] = ((hash[5] ?? 0) + f) & 0xffffffff;
    hash[6] = ((hash[6] ?? 0) + g) & 0xffffffff;
    hash[7] = ((hash[7] ?? 0) + h) & 0xffffffff;
  }

  for (i = 0; i < 8; i++) {
    const val = hash[i] ?? 0;
    for (j = 3; j >= 0; j--) {
      const b = (val >> (8 * j)) & 255;
      result += (b < 16 ? '0' : '') + b.toString(16);
    }
  }

  return result;
}

// ============================================================================
// MATHEMATICAL PRIVACY & TELEMETRY FUNCTIONS
// ============================================================================

/**
 * Generates an ephemeral 64-character hex ID using a rolling daily salt.
 * Ensures student activities cannot be correlated across days under KVKK No. 6698.
 */
export function generateEphemeralStudentId(userId: string, dailySalt: string): string {
  const combined = `${userId}:${dailySalt}:pharmlearn_daily_privacy`;
  return sha256(combined);
}

/**
 * Returns today's daily salt string (YYYY-MM-DD-fixed-salt).
 */
export function getCurrentDailySalt(): string {
  const d = new Date();
  const dateStr = d.toISOString().slice(0, 10);
  return `salt_${dateStr}_amfi_kvkk`;
}

/**
 * Generates zero-mean Laplace noise according to the quantile function:
 * X = -sgn(U) * b * ln(1 - 2|U|), where U in (-0.5, 0.5)
 * @param scale Laplace scale parameter b = Delta f / epsilon
 */
export function generateLaplaceNoise(scale: number): number {
  if (scale <= 0) return 0;
  const u = Math.random() - 0.5;
  const sgn = u < 0 ? -1 : 1;
  const absU = Math.min(Math.abs(u), 0.499999999999);
  return -sgn * scale * Math.log(1 - 2 * absU);
}

/**
 * Injects Central Laplace Differential Privacy noise (default epsilon = 0.5, scale b = 2.0).
 * Clamps noisy count to >= 0 integer.
 */
export function applyDifferentialPrivacy(count: number, epsilon = 0.5, deltaF = 1): number {
  const scale = deltaF / epsilon;
  const noise = generateLaplaceNoise(scale);
  return Math.max(0, Math.round(count + noise));
}

/**
 * Enforces k-anonymity (k >= 10).
 * If cohort size is less than minK, prevents specific faculty attribute disclosure.
 */
export function checkKAnonymity(cohortSize: number, minK = 10): boolean {
  return cohortSize >= minK;
}

/**
 * Evaluates whether a misconception surge alert should fire based on a 15-minute sliding window.
 * Requires:
 * 1. Window size <= 15 min
 * 2. Total attempts in window >= minK (k >= 10)
 * 3. Failure ratio (incorrect / total) >= thresholdRatio (50%)
 */
export function evaluateMisconceptionSurge(
  attempts: Array<{
    trapCode: CanonicalTrapCode;
    isCorrect: boolean;
    timestamp: number;
    slideNumber: number;
  }>,
  targetTrapCode: CanonicalTrapCode,
  windowMs: number = 15 * 60 * 1000,
  minK: number = 10,
  thresholdRatio: number = 0.5,
  currentTime: number = Date.now()
): {
  isSurge: boolean;
  trapCode: CanonicalTrapCode;
  ratio: number;
  sampleSize: number;
  slideNumber: number;
} {
  const cutoff = currentTime - windowMs;
  const matchingAttempts = attempts.filter(
    (a) => a.trapCode === targetTrapCode && a.timestamp >= cutoff
  );

  const sampleSize = matchingAttempts.length;
  if (sampleSize < minK) {
    return {
      isSurge: false,
      trapCode: targetTrapCode,
      ratio: 0,
      sampleSize,
      slideNumber: matchingAttempts[0]?.slideNumber || 1
    };
  }

  const incorrectCount = matchingAttempts.filter((a) => !a.isCorrect).length;
  const ratio = incorrectCount / sampleSize;
  const slideNumber = matchingAttempts[0]?.slideNumber || 1;

  return {
    isSurge: ratio >= thresholdRatio,
    trapCode: targetTrapCode,
    ratio: Math.round(ratio * 100) / 100,
    sampleSize,
    slideNumber
  };
}

/**
 * Calculates synchronized cohort Pomodoro state based on wall-clock time.
 * Standard cycle: 25 min focus / 5 min amfi lounge break (30 min block).
 */
export function getCohortPomodoroState(timestamp: number = Date.now()): {
  mode: 'focus' | 'break';
  remainingSeconds: number;
  formattedTime: string;
  totalMinutes: number;
  cycleNumber: number;
} {
  const epochSeconds = Math.floor(timestamp / 1000);
  const cycleSecond = epochSeconds % (30 * 60);
  const cycleNumber = Math.floor(epochSeconds / (30 * 60));

  if (cycleSecond < 25 * 60) {
    const remaining = 25 * 60 - cycleSecond;
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    return {
      mode: 'focus',
      remainingSeconds: remaining,
      formattedTime: `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`,
      totalMinutes: 25,
      cycleNumber
    };
  } else {
    const remaining = 30 * 60 - cycleSecond;
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    return {
      mode: 'break',
      remainingSeconds: remaining,
      formattedTime: `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`,
      totalMinutes: 5,
      cycleNumber
    };
  }
}

// ============================================================================
// SERVICE CLASS FOR REALTIME & LOCAL PRESENCE MANAGEMENT
// ============================================================================

export interface AmfiRoomListener {
  onPresenceUpdate: (stats: CohortHeatmapStats, tables: FacultyTableTopic[]) => void;
  onSurgeAlert?: (alert: MisconceptionSurgeBroadcast) => void;
}

export class FacultyAmfiService {
  private static instance: FacultyAmfiService;

  private currentFacultySlug = 'marmara-eczacilik';
  private currentCourseId: 'medchem' | 'pharmacology' = 'medchem';
  private studentUserId = 'student-local-user-id';
  private ephemeralId: string = '';
  private currentMode: 'focus' | 'vize_triage' | 'metrobus' = 'focus';
  private studyStatus: 'studying' | 'idle' = 'studying';
  private activeModule = 'hafta-06-metabolizma';

  private attemptHistory: Array<{
    trapCode: CanonicalTrapCode;
    isCorrect: boolean;
    timestamp: number;
    slideNumber: number;
    facultySlug: string;
    courseId: 'medchem' | 'pharmacology';
  }> = [];

  private listeners: Set<AmfiRoomListener> = new Set();
  private supabaseChannel: any = null;
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.refreshEphemeralId();
    this.seedInitialAttempts();
  }

  public static getInstance(): FacultyAmfiService {
    if (!FacultyAmfiService.instance) {
      FacultyAmfiService.instance = new FacultyAmfiService();
    }
    return FacultyAmfiService.instance;
  }

  private refreshEphemeralId() {
    const salt = getCurrentDailySalt();
    this.ephemeralId = generateEphemeralStudentId(this.studentUserId, salt);
  }

  private seedInitialAttempts() {
    // Seed initial mock attempts for realistic surge simulation
    const now = Date.now();
    for (let i = 0; i < 18; i++) {
      this.attemptHistory.push({
        trapCode: 'TRAP-03-ESTER-AMIDE',
        isCorrect: i >= 12, // 12 incorrect, 6 correct = 67% failure
        timestamp: now - (i * 45000), // Within last 15 min
        slideNumber: 28,
        facultySlug: 'marmara-eczacilik',
        courseId: 'medchem'
      });
    }

    for (let i = 0; i < 16; i++) {
      this.attemptHistory.push({
        trapCode: 'TRAP-07-SCHILD-SLOPE',
        isCorrect: i >= 11, // 11 incorrect, 5 correct = 69% failure
        timestamp: now - (i * 30000),
        slideNumber: 19,
        facultySlug: 'hacettepe-eczacilik',
        courseId: 'pharmacology'
      });
    }
  }

  public getCuratedFaculties(): FacultyRoomConfig[] {
    return CURATED_FACULTY_ROOMS;
  }

  public getFacultyConfig(slug: string): FacultyRoomConfig | undefined {
    return CURATED_FACULTY_ROOMS.find((f) => f.slug === slug);
  }

  public getChallengeForTrap(trapCode: string): MisconceptionChallenge | undefined {
    return CURATED_MISCONCEPTION_CHALLENGES[trapCode];
  }

  public getActiveFacultySlug(): string {
    return this.currentFacultySlug;
  }

  public getActiveCourseId(): 'medchem' | 'pharmacology' {
    return this.currentCourseId;
  }

  public getStudentEphemeralId(): string {
    return this.ephemeralId;
  }

  public subscribeToRoom(
    facultySlug: string,
    courseId: 'medchem' | 'pharmacology',
    listener: AmfiRoomListener
  ): () => void {
    this.currentFacultySlug = facultySlug;
    this.currentCourseId = courseId;
    this.listeners.add(listener);

    // Initial broadcast to listener
    this.emitCurrentState(listener);

    // Setup Supabase Realtime channel if available
    this.connectSupabaseChannel(facultySlug, courseId);

    // Start 60-second presence heartbeat
    if (!this.heartbeatTimer) {
      this.heartbeatTimer = setInterval(() => {
        this.emitHeartbeat();
      }, 60000);
    }

    return () => {
      this.listeners.delete(listener);
      if (this.listeners.size === 0) {
        this.cleanupChannel();
      }
    };
  }

  private connectSupabaseChannel(facultySlug: string, courseId: string) {
    try {
      const client = getSupabase();
      if (!client || typeof client.channel !== 'function') {
        return;
      }

      const channelName = `pharmlearn:amfi:${facultySlug}:${courseId}`;
      if (this.supabaseChannel) {
        client.removeChannel(this.supabaseChannel);
      }

      this.supabaseChannel = client.channel(channelName);

      this.supabaseChannel
        .on('broadcast', { event: 'MISCONCEPTION_SURGE' }, (payload: { payload: MisconceptionSurgeBroadcast }) => {
          if (payload && payload.payload) {
            this.notifySurge(payload.payload);
          }
        })
        .subscribe((status: string) => {
          if (status === 'SUBSCRIBED') {
            this.emitHeartbeat();
          }
        });
    } catch {
      // Local fallback mode when Supabase is not configured
    }
  }

  private cleanupChannel() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
    if (this.supabaseChannel) {
      try {
        const client = getSupabase();
        if (client && typeof client.removeChannel === 'function') {
          client.removeChannel(this.supabaseChannel);
        }
      } catch {
        // Ignore cleanup error
      }
      this.supabaseChannel = null;
    }
  }

  private emitHeartbeat() {
    this.refreshEphemeralId();
    const payload: AmfiPresencePayload = {
      presence_ref: `ref_${Date.now()}`,
      student_ephemeral_id: this.ephemeralId,
      faculty_slug: this.currentFacultySlug,
      course_id: this.currentCourseId,
      active_module: this.activeModule,
      study_status: this.studyStatus,
      is_active_studying: this.studyStatus === 'studying',
      mode: this.currentMode,
      joined_at: new Date().toISOString()
    };

    if (this.supabaseChannel && typeof this.supabaseChannel.track === 'function') {
      try {
        this.supabaseChannel.track(payload);
      } catch {
        // Fallback silently
      }
    }

    this.notifyAll();
  }

  public setStudyStatus(status: 'studying' | 'idle') {
    this.studyStatus = status;
    this.emitHeartbeat();
  }

  public setActiveModule(moduleId: string) {
    this.activeModule = moduleId;
    this.emitHeartbeat();
  }

  public setMode(mode: 'focus' | 'vize_triage' | 'metrobus') {
    this.currentMode = mode;
    this.emitHeartbeat();
  }

  public reportAttempt(report: CohortErrorTelemetryReport): MisconceptionSurgeBroadcast | null {
    this.attemptHistory.push({
      trapCode: report.trap_code,
      isCorrect: report.is_correct,
      timestamp: Date.now(),
      slideNumber: report.slide_number,
      facultySlug: report.faculty_slug,
      courseId: report.course_id
    });

    const surgeEval = evaluateMisconceptionSurge(
      this.attemptHistory,
      report.trap_code,
      15 * 60 * 1000,
      10, // minK >= 10
      0.50 // >= 50% failure rate
    );

    if (surgeEval.isSurge) {
      const challenge = this.getChallengeForTrap(report.trap_code);
      const headline = `🔥 Amfi Uyarısı: Dönem arkadaşlarının %${Math.round(
        surgeEval.ratio * 100
      )}'i Slayt ${report.slide_number}'deki tuzakta takıldı!`;

      const surgeBroadcast: MisconceptionSurgeBroadcast = {
        event_type: 'MISCONCEPTION_SURGE',
        trap_code: report.trap_code,
        faculty_slug: report.faculty_slug,
        course_id: report.course_id,
        slide_number: report.slide_number,
        trapped_student_ratio: surgeEval.ratio,
        sample_size_k: surgeEval.sampleSize,
        headline,
        diagnostic_prompt: challenge?.questionPrompt || 'Bu tuzakta dönemin çoğunluğu yanıldı.',
        action_url: `/workspace/${report.course_id}?trap=${report.trap_code}`
      };

      // Broadcast over channel
      if (this.supabaseChannel && typeof this.supabaseChannel.send === 'function') {
        try {
          this.supabaseChannel.send({
            type: 'broadcast',
            event: 'MISCONCEPTION_SURGE',
            payload: surgeBroadcast
          });
        } catch {
          // Ignore broadcast error
        }
      }

      this.notifySurge(surgeBroadcast);
      return surgeBroadcast;
    }

    return null;
  }

  private notifySurge(broadcast: MisconceptionSurgeBroadcast) {
    for (const listener of this.listeners) {
      if (listener.onSurgeAlert) {
        listener.onSurgeAlert(broadcast);
      }
    }
  }

  private notifyAll() {
    for (const listener of this.listeners) {
      this.emitCurrentState(listener);
    }
  }

  private emitCurrentState(listener: AmfiRoomListener) {
    const fallbackRoom: FacultyRoomConfig = CURATED_FACULTY_ROOMS[0]!;
    const config: FacultyRoomConfig = this.getFacultyConfig(this.currentFacultySlug) ?? fallbackRoom;
    const isKAnon = checkKAnonymity(config.activeStudentsCount, 10);

    const noisyCount = applyDifferentialPrivacy(config.activeStudentsCount, 0.5, 1);

    const stats: CohortHeatmapStats = {
      faculty_slug: config.slug,
      course_id: this.currentCourseId,
      activeStudentsOnline: isKAnon ? noisyCount : config.activeStudentsCount,
      isNationalAggregate: !isKAnon,
      topMisconceptions: [
        {
          trap_code: 'TRAP-03-ESTER-AMIDE',
          slide_number: 28,
          failurePercentage: 68
        },
        {
          trap_code: 'TRAP-07-SCHILD-SLOPE',
          slide_number: 19,
          failurePercentage: 72
        }
      ],
      generatedAt: new Date().toISOString()
    };

    listener.onPresenceUpdate(stats, config.activeTables);
    if (config.currentSurgeAlert && listener.onSurgeAlert) {
      listener.onSurgeAlert(config.currentSurgeAlert);
    }
  }
}

export const facultyAmfiService = FacultyAmfiService.getInstance();
