/**
 * Enregistre un élément personnalisé sans jamais lever d'exception si le nom est déjà pris.
 *
 * Après une mise à jour, une page restée ouverte peut charger le nouveau bundle alors que
 * l'ancien a déjà défini les mêmes balises : `customElements.define` lèverait alors
 * NotSupportedError et bloquerait tout le module. On conserve la définition existante
 * et on le signale dans la console (le panneau invite ensuite à recharger la page).
 */
export function defineElement(tag: string, ctor: CustomElementConstructor): void {
  if (typeof customElements === 'undefined') return;
  const existing = customElements.get(tag);
  if (existing) {
    if (existing !== ctor) {
      console.warn(`[home-architect] ${tag} déjà défini (ancienne version en cache ?)`);
    }
    return;
  }
  try {
    customElements.define(tag, ctor);
  } catch (err) {
    // Constructeur déjà enregistré sous un autre nom, nom invalide… : une exception ici interromprait
    // l'évaluation de tout le module (et donc des autres éléments du bundle).
    console.error(`[home-architect] Impossible de définir <${tag}> :`, err);
  }
}
