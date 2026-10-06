import { describe, it, expect } from 'vitest';
import { lectureRag, ATOMIC_KNOWLEDGE_NODES } from './lectureRagService';

describe('lectureRagService', () => {
  it('contains exactly 10 reviewed atomic knowledge nodes covering all 33 lecture slides', () => {
    expect(ATOMIC_KNOWLEDGE_NODES.length).toBe(10);
    const allSlides = ATOMIC_KNOWLEDGE_NODES.flatMap((n) => n.slides);
    expect(allSlides).toContain(2);
    expect(allSlides).toContain(9);
    expect(allSlides).toContain(13);
    expect(allSlides).toContain(15);
    expect(allSlides).toContain(24);
    expect(allSlides).toContain(33);
  });

  it('retrieves Dibukain and local anesthetic SAR node when student asks about cinchocaine or amide bridge', async () => {
    const nodes = await lectureRag.retrieveRelevantNodes('Dibukain ve prokain arasındaki fark nedir?');
    expect(nodes.length).toBeGreaterThan(0);
    expect(nodes[0]?.id).toBe('node-10-dibukain-ve-lokal-anestezik-sar');
    expect(nodes[0]?.slides).toContain(33);
  });

  it('retrieves covalent and organophosphate node when student queries irreversible inhibition', async () => {
    const nodes = await lectureRag.retrieveRelevantNodes('Organofosfat ve asetilkolinesteraz fosforilasyonu');
    expect(nodes[0]?.id).toBe('node-02-kovalan-baglar-ve-alkilleme');
    expect(nodes[0]?.slides).toContain(12);
  });

  it('formats retrieved nodes into a strict slide-cited RAG prompt context block', async () => {
    const nodes = await lectureRag.retrieveRelevantNodes('Salisilik asit pKa ve hidrojen bağı');
    const formatted = lectureRag.formatRagContext(nodes);
    expect(formatted).toContain('DOĞRULANMIŞ DERS NOTU BİLGİ TABANI');
    expect(formatted).toContain('Slayt');
    expect(formatted).toContain('Salisilik Asit');
  });
});
