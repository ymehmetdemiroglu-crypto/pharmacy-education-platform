export type PlanType = 'free' | 'trial' | 'premium';

export interface UserProfile {
  userId: string;
  email?: string | null;
  displayName?: string | null;
  plan: PlanType;
  trialStartedAt?: string | null; // ISO timestamp
  trialEndsAt?: string | null; // ISO timestamp
  trialUsed: boolean;
  preferredLanguage: 'tr' | 'en' | 'ar';
  country?: string | undefined;
  university?: string | undefined;
  createdAt: string;
  lastActiveAt: string;
}

export interface CourseEntitlement {
  courseId: 'medchem' | 'pharmacology' | 'dual_bundle';
  entitlementId: string;
  plan: 'trial' | 'premium';
  status: 'active' | 'expired' | 'canceled' | 'revoked' | 'past_due';
  planId: string;
  startedAt: string; // ISO
  expiresAt: string; // ISO
  autoRenew: boolean;
}

export interface UserProgress {
  courseId: string;
  completedLessonIds: string[];
  currentModuleId: string;
  currentLessonId: string;
  currentStepIndex: number;
  streakDays: number;
  lastStreakDate: string; // YYYY-MM-DD
  totalXP: number;
  accuracyRate: number;
}

export interface SpacedReviewCard {
  cardId: string;
  courseId: string;
  drugOrConcept: string;
  prompt: string;
  answer: string;
  box: 1 | 2 | 3 | 4 | 5;
  intervalDays: number;
  lastReviewedAt: string;
  nextReviewDue: string;
  reviewCount: number;
  lapseCount: number;
  stability?: number | undefined;
  retrievability?: number | undefined;
  misconceptionId?: string | undefined;
}
