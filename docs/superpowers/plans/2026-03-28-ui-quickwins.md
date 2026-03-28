# UI Quick Wins Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corriger les bugs dark mode et polisher les composants visuels clés à travers toute l'app.

**Architecture:** Changements purement visuels — CSS variables, classes Tailwind, logique de rendu conditionnelle. Aucune modification de data fetching, actions ou routing.

**Tech Stack:** Next.js 15, Tailwind CSS v4, React 19, motion/react

---

## File Map

| Fichier | Changement |
|---|---|
| `src/app/globals.css` | Ajouter `--shadow-hard` light + dark |
| `src/components/page-shell.tsx` | Titre `text-3xl`, label `text-primary` |
| `src/components/dashboard/dashboard-summary.tsx` | Pills adaptatives + `var(--shadow-hard)` |
| `src/components/budget/budget-summary-card.tsx` | Pills adaptatives + progress dynamique + `var(--shadow-hard)` |
| `src/components/budget/budget-metric-card.tsx` | `var(--shadow-hard)` |
| `src/components/budget/budget-progress.tsx` | `var(--shadow-hard)` |
| `src/components/transaction-list/transaction-group.tsx` | Dates relatives + `var(--shadow-hard)` |
| `src/components/stats/category-breakdown.tsx` | `var(--shadow-hard)` |
| `src/components/expenses-chart.tsx` | `var(--shadow-hard)` |
| `src/components/drawer/add-transaction-drawer.tsx` | `var(--shadow-hard)` |
| `src/components/settings/add-recurring-drawer.tsx` | `var(--shadow-hard)` |
| `src/components/settings/manage-categories-drawer.tsx` | `var(--shadow-hard)` |
| `src/components/ui/input.tsx` | `border-border` |
| `src/app/auth/layout.tsx` | `var(--shadow-hard)` |

---

## Task 1: CSS variable `--shadow-hard`

**Fichier:** `src/app/globals.css`

- [ ] **Étape 1 : Ajouter la variable dans `:root` (mode light)**

Dans le bloc `:root`, après `--shadow-color: #1a1a1a;`, ajouter :

```css
--shadow-hard: oklch(0.1 0 0);
```

- [ ] **Étape 2 : Ajouter la variable dans `.dark` (mode dark)**

Dans le bloc `.dark`, après `--shadow-color: #1a1a1a;`, ajouter :

```css
--shadow-hard: oklch(0.65 0 0);
```

- [ ] **Étape 3 : Vérifier dans le navigateur**

Ouvrir le dev server. En light mode : les shadows des cards doivent être noires comme avant. Passer en dark mode : les shadows doivent être grises et visibles (avant elles disparaissaient).

- [ ] **Étape 4 : Commit**

```bash
git add src/app/globals.css
git commit -m "style: add --shadow-hard adaptive CSS variable"
```

---

## Task 2: Remplacer `#191d17` — cards principales

**Fichiers :** `dashboard-summary.tsx`, `budget-summary-card.tsx`, `budget-metric-card.tsx`, `budget-progress.tsx`, `auth/layout.tsx`, `expenses-chart.tsx`

Pattern à remplacer dans chaque fichier :
- `border-[#191d17]` → `border-border`
- `shadow-[4px_4px_0_0_#191d17]` → `shadow-[4px_4px_0_0_var(--shadow-hard)]`

- [ ] **Étape 1 : `src/components/dashboard/dashboard-summary.tsx` ligne 27**

```tsx
className="bg-card text-foreground mb-4 rounded-2xl border border-border p-6 shadow-[4px_4px_0_0_var(--shadow-hard)]"
```

- [ ] **Étape 2 : `src/components/budget/budget-summary-card.tsx` ligne 25**

```tsx
className="bg-card text-foreground rounded-2xl border border-border p-6 shadow-[4px_4px_0_0_var(--shadow-hard)]"
```

- [ ] **Étape 3 : `src/components/budget/budget-metric-card.tsx` ligne 23**

```tsx
className="bg-card rounded-2xl border border-border p-5 shadow-[4px_4px_0_0_var(--shadow-hard)]"
```

- [ ] **Étape 4 : `src/components/budget/budget-progress.tsx` ligne 15**

```tsx
className="bg-card rounded-2xl border border-border p-5 shadow-[4px_4px_0_0_var(--shadow-hard)]"
```

- [ ] **Étape 5 : `src/app/auth/layout.tsx` ligne 23**

```tsx
<div className="bg-card w-full max-w-sm rounded-2xl border border-border p-8 shadow-[4px_4px_0_0_var(--shadow-hard)]">
```

- [ ] **Étape 6 : `src/components/expenses-chart.tsx` ligne 64**

Remplacer la className de la div container du chart :
```tsx
<div className="relative rounded-2xl border border-border bg-card shadow-[4px_4px_0_0_var(--shadow-hard)]">
```

- [ ] **Étape 7 : Commit**

```bash
git add src/components/dashboard/dashboard-summary.tsx src/components/budget/budget-summary-card.tsx src/components/budget/budget-metric-card.tsx src/components/budget/budget-progress.tsx src/app/auth/layout.tsx src/components/expenses-chart.tsx
git commit -m "style: replace hardcoded shadow color on cards with CSS variable"
```

---

## Task 3: Remplacer `#191d17` — listes, drawers, input

**Fichiers :** `transaction-group.tsx`, `category-breakdown.tsx`, `add-transaction-drawer.tsx`, `add-recurring-drawer.tsx`, `manage-categories-drawer.tsx`, `input.tsx`

Pattern à remplacer :
- `border-[#191d17]` → `border-border`
- `shadow-[3px_3px_0_0_#191d17]` → `shadow-[3px_3px_0_0_var(--shadow-hard)]`
- `shadow-[2px_2px_0_0_#191d17]` → `shadow-[2px_2px_0_0_var(--shadow-hard)]`

- [ ] **Étape 1 : `src/components/transaction-list/transaction-group.tsx` ligne 26**

```tsx
<div className="bg-card overflow-hidden rounded-2xl border border-border shadow-[3px_3px_0_0_var(--shadow-hard)]">
```

- [ ] **Étape 2 : `src/components/stats/category-breakdown.tsx` ligne 21**

```tsx
<div className="bg-card overflow-hidden rounded-2xl border border-border shadow-[3px_3px_0_0_var(--shadow-hard)]">
```

- [ ] **Étape 3 : `src/components/drawer/add-transaction-drawer.tsx` ligne 36**

```tsx
<Button variant="outline" size="icon" className="h-8 w-8 border-border shadow-[2px_2px_0_0_var(--shadow-hard)]">
```

- [ ] **Étape 4 : `src/components/settings/add-recurring-drawer.tsx` ligne 36**

```tsx
<Button variant="outline" size="icon" className="h-8 w-8 border-border shadow-[2px_2px_0_0_var(--shadow-hard)]">
```

- [ ] **Étape 5 : `src/components/settings/manage-categories-drawer.tsx` ligne 65**

```tsx
<Button variant="outline" size="icon" className="h-8 w-8 border-border shadow-[2px_2px_0_0_var(--shadow-hard)]">
```

- [ ] **Étape 6 : `src/components/ui/input.tsx` ligne 12**

Remplacer `border-[#191d17]` par `border-border` dans la className (le reste de la classe reste identique) :

```tsx
"h-11 w-full min-w-0 rounded-xl border border-border bg-transparent px-4 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
```

- [ ] **Étape 7 : Commit**

```bash
git add src/components/transaction-list/transaction-group.tsx src/components/stats/category-breakdown.tsx src/components/drawer/add-transaction-drawer.tsx src/components/settings/add-recurring-drawer.tsx src/components/settings/manage-categories-drawer.tsx src/components/ui/input.tsx
git commit -m "style: replace hardcoded shadow color on lists and inputs with CSS variable"
```

---

## Task 4: Fix dark mode pills revenus/dépenses

**Fichiers :** `dashboard-summary.tsx`, `budget-summary-card.tsx`

Dans les deux fichiers, les deux pills partagent le même pattern. Remplacer les blocs `div` income et expense.

- [ ] **Étape 1 : `src/components/dashboard/dashboard-summary.tsx` — pills**

Remplacer le bloc `<div className="flex gap-4">` et son contenu :

```tsx
<div className="flex gap-4">
  <div className="flex-1 rounded-2xl bg-emerald-500/10 px-4 py-3">
    <p className="mb-0.5 text-xs text-emerald-500">Revenus</p>
    <p className="text-sm font-bold text-emerald-500">
      +{formatCurrency(totalIncome)} €
    </p>
  </div>
  <div className="flex-1 rounded-2xl bg-red-500/10 px-4 py-3">
    <p className="mb-0.5 text-xs text-red-500">Dépenses</p>
    <p className="text-sm font-bold text-red-500">
      -{formatCurrency(totalExpenses)} €
    </p>
  </div>
</div>
```

- [ ] **Étape 2 : `src/components/budget/budget-summary-card.tsx` — pills**

Remplacer le bloc `<div className="flex gap-4">` et son contenu (même pattern) :

```tsx
<div className="flex gap-4">
  <div className="flex-1 rounded-2xl bg-emerald-500/10 px-4 py-3">
    <p className="mb-0.5 text-xs text-emerald-500">Revenus</p>
    <p className="text-sm font-bold text-emerald-500">
      +{formatCurrency(totalIncome)} €
    </p>
  </div>
  <div className="flex-1 rounded-2xl bg-red-500/10 px-4 py-3">
    <p className="mb-0.5 text-xs text-red-500">Dépenses</p>
    <p className="text-sm font-bold text-red-500">
      -{formatCurrency(totalExpenses)} €
    </p>
  </div>
</div>
```

- [ ] **Étape 3 : Vérifier en dark mode**

Passer en dark mode dans le navigateur. Les pills doivent avoir un fond semi-transparent vert/rouge lisible sur fond dark. En light mode, elles doivent rester lisibles également.

- [ ] **Étape 4 : Commit**

```bash
git add src/components/dashboard/dashboard-summary.tsx src/components/budget/budget-summary-card.tsx
git commit -m "style: fix income/expense pills in dark mode with adaptive colors"
```

---

## Task 5: Progress bar dynamique dans BudgetSummaryCard

**Fichier :** `src/components/budget/budget-summary-card.tsx`

- [ ] **Étape 1 : Ajouter la logique de couleur**

Après le calcul de `spentPercent`, ajouter :

```tsx
const progressColor =
  spentPercent >= 90 ? "bg-red-500" :
  spentPercent >= 70 ? "bg-amber-500" :
  "bg-emerald-500";
```

- [ ] **Étape 2 : Utiliser `progressColor` dans la barre**

Remplacer la div de la barre de progress (actuellement `className="bg-primary h-full rounded-full transition-all duration-500"`) :

```tsx
<div
  className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
  style={{ width: `${spentPercent}%` }}
/>
```

- [ ] **Étape 3 : Vérifier**

Tester avec différents niveaux de dépenses (nécessite des données de test). La barre doit être :
- Verte si < 70% dépensé
- Orange si 70–90%
- Rouge si > 90%

- [ ] **Étape 4 : Commit**

```bash
git add src/components/budget/budget-summary-card.tsx
git commit -m "style: dynamic progress bar color based on spending percentage"
```

---

## Task 6: Dates relatives dans TransactionGroup

**Fichier :** `src/components/transaction-list/transaction-group.tsx`

- [ ] **Étape 1 : Remplacer la logique du label de date**

Remplacer le bloc existant :

```ts
const label = new Date(date + "T00:00:00").toLocaleDateString("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
});
```

Par :

```ts
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const fmt = (d: Date) => d.toISOString().split("T")[0];
const label =
  date === fmt(today)
    ? "Aujourd'hui"
    : date === fmt(yesterday)
    ? "Hier"
    : new Date(date + "T00:00:00").toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
```

- [ ] **Étape 2 : Vérifier**

Les groupes du jour courant doivent afficher "Aujourd'hui", ceux d'hier "Hier", et les plus anciens la date longue habituelle.

- [ ] **Étape 3 : Commit**

```bash
git add src/components/transaction-list/transaction-group.tsx
git commit -m "style: show relative date labels (Aujourd'hui / Hier) in transaction groups"
```

---

## Task 7: Header PageShell plus affirmé

**Fichier :** `src/components/page-shell.tsx`

- [ ] **Étape 1 : Modifier le label et le titre**

Remplacer le bloc header :

```tsx
<div>
  <p className="text-primary mb-1 text-xs font-medium tracking-widest uppercase">
    {label}
  </p>
  <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
</div>
```

- [ ] **Étape 2 : Vérifier sur toutes les pages**

Naviguer sur Dashboard, Stats, Budget, Settings. Le titre doit être légèrement plus grand et le label doit être en couleur `primary` (violet en light, violet clair en dark).

- [ ] **Étape 3 : Commit**

```bash
git add src/components/page-shell.tsx
git commit -m "style: increase page title size and use primary color for page label"
```
