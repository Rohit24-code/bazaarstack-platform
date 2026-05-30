<!-- DAY 1 -->

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



🛠️ Unified Configuration Manifests1. Root Orchestrator Manifest (/package.json)Acts purely as an environment and workspace traffic controller. It carries no UI or network logic.JSON{
"name": "bazaarstack-platform",
"private": true,
"packageManager": "pnpm@10.33.0",
"engines": {
"node": ">=18.0.0"
},
"devDependencies": {
"turbo": "^2.4.0"
}
}
"private": true: Essential security shield that prevents accidental publication of proprietary database routes or schema models to the public internet.packageManager: Locks down environmental dependency uniformity across both developer laptops and CI/CD build environments.2. The Linkage Directive (/pnpm-workspace.yaml)Tells pnpm exactly which paths to track and mesh together via ultra-lightweight symbolic links.YAMLpackages:

- "apps/\*"
- "packages/\*"

3. Pipeline Configuration (/turbo.json)Orchestrates parallel script execution and enforces downstream building order.JSON{
   "$schema": "[https://turbo.build/schema.json](https://turbo.build/schema.json)",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {}
  }
}
"^build": The topological caret indicator tells the compiler: if an application depends on @ecom/ui-core, build that UI package source completely first before starting to bundle the app."cache": false: Disables local server caching for development, guaranteeing that UI modifications inside your text editor instantly apply in your browser window instead of replaying stored snapshots.4. Local Package Path Mapper (/packages/ui-core/tsconfig.json)Configures the @/* path alias rule strictly inside the local package boundaries so relative lookups parse automatically within the bounds of ui-core.JSON{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "paths": {
      "@/*": ["./src/*"]
    },
    "skipLibCheck": true,
    "strict": true,
    "jsx": "react-jsx"
  },
  "include": ["src/**/*"]
}
Modern Note: In modern versions of TypeScript, "baseUrl" is deprecated for path aliasing when using "moduleResolution": "NodeNext". Mappings parse smoothly straight from relative targets.🔮 The Core Radix Naming FormulaBecause we bypassed the standard all-in-one "radix-ui" meta-package wrapper to optimize customer bundle sizes and enable strict tree-shaking, use this formula to decode and pull matching atomic dependencies from npm:$$\text{Target npm ID} = \text{"@radix-ui/react-"} + \text{kebab-case-component-name}$$Dialog Primitives $\rightarrow$ @radix-ui/react-dialog Alert Dialog Primitives $\rightarrow$ @radix-ui/react-alert-dialog Hover Card Primitives $\rightarrow$ @radix-ui/react-hover-card 🚀 Everyday Monorepo Command Cheat SheetNever cd into sub-folders to run local installations—this fractures the monorepo matrix and generates conflicting lockfiles. Run every command directly from the absolute repository root directory using targeted filters:1. Scoped Dependency InjectionAdd a third-party module specifically to an isolated workspace package:Bashpnpm --filter @ecom/ui-core add @radix-ui/react-dialog
4. Injecting Dev-Type DefinitionsAdd development-time TypeScript declaration dictionaries exclusively inside the package scope:Bashpnpm --filter @ecom/ui-core add -D @types/react @types/react-dom
5. Isolated Task ActivationBoot up only one specific app layout (like working solely on the Admin Dashboard today):Bashpnpm --filter admin-dashboard dev
6. Master Sync Re-IndexSynchronize global file trees, link workspace components, and lock fresh version targets into your root snapshot:Bashpnpm install
   🧠 VS Code Memory Flush FixIf you write or rewrite path aliasing strings, convert components from radix-ui to atomic packages, or update types, your text editor's background index thread can occasionally display outdated red errors. Flush it cleanly with these keystrokes:Click into any .ts or .tsx file inside your active window.Press Ctrl + Shift + P (or Cmd + Shift + P on Mac).Type: TypeScript: Restart TS Server and hit Enter.📈 The Interview Narrative PitchWhen an interviewer views your monorepo repository and asks: "Explain your layout choices and architecture strategy for this e-commerce project," deliver this high-signal answer:_"When structuring the platform architecture for BazaarStack, I consciously avoided a traditional mixed monolith where customer storefront views and administrative dashboard modules are bound together under a single deployment target. Doing so introduces a dangerous blast radius where a heavy analytical processing error on the admin panel could compromise customer checkout conversions.To decouple our operational risk, I federated the architecture into distinct runtime applications managed by a single Turborepo and pnpm workspaces environment. To maximize layout synchronization across our public shop and back-office management grids without maintaining duplicate code, I extracted our presentational primitives—like shared buttons, input fields, and dialog structures—into an internal private component library package called @ecom/ui-core.Both applications inherit these tokens natively via zero-overhead local workspace links. This guarantees full design continuity, enforces strict boundary isolation, and maintains exceptionally fast compile pipelines via parallel task-caching directly down our deployment chains."_
```
