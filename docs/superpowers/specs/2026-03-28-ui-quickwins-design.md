# UI Quick Wins — Design Spec

**Date:** 2026-03-28
**Scope:** Visuel pur — pas de changements UX/interaction
**Cible:** Mobile + Desktop

---

## 1. Bugs Dark Mode

### 1a. Pills revenus/dépenses (DashboardSummary + BudgetSummaryCard)

**Problème :** Les sous-cards revenus/dépenses utilisent des couleurs hardcodées en light-only :
- `bg-emerald-50 text-emerald-500 / text-emerald-600`
- `bg-red-50 text-red-400 / text-red-500`

Sur fond de card dark (`oklch(0.2455 0.0217 257.2823)`), ces couleurs ultra-claires sont abruptes.

**Fix :** Remplacer par des couleurs adaptatives avec opacité :
- Revenus : `bg-emerald-500/10 text-emerald-500`
- Dépenses : `bg-red-500/10 text-red-500`

Fonctionne en light et dark sans classes `dark:`.

**Fichiers concernés :**
- `src/components/dashboard/dashboard-summary.tsx`
- `src/components/budget/budget-summary-card.tsx`

---

### 1b. Hard shadows avec couleur hardcodée

**Problème :** Toutes les hard shadows utilisent `#191d17` hardcodé dans les classes Tailwind (`shadow-[4px_4px_0_0_#191d17]`, `shadow-[3px_3px_0_0_#191d17]`, etc.). En dark mode (fond noir), cette couleur quasi-noire disparaît.

**Fix :** Introduire une CSS variable `--shadow-hard` dans `globals.css` :
- Light : `oklch(0.1 0 0)` (quasi noir)
- Dark : `oklch(0.65 0 0)` (gris moyen visible sur fond noir)

Remplacer toutes les occurrences hardcodées par `var(--shadow-hard)` via des classes arbitraires Tailwind.

**Fichiers concernés :**
- `src/app/globals.css`
- `src/components/dashboard/dashboard-summary.tsx`
- `src/components/transaction-list/transaction-group.tsx`
- `src/components/budget/budget-summary-card.tsx`
- `src/components/drawer/add-transaction-drawer.tsx`
- Autres composants avec `#191d17` (à vérifier avec grep)

---

## 2. Polish Composants

### 2a. Dates relatives dans TransactionGroup

**Problème :** Les dates affichent toujours le format long ("lundi 28 mars 2025"), même pour aujourd'hui ou hier.

**Fix :** Ajouter une logique de label relatif dans `transaction-group.tsx` :
- Si la date = aujourd'hui → "Aujourd'hui"
- Si la date = hier → "Hier"
- Sinon → format actuel ("lundi 28 mars")

**Fichier concerné :**
- `src/components/transaction-list/transaction-group.tsx`

---

### 2b. Progress bar dynamique dans BudgetSummaryCard

**Problème :** La barre de progression est toujours `bg-primary` (violet), peu importe le niveau de dépense.

**Fix :** Couleur contextuelle selon `spentPercent` :
- `< 70%` → `bg-emerald-500`
- `70–90%` → `bg-amber-500`
- `> 90%` → `bg-red-500`

Transition CSS conservée (`transition-all duration-500`).

**Fichier concerné :**
- `src/components/budget/budget-summary-card.tsx`

---

### 2c. Header PageShell plus affirmé

**Problème :** Le label uppercase et le titre h1 ont un contraste visuel faible entre eux. Le titre `text-2xl` est un peu petit pour un header de page.

**Fix :**
- Titre : `text-2xl` → `text-3xl`
- Label : passer de `text-muted-foreground` à `text-primary`

**Fichier concerné :**
- `src/components/page-shell.tsx`

---

## Résumé des fichiers à modifier

| Fichier | Changements |
|---|---|
| `src/app/globals.css` | Ajouter `--shadow-hard` en light + dark |
| `src/components/page-shell.tsx` | Titre `text-3xl`, label `text-primary` |
| `src/components/dashboard/dashboard-summary.tsx` | Pills adaptatives, shadow variable |
| `src/components/budget/budget-summary-card.tsx` | Pills adaptatives, shadow variable, progress dynamique |
| `src/components/transaction-list/transaction-group.tsx` | Dates relatives, shadow variable |
| `src/components/drawer/add-transaction-drawer.tsx` | Shadow variable |
| Autres composants avec `#191d17` | Shadow variable |
