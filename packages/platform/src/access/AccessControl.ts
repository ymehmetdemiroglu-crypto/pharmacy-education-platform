import { CourseEntitlement, UserProfile } from '../types';

export interface AccessCheckOptions {
  isFreePreview?: boolean;
  now?: Date;
}

export function hasCourseAccess(
  user: UserProfile | null,
  entitlements: CourseEntitlement[] = [],
  courseId: 'medchem' | 'pharmacology',
  options: AccessCheckOptions = {}
): boolean {
  // 1. Permanent Freemium: Lessons 1 and 2 of every module are free preview
  if (options.isFreePreview) {
    return true;
  }

  // 2. Unauthenticated or no profile
  if (!user) {
    return false;
  }

  const checkTime = options.now || new Date();

  // 3. Check active entitlement for the course or dual_bundle (active or within past_due grace period)
  const activeEntitlement = entitlements.find((e) => {
    if (e.courseId !== courseId && e.courseId !== 'dual_bundle') {
      return false;
    }
    if (e.status === 'active' && new Date(e.expiresAt) > checkTime) {
      return true;
    }
    if (
      e.status === 'past_due' &&
      e.gracePeriodEndsAt &&
      new Date(e.gracePeriodEndsAt) > checkTime
    ) {
      return true;
    }
    return false;
  });

  if (activeEntitlement) {
    return true;
  }

  // 4. Fallback check on user profile trial/premium if entitlements array is syncing
  if (user.plan === 'trial' && user.trialEndsAt && new Date(user.trialEndsAt) > checkTime) {
    return true;
  }

  if (user.plan === 'premium' && activeEntitlement) {
    return true;
  }

  return false;
}

export function calculateTrialDaysRemaining(
  trialEndsAt?: string | null,
  now: Date = new Date()
): number {
  if (!trialEndsAt) return 0;
  const ends = new Date(trialEndsAt).getTime();
  const current = now.getTime();
  const diffMs = ends - current;
  if (diffMs <= 0) return 0;
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}
