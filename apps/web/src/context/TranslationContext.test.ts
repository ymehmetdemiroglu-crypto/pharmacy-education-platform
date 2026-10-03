import { describe, it, expect } from 'vitest';
import tr from '../locales/tr.json';
import ar from '../locales/ar.json';
import en from '../locales/en.json';
import { dictionaries } from '../locales';

function getAllKeys(obj: Record<string, any>, prefix = ''): string[] {
  let keys: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys = keys.concat(getAllKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

describe('Centralized i18n Dictionaries & Translation Engine', () => {
  it('has 100% translation key parity between Turkish, Arabic, and English dictionaries', () => {
    const trKeys = getAllKeys(tr).sort();
    const arKeys = getAllKeys(ar).sort();
    const enKeys = getAllKeys(en).sort();

    expect(trKeys).toEqual(arKeys);
    expect(trKeys).toEqual(enKeys);
    expect(trKeys.length).toBeGreaterThan(50);
  });

  it('strictly enforces canonical "Farmasötik Kimya" and bans "Medisinal Kimya" / "MedKim"', () => {
    const trString = JSON.stringify(tr);
    const arString = JSON.stringify(ar);

    expect(trString).toContain('Farmasötik Kimya');
    expect(trString).not.toContain('Medisinal Kimya');
    expect(trString).not.toContain('MedKim');

    expect(arString).toContain('Farmasötik Kimya');
    expect(arString).not.toContain('Medisinal Kimya');
    expect(arString).not.toContain('MedKim');
  });

  it('enforces The Special Arabic Rule with canonical Turkish terminology in Arabic copy', () => {
    const arString = JSON.stringify(ar);
    // Key pharmacological and chemical concepts retained in canonical terminology
    expect(arString).toContain('Farmasötik Kimya');
    expect(arString).toContain('Farmakoloji');
    expect(arString).toContain('reseptör');
    expect(arString).toContain('iyonizasyon');
    expect(arString).toContain('SAR');
  });

  it('interpolates named parameters correctly', () => {
    const template = tr.catalog.modulesCount; // "{count} Modül ({lessons} Ders)"
    const interpolated = template
      .replace('{count}', '5')
      .replace('{lessons}', '10');
    expect(interpolated).toBe('5 Modül (10 Ders)');
  });

  it('verifies zero dev notes or forbidden unvetted strings exist in dictionary files', () => {
    const forbidden = ['unverified', 'NUM-MC', 'CIT-MC', 'pending-human-review', 'needs-human-review'];
    const trString = JSON.stringify(tr);
    const arString = JSON.stringify(ar);

    for (const term of forbidden) {
      expect(trString).not.toContain(term);
      expect(arString).not.toContain(term);
    }
  });

  it('dictionaries object exports tr, ar, and en correctly', () => {
    expect(dictionaries.tr).toBeDefined();
    expect(dictionaries.ar).toBeDefined();
    expect(dictionaries.en).toBeDefined();
    expect(dictionaries.tr.navbar.brandName).toBe('PharmLearn');
    expect(dictionaries.ar.navbar.brandName).toBe('PharmLearn');
    expect(dictionaries.en.navbar.brandName).toBe('PharmLearn');
  });
});
