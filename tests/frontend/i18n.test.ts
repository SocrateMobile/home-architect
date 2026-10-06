import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  LANGUAGE_CHANGED_KEY,
  LocalizeController,
  formatNumber,
  getLanguage,
  hasTranslation,
  localize,
  registerTranslations,
  setLanguage,
  subscribeLanguage,
} from '../../src/i18n/index';

registerTranslations('fr', { 'test.hello': 'Bonjour {name}', 'test.only_fr': 'Seulement FR' });
registerTranslations('en', { 'test.hello': 'Hello {name}' });

afterEach(() => setLanguage('fr'));

describe('i18n', () => {
  it('choisit fr pour les variantes françaises et en sinon', () => {
    setLanguage('fr-CA');
    expect(getLanguage()).toBe('fr');
    setLanguage('de');
    expect(getLanguage()).toBe('en');
    setLanguage(undefined);
    expect(getLanguage()).toBe('en');
  });

  it('interpole les paramètres et garde les marqueurs inconnus', () => {
    setLanguage('en');
    expect(localize('test.hello', { name: 'Ada' })).toBe('Hello Ada');
    expect(localize('test.hello')).toBe('Hello {name}');
    expect(localize('test.hello', { other: 1 })).toBe('Hello {name}');
  });

  it("se replie sur l'autre langue puis sur la clé", () => {
    setLanguage('en');
    expect(localize('test.only_fr')).toBe('Seulement FR');
    expect(localize('test.missing')).toBe('test.missing');
    expect(hasTranslation('test.only_fr', 'en')).toBe(false);
    expect(hasTranslation('test.only_fr')).toBe(true);
  });

  it("notifie les abonnés seulement quand la langue change", () => {
    const listener = vi.fn();
    const unsubscribe = subscribeLanguage(listener);
    setLanguage('fr');
    expect(listener).not.toHaveBeenCalled();
    setLanguage('en');
    expect(listener).toHaveBeenCalledWith('en');
    unsubscribe();
    setLanguage('fr');
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('formate les nombres selon la langue', () => {
    setLanguage('fr');
    expect(formatNumber(1234.5, { maximumFractionDigits: 1 })).toMatch(/1\s?234,5/);
    setLanguage('en');
    expect(formatNumber(1234.5, { maximumFractionDigits: 1 })).toBe('1,234.5');
    expect(formatNumber(Number.NaN)).toBe('—');
  });

  it('LocalizeController redemande un rendu avec la clé de langue', () => {
    const requestUpdate = vi.fn();
    let controller: { hostConnected(): void; hostDisconnected(): void } | null = null;
    const host = {
      addController: (c: typeof controller) => {
        controller = c;
      },
      removeController: () => undefined,
      requestUpdate,
      updateComplete: Promise.resolve(true),
    };
    new LocalizeController(host as never);
    controller!.hostConnected();
    setLanguage('en');
    expect(requestUpdate).toHaveBeenCalledWith(LANGUAGE_CHANGED_KEY, 'fr');
    controller!.hostDisconnected();
    setLanguage('fr');
    expect(requestUpdate).toHaveBeenCalledTimes(1);
  });
});
