import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SlideStorageService } from './slideStorageService';
import { PRELOADED_REANIMATED_SLIDES } from '../data/reanimatedSlides.data';
import { ReanimatedSlide } from '../types/slideReAnimator.types';

describe('slideStorageService', () => {
  let service: SlideStorageService;

  beforeEach(() => {
    localStorage.clear();
    service = new SlideStorageService();
  });

  it('retrieves preloaded slides on fresh start', () => {
    const slides = service.getReanimatedSlides();
    expect(slides.length).toBeGreaterThanOrEqual(4);
    expect(slides[0]!.id).toBe(PRELOADED_REANIMATED_SLIDES[0]!.id);
  });

  it('filters slides by course correctly', () => {
    const medchemSlides = service.getReanimatedSlides('medchem');
    expect(medchemSlides.every((s) => s.courseId === 'medchem')).toBe(true);

    const pharmSlides = service.getReanimatedSlides('pharmacology');
    expect(pharmSlides.every((s) => s.courseId === 'pharmacology')).toBe(true);
  });

  it('saves and retrieves a new user re-animated slide', () => {
    const base = PRELOADED_REANIMATED_SLIDES[0]!;
    const newSlide: ReanimatedSlide = {
      ...base,
      id: 'custom-slide-101',
      title: 'Özel Kullanıcı Slaytı: Atropin Antagonizması'
    };

    service.saveReanimatedSlide(newSlide);
    const retrieved = service.getSlideById('custom-slide-101');

    expect(retrieved).toBeDefined();
    expect(retrieved?.title).toBe('Özel Kullanıcı Slaytı: Atropin Antagonizması');
  });

  it('prevents deleting immutable system pre-loaded exemplars', () => {
    const preloadedId = PRELOADED_REANIMATED_SLIDES[0]!.id;
    const deleted = service.deleteReanimatedSlide(preloadedId);

    expect(deleted).toBe(false);
    expect(service.getSlideById(preloadedId)).toBeDefined();
  });

  it('successfully deletes a user-created slide', () => {
    const base = PRELOADED_REANIMATED_SLIDES[0]!;
    const userSlide: ReanimatedSlide = {
      ...base,
      id: 'user-temp-slide',
      title: 'Geçici Slayt'
    };

    service.saveReanimatedSlide(userSlide);
    expect(service.getSlideById('user-temp-slide')).toBeDefined();

    const deleted = service.deleteReanimatedSlide('user-temp-slide');
    expect(deleted).toBe(true);
    expect(service.getSlideById('user-temp-slide')).toBeUndefined();
  });

  it('uploads slide media and returns storage and object URLs', async () => {
    const blob = new Blob(['mock slide content'], { type: 'image/png' });
    const result = await service.uploadSlideMedia(blob, 'marmara_slide_18.png');

    expect(result.storageUrl).toBeDefined();
    expect(result.storageUrl.length).toBeGreaterThan(0);
  });
});
