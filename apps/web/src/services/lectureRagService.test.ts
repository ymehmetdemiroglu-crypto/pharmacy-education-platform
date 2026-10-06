import { describe, it, expect } from 'vitest';
import { lectureRag, ATOMIC_KNOWLEDGE_NODES } from './lectureRagService';

describe('lectureRagService', () => {
  it('contains 20 reviewed atomic knowledge nodes across MedChem and Pharmacology', () => {
    expect(ATOMIC_KNOWLEDGE_NODES.length).toBe(20);
    const medchemNodes = ATOMIC_KNOWLEDGE_NODES.filter((n) => n.courseId === 'medchem');
    const pharmNodes = ATOMIC_KNOWLEDGE_NODES.filter((n) => n.courseId === 'pharmacology');
    expect(medchemNodes.length).toBe(10);
    expect(pharmNodes.length).toBe(10);

    const allSlides = medchemNodes.flatMap((n) => n.slides);
    expect(allSlides).toContain(2);
    expect(allSlides).toContain(9);
    expect(allSlides).toContain(13);
    expect(allSlides).toContain(15);
    expect(allSlides).toContain(24);
    expect(allSlides).toContain(33);
  });

  it('retrieves Dibukain and local anesthetic SAR node when student asks about cinchocaine or amide bridge', async () => {
    const nodes = await lectureRag.retrieveRelevantNodes('Dibukain ve prokain arasındaki fark nedir?', 2, 'medchem');
    expect(nodes.length).toBeGreaterThan(0);
    expect(nodes[0]?.id).toBe('node-10-dibukain-ve-lokal-anestezik-sar');
    expect(nodes[0]?.slides).toContain(33);
  });

  it('retrieves covalent and organophosphate node when student queries irreversible inhibition', async () => {
    const nodes = await lectureRag.retrieveRelevantNodes('Organofosfat ve asetilkolinesteraz fosforilasyonu', 2, 'medchem');
    expect(nodes[0]?.id).toBe('node-02-kovalan-baglar-ve-alkilleme');
    expect(nodes[0]?.slides).toContain(12);
  });

  it('retrieves Pharmacology EC50 and Emax node when student asks about potency and efficacy', async () => {
    const nodes = await lectureRag.retrieveRelevantNodes('EC50 ve Emax farkı hangisi daha etkindir?', 2, 'pharmacology');
    expect(nodes.length).toBeGreaterThan(0);
    expect(nodes[0]?.id).toBe('pharm-node-03-ec50-ve-emax');
    expect(nodes[0]?.courseId).toBe('pharmacology');
    expect(nodes[0]?.slides).toContain(18);
  });

  it('retrieves Pharmacology spare receptors node when querying Furchgott experiment', async () => {
    const nodes = await lectureRag.retrieveRelevantNodes('Furchgott deneyi fenoksibenzamin ve yedek reseptör', 2, 'pharmacology');
    expect(nodes.length).toBeGreaterThan(0);
    expect(nodes[0]?.id).toBe('pharm-node-07-yedek-reseptorler');
    expect(nodes[0]?.slides).toContain(39);
  });

  it('formats retrieved nodes into a strict slide-cited RAG prompt context block', async () => {
    const nodes = await lectureRag.retrieveRelevantNodes('Salisilik asit pKa ve hidrojen bağı', 2, 'medchem');
    const formatted = lectureRag.formatRagContext(nodes);
    expect(formatted).toContain('DOĞRULANMIŞ DERS NOTU BİLGİ TABANI');
    expect(formatted).toContain('Slayt');
    expect(formatted).toContain('Salisilik Asit');
  });
});
