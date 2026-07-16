# INVENTAIRE.md — Oportun iOS (reproduction Next.js)

> Basé sur l'analyse visuelle des 86 captures d'écran fournies (15 flows),
> extraites dans `design-refs/`. Chaque capture porte un bandeau de curation
> "Oportun · curated by Mobbin" en bas — c'est un habillage de l'outil Mobbin,
> **pas** une partie de l'app à reproduire, à ignorer partout.
>
> Statuts : ⬜ à faire / 🟡 en cours / ✅ validé

---

## 1. Liste des écrans identifiés

### Onboarding (14 captures)
| # | Écran | Statut |
|---|---|---|
| 0 | Splash (logo seul) | ⬜ |
| 1 | Écran d'accueil / value prop ("Reach for your goals effortlessly") | ⬜ |
| 2-3 | Saisie numéro de téléphone (vide → rempli) | ⬜ |
| 4-5 | Formulaire infos perso (prénom/nom/email + consentement) (vide → rempli) | ⬜ |
| 6-7 | Création mot de passe (vide → checklist de validation) | ⬜ |
| 8-10 | Code OTP (vide → partiellement rempli → soumission/loading) | ⬜ |
| 11 | Prompt Face ID | ⬜ |
| 12 | Prompt notifications (avec mockup iPhone) | ⬜ |
| 13 | Upsell "Set & Save" (paywall-like, 3 bénéfices) | ⬜ |

### Logging in (7 captures)
| # | Écran | Statut |
|---|---|---|
| 0 | Écran d'accueil (identique à Onboarding #1) | ⬜ |
| 1-2 | Formulaire login (vide → rempli, toggle Face ID) | ⬜ |
| 3-5 | Code OTP (vide → rempli → loading) | ⬜ |
| 6 | Home / dashboard (post-login) | ⬜ |

### Home (5 captures)
| # | Écran | Statut |
|---|---|---|
| 0 | Onglet "Set & Save" (vide) | ⬜ |
| 1 | Onglet "Home" (vide, $0.00) | ⬜ |
| 2 | Onglet "Home" (rempli, $3.00, tri par échéance) | ⬜ |
| 3-4 | Home scrollé — carte parrainage + "More from Oportun" + footer légal | ⬜ |

### Creating a goal (home) (12 captures)
| # | Écran | Statut |
|---|---|---|
| 0 | Home (point d'entrée) | ⬜ |
| 1 | Choix type de but ("Savings goal" / "Smart bill") | ⬜ |
| 2 | Choix catégorie de facture | ⬜ |
| 3 | Formulaire détails du but (vide) | ⬜ |
| 4-5 | Bottom sheet fréquence (non sélectionné → sélectionné) | ⬜ |
| 6-7 | Date picker natif iOS (roue Mois/Jour/Année) | ⬜ |
| 8 | Formulaire détails (rempli) | ⬜ |
| 9-10 | Écran de révision (résumé + "How we'll save") | ⬜ |
| 11 | Home + bandeau succès "goal created" | ⬜ |

### Goal detail (3 captures)
| # | Écran | Statut |
|---|---|---|
| 0 | Détail but simple ("Rainy Day", solde $0, transferts en attente) | ⬜ |
| 1-2 | Détail but récurrent "Smart bill" ("Cell phone", carte fréquence/montant/échéance + callout info) | ⬜ |

### Completing account setup (8 captures)
| # | Écran | Statut |
|---|---|---|
| 0 | Intro / paywall "Set & Save" | ⬜ |
| 1-2 | Connexion compte bancaire (Plaid) — avant/après connexion | ⬜ |
| 3-4 | Revue des accords (2 checkboxes, non coché → coché) | ⬜ |
| 5 | Écran de transition/chargement pédagogique | ⬜ |
| 6 | Confirmation création du 1er but ("Rainy Day") | ⬜ |
| 7 | Dashboard Set & Save (post-onboarding) | ⬜ |

### Transferring money (8 captures)
| # | Écran | Statut |
|---|---|---|
| 0 | Home (point d'entrée) | ⬜ |
| 1-2 | Sélection compte source/destination (vide → rempli) | ⬜ |
| 3-4 | Saisie montant (clavier numérique, $0 → $1) | ⬜ |
| 5 | Révision du transfert | ⬜ |
| 6 | Confirmation "Transfer submitted!" | ⬜ |
| 7 | Home mis à jour (soldes actualisés) | ⬜ |

### Set & save (3 captures)
| # | Écran | Statut |
|---|---|---|
| 0 | Dashboard Set & Save (état $0) | ⬜ |
| 1-2 | Scrollé — liste des buts + ligne "Low balance protection" (toggle) | ⬜ |

### Changing an email (6 captures)
| # | Écran | Statut |
|---|---|---|
| 0 | Contact info (point d'entrée) | ⬜ |
| 1-2 | Formulaire changement email (vide → rempli) | ⬜ |
| 3 | Écran "Verify your email" (lien envoyé) | ⬜ |
| 4 | Contact info + bandeau succès | ⬜ |
| 5 | Contact info (état stabilisé) | ⬜ |

### Connected account detail (4 captures)
| # | Écran | Statut |
|---|---|---|
| 0 | Home (contexte) | ⬜ |
| 1-2 | Détail compte connecté (variantes) | ⬜ |
| 3 | Historique des transactions (liste complète) | ⬜ |

### Editing an account name (4 captures)
| # | Écran | Statut |
|---|---|---|
| 0 | Détail compte (point d'entrée) | ⬜ |
| 1-2 | Édition du nom (2 comptes en exemple) | ⬜ |
| 3 | Détail compte (post-sauvegarde) | ⬜ |

### Removing an account (4 captures)
| # | Écran | Statut |
|---|---|---|
| 0 | Détail compte (point d'entrée) | ⬜ |
| 1 | Bottom sheet confirmation "Remove account?" | ⬜ |
| 2 | Liste comptes + bandeau succès "Account removed!" | ⬜ |
| 3 | Liste comptes (état vide) | ⬜ |

### Contact information (2 captures)
| # | Écran | Statut |
|---|---|---|
| 0 | Menu "Profile & settings" | ⬜ |
| 1 | Contact info (détail) | ⬜ |

### Subscription (3 captures)
| # | Écran | Statut |
|---|---|---|
| 0 | Écran abonnement (plan actuel + upsell annuel) | ⬜ |
| 1 | Scrollé — section confiance + support | ⬜ |
| 2 | Home (contexte carte parrainage) | ⬜ |

### Invite friends (3 captures)
| # | Écran | Statut |
|---|---|---|
| 0 | Home (point d'entrée) | ⬜ |
| 1 | Écran principal parrainage (stats + accordéons) | ⬜ |
| 2 | Scrollé — "How it works" déplié | ⬜ |

**Total : 15 flows, ~50 écrans uniques (hors doublons/états de contexte réutilisés), 86 captures.**

---

## 2. Composants récurrents

- **Bouton primaire** : pill noir plein, texte blanc gras, pleine largeur. État désactivé = gris clair.
- **Bouton secondaire** : fond blanc, bordure noire ~1.5px, texte noir gras, même forme pill.
- **Lien texte** : vert (couleur de marque), utilisé pour tous les liens inline (Change, Resend, Cancel, mentions légales, "help@oportun.com").
- **Champ de saisie** : rectangle arrondi, bordure gris clair, label flottant qui remonte au-dessus de la valeur une fois rempli, icône trailing optionnelle (œil pour mot de passe, "X" pour effacer).
- **Barre de navigation** : 3 variantes — (a) flèche retour + titre centré ; (b) flèche retour + lien "Cancel" vert (formulaires abandonnables) ; (c) icône "X" (modales/interstitiels plein écran).
- **OTP input** : 6 cases individuelles bordées, case active = bordure noire.
- **Checkbox** : carré arrondi, non coché = contour gris, coché = vert plein + coche blanche.
- **Toggle switch** : style iOS standard.
- **Ligne de liste (list row)** : icône circulaire (avatar/illustration) + titre gras + sous-titre gris optionnel + élément trailing (chevron, montant, badge), séparateur fin entre lignes. Réutilisée pour : buts d'épargne, comptes connectés, transactions, articles "More from Oportun".
- **Badge pill "NEW"** : fond bleu, texte blanc gras.
- **Carte (card)** : fond blanc, bordure fine gris clair, coins arrondis ~16px.
- **Bottom sheet / modale** : fond blanc, coins hauts arrondis, poignée grise centrée, dimming du fond ; utilisé pour sélecteurs (fréquence), confirmation (suppression de compte), révision.
- **Sélecteur de date natif iOS** : roue à 3 colonnes (Mois/Jour/Année), lien bleu "Confirm" (style natif, seul usage du bleu iOS natif hors design system app).
- **Clavier numérique** : boutons texte sans fond, grille 4x3, pour saisie de montant.
- **Bandeau succès (toast inline)** : bandeau noir pleine largeur, icône coche blanche + texte blanc, pousse le contenu (pas de flottant/overlay).
- **Onglet du bas (bottom tab bar)** : 2 onglets visibles "Home" / "Set & Save", actif = icône pleine + label gras noir, inactif = icône outline + gris.
- **Icône de catégorie/but** : cercle contouré contenant une illustration plate 2-3 couleurs (parapluie, nuage-éclair, téléphone, maison, ampoule, voiture, tirelire...).
- **Accordéon** : label gras + bouton chevron circulaire (bas = replié, haut = déplié).

### Constat important — pas de rouge destructif
Le flow "Removing an account" n'utilise **aucune couleur rouge** : la modale de confirmation, le texte d'avertissement et le bouton de confirmation reprennent le noir/blanc/gris standard de l'app. Si le design system Figma définit un token rouge destructif, vérifier s'il s'applique ailleurs — ces captures n'en montrent aucun usage.

---

## 3. États visibles (par écran)

Voir tableaux ci-dessus par flow — la majorité des écrans à formulaire montre au moins 2 états : **vide/désactivé** puis **rempli/activé**. Écrans avec bouton "Submit"/OTP montrent en plus un état **loading** (spinner blanc centré). Les flows de suppression/mise à jour montrent un état **succès** (bandeau noir + coche). Le flow de suppression de compte montre en plus l'état **vide** (liste de comptes réduite à "Add account").

---

## 4. Visuels à traiter

### Logo
- Wordmark "Oportun" (minuscule, noir, point vert sur le "O") — écran splash.
- Icône de marque circulaire ("O" + point vert) — utilisée en petit dans les notifications.
- → à recadrer proprement depuis la capture la plus nette, **ne pas régénérer**. Sera listé dans `ASSETS-A-REMPLACER.md`.

### Icônes (à identifier pack d'origine / recréer en SVG)
Chevron, flèche retour, croix de fermeture, œil (mdp), corbeille/suppression, engrenage (réglages), profil (silhouette), cloche, "+" cercle pointillé, chevrons haut/bas (accordéon), icône Face ID, icône info "i", bouclier-coche (low balance protection), point d'interrogation (aide).

### Illustrations (flat, palette pastel : lavande, vert menthe, bleu ciel, corail/saumon)
- Illustration héro "Reach for your goals" (femme + chat + vignettes circulaires : voiture, sac, café, valise).
- Icône fleur-pièce (motif Set & Save, fond pêche).
- Illustration écran transition/pédagogique (2 personnages, calculatrice, graphique, jauge — fond vert pâle).
- Illustration parrainage (2 personnages + accents décoratifs).
- Illustration héro "Invite friends" (5-6 personnages + call-outs).
- Petites icônes de features (Subscription) : tirelire, document $, banque, cadenas, pot+pièce, main+téléphone.
- Petites icônes articles "More from Oportun" (jauge crédit, tirelire, "ñ" violet).
- Icône succès transfert (feuille/sparkle vert, pas une coche générique).
- Logo tiers **Bank of America** (mark rouge/bleu) et badges **BBB A+**, **Bankrate** — marques tierces réelles, à conserver identiques ou signaler pour remplacement selon droits d'usage.

Tout élément listé ci-dessus qui nécessite une génération IA (illustrations) sera soumis à validation groupée (prompts détaillés) avant génération, conformément à l'Étape 3 du prompt.

---

## Prochaine étape

En attente de validation de cet inventaire avant de démarrer l'Étape 2
(extraction du design system : couleurs exactes, police, échelle d'espacements).
