# KTANE Solver — Project Tracker

## Statut global : 🔵 En cours — Phase 5 (Polish)

---

## Légende des statuts

| Icône | Statut             |
| ----- | ------------------ |
| ⬜    | À faire            |
| 🔵    | En cours           |
| ✅    | Terminé            |
| ❌    | Bloqué             |
| ⏸️    | En pause / reporté |

---

## Phase 0 — Setup & Architecture

| #   | Tâche                                                             | Statut | Notes                                            |
| --- | ----------------------------------------------------------------- | ------ | ------------------------------------------------ |
| 0.1 | Initialiser le projet Next.js (TypeScript, Tailwind, shadcn/ui)   | ✅     | `npx create-next-app`                            |
| 0.2 | Configurer ESLint + Prettier                                      | ✅     |                                                  |
| 0.3 | Créer la structure de dossiers du projet                          | ✅     | ⚠ Tout doit être dans src/ — components/, lib/, types/ sont sous src/ |
| 0.4 | Créer le `BombContext` (infos globales de la bombe)               | ✅     | Supprimé en Phase 4 — remplacé par conditions locales |
| 0.5 | Créer les types partagés (`types/modules.ts`)                     | ✅     | Chemin corrigé : src/types/modules.ts            |
| 0.6 | Configurer `cn()` (clsx + tailwind-merge) et vérifier dispo `cva` | ✅     | Obligatoire pour la gestion des classes Tailwind |
| 0.7 | Mettre en place le repo GitHub                                    | ✅     |                                                  |

---

## Phase 1 — Layout & Dashboard

| #   | Tâche                                        | Statut | Notes                           |
| --- | -------------------------------------------- | ------ | ------------------------------- |
| 1.1 | Créer le layout principal (`app/layout.tsx`) | ✅     | Header, fond sombre, police     |
| 1.2 | Créer le composant `Header.tsx`              | ✅     | Titre, accès rapide aux modules — BombInfoDialog supprimé |
| 1.3 | Créer le composant `ModuleCard.tsx`          | ✅     | Nom, icône, statut              |
| 1.4 | Créer la page dashboard (`src/app/page.tsx`) | ✅     | Grille de ModuleCards           |
| 1.5 | Modale / panneau "Infos de la bombe"         | ✅     | Supprimé — remplacé par conditions locales par module |

---

## Phase 2 — Module : Wires (fils simples)

| #   | Tâche                                              | Statut | Notes                                         |
| --- | -------------------------------------------------- | ------ | --------------------------------------------- |
| 2.1 | Implémenter la logique `src/lib/modules/wires.ts`  | ✅     | Règles du manuel officiel                     |
| 2.2 | Créer le composant `WiresSolver.tsx`               | ✅     | Sélection des couleurs, affichage du résultat |
| 2.3 | Créer la page `src/app/modules/wires/page.tsx`     | ✅     |                                               |
| 2.4 | Tests manuels de toutes les combinaisons           | ✅     |                                               |

---

## Phase 3 — Module : Button (bouton)

| #   | Tâche                                              | Statut | Notes                                           |
| --- | -------------------------------------------------- | ------ | ----------------------------------------------- |
| 3.1 | Implémenter la logique `src/lib/modules/button.ts` | ✅     | Incl. règle de relâchement avec DEL             |
| 3.2 | Créer le composant `ButtonSolver.tsx`              | ✅     | Sélection couleur + label, gestion hold/release |
| 3.3 | Créer la page `src/app/modules/button/page.tsx`    | ✅     |                                                 |
| 3.4 | Tests manuels de toutes les combinaisons           | ✅     |                                                 |

---

## Phase 4 — Module : Complicated Wires

| #   | Tâche                                                         | Statut | Notes                                                     |
| --- | ------------------------------------------------------------- | ------ | --------------------------------------------------------- |
| 4.1 | Implémenter la logique `src/lib/modules/complicated-wires.ts` | ✅     | Table de décision avec LED/étoile/couleur                 |
| 4.2 | Créer le composant `ComplicatedWiresSolver.tsx`               | ✅     | Interface pour chaque fil, affichage couper/ne pas couper |
| 4.3 | Créer la page `src/app/modules/complicated-wires/page.tsx`    | ✅     |                                                           |
| 4.4 | Tests manuels de toutes les combinaisons                      | ✅     |                                                           |

---

## Phase 4.5 — Refactoring architecture : conditions locales

| #   | Tâche                                                                 | Statut | Notes                                                              |
| --- | --------------------------------------------------------------------- | ------ | ------------------------------------------------------------------ |
| 4.5.1 | Créer composant partagé `BombConditions.tsx`                        | ✅     | `src/components/modules/shared/BombConditions.tsx`                 |
| 4.5.2 | Refactoriser `wires.ts` → `WiresConditions`                         | ✅     | Seule condition : `serialLastDigitOdd`                             |
| 4.5.3 | Refactoriser `button.ts` → `ButtonConditions`                       | ✅     | Conditions : `hasMoreThanOneBattery`, `hasMoreThanTwoBatteries`, `hasFrkLit` |
| 4.5.4 | Refactoriser `complicated-wires.ts` → `ComplicatedWiresConditions`  | ✅     | Conditions : `serialLastDigitEven`, `hasParallelPort`, `hasTwoOrMoreBatteries` |
| 4.5.5 | Mettre à jour les 3 solvers                                         | ✅     | Conditions affichées en haut de chaque solver                      |
| 4.5.6 | Supprimer `BombContext`, `BombInfoDialog`, `BombInfoForm`            | ✅     | Plus de state global                                               |

---

## Phase 5 — Polish & déploiement

| #   | Tâche                                                               | Statut | Notes                                               |
| --- | ------------------------------------------------------------------- | ------ | --------------------------------------------------- |
| 5.1 | Responsive mobile (utilisation sur téléphone pendant le jeu)        | ✅     | Priorité haute                                      |
| 5.2 | Animations et transitions                                           | ✅     |                                                     |
| 5.3 | Relecture clean code — taille fonctions/composants, styles Tailwind | ✅     |                                                     |
| 5.4 | Vérification accessibilité (contrastes, focus)                      | ✅     |                                                     |
| 5.5 | Déploiement (Vercel recommandé)                                     | ✅     |                                                     |
| 5.6 | Partager le lien avec les amis 🎉                                   | ✅     |                                                     |

---

## Phase 6 — Extensions futures (backlog)

> À prioriser selon les retours

| Module             | Priorité | Notes                                         |
| ------------------ | -------- | --------------------------------------------- |
| Simon Says         | ✅ Moyen | Logique dépendante du numéro de série         |
| Memory             | ✅ Moyen | Nécessite de mémoriser les étapes précédentes |
| Morse Code         | ⬜ Bas   |                                               |
| Who's on First     | ⬜ Bas   |                                               |
| Passwords          | ⬜ Bas   |                                               |
| Keypads (symboles) | ⬜ Bas   | Nécessite assets visuels pour les symboles    |

---

## Recette pour ajouter un nouveau module

> Suivre ces étapes dans l'ordre pour chaque nouveau module.

1. **Logique** — créer `src/lib/modules/{nom}.ts`
   - Définir un type `{Nom}Conditions` avec uniquement les infos de bombe nécessaires
   - Exporter une fonction `solve{Nom}(inputs, conditions: {Nom}Conditions): string | Decision`
   - Fonctions pures uniquement, pas d'effets de bord

2. **Composant solver** — créer `src/components/modules/{nom}/{Nom}Solver.tsx`
   - `useState` pour les inputs du module + un `useState` pour les conditions
   - Placer `<BombConditions>` **en premier** dans le JSX, avec uniquement les `visibleKeys` nécessaires
   - Bouton "Réinitialiser" qui remet à zéro inputs ET conditions

3. **Page** — créer `src/app/modules/{nom}/page.tsx`
   - Reprendre la structure des pages existantes (Header + PageHeader + Solver)

4. **Dashboard** — ajouter une entrée dans le tableau `MODULES` de `src/app/page.tsx`
   - `status: 'disponible'` quand prêt, `'en-developpement'` sinon

5. **Header** — ajouter le lien dans `MODULE_LINKS` de `src/components/layout/Header.tsx`

6. **Project tracker** — ajouter une phase dédiée et mettre à jour le statut global

---

## Conditions de bombe disponibles dans `BombConditions`

> Référence rapide pour savoir quelles conditions exposer dans un nouveau module.

| Clé (`visibleKeys`)      | Label affiché                              | Utilisé par              |
| ------------------------ | ------------------------------------------ | ------------------------ |
| `serialLastDigitOdd`     | Dernier chiffre du n° de série impair      | Fils simples             |
| `serialLastDigitEven`    | Dernier chiffre du n° de série pair        | Fils complexes           |
| `hasParallelPort`        | Port Parallel présent                      | Fils complexes           |
| `hasTwoOrMoreBatteries`  | ≥ 2 piles                                  | Fils complexes           |
| `hasMoreThanOneBattery`  | > 1 pile                                   | Bouton                   |
| `hasMoreThanTwoBatteries`| > 2 piles                                  | Bouton                   |
| `hasFrkLit`              | Indicateur FRK allumé                      | Bouton                   |

> Si un nouveau module nécessite une condition absente de cette liste, l'ajouter dans :
> - L'interface `BombConditions` dans `src/components/modules/shared/BombConditions.tsx`
> - Le tableau `ALL_CONDITIONS` du même fichier

---

## Journal des sessions

| Date       | Travail effectué                                                                          | Prochaine étape          |
| ---------- | ----------------------------------------------------------------------------------------- | ------------------------ |
| —          | Planification initiale, rédaction INSTRUCTIONS.md et project_tracker.md                  | Setup du projet (Phase 0) |
| —          | Phases 0→4 complétées : setup, layout, 3 modules fonctionnels                            | Phase 5 — Polish         |
| —          | Refactoring architecture : suppression BombContext, conditions locales par module         | Phase 5 — Polish         |
| —          | UX : conditions de bombe déplacées en haut de chaque solver                              | Phase 5 — Polish         |

---

## Décisions techniques

| Date | Décision                                              | Justification                                                                 |
| ---- | ----------------------------------------------------- | ----------------------------------------------------------------------------- |
| —    | App Router Next.js                                    | Standard actuel, meilleur support RSC                                         |
| —    | BombContext supprimé → conditions locales par module  | Plus ergonomique en jeu : chaque module n'expose que ce dont il a besoin      |
| —    | Pas d'i18n pour l'instant                             | Interface uniquement en français                                              |
| —    | Composant `BombConditions` partagé                    | Cohérence visuelle entre modules, ajout de nouvelles clés en un seul endroit  |
| —    | Conditions affichées en premier dans chaque solver    | On configure la bombe avant de faire les choix du module — plus naturel       |
| —    | Header converti en Client Component                   | Menu burger mobile nécessite useState                                         |

---

## ⚠ Pièges connus

- L'alias `@/*` pointe sur `src/*` (voir tsconfig.json). Tous les dossiers (components, lib, types) doivent être sous `src/`, jamais à la racine.
- Les imports de types doivent utiliser `@/types/modules` et non des chemins relatifs.
- Pour le module Bouton : "> 1 pile" et "> 2 piles" sont deux toggles indépendants. Si la bombe a 3 piles, cocher les deux.
- Ne pas oublier `{children}` dans `src/app/layout.tsx` — son absence rend la page entièrement vide.

---

## Bugs connus / Points de vigilance

_(aucun pour l'instant)_