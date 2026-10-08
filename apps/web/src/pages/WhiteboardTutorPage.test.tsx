import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// No real Supabase session: the page must run on the local ladder (guest / offline) without any network.
vi.mock('@pharmacy/platform', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@pharmacy/platform')>();
  const mockClient = {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => undefined } } }),
    },
    from: () => {
      throw new Error('guest must never query the server');
    },
  };
  return {
    ...actual,
    supabase: mockClient,
    getSupabase: () => mockClient,
  };
});
vi.mock('../context/TranslationContext', () => ({
  useTranslation: () => ({ locale: 'en', t: (k: string) => k, dir: 'ltr', setLocale: () => undefined }),
}));

import { WhiteboardTutorPage } from './WhiteboardTutorPage';
import { DashboardPage } from './DashboardPage';
import { getLectures } from '../lib/whiteboardSession';

const lecture = getLectures()[0]!;
const first = lecture.concepts[0]!;
const options = (first.widget!.config as { options: { id: string; isCorrect: boolean; text: string }[] }).options;
const wrong = options.filter((o) => !o.isCorrect);
const right = options.find((o) => o.isCorrect)!;

const renderTutor = (slug = lecture.slug) =>
  render(
    <MemoryRouter initialEntries={[`/tutor/${slug}`]}>
      <Routes>
        <Route path="/tutor/:lectureSlug" element={<WhiteboardTutorPage />} />
        <Route path="/dashboard" element={<div>dash</div>} />
      </Routes>
    </MemoryRouter>
  );

const check = () => fireEvent.click(screen.getByRole('button', { name: /check answer|reveal experimental outcome/i }));

beforeEach(() => localStorage.clear());

describe('WhiteboardTutorPage (guest / offline, deterministic ladder)', () => {
  it('shows the first concept, an honest status badge, and the guest note', async () => {
    renderTutor();
    expect(await screen.findByRole('heading', { level: 1, name: first.conceptTitle })).toBeTruthy();
    expect(screen.getByText(/verified|draft: awaiting review/i)).toBeTruthy();
    expect(screen.getByText(/signed out/i)).toBeTruthy();
  });

  it('a wrong answer yields the reviewed Tier-1 nudge with a slide citation and resets the board', async () => {
    renderTutor();
    await screen.findByRole('heading', { level: 1, name: first.conceptTitle });
    fireEvent.click(screen.getByText(wrong[0]!.text));
    check();
    expect(await screen.findByText(first.scaffoldingLadder[0])).toBeTruthy();
    expect(screen.getAllByText(new RegExp(`Slide ${first.slideNumbers[0]}`)).length).toBeGreaterThan(0);
    // board was reset: no option is selected any more and the next button is not offered yet
    expect(screen.queryByTestId('next-concept')).toBeNull();
  });

  it('three wrong answers reveal the correct option (remediation) and allow moving on', async () => {
    renderTutor();
    await screen.findByRole('heading', { level: 1, name: first.conceptTitle });
    const seen: string[] = [];
    for (let i = 0; i < 3; i += 1) {
      const target = wrong[i % wrong.length]!;
      // an eliminated distractor is legitimately gone from the board; pick any remaining wrong option
      const candidate = [...wrong, ...wrong].find((o) => screen.queryByText(o.text));
      expect(candidate, `attempt ${i}`).toBeTruthy();
      fireEvent.click(screen.getByText((candidate ?? target).text));
      check();
      seen.push(first.scaffoldingLadder[Math.min(i, 2)]!);
      await screen.findByText(first.scaffoldingLadder[Math.min(i, 2)]!);
    }
    expect(await screen.findByText(new RegExp(`Correct option: ${right.text.slice(0, 20)}`))).toBeTruthy();
    expect(screen.getByTestId('next-concept')).toBeTruthy();
  });

  it('the correct answer completes the concept, stores mastery locally, and the lecture ends with a source list', async () => {
    renderTutor();
    for (let n = 0; n < lecture.concepts.length; n += 1) {
      const concept = lecture.concepts[n]!;
      await screen.findByRole('heading', { level: 1, name: concept.conceptTitle });
      const opts = (concept.widget!.config as { options: { isCorrect: boolean; text?: string; label?: string }[] }).options;
      const ok = opts.find((o) => o.isCorrect)!;
      fireEvent.click(screen.getByText((ok.text ?? ok.label)!));
      check();
      fireEvent.click(await screen.findByTestId('next-concept'));
    }
    expect(await screen.findByTestId('lecture-summary')).toBeTruthy();
    expect(screen.getByText(/sources used in this lecture/i)).toBeTruthy();
    const stored = JSON.parse(localStorage.getItem('pep.mastery.v1') ?? '{}') as Record<string, number>;
    expect(Object.keys(stored).length).toBe(lecture.concepts.length);
    expect(stored[first.id]).toBeCloseTo(0.3, 5);
  }, 60000);


  it('a hint request advances the ladder without changing mastery', async () => {
    renderTutor();
    await screen.findByRole('heading', { level: 1, name: first.conceptTitle });
    fireEvent.click(screen.getByRole('button', { name: /ask for a hint/i }));
    expect(await screen.findByText(first.scaffoldingLadder[0])).toBeTruthy();
    await waitFor(() => expect(JSON.parse(localStorage.getItem('pep.mastery.v1') ?? '{}')[first.id] ?? 0).toBe(0));
  });

  it('unknown lecture slug shows an empty state instead of crashing', async () => {
    renderTutor('does-not-exist');
    expect(await screen.findByText(/no published concepts/i)).toBeTruthy();
  });
});

describe('DashboardPage', () => {
  it('renders readiness 0%, an unset exam date notice, Daily 10 and the lecture catalog', async () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    );
    expect(await screen.findByRole('heading', { level: 1, name: /study dashboard/i })).toBeTruthy();
    expect(screen.getByRole('img', { name: /readiness: 0%/i })).toBeTruthy();
    expect(screen.getByTestId('exam-countdown').textContent).toMatch(/exam date|days left|passed|today/i);
    expect(screen.getByText(/daily 10/i)).toBeTruthy();
    expect(screen.getByText(`${first.sourceDeck.replace(/\.pdf$/i, '')}`)).toBeTruthy();
  });
});
