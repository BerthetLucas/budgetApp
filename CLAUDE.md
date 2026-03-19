# Claude Instructions — BudgetApp

## Stack

Next.js 15 (App Router), TypeScript, Tailwind CSS, React 19.

## Skills à appliquer automatiquement

### vercel-react-best-practices

Applique les règles de `.claude/agents/vercel-react-best-practices/` **à chaque fois** que tu :

- Écris ou modifies un composant React
- Crées ou modifies une page Next.js
- Impléments du data fetching (client ou server)
- Refactorises du code React/Next.js

Consulte les fichiers `rules/` correspondants avant de générer du code.

### vercel-composition-patterns

Applique les règles de `.claude/agents/vercel-composition-patterns/` quand tu :

- Crées un nouveau composant
- Refactorises un composant existant
- Conçois une API de composant (props, variants, composition)

### web-design-guidelines

Applique `.claude/agents/web-design-guidelines/` quand l'utilisateur demande :

- Une review UI / UX
- Un audit accessibilité
- Une vérification des bonnes pratiques design

### deploy-to-vercel

Utilise `.claude/agents/deploy-to-vercel/` quand l'utilisateur demande de déployer l'application.

## Règles générales

- Toujours écrire du TypeScript strict, jamais de `any`.
- Préférer les Server Components par défaut, `"use client"` uniquement si nécessaire.
- Ne pas créer de fichiers inutiles — éditer l'existant en priorité.
- Réponses courtes et directes.
