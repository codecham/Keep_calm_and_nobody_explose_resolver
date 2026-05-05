# KTANE Solver — Project Tracker

## Statut global : 🔵 En cours de planification

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
| 0.3 | Créer la structure de dossiers du projet                          | ✅     | Voir INSTRUCTIONS.md                             |
| 0.4 | Créer le `BombContext` (infos globales de la bombe)               | ✅     | Numéro de série, piles, indicateurs, ports       |
| 0.5 | Créer les types partagés (`types/modules.ts`)                     | ✅     |                                                  |
| 0.6 | Configurer `cn()` (clsx + tailwind-merge) et vérifier dispo `cva` | ✅     | Obligatoire pour la gestion des classes Tailwind |
| 0.7 | Mettre en place le repo GitHub                                    | ✅     |                                                  |

---

## Phase 1 — Layout & Dashboard

| #   | Tâche                                        | Statut | Notes                           |
| --- | -------------------------------------------- | ------ | ------------------------------- |
| 1.1 | Créer le layout principal (`app/layout.tsx`) | ✅     | Header, fond sombre, police     |
| 1.2 | Créer le composant `Header.tsx`              | ✅     | Titre, accès rapide aux modules |
| 1.3 | Créer le composant `ModuleCard.tsx`          | ✅     | Nom, icône, statut              |
| 1.4 | Créer la page dashboard (`app/page.tsx`)     | ✅     | Grille de ModuleCards           |
| 1.5 | Modale / panneau "Infos de la bombe"         | ✅     | Alimenter le BombContext        |

---

## Phase 2 — Module : Wires (fils simples)

| #   | Tâche                                         | Statut | Notes                                         |
| --- | --------------------------------------------- | ------ | --------------------------------------------- |
| 2.1 | Implémenter la logique `lib/modules/wires.ts` | ⬜     | Règles du manuel officiel                     |
| 2.2 | Créer le composant `WiresSolver.tsx`          | ⬜     | Sélection des couleurs, affichage du résultat |
| 2.3 | Créer la page `app/modules/wires/page.tsx`    | ⬜     |                                               |
| 2.4 | Tests manuels de toutes les combinaisons      | ⬜     |                                               |

---

## Phase 3 — Module : Button (bouton)

| #   | Tâche                                          | Statut | Notes                                           |
| --- | ---------------------------------------------- | ------ | ----------------------------------------------- |
| 3.1 | Implémenter la logique `lib/modules/button.ts` | ⬜     | Incl. règle de relâchement avec DEL             |
| 3.2 | Créer le composant `ButtonSolver.tsx`          | ⬜     | Sélection couleur + label, gestion hold/release |
| 3.3 | Créer la page `app/modules/button/page.tsx`    | ⬜     |                                                 |
| 3.4 | Tests manuels de toutes les combinaisons       | ⬜     |                                                 |

---

## Phase 4 — Module : Complicated Wires

| #   | Tâche                                                     | Statut | Notes                                                     |
| --- | --------------------------------------------------------- | ------ | --------------------------------------------------------- |
| 4.1 | Implémenter la logique `lib/modules/complicated-wires.ts` | ⬜     | Table de décision avec LED/étoile/couleur                 |
| 4.2 | Créer le composant `ComplicatedWiresSolver.tsx`           | ⬜     | Interface pour chaque fil, affichage couper/ne pas couper |
| 4.3 | Créer la page `app/modules/complicated-wires/page.tsx`    | ⬜     |                                                           |
| 4.4 | Tests manuels de toutes les combinaisons                  | ⬜     |                                                           |

---

## Phase 5 — Polish & déploiement

| #   | Tâche                                                               | Statut | Notes                                               |
| --- | ------------------------------------------------------------------- | ------ | --------------------------------------------------- |
| 5.1 | Responsive mobile (utilisation sur téléphone pendant le jeu)        | ⬜     | Priorité haute                                      |
| 5.2 | Animations et transitions                                           | ⬜     |                                                     |
| 5.3 | Relecture clean code — taille fonctions/composants, styles Tailwind | ⬜     | Vérifier le respect des conventions INSTRUCTIONS.md |
| 5.4 | Vérification accessibilité (contrastes, focus)                      | ⬜     |                                                     |
| 5.5 | Déploiement (Vercel recommandé)                                     | ⬜     |                                                     |
| 5.6 | Partager le lien avec les amis 🎉                                   | ⬜     |                                                     |

---

## Phase 6 — Extensions futures (backlog)

> À prioriser selon les retours

| Module             | Priorité | Notes                                         |
| ------------------ | -------- | --------------------------------------------- |
| Simon Says         | ⬜ Moyen | Logique dépendante du numéro de série         |
| Memory             | ⬜ Moyen | Nécessite de mémoriser les étapes précédentes |
| Morse Code         | ⬜ Bas   |                                               |
| Who's on First     | ⬜ Bas   |                                               |
| Passwords          | ⬜ Bas   |                                               |
| Keypads (symboles) | ⬜ Bas   | Nécessite assets visuels pour les symboles    |

---

## Journal des sessions

> Ajouter une entrée à chaque session de travail

| Date | Travail effectué                                                        | Prochaine étape                   |
| ---- | ----------------------------------------------------------------------- | --------------------------------- |
| —    | Planification initiale, rédaction INSTRUCTIONS.md et project_tracker.md | Setup du projet Next.js (Phase 0) |

---

## Décisions techniques

> Garder une trace des choix importants et leur justification

| Date | Décision                       | Justification                               |
| ---- | ------------------------------ | ------------------------------------------- |
| —    | App Router Next.js             | Standard actuel, meilleur support RSC       |
| —    | BombContext plutôt que Zustand | Scope simple, pas besoin d'un store externe |
| —    | Pas d'i18n pour l'instant      | Interface uniquement en français            |

---

## Bugs connus / Points de vigilance

> À compléter au fur et à mesure

_(aucun pour l'instant)_
