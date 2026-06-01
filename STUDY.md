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

<!-- DAY 2 -->

1. The Big Picture: What We Built
   Instead of a standard "monolith" (where everything is thrown into one single app folder), you built a Federated Monorepo Architecture.

apps/store-client: The actual web store frontend app (built with Vite). It consumes your shared code.

packages/ui-core: A shared local workspace package containing all your reusable visual Shadcn components.

packages/api-client: A shared local workspace package holding your central Axios network orchestration layers.

pnpm Workspaces: The management system that tells your computer these folders belong to the same project.

2. The Errors We Defeated & What They Mean
   Let's look at the timeline of your errors. Every single one was a logical side effect of these systems trying to communicate for the first time.

🚨 Error 1: Missing TypeScript Types inside ui-core
“Could not find a declaration file for module 'react'...”

Why it happened: Your main app (store-client) knew what React was, but your newly created local packages/ui-core folder was completely blank. TypeScript looked inside it and said, "Hey, you gave me React components here, but this folder doesn't have the React dictionary files to prove what types of data are allowed."

How we solved it: We used pnpm --filter @ecom/ui-core add -D @types/react @types/react-dom. The --filter tag is a crucial keyword—it allowed us to stay at the root folder but inject the type definitions specifically into the UI package manifest without writing anything manually.

🚨 Error 2: The Missing Link (ts(2307))
“Cannot find module '@ecom/ui-core' or its corresponding type declarations.”

Why it happened: You looked inside store-client/package.json and noticed @ecom/ui-core wasn't listed under dependencies. The codebase was trying to import from an internal package that wasn't officially mapped.

How we solved it: We manually declared "@ecom/ui-core": "workspace:\*" inside the dependencies block. This explicitly tells the package manager: "Don't fetch this package from the public internet. Look on my local desktop hard drive for a package with that name."

🚨 Error 3: The CommonJS vs. ESM Conflict (ts(1470))
“The 'import.meta' meta-property is not allowed in files which will build into CommonJS output.”

Why it happened: Inside your ui-core Vite config, we originally used import.meta.url to figure out where files were on your computer. But the package's TypeScript settings were configured to compile code into CommonJS (the legacy Node format). CommonJS has no idea what import.meta is because it's a modern ES Module (ESM) feature.

How we solved it: We stripped out import.meta completely and switched to a clean, universal path resolution approach: const \_\_dirname = path.resolve(). This works perfectly regardless of the compiler rules.

🚨 Error 4: The Turborepo Guardrails
“Missing packageManager field... Could not find turbo.json”

Why it happened: Turborepo is the orchestration engine that runs your project. It woke up and refused to run because of two missing pieces: it didn't know which manager version ran the workspace (packageManager), and it didn't have a task blueprint (turbo.json) telling it how to build dependencies.

How we solved it: We declared "packageManager": "pnpm@10.33.0" at the absolute root package.json and created a turbo.json blueprint mapping out how build and dev scripts should pass assets downstream.

3. The Grand Finale: Demystifying Vite & Path Aliases
   The longest battle we fought was over this line printed by Vite:

“Failed to resolve import "@/lib/utils" in .../ui-core/src/components/ui/dialog.tsx. Does the file exist?”

Understanding this requires understanding how Vite and path aliasing operate at an enterprise level.

What is an Alias (@/\*)?
When Shadcn installs a component, it writes paths like import { cn } from "@/lib/utils". The @/ is a shortcut meaning "start looking from the root src folder".

Why did it crash the Monorepo?
Vite was booting up inside apps/store-client. When it evaluated your storefront pages and stepped out of that folder to grab a button or dialog component from packages/ui-core, Vite parsed the file text. It saw @/lib/utils and thought: "I am running inside store-client, so @/ must mean look inside store-client/src/lib/utils!" But that utility function only existed inside the UI core package folder! Vite was looking in the wrong project container, failed to find it, and asked: "Does the file exist?"

The Solution Matrix We Wrote
We fixed this by writing a Context-Aware Path Resolver right inside your master configuration (apps/store-client/vite.config.ts).

We passed a regex matcher to Vite's alias configurations with a customResolver hook:

TypeScript
customResolver(updatedId, importer) {
if (importer && importer.includes('apps/store-client')) {
return path.resolve(**dirname, './src', updatedId)
}
return path.resolve(**dirname, '../../packages/ui-core/src', updatedId)
}
This code acts like a traffic cop checking passports:

When a file inside store-client imports @/something, Vite evaluates importer.includes('apps/store-client') as true and points locally to the store app's source folder.

When a file inside your UI warehouse package imports @/something, the cop detects it's an external module, bypasses the store app, and routes the search straight inside packages/ui-core/src/.

We checked the physical hard drive on the fly using native Node file extensions (fs.existsSync) to append .ts or .tsx automatically so Vite never gets confused by bare extensions.

What You Mastered Today:
Workspace Interlinkage: You know how local apps safely point to local packages using "workspace:\*" symlinks without copying files.

Task Orchestration: You configured Turborepo to run multiple development environments simultaneously with a single root command (pnpm dev).

Vite Architecture Core: You understood that Vite is a text-compilation engine that intercepts import strings and transforms them into standard web assets, and you learned how to configure custom alias mapping boundaries.

You successfully migrated a complex monolith into a highly scalable, isolated architectural configuration. Your foundation is perfectly clean, type-safe, and fully synchronized!
