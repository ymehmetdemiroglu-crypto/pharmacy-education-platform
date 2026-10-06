import { describe, it, expect, beforeEach } from 'vitest';
import { studentDocumentService, SEED_STUDENT_DOCUMENTS } from './studentDocumentService';

describe('studentDocumentService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with seed pharmacy documents for MedChem and Pharmacology', () => {
    const docs = studentDocumentService.getDocuments();
    expect(docs.length).toBeGreaterThanOrEqual(2);
    expect(docs.some((d) => d.courseId === 'pharmacology')).toBe(true);
    expect(docs.some((d) => d.courseId === 'medchem')).toBe(true);
  });

  it('filters documents by course identifier', () => {
    const pharmDocs = studentDocumentService.getDocuments('pharmacology');
    expect(pharmDocs.every((d) => d.courseId === 'pharmacology')).toBe(true);

    const medchemDocs = studentDocumentService.getDocuments('medchem');
    expect(medchemDocs.every((d) => d.courseId === 'medchem')).toBe(true);
  });

  it('uploads and indexes a new student PDF and generates an AI Study Guide with Socratic flashcards', async () => {
    const newDoc = await studentDocumentService.uploadDocument({
      fileName: 'Istanbul_Universitesi_Eczacilik_Toksikoloji_Notu.pdf',
      fileSizeBytes: 1200000,
      courseId: 'pharmacology',
      facultyName: 'İstanbul Üniversitesi Eczacılık',
      textContent: 'Organofosfat intoksikasyonu ve pralidoksim yaşlanma kinetiği...',
    });

    expect(newDoc.id).toBeDefined();
    expect(newDoc.fileName).toContain('Istanbul_Universitesi');
    expect(newDoc.studyGuide).toBeDefined();
    expect(newDoc.studyGuide?.cards.length).toBeGreaterThan(0);
    expect(newDoc.studyGuide?.cards[0]?.hintLadder.length).toBe(3);
    expect(newDoc.studyGuide?.cards[0]?.examTrapWarning).toBeTruthy();

    const retrieved = studentDocumentService.getDocumentById(newDoc.id);
    expect(retrieved).toBeDefined();
    expect(retrieved?.id).toBe(newDoc.id);
  });

  it('deletes an uploaded document', async () => {
    const doc = await studentDocumentService.uploadDocument({
      fileName: 'Silinecek_Ders_Notu.pdf',
      fileSizeBytes: 500000,
      courseId: 'medchem',
    });

    const success = studentDocumentService.deleteDocument(doc.id);
    expect(success).toBe(true);

    const check = studentDocumentService.getDocumentById(doc.id);
    expect(check).toBeUndefined();
  });
});
