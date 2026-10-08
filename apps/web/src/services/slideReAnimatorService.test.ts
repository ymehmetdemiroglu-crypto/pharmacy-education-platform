import { describe, it, expect } from 'vitest';
import {
  extractSlideEntities,
  resolveSlideWidget,
  generateAnkiTsvExport,
  synthesizeSlideReanimation
} from './slideReAnimatorService';
import { PRELOADED_REANIMATED_SLIDES } from '../data/reanimatedSlides.data';

describe('slideReAnimatorService', () => {
  describe('extractSlideEntities', () => {
    it('extracts numerical constants (pKa, pH, Kd, EC50) accurately', () => {
      const sampleText = 'Salisilik asit pKa: 2.97 ve mide pH: 1.5 değerindedir. Kd = 50 nM, EC50 = 5 nM.';
      const entities = extractSlideEntities(sampleText);

      const pKa = entities.find((e) => e.type === 'pka');
      const pH = entities.find((e) => e.type === 'ph');
      const kd = entities.find((e) => e.type === 'kd');
      const ec50 = entities.find((e) => e.type === 'ec50');

      expect(pKa).toBeDefined();
      expect(pKa?.value).toBe(2.97);
      expect(pH).toBeDefined();
      expect(pH?.value).toBe(1.5);
      expect(kd).toBeDefined();
      expect(kd?.value).toBe(50);
      expect(ec50).toBeDefined();
      expect(ec50?.value).toBe(5);
    });

    it('identifies functional groups and chemical scaffolds', () => {
      const sampleText = 'Dibukain molekülünde kinolin halkası ve amit köprüsü (-CONH-) bulunur. Ester bağı yoktur.';
      const entities = extractSlideEntities(sampleText);

      const hasAmide = entities.some((e) => e.type === 'functional_group' && e.value === 'amit');
      const hasEster = entities.some((e) => e.type === 'functional_group' && e.value === 'ester');
      const hasQuinoline = entities.some((e) => e.type === 'scaffold' && e.value === 'kinolin');

      expect(hasAmide).toBe(true);
      expect(hasEster).toBe(true);
      expect(hasQuinoline).toBe(true);
    });

    it('maps canonical pharmacy exam traps correctly', () => {
      const schildText = 'Schild regresyon doğrusu eğimi m = 1.0 olduğunda kompetitif model doğrulanır.';
      const schildEntities = extractSlideEntities(schildText);
      const schildTrap = schildEntities.find((e) => e.type === 'trap');
      expect(schildTrap?.value).toBe('TRAP-07-SCHILD-SLOPE');

      const spareText = 'Furchgott deneyinde dokuda yedek reseptör rezervi tespit edilmiştir.';
      const spareEntities = extractSlideEntities(spareText);
      const spareTrap = spareEntities.find((e) => e.type === 'trap');
      expect(spareTrap?.value).toBe('TRAP-02-SPARE-RECEPTORS');
    });
  });

  describe('resolveSlideWidget', () => {
    it('routes acid-base and Henderson-Hasselbalch slides to IonizationChamber', () => {
      const rawText = 'Salisilik asit pKa 2.97 ve mide pH 1.5 iyonlaşma dengesi';
      const entities = extractSlideEntities(rawText);
      const widget = resolveSlideWidget(entities, rawText);

      expect(widget.type).toBe('IonizationChamber');
      expect(widget.props.pKa).toBe(2.97);
      expect(widget.props.compoundType).toBe('weak_acid');
    });

    it('routes Schild regression and dose-response slides to DoseResponseCurve', () => {
      const rawText = 'Schild regresyonu ve kompetitif antagonist dozu pA2 = 7.8';
      const entities = extractSlideEntities(rawText);
      const widget = resolveSlideWidget(entities, rawText);

      expect(widget.type).toBe('DoseResponseCurve');
      expect(widget.props.mode).toBe('schild_regression');
    });

    it('routes local anesthetic and SAR slides to SarExplorer', () => {
      const rawText = 'Lokal anestezik SAR serisinde prokain ester ve dibukain amit karşılaştırması';
      const entities = extractSlideEntities(rawText);
      const widget = resolveSlideWidget(entities, rawText);

      expect(widget.type).toBe('SarExplorer');
      expect(widget.props.initialSeries).toBe('ester_vs_amide');
    });
  });

  describe('generateAnkiTsvExport', () => {
    it('generates compliant Anki TSV format with headers and tags', () => {
      const slide = PRELOADED_REANIMATED_SLIDES[0]!;
      const tsv = generateAnkiTsvExport(slide.ankiCards, {
        title: slide.title,
        courseId: slide.courseId,
        facultyName: slide.facultyName
      });

      expect(tsv).toContain('#separator:tab');
      expect(tsv).toContain('#html:true');
      expect(tsv).toContain('#tags column:4');

      const lines = tsv.split('\n');
      expect(lines.length).toBeGreaterThanOrEqual(4); // 3 header lines + at least 1 card line

      // Verify first card row contains tab-separated fields
      const cardRow = lines[3]!;
      const fields = cardRow.split('\t');
      expect(fields.length).toBe(4);
      expect(fields[0]).toContain(slide.title); // Question
      expect(fields[1]).toContain('İpucu Merdiveni'); // Answer + Hints
      expect(fields[3]).toContain('PharmLearn'); // Tags
    });
  });

  describe('synthesizeSlideReanimation', () => {
    it('matches pre-loaded authentic exemplars when ID matches', () => {
      const slide = synthesizeSlideReanimation({
        id: 'slide-reanim-01',
        title: 'Dibukain',
        rawText: '',
        courseId: 'medchem'
      });

      expect(slide.id).toBe('slide-reanim-01');
      expect(slide.facultyName).toContain('Marmara');
      expect(slide.challenge.options).toHaveLength(4);
      expect(slide.ankiCards.length).toBeGreaterThanOrEqual(1);
    });

    it('synthesizes new slide re-animation dynamically for custom input', () => {
      const customSlide = synthesizeSlideReanimation({
        title: 'Özel Vize Notu: Propranolol ve Adrenerjik Blokaj',
        rawText: 'Propranolol non-selektif beta antagonisttir. Kd = 1.2 nM, EC50 = 3 nM. pKa = 9.4.',
        courseId: 'pharmacology',
        facultyName: 'İstanbul Üniversitesi Eczacılık',
        pageNumber: 7
      });

      expect(customSlide.id).toBeDefined();
      expect(customSlide.entities.length).toBeGreaterThan(0);
      expect(customSlide.widgetConfig.type).toBe('DoseResponseCurve');
      expect(customSlide.challenge.options).toHaveLength(4);
      expect(customSlide.challenge.hintLadder).toHaveLength(3);
    });
  });
});
