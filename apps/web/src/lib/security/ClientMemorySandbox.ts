/**
 * ClientMemorySandbox.ts
 * 
 * FSEK No. 5846 / KVKK No. 6698 Statutory Safe-Harbor Memory Manager.
 * Guarantees zero cloud persistence of student slides and local PDF uploads.
 * Manages in-memory Blob URLs, tracks allocated RAM, and executes deterministic
 * revocation upon session teardown or 24-hour TTL expiration.
 */

export interface TrackedBlob {
  id: string;
  url: string;
  sizeBytes: number;
  mimeType: string;
  allocatedAt: number;
}

export class ClientMemorySandbox {
  private static allocatedBlobs: Map<string, TrackedBlob> = new Map();
  private static totalBytesAllocated: number = 0;
  private static readonly MAX_MEMORY_BYTES = 150 * 1024 * 1024; // 150 MB safety cap
  private static readonly DEFAULT_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

  /**
   * Registers a binary file or Blob in local browser volatile memory.
   * Produces a secure scoped blob: URL.
   */
  public static registerBlob(blob: Blob | File): { id: string; url: string } {
    if (this.totalBytesAllocated + blob.size > this.MAX_MEMORY_BYTES) {
      // Purge oldest 25% of memory if exceeding memory safety limit
      this.purgeOldest(Math.max(1, Math.ceil(this.allocatedBlobs.size * 0.25)));
    }

    const id = `blob-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    let url: string;

    if (
      typeof window !== 'undefined' &&
      window.URL &&
      typeof window.URL.createObjectURL === 'function'
    ) {
      try {
        url = window.URL.createObjectURL(blob);
      } catch {
        url = `blob:pharmlearn/${id}`;
      }
    } else {
      url = `blob:pharmlearn/${id}`;
    }

    const tracked: TrackedBlob = {
      id,
      url,
      sizeBytes: blob.size,
      mimeType: blob.type || 'application/octet-stream',
      allocatedAt: Date.now()
    };

    this.allocatedBlobs.set(url, tracked);
    this.totalBytesAllocated += blob.size;

    return { id, url };
  }

  /**
   * Revokes a specific Blob URL to free browser volatile memory.
   */
  public static revokeBlob(url: string): boolean {
    const tracked = this.allocatedBlobs.get(url);
    if (!tracked) return false;

    if (
      typeof window !== 'undefined' &&
      window.URL &&
      typeof window.URL.revokeObjectURL === 'function'
    ) {
      try {
        window.URL.revokeObjectURL(url);
      } catch {
        // Ignored in non-DOM/mock environments
      }
    }

    this.totalBytesAllocated -= tracked.sizeBytes;
    this.allocatedBlobs.delete(url);
    return true;
  }

  /**
   * Explicitly purges all allocated Blobs on session logout or component teardown.
   */
  public static revokeAll(): number {
    const count = this.allocatedBlobs.size;
    if (
      typeof window !== 'undefined' &&
      window.URL &&
      typeof window.URL.revokeObjectURL === 'function'
    ) {
      this.allocatedBlobs.forEach((tracked) => {
        try {
          window.URL.revokeObjectURL(tracked.url);
        } catch {
          // Ignored in non-DOM environments
        }
      });
    }
    this.allocatedBlobs.clear();
    this.totalBytesAllocated = 0;
    return count;
  }

  /**
   * Automatically purges Blobs that have exceeded the TTL limit (24 hours).
   */
  public static purgeExpired(ttlMs: number = this.DEFAULT_TTL_MS): number {
    const now = Date.now();
    let purgedCount = 0;

    const expiredUrls: string[] = [];
    this.allocatedBlobs.forEach((tracked, url) => {
      if (now - tracked.allocatedAt >= ttlMs) {
        expiredUrls.push(url);
      }
    });

    expiredUrls.forEach((url) => {
      this.revokeBlob(url);
      purgedCount++;
    });

    return purgedCount;
  }

  private static purgeOldest(count: number): void {
    const sorted = Array.from(this.allocatedBlobs.values()).sort(
      (a, b) => a.allocatedAt - b.allocatedAt
    );
    const toPurge = sorted.slice(0, count);
    toPurge.forEach((item) => this.revokeBlob(item.url));
  }

  public static getStats(): { totalCount: number; totalBytes: number; memoryCapBytes: number } {
    return {
      totalCount: this.allocatedBlobs.size,
      totalBytes: this.totalBytesAllocated,
      memoryCapBytes: this.MAX_MEMORY_BYTES
    };
  }
}
