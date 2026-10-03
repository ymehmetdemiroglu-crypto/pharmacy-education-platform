import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  OAuthProviderDisabledError,
  isOAuthProviderEnabled,
  probeAuthorizeUrl,
  clearSettingsCache,
} from './oauthPreflight';

describe('OAuth Preflight & Resilience Utilities', () => {
  const dummyUrl = 'https://mock.supabase.co';
  const dummyKey = 'mock-anon-key-12345';

  beforeEach(() => {
    clearSettingsCache();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('OAuthProviderDisabledError', () => {
    it('creates an error instance with expected code, provider, and default message', () => {
      const err = new OAuthProviderDisabledError('google');
      expect(err).toBeInstanceOf(Error);
      expect(err).toBeInstanceOf(OAuthProviderDisabledError);
      expect(err.name).toBe('OAuthProviderDisabledError');
      expect(err.code).toBe('oauth_provider_disabled');
      expect(err.provider).toBe('google');
      expect(err.message).toBe("OAuth provider 'google' is not enabled on this Supabase instance.");
    });

    it('creates an error instance with a custom message', () => {
      const err = new OAuthProviderDisabledError('google', 'Custom provider error message');
      expect(err.message).toBe('Custom provider error message');
      expect(err.provider).toBe('google');
      expect(err.code).toBe('oauth_provider_disabled');
    });
  });

  describe('isOAuthProviderEnabled', () => {
    it('returns true when the provider is explicitly enabled in /auth/v1/settings', async () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          external: {
            google: true,
            email: true,
          },
        }),
      } as unknown as Response);

      const isEnabled = await isOAuthProviderEnabled(dummyUrl, dummyKey, 'google');
      expect(isEnabled).toBe(true);
      expect(fetchSpy).toHaveBeenCalledTimes(1);

      const firstCall = fetchSpy.mock.calls[0];
      expect(firstCall).toBeDefined();
      const [calledUrl, calledInit] = firstCall!;
      expect(calledUrl).toContain(`${dummyUrl}/auth/v1/settings?apikey=${dummyKey}`);
      expect((calledInit?.headers as any)?.apikey).toBe(dummyKey);
    });

    it('returns false when the provider is explicitly disabled in /auth/v1/settings', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          external: {
            google: false,
            email: true,
          },
        }),
      } as unknown as Response);

      const isEnabled = await isOAuthProviderEnabled(dummyUrl, dummyKey, 'google');
      expect(isEnabled).toBe(false);
    });

    it('returns false when the provider is not present in external settings', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          external: {
            email: true,
          },
        }),
      } as unknown as Response);

      const isEnabled = await isOAuthProviderEnabled(dummyUrl, dummyKey, 'apple');
      expect(isEnabled).toBe(false);
    });

    it('caches the settings response for 5 minutes and avoids duplicate network requests', async () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          external: {
            google: true,
          },
        }),
      } as unknown as Response);

      const firstCall = await isOAuthProviderEnabled(dummyUrl, dummyKey, 'google');
      expect(firstCall).toBe(true);
      expect(fetchSpy).toHaveBeenCalledTimes(1);

      // Second call within 5 minutes should use the cache
      const secondCall = await isOAuthProviderEnabled(dummyUrl, dummyKey, 'google');
      expect(secondCall).toBe(true);
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });

    it('bypasses cache when forceRefresh is true', async () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          external: {
            google: true,
          },
        }),
      } as unknown as Response);

      await isOAuthProviderEnabled(dummyUrl, dummyKey, 'google');
      expect(fetchSpy).toHaveBeenCalledTimes(1);

      // Call with forceRefresh = true
      await isOAuthProviderEnabled(dummyUrl, dummyKey, 'google', true);
      expect(fetchSpy).toHaveBeenCalledTimes(2);
    });

    it('returns false safely when the settings endpoint responds with HTTP 500', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ message: 'Internal Server Error' }),
      } as unknown as Response);

      const isEnabled = await isOAuthProviderEnabled(dummyUrl, dummyKey, 'google');
      expect(isEnabled).toBe(false);
    });

    it('returns false safely when fetch throws a network error', async () => {
      vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network offline'));

      const isEnabled = await isOAuthProviderEnabled(dummyUrl, dummyKey, 'google');
      expect(isEnabled).toBe(false);
    });
  });

  describe('probeAuthorizeUrl', () => {
    it('returns { ok: true } on 302 redirect response', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: false,
        status: 302,
        type: 'basic',
        headers: new Headers({ location: 'https://accounts.google.com/o/oauth2/v2/auth' }),
      } as unknown as Response);

      const result = await probeAuthorizeUrl('https://mock.supabase.co/auth/v1/authorize?provider=google');
      expect(result.ok).toBe(true);
    });

    it('returns { ok: true } on opaque redirect (status 0)', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: false,
        status: 0,
        type: 'opaqueredirect',
      } as unknown as Response);

      const result = await probeAuthorizeUrl('https://mock.supabase.co/auth/v1/authorize?provider=google');
      expect(result.ok).toBe(true);
    });

    it('returns { ok: true } on 200 OK response', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: true,
        status: 200,
        type: 'basic',
      } as unknown as Response);

      const result = await probeAuthorizeUrl('https://mock.supabase.co/auth/v1/authorize?provider=google');
      expect(result.ok).toBe(true);
    });

    it('returns { ok: false, status: 400, error: ... } on 400 validation_failed from GoTrue', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: false,
        status: 400,
        type: 'basic',
        json: async () => ({
          code: 400,
          error_code: 'validation_failed',
          msg: 'Unsupported provider: provider is not enabled',
        }),
      } as unknown as Response);

      const result = await probeAuthorizeUrl('https://mock.supabase.co/auth/v1/authorize?provider=google');
      expect(result.ok).toBe(false);
      expect(result.status).toBe(400);
      expect(result.error).toBe('Unsupported provider: provider is not enabled');
    });

    it('handles non-JSON 400 response with default fallback message', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: false,
        status: 400,
        type: 'basic',
        json: async () => {
          throw new Error('Not JSON');
        },
      } as unknown as Response);

      const result = await probeAuthorizeUrl('https://mock.supabase.co/auth/v1/authorize?provider=google');
      expect(result.ok).toBe(false);
      expect(result.status).toBe(400);
      expect(result.error).toBe('Unsupported provider: provider is not enabled');
    });

    it('returns { ok: false, error: ... } when probe fetch throws a network error', async () => {
      vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Connection timed out'));

      const result = await probeAuthorizeUrl('https://mock.supabase.co/auth/v1/authorize?provider=google');
      expect(result.ok).toBe(false);
      expect(result.error).toContain('Connection timed out');
    });
  });
});
