# 🛍️ BazaarStack Platform: Infrastructure & Architecture Revision Guide

[cite_start]This guide condenses the core system design choices, terminal commands, and structural mechanics utilized during the migration from a single-project monolith to an enterprise-grade federated monorepo[cite: 2621]. [cite_start]Use this file as a cheat-sheet for technical interviews and rapid workspace syntax reference[cite: 2622].

---

## 🏗️ Architectural Core Concepts

[cite_start]When defending a monorepo setup during a technical review, use these architectural justifications[cite: 2623]:

| Workspace Strategy                                                      | System Design "Why"                                                                                                                                                                                                                                                             |
| :---------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [cite_start]**Monorepo Split (`apps/` vs `packages/`)** [cite: 2625]    | [cite_start]**Domain & Privilege Separation:** Isolates public customer storefront performance from internal administrative operations[cite: 2626]. [cite_start]An administrative data pipeline or chart script crash can never bring down customer checkout flows[cite: 2627]. |
| [cite_start]**Private Component Box (`@ecom/ui-core`)** [cite: 2628]    | [cite_start]**Zero Code Duplication:** Allows distinct runtimes to share presentational UI elements natively through local memory linking hooks without publishing code to public npm registry channels[cite: 2628].                                                            |
| [cite_start]**Topological Task Scheduling (`turbo.json`)** [cite: 2629] | [cite_start]**Upstream Compile Boundaries:** Forces shared dependencies to safely compile in order before consumer applications execute a build (`dependsOn`), maximizing compilation safety[cite: 2630].                                                                       |

---

## 📁 Workspace Blueprint Map

[cite_start]This is the directory tree configuration establishing clean boundaries between separate execution domains:

```text
bazaarstack-platform/
├── apps/                        # Executable, independent runtimes
│   ├── store-client/            # Customer storefront website (React 19 + Vite)
│   └── admin-dashboard/         # Business metrics panel (React 19 + Vite)
├── packages/                    # Shared internal helper modules
│   └── ui-core/                 # Isolated design primitive box
│       ├── tsconfig.json        # Scoped path alias settings (@/* map)
│       ├── package.json         # Component library atomic receipt mapping
│       └── src/
│           ├── index.ts         # Public interface barrel file
│           ├── lib/utils.ts     # Shadcn Tailwind style class merger
│           └── components/ui/   # Unbundled raw presentational components
├── turbo.json                   # Pipeline task automation configuration
├── pnpm-workspace.yaml          # Multi-project link mapping array
└── package.json                 # Core traffic controller configuration
```
