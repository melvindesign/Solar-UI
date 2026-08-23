# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Quatre audiences confirmées, servies simultanément :

- **Développeur produit solo ou petite équipe** — construit une app produit et veut une base UI cohérente sans écrire son propre design system. Installe les composants via le registry shadcn (`npx shadcn@latest add https://solar-ui.com/r/<component>.json`), les copie dans son projet, les possède.
- **Designer produit travaillant en Figma** — utilise le fichier Solar UI publié sur Figma Community (tokens, styles typographiques, composants) pour maquetter avant handoff.
- **Agent IA / assistant de code** (Claude, Cursor, Copilot) — consommateur de première classe, pas un bonus. Interroge le serveur MCP exposé sur `/api/mcp` pour obtenir variantes, tokens et règles exactes.
- **Équipe adoptant un DS interne** — fork Solar UI comme point de départ de son propre système.

**Arbitrage confirmé :** quand deux besoins entrent en conflit, ce sont les besoins des projets de l'auteur qui tranchent. Solar UI est d'abord un outil interne ; les autres audiences en bénéficient sans le gouverner.

## Product Purpose

Solar UI est une bibliothèque de composants React open source construite sur shadcn/ui, distribuée en open code via un registry compatible shadcn. Elle fournit un système visuel complet — couleur, typographie, espacement, hauteur de contrôle — pour construire des interfaces produit qui restent cohérentes composant après composant.

Le succès se mesure d'abord à son utilité pour les projets de l'auteur : couvrir les besoins réels d'interface produit sans détour ni override. L'adoption externe est bienvenue mais n'est pas le critère d'arbitrage.

## Positioning

Trois mécanismes que Solar UI défend et qu'un dérivé shadcn ne pourrait pas revendiquer honnêtement :

1. **Cohérence visuelle par conception** — chaque composant a été dessiné pour s'aligner aux autres, pas ajouté isolément. Hauteur de contrôle unifiée entre boutons, inputs et selects ; rythme d'espacement partagé. Ce n'est pas un reskin de shadcn/ui.
2. **Parité Figma ↔ code** — le design system existe des deux côtés. Le fichier Figma Community et le code partagent les mêmes tokens et les mêmes composants, ce qui rend le handoff vérifiable plutôt que déclaratif.
3. **Échelle Radix 12 steps** — système de couleur structuré plutôt que palette ad hoc. Contraste accessible par construction, dark mode obtenu sans un seul préfixe `dark:` dans le code composant.

Le serveur MCP est une capacité forte du produit, mais n'est pas ce sur quoi repose la différenciation.

## Operating Context

- Les composants ne sont pas consommés comme un package npm : ils sont copiés dans le projet de l'utilisateur via le registry shadcn, puis modifiés librement. Il n'y a pas de chemin de mise à jour automatique — la stabilité des conventions compte donc plus que la vélocité des changements.
- La documentation est le point d'entrée principal (site Nextra sur `solar-ui.com/docs`, un fichier MDX par composant, avec démos interactives).
- La génération de code assistée par IA est un scénario d'usage courant : les assistants branchent le MCP sur `/api/mcp` (local ou déployé) et interrogent le DS avant d'écrire.
- Le travail de design se fait dans Figma en amont, avec le fichier Solar UI comme source.

## Capabilities and Constraints

**Fonctionnalités confirmées**

- 68 composants UI dans `components/ui/`, sources distribuées depuis `registry/solar/ui/`.
- Registry compatible shadcn (`registry.json`, build via `npm run registry:build`).
- Tokens distribués en miroir des collections Figma : `registry/solar/radix.css` (Mode), `screen.css` (Screen), `themes/*.css` (Theme), assemblés par `theme.css`.
- Deux thèmes livrés — Stellar et Trevia — commutables à l'exécution via `data-theme`.
- Serveur MCP HTTP exposant composants, tokens et règles de design (`app/api/mcp/route.ts`, documenté dans [MCP.md](MCP.md)).
- Documentation Nextra avec recherche Pagefind, démos interactives, charts Recharts.
- Fichier Figma publié sur Figma Community.

**Contraintes techniques et conventions (à préserver)**

- Stack : Next.js 16, React 19, Tailwind CSS v4 (CSS-first, sans fichier de config ni chaîne de plugins), Nextra 4 pour les docs.
- Primitives Radix UI + Base UI sous les composants.
- Pattern shadcn/ui : CVA pour les variantes, attributs `data-slot`, `cn()` (clsx + tailwind-merge) pour la fusion de classes.
- Tokens couleur sur l'échelle Radix 12 steps. Groupes sémantiques : `default` (gray), `brand` (orange), `error` (red), `success` (green), `warning` (amber), `info` (sky).
- **Jamais de préfixe `dark:` dans le code composant** — le dark mode est géré par les imports de couleur Radix scopés sur `.dark`.
- Hauteur de contrôle unifiée : `--height-control: 2.25rem` partagée par boutons et inputs.
- Typographie : Geist (Header/Body) + Geist Mono. Échelle de styles : Display > Headline > Title > Body > Label > UI > Code.
- Ne jamais utiliser les primitives Figma `Neutrals/` ou `Hue/` — toujours `Palette/Default/`, `Palette/Accent/`, `Palette/Error/`.

**Non décidé**

- Aucune offre commerciale, tarification ou licence payante n'existe ni n'est décidée. Ne rien affirmer à ce sujet.
- Aucun engagement de roadmap public n'est établi.

## Brand Commitments

- Nom : **Solar UI** (écrit aussi `SolarUI` dans le dépôt et le fichier Figma).
- Licence MIT, dépôt public `melvindesign/SolarUI`, site `solar-ui.com`.
- Accent de marque : orange (échelle Radix), sur base gray neutre.
- Voix de la documentation existante : directe, technique, courte, sans superlatifs marketing — affirmations vérifiables plutôt que promesses.

## Evidence on Hand

- Code réel : 68 composants, registry fonctionnel, serveur MCP opérationnel.
- Documentation complète : `content/` (un MDX par composant, plus foundation, core, theming, overview).
- Fichier Figma public : https://www.figma.com/community/file/1617663822970891226 (file key `sH6wWZEN3YF4RA5JCUumvD`).
- Landing page existante avec sections Hero, Why, Showcase, Figma, Tech logos, Open source, CTA final.
- Version courante : v0.6.0.
- **Absences à ne pas fabriquer :** aucun témoignage, logo client, chiffre d'adoption, benchmark, étude de cas ou mention presse n'existe. Ne pas en inventer, ne pas afficher de compteurs d'installs ou d'étoiles non vérifiés.

## Product Principles

1. **Les besoins produit de l'auteur tranchent.** En cas d'arbitrage, la question est « est-ce que ça sert un vrai écran produit ? », pas « est-ce que ça élargit l'audience ? ».
2. **La cohérence prime sur la nouveauté.** Un composant ne rejoint le système que s'il s'aligne aux autres ; un ajout qui casse le rythme ou la hauteur de contrôle est une régression.
3. **Open code, zéro lock-in.** Le code part chez l'utilisateur et lui appartient. Les conventions doivent donc rester lisibles et stables plus qu'astucieuses.
4. **Le système est la source, pas le résultat.** Couleur, typographie et espacement viennent de tokens ; toute valeur codée en dur est une dette.
5. **Le design system existe des deux côtés.** Une décision qui ne peut pas être tenue à la fois en Figma et en code n'est pas une décision du système.
6. **Lisible par machine autant que par humain.** Régularité des variantes et exactitude de la documentation sont une fonctionnalité, parce que des agents écrivent avec.

## Accessibility & Inclusion

Aucun standard formel n'est engagé. L'accessibilité provient des primitives Radix UI (navigation clavier, gestion ARIA) et du contraste structuré de l'échelle Radix 12 steps. Ne pas revendiquer de conformité WCAG dans la communication tant qu'elle n'est pas vérifiée.
