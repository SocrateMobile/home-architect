/**
 * Mémoïsation du dernier appel (constats F34, F35) : le résultat est recalculé seulement si l'un des
 * arguments change, comparé par identité (Object.is). Les tableaux du projet sont remplacés à chaque
 * modification (jamais mutés) : leur référence sert donc de numéro de révision.
 */
export function memoizeLast<A extends unknown[], R>(fn: (...args: A) => R): (...args: A) => R {
  let lastArgs: A | null = null;
  let lastResult: R;
  return (...args: A): R => {
    if (lastArgs !== null && lastArgs.length === args.length && lastArgs.every((a, i) => Object.is(a, args[i]))) {
      return lastResult;
    }
    lastResult = fn(...args);
    lastArgs = args;
    return lastResult;
  };
}
