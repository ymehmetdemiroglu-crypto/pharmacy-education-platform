import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SlideHeatmapView } from './SlideHeatmapView';
import { useVizeTriageStore } from '../../stores/vizeTriageStore';

describe('SlideHeatmapView', () => {
  beforeEach(() => {
    localStorage.clear();
    useVizeTriageStore.getState().resetSession();
    useVizeTriageStore.getState().setCourse('medchem');
    useVizeTriageStore.getState().setTierFilter('all');
    useVizeTriageStore.getState().closeCramSession();

    window.matchMedia =
      window.matchMedia ||
      function () {
        return {
          matches: false,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        };
      };
  });

  it('renders hero title, Pareto summary, and MedChem slides', () => {
    render(<SlideHeatmapView />);

    expect(screen.getByText('Slayt Isı Haritası & Vize Kampı')).toBeDefined();
    expect(screen.getByText(/1-Tıkla Vize Kampına Başla ⚡/i)).toBeDefined();
    expect(screen.getByText(/Pareto Kuralı:/i)).toBeDefined();
    expect(screen.getByText(/Farmasötik Kimya/i)).toBeDefined();

    // Verify MedChem slide cards exist
    expect(screen.getByText(/Kovalan Bağlar & Serin Fosforilasyonu/i)).toBeDefined();
    expect(screen.getByText(/İyonik Bağ & Dielektrik Katsayısı/i)).toBeDefined();
  });

  it('switches course to Pharmacology and updates slides', () => {
    render(<SlideHeatmapView />);

    // Click Farmakoloji segment item
    const pharmItem = screen.getByTestId('segment-pharmacology').closest('.ant-segmented-item') || screen.getByTestId('segment-pharmacology');
    fireEvent.click(pharmItem);

    // Verify Pharmacology slides appear
    expect(screen.getByText(/Schild Regresyonu & Kompetitif Antagonizma/i)).toBeDefined();
    expect(screen.getByText(/Parsiyel Agonist & İntrensek Etkinlik/i)).toBeDefined();
  });

  it('filters slides by search query', () => {
    render(<SlideHeatmapView />);

    const searchInput = screen.getByPlaceholderText(/Slayt adı, mekanizma veya tuzak kodu ara/i);
    fireEvent.change(searchInput, { target: { value: 'Salisilik' } });

    // Salicylic acid slide should be visible
    expect(screen.getAllByText(/Salisilik Asit/i).length).toBeGreaterThanOrEqual(1);

    // Organophosphates slide should be filtered out
    expect(screen.queryByText(/Kovalan Bağlar & Serin Fosforilasyonu/i)).toBeNull();
  });

  it('filters slides by tier', () => {
    render(<SlideHeatmapView />);

    // Filter to critical tier 1
    const criticalTierItem = screen.getByTestId('tier-filter-critical').closest('.ant-segmented-item') || screen.getByTestId('tier-filter-critical');
    fireEvent.click(criticalTierItem);

    // Should only show high yield slides (HYS >= 75)
    const redBadges = screen.getAllByTestId('thermal-badge-red');
    expect(redBadges.length).toBeGreaterThan(0);
    expect(screen.queryByTestId('thermal-badge-cool')).toBeNull();
  });

  it('opens cram modal when clicking hero button', () => {
    render(<SlideHeatmapView />);

    const heroBtn = screen.getByTestId('hero-start-cram-btn');
    fireEvent.click(heroBtn);

    expect(useVizeTriageStore.getState().isCramModalOpen).toBe(true);
    expect(screen.getByTestId('vize-cram-carousel-modal')).toBeDefined();
  });
});
