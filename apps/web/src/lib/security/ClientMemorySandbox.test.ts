import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ClientMemorySandbox } from './ClientMemorySandbox';

describe('ClientMemorySandbox', () => {
  beforeEach(() => {
    ClientMemorySandbox.revokeAll();
    vi.restoreAllMocks();
  });

  it('registers a Blob and allocates a blob URL with size tracking', () => {
    const fakeBlob = new Blob(['sample pdf content'], { type: 'application/pdf' });
    const { id, url } = ClientMemorySandbox.registerBlob(fakeBlob);

    expect(id).toMatch(/^blob-/);
    expect(url).toBeDefined();

    const stats = ClientMemorySandbox.getStats();
    expect(stats.totalCount).toBe(1);
    expect(stats.totalBytes).toBe(fakeBlob.size);
  });

  it('revokes an individual Blob and updates memory tracking', () => {
    const fakeBlob = new Blob(['temporary slide snapshot'], { type: 'image/png' });
    const { url } = ClientMemorySandbox.registerBlob(fakeBlob);

    expect(ClientMemorySandbox.getStats().totalCount).toBe(1);

    const revoked = ClientMemorySandbox.revokeBlob(url);
    expect(revoked).toBe(true);

    const stats = ClientMemorySandbox.getStats();
    expect(stats.totalCount).toBe(0);
    expect(stats.totalBytes).toBe(0);
  });

  it('revokes all Blobs during session teardown', () => {
    const blob1 = new Blob(['slide 1'], { type: 'application/pdf' });
    const blob2 = new Blob(['slide 2'], { type: 'application/pdf' });

    ClientMemorySandbox.registerBlob(blob1);
    ClientMemorySandbox.registerBlob(blob2);

    expect(ClientMemorySandbox.getStats().totalCount).toBe(2);

    const count = ClientMemorySandbox.revokeAll();
    expect(count).toBe(2);
    expect(ClientMemorySandbox.getStats().totalCount).toBe(0);
    expect(ClientMemorySandbox.getStats().totalBytes).toBe(0);
  });

  it('purges expired Blobs after TTL window', () => {
    const blob = new Blob(['old slide'], { type: 'image/jpeg' });
    ClientMemorySandbox.registerBlob(blob);

    // Fast-forward or pass 0 ms TTL
    const purged = ClientMemorySandbox.purgeExpired(0);
    expect(purged).toBe(1);
    expect(ClientMemorySandbox.getStats().totalCount).toBe(0);
  });
});
