import { getSupabase } from '@pharmacy/platform';
import { ReanimatedSlide } from '../types/slideReAnimator.types';
import { PRELOADED_REANIMATED_SLIDES } from '../data/reanimatedSlides.data';

const REANIMATED_SLIDES_STORAGE_KEY = 'pharmlearn_reanimated_slides_v1';

export class SlideStorageService {
  /**
   * Retrieves all re-animated slides, merging authentic pre-loaded exemplars with user-saved slides
   */
  public getReanimatedSlides(courseFilter?: 'medchem' | 'pharmacology'): ReanimatedSlide[] {
    if (typeof window === 'undefined') {
      return this.filterByCourse(PRELOADED_REANIMATED_SLIDES, courseFilter);
    }

    try {
      const stored = localStorage.getItem(REANIMATED_SLIDES_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(REANIMATED_SLIDES_STORAGE_KEY, JSON.stringify(PRELOADED_REANIMATED_SLIDES));
        return this.filterByCourse(PRELOADED_REANIMATED_SLIDES, courseFilter);
      }
      const parsed: ReanimatedSlide[] = JSON.parse(stored);
      // Ensure all pre-loaded slides are present
      const userSlides = parsed.filter(
        (p) => !PRELOADED_REANIMATED_SLIDES.some((pre) => pre.id === p.id)
      );
      const combined = [...PRELOADED_REANIMATED_SLIDES, ...userSlides];
      return this.filterByCourse(combined, courseFilter);
    } catch {
      return this.filterByCourse(PRELOADED_REANIMATED_SLIDES, courseFilter);
    }
  }

  /**
   * Retrieves a single re-animated slide by its ID
   */
  public getSlideById(id: string): ReanimatedSlide | undefined {
    const all = this.getReanimatedSlides();
    return all.find((s) => s.id === id);
  }

  /**
   * Persists or updates a re-animated slide in storage
   */
  public saveReanimatedSlide(slide: ReanimatedSlide): void {
    if (typeof window === 'undefined') return;

    try {
      const all = this.getReanimatedSlides();
      const existingIndex = all.findIndex((s) => s.id === slide.id);
      let updated: ReanimatedSlide[];
      if (existingIndex >= 0) {
        updated = [...all];
        updated[existingIndex] = slide;
      } else {
        updated = [slide, ...all];
      }
      localStorage.setItem(REANIMATED_SLIDES_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save re-animated slide to localStorage:', e);
    }
  }

  /**
   * Deletes a user-saved re-animated slide (pre-loaded slides are immutable)
   */
  public deleteReanimatedSlide(id: string): boolean {
    if (typeof window === 'undefined') return false;
    // Don't delete system preloaded exemplars
    if (PRELOADED_REANIMATED_SLIDES.some((p) => p.id === id)) {
      return false;
    }

    try {
      const all = this.getReanimatedSlides();
      const filtered = all.filter((s) => s.id !== id);
      localStorage.setItem(REANIMATED_SLIDES_STORAGE_KEY, JSON.stringify(filtered));
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Uploads slide binary media (image or PDF) to Supabase Storage, with fallback to in-memory URL
   */
  public async uploadSlideMedia(
    file: File | Blob,
    fileName: string
  ): Promise<{ storageUrl: string; objectUrl: string }> {
    let objectUrl = '';
    if (typeof window !== 'undefined' && window.URL && typeof window.URL.createObjectURL === 'function') {
      try {
        objectUrl = window.URL.createObjectURL(file);
      } catch {
        objectUrl = '';
      }
    }
    if (!objectUrl) {
      objectUrl = `blob:pharmlearn://${Date.now()}_${fileName}`;
    }

    let storageUrl = objectUrl;

    try {
      const client = getSupabase();
      if (client && client.storage) {
        const fileExt = fileName.split('.').pop() || 'png';
        const sanitized = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
        const uploadPath = `slides/${Date.now()}_${sanitized}`;

        const { data, error } = await client.storage
          .from('documents')
          .upload(uploadPath, file, {
            contentType: file instanceof File ? file.type : `image/${fileExt}`,
            upsert: true
          });

        if (!error && data?.path) {
          const { data: pubData } = client.storage.from('documents').getPublicUrl(data.path);
          if (pubData?.publicUrl) {
            storageUrl = pubData.publicUrl;
          }
        }
      }
    } catch (err) {
      console.warn('Supabase storage upload fell back to object URL:', err);
    }

    return {
      storageUrl: storageUrl || objectUrl,
      objectUrl
    };
  }

  private filterByCourse(slides: ReanimatedSlide[], courseFilter?: 'medchem' | 'pharmacology'): ReanimatedSlide[] {
    if (!courseFilter) return slides;
    return slides.filter((s) => s.courseId === courseFilter);
  }
}

export const slideStorageService = new SlideStorageService();
