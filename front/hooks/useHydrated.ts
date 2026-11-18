import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * false pendant le rendu serveur ET le premier rendu client (hydratation),
 * puis true. Évite l'erreur d'hydratation : le serveur ne connaît pas le
 * localStorage, donc il ne faut afficher les données du panier qu'ensuite.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
