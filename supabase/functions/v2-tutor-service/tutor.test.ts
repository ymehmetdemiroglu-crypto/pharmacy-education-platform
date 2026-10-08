import { describe, it, expect } from 'vitest';
import { handleTutorRequest } from './index.ts';

describe('v2-tutor-service Edge Function', () => {
  it('returns 401 Unauthorized when Authorization header is missing', async () => {
    const req = new Request('https://api.supabase.co/functions/v1/v2-tutor-service', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentMessage: 'İyonik bağ nedir?',
      }),
    });

    const res = await handleTutorRequest(req);
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toBe('unauthorized');
    expect(body.message).toContain('Valid Bearer JWT required');
  });

  it('returns 401 Unauthorized when Bearer token is invalid/empty', async () => {
    const req = new Request('https://api.supabase.co/functions/v1/v2-tutor-service', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer invalid-token',
      },
      body: JSON.stringify({
        studentMessage: 'İyonik bağ nedir?',
      }),
    });

    const res = await handleTutorRequest(req);
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toBe('unauthorized');
  });

  it('returns 405 Method Not Allowed for GET requests', async () => {
    const req = new Request('https://api.supabase.co/functions/v1/v2-tutor-service', {
      method: 'GET',
    });

    const res = await handleTutorRequest(req);
    expect(res.status).toBe(405);
  });

  it('handles valid token and returns Socratic response with slide citation', async () => {
    const req = new Request('https://api.supabase.co/functions/v1/v2-tutor-service', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer mock-valid-jwt-token',
      },
      body: JSON.stringify({
        courseId: 'medchem',
        lectureSlug: 'ilac-reseptor-etkilesimi',
        studentMessage: 'Kovalan bağ geri dönüşümlü müdür?',
        hintLevel: 'nudge',
      }),
    });

    const res = await handleTutorRequest(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.sender).toBe('tutor');
    expect(body.content).toBeTruthy();
    expect(body.slideCitation).toBeDefined();
    expect(body.slideCitation.deck).toContain('İlaç Reseptör Etkileşimi');
  }, 15000);
});
