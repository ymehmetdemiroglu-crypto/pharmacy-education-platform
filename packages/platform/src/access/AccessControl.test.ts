import { describe, it, expect } from 'vitest';
import { hasCourseAccess, calculateTrialDaysRemaining } from './AccessControl';
import { CourseEntitlement, UserProfile } from '../types';

describe('AccessControl Engine', () => {
  const baseUser: UserProfile = {
    userId: 'user-123',
    plan: 'free',
    trialUsed: false,
    preferredLanguage: 'en',
    createdAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
  };

  it('grants access unconditionally to free preview lessons (Lessons 1 & 2 of all modules)', () => {
    // Unauthenticated user
    expect(hasCourseAccess(null, [], 'medchem', { isFreePreview: true })).toBe(true);

    // Free tier user
    expect(hasCourseAccess(baseUser, [], 'pharmacology', { isFreePreview: true })).toBe(true);
  });

  it('denies access to non-free lessons for users without active entitlements', () => {
    expect(hasCourseAccess(null, [], 'medchem', { isFreePreview: false })).toBe(false);
    expect(hasCourseAccess(baseUser, [], 'medchem', { isFreePreview: false })).toBe(false);
  });

  it('grants access when user has an active, unexpired course entitlement', () => {
    const activeEntitlement: CourseEntitlement = {
      courseId: 'medchem',
      entitlementId: 'ent-1',
      plan: 'premium',
      status: 'active',
      planId: 'single_semester',
      startedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ahead
      autoRenew: true,
    };

    expect(
      hasCourseAccess(baseUser, [activeEntitlement], 'medchem', { isFreePreview: false })
    ).toBe(true);

    // Should NOT grant access to pharmacology if only medchem was purchased
    expect(
      hasCourseAccess(baseUser, [activeEntitlement], 'pharmacology', { isFreePreview: false })
    ).toBe(false);
  });

  it('grants access to both courses when user has dual_bundle entitlement', () => {
    const dualBundle: CourseEntitlement = {
      courseId: 'dual_bundle',
      entitlementId: 'ent-dual',
      plan: 'premium',
      status: 'active',
      planId: 'bundle_annual',
      startedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      autoRenew: true,
    };

    expect(hasCourseAccess(baseUser, [dualBundle], 'medchem', { isFreePreview: false })).toBe(true);
    expect(hasCourseAccess(baseUser, [dualBundle], 'pharmacology', { isFreePreview: false })).toBe(true);
  });

  it('denies access if entitlement has expired', () => {
    const expiredEntitlement: CourseEntitlement = {
      courseId: 'medchem',
      entitlementId: 'ent-exp',
      plan: 'trial',
      status: 'active',
      planId: 'trial_7day',
      startedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // Expired 2 days ago
      autoRenew: false,
    };

    expect(
      hasCourseAccess(baseUser, [expiredEntitlement], 'medchem', { isFreePreview: false })
    ).toBe(false);
  });

  it('calculates remaining trial days accurately', () => {
    const futureDate = new Date(Date.now() + 4.5 * 24 * 60 * 60 * 1000).toISOString();
    expect(calculateTrialDaysRemaining(futureDate)).toBe(5);

    const pastDate = new Date(Date.now() - 1000).toISOString();
    expect(calculateTrialDaysRemaining(pastDate)).toBe(0);
  });
});
