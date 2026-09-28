---
name: WebWorks
description: Hiring told as git history; the developer's branch and the company's branch merge in the application.
colors:
  ground: "#E6EAEE"
  ground-deep: "#D6DCE2"
  ink: "#0B1220"
  ink-soft: "#3C4758"
  on-ink-soft: "#B9C2CE"
  dev: "#00A676"
  dev-ink: "#00734F"
  co: "#3D3BF3"
  co-deep: "#2826C4"
  merge: "#FF5A1F"
  error: "#B42318"
  on-role: "#FFFFFF"
typography:
  display:
    fontFamily: "'Bricolage Grotesque Variable', 'Segoe UI', sans-serif"
    fontSize: "clamp(3.75rem, 10.4vw, 9.5rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.04em"
    fontVariation: "'wdth' 88"
  display-quiet:
    fontFamily: "'Bricolage Grotesque Variable', 'Segoe UI', sans-serif"
    fontSize: "clamp(2.125rem, 3.7vw, 3.5rem)"
    fontWeight: 300
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  pressure:
    fontFamily: "'Bricolage Grotesque Variable', 'Segoe UI', sans-serif"
    fontSize: "clamp(3.25rem, 7.2vw, 6.5rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.04em"
    fontVariation: "'wdth' 88"
  headline:
    fontFamily: "'Bricolage Grotesque Variable', 'Segoe UI', sans-serif"
    fontSize: "clamp(2.25rem, 4.6vw, 4.25rem)"
    fontWeight: 750
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 92"
  figure:
    fontFamily: "'Bricolage Grotesque Variable', 'Segoe UI', sans-serif"
    fontSize: "3.25rem"
    fontWeight: 750
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 92"
  title:
    fontFamily: "'Bricolage Grotesque Variable', 'Segoe UI', sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
  title-sm:
    fontFamily: "'Bricolage Grotesque Variable', 'Segoe UI', sans-serif"
    fontSize: "1.3125rem"
    fontWeight: 650
    lineHeight: 1.25
  body-lg:
    fontFamily: "'Bricolage Grotesque Variable', 'Segoe UI', sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "'Bricolage Grotesque Variable', 'Segoe UI', sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "'Bricolage Grotesque Variable', 'Segoe UI', sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 650
    lineHeight: 1.2
  meta:
    fontFamily: "'Bricolage Grotesque Variable', 'Segoe UI', sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.4
  small:
    fontFamily: "'Bricolage Grotesque Variable', 'Segoe UI', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
  mono:
    fontFamily: "'Martian Mono Variable', ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.35
rounded:
  none: "0"
  pill: "999px"
  node: "50%"
spacing:
  line: "3px"
  gutter: "clamp(16px, 4vw, 56px)"
  section-y: "clamp(72px, 12vh, 140px)"
  row: "60px"
  xs: "8px"
  sm: "12px"
  md: "24px"
  lg: "36px"
components:
  button-dev:
    backgroundColor: "{colors.dev}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "52px"
  button-dev-hover:
    backgroundColor: "{colors.dev-ink}"
    textColor: "{colors.on-role}"
  button-co:
    backgroundColor: "{colors.co}"
    textColor: "{colors.on-role}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "52px"
  button-co-hover:
    backgroundColor: "{colors.co-deep}"
    textColor: "{colors.on-role}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "11px 20px"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
  button-outline-on-ink:
    backgroundColor: "transparent"
    textColor: "{colors.ground}"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
  button-outline-on-ink-hover:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "10px 14px"
  commit-node:
    backgroundColor: "{colors.ground}"
    rounded: "{rounded.node}"
    size: "14px"
  merge-node:
    backgroundColor: "{colors.merge}"
    rounded: "{rounded.node}"
    size: "26px"
  door-panel-dev:
    backgroundColor: "{colors.dev}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "clamp(32px, 5vw, 64px) clamp(16px, 4vw, 56px)"
  door-panel-co:
    backgroundColor: "{colors.co}"
    textColor: "{colors.on-role}"
    rounded: "{rounded.none}"
    padding: "clamp(32px, 5vw, 64px) clamp(16px, 4vw, 56px)"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "52px"
  button-ink-hover:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "10px 2px"
    height: "48px"
  input-focus:
    backgroundColor: "{colors.ground-deep}"
    textColor: "{colors.ink}"
  alert:
    backgroundColor: "transparent"
    textColor: "{colors.error}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  role-toggle-dev-pressed:
    backgroundColor: "{colors.dev}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "52px"
  role-toggle-co-pressed:
    backgroundColor: "{colors.co}"
    textColor: "{colors.on-role}"
    rounded: "{rounded.pill}"
    height: "52px"
  sidebar-stop:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "0 0 0 34px"
    height: "44px"
  usage-slot:
    backgroundColor: "{colors.ground}"
    rounded: "{rounded.node}"
    size: "14px"
  usage-slot-used:
    backgroundColor: "{colors.dev}"
    rounded: "{rounded.node}"
    size: "14px"
---

# Design System: WebWorks

<!-- Scope: this system covers the public surfaces (landing /pageInicio, public navbar and footer, /login, /registrar, /listPlanInicio and /listPlanUser) and the developer shell (sidebar lane plus the /pageUser dashboard), all scoped by the `.ww` class and the `--ww-*` custom properties in src/styles.css. The remaining logged-in developer screens and the whole company area still run Angular Material indigo-pink with Roboto; that is a known boundary, not part of this system. -->

## Overview

**Creative North Star: "Grafo de commits"**

WebWorks is told as git history. The developer owns a green branch, the company owns an indigo branch, and the two lanes run down the page until they merge in the application, marked by the only vermillion on the screen. Everything is drawn with one line: a single 3px ink stroke carries lanes, section dividers, borders, underlines, and focus outlines, so the page reads like one continuous diagram rather than a stack of cards.

The ground is flat concrete grey, the type is Bricolage Grotesque pushed to extreme scale and condensed width at the moment of pressure, and Martian Mono appears only where the git metaphor is literal: commit hashes and commit messages. Depth comes from full-bleed color blocks (the ink plan band, the green and indigo closing doors), never from shadows. Density is generous: sections breathe at up to 140px vertical padding, and the graph keeps a fixed 60px row rhythm.

Motion is narrative, not decorative: on load the example history replays top to bottom, lane by lane, node by node, and the merge node lands last with a single expanding vermillion ring. Hovering or focusing a door highlights its own lane and dims the other.

The same metaphor carries past the landing. A form is a lane and each group of fields is a commit whose node fills once the group is valid. A plan's benefits are commits on the green branch. Inside the product, the developer's navigation is their own green lane, plan quotas are rows of commit slots, repositories read as a commit log, and job offers arrive as a short indigo branch from the companies.

**Key Characteristics:**
- One line weight (3px) for every stroke in the world.
- One color per role: green is the developer, indigo is the company, vermillion is only the merge.
- Circular commit nodes as the only round-dot vocabulary; pills for every interactive outline.
- Flat depth; hierarchy through full-bleed color bands and type scale.
- Monospace reserved for hashes and commit messages.

## Colors

A cool concrete ground with near-black ink, two saturated role colors, and one hot accent that is held back for a single node.

### Primary
- **Branch Green** (dev): the developer's lane, commit node borders, the "Soy developer" door and closing panel, emphasized numbers in the plan band, and text selection.
  Beyond the landing it also marks the developer's form lane and submit button, the pressed "Developer" role toggle, plan benefit lanes and the "Elegir" plan button, the sidebar navigation lane and its active node, the filled usage slots, the repository log, and the plan-name node on the dashboard.
- **Deep Branch Green** (dev-ink): green that must read as text on the grey ground (the "Para developers" lane title, the branch commit message, plan limit figures), the developer door's hover fill, focus outlines and input focus underlines inside developer surfaces.

### Secondary
- **Signal Indigo** (co): the company's lane, company commit nodes, the "Soy empresa" door and closing panel, and the "Para empresas" lane title. Carries white text. It also tints the registration form when "Empresa" is chosen (lane, submit, selection), and draws the offers branch and company names on the developer dashboard, because those offers belong to companies.
- **Deep Indigo** (co-deep): hover fill of the company door and of the company submit button.

### Status
- **Error Red** (error): field error text, the invalid input underline, and the 3px bordered form alert. Never a decoration, never a role color.

### Tertiary
- **Merge Vermillion** (merge): the merge node in the commit graph and its one-shot ring animation. Nothing else.

### Neutral
- **Concrete Ground** (ground): page background for every `.ww` surface, the fill inside hollow commit nodes, and text on the ink band and ink buttons.
- **Deep Concrete** (ground-deep): scrollbar track, the quiet divider above the footer copyright line and between dashboard blocks and plan limits, the focused input fill, hover fills on rows and unpressed toggles, and the unused track of a usage bar.
- **Graph Ink** (ink): all primary text, the 3px structural line, the plan band fill, the neutral submit button, focus outlines, and the join node in "Dos ramas".
- **Soft Ink** (ink-soft): ledes, step details, hashes, secondary meta, scrollbar thumb.
- **Soft Ground on Ink** (on-ink-soft): secondary body copy inside the ink plan band.
- **Role White** (on-role): text on indigo surfaces and on the developer door's deep-green hover.

### Named Rules
**The One Merge Rule.** Vermillion appears only on the merge node, where the two branches meet. It is never a button, a link, a highlight, or a heading color.

**The Role Ownership Rule.** Green always means developer and indigo always means company, in lanes, doors, titles, and focus outlines. A role color never decorates content belonging to the other role or to neither.

**The Ink-on-Green Rule.** Text on Branch Green is Graph Ink, not white; text on Signal Indigo is white. Green-as-text on the grey ground uses Deep Branch Green.

**The Neutral Door Rule.** A surface that serves both roles (login, the public plans) uses Graph Ink for its lane and submit button; it only takes a role color once the visitor has chosen a role.

## Typography

**Display Font:** Bricolage Grotesque Variable (with 'Segoe UI', sans-serif), self-hosted via @fontsource-variable, weight and width axes.
**Body Font:** Bricolage Grotesque Variable.
**Label/Mono Font:** Martian Mono Variable (with ui-monospace, monospace), self-hosted via @fontsource-variable.

**Character:** A single expressive grotesque does all the talking, swinging from a whispering 300 weight to a condensed 800 at poster scale; Martian Mono is the terminal voice of the git history and nothing else.

### Hierarchy
- **Display** (800, clamp(3.75rem, 10.4vw, 9.5rem), 0.9, width 88%): the single word under pressure in the hero ("postulación."). One per page.
- **Display Quiet** (300, clamp(2.125rem, 3.7vw, 3.5rem), 1.02): the light run-in line that sets up the pressure word; also the light register of the plan band title (clamp up to 4.5rem) with 800-weight green emphasis inside it.
- **Pressure** (800, clamp(3.25rem, 7.2vw, 6.5rem), 0.92, width 88%): the interior tier of the pressure word, used on /login, /registrar and the plans pages under a Display Quiet run-in. Still one per page.
- **Headline** (750, clamp(2.25rem, 4.6vw, 4.25rem), 1, width 92%, max 16ch): section titles and the dashboard greeting ("Hola, {nombre}."). The closing door names use the same register pushed to 800 / 88% width at clamp(2.5rem, 5vw, 4.75rem).
- **Figure** (750, width 92%, tabular numbers): numbers that are the content. Usage meters at 3.25rem (2.75rem under 560px) followed by a Soft Ink "de {límite}"; plan prices at clamp(2.25rem, 3.6vw, 3.25rem) with a 0.45em currency; plan limits at 2rem in Deep Branch Green.
- **Title** (700, 1.5rem): lane titles colored by role, plan names, dashboard block titles. **Title Small** (650, 1.3125rem): step titles and form group legends. Repository names and offer titles sit at 700 / 1.1875rem.
- **Body Large** (400, 1.1875rem, 1.55, 36-52ch): section ledes, auth and plan ledes. Hero lede runs clamp(1.125rem, 1.4vw, 1.3125rem) at 1.5, max 38ch.
- **Body** (400, 1.0625rem, 1.5, max 44ch): step details, input text, plan benefits, sidebar stops, dashboard states and comments.
- **Label** (650, 1.0625rem; 1rem in the navbar CTA and on mobile): button and door labels. Nav links are 500 at 1rem. Secondary text links ("Ver todos", auth switch) are 600-650 at 1rem.
- **Meta** (0.9375rem): field labels at 600, plan limit terms, dates and counts under list items, the plans disclaimer. **Small** (0.875rem): input hints and field errors (errors at 600); sidebar stop labels on mobile.
- **Brand** (750, 1.25rem, width 90%): the brand name in the sidebar and footer; 1.375rem in the public navbar.
- **Mono** (400, 0.875rem, 1.35; 0.75rem under 720px): commit hash plus message. Hash in Soft Ink with 0.6em gap; the merge message goes to 600.

### Named Rules
**The Pressure Word Rule.** Extreme scale and condensed width are spent on one word per viewport, set against a light-weight run-in. Headlines below it stay at 750 and never compete.

**The Terminal Voice Rule.** Martian Mono is only for commit hashes and commit messages. It is never used for labels, captions, or UI chrome.

## Layout

Full-bleed sections stacked vertically, each padded horizontally by the shared gutter (clamp(16px, 4vw, 56px)) and separated by the 3px ink line rather than by whitespace alone. Vertical section padding is clamp(72px, 12vh, 140px).

- **Hero:** a 7fr / 5fr grid (copy left, graph right), gap clamp(32px, 5vw, 80px), vertically centered, min-height calc(100svh - 76px) under the sticky navbar.
- **Commit graph:** fixed 60px rows; lanes sit 22px in from each edge (16px under 720px); messages indent 22px past the lane; paired rows cap each message at 46% width. The merge fork is 1.5 rows tall.
- **Two-lane section:** a two-column grid with gap clamp(40px, 6vw, 96px); each lane is a vertical line with 44px text indent and 36px between steps, joined below by a fork to a single ink node.
- **Closing doors:** two equal full-bleed color panels, min-height clamp(220px, 30vh, 300px), with the name top-left and the arrow bottom-right.
- **Auth pages (/login, /registrar):** a 5fr / 6fr grid, gap clamp(40px, 7vw, 120px). The intro (quiet run-in, pressure word, lede) is sticky at 120px on the left; the form, max 560px, runs as a lane on the right with 36px between blocks. Padding clamp(40px, 9vh, 104px) top, clamp(56px, 10vh, 120px) bottom.
- **Plans (/listPlanInicio, /listPlanUser):** the same head grid (title left, lede bottom-right), then auto-fit columns (min 260px) under a 3px ink top rule and split by 3px ink verticals, no cards. The first column has no left rule or padding.
- **Developer shell:** a fixed 240px sticky sidebar (100vh) with a 3px ink right rule beside the content. The dashboard caps at 1280px with padding clamp(28px, 5vh, 56px) clamp(16px, 3.5vw, 48px) 64px; a 3px ink rule closes the greeting; below it an 8fr / 4fr grid whose side column opens with a 3px ink left rule. Blocks inside a column pad 32px / 36px and are separated by 3px Deep Concrete rules.

**Responsive:**
- At 1080px and below the hero collapses to one column (headline, then graph) and the graph caps at 560px.
- At 860px and below the navbar links collapse into a pill menu toggle that opens a full-width panel with its own 3px bottom rule.
- At 720px and below the lanes and closing doors stack, the join fork is hidden and its caption left-aligns, doors shrink to 48px height, mono drops to 0.75rem, and the footer becomes one column.
- At 1100px and below the dashboard grid becomes one column; the side column swaps its left rule for a 3px ink top rule.
- At 900px and below the auth and plans heads stack and the auth intro stops being sticky.
- At 800px and below the sidebar turns into a horizontal lane on top of the content: brand mark only, stops laid out as columns with the node above a 0.875rem label, the lane running between the nodes, and "Salir" pushed right.
- At 620px and below plan columns stack, separated by 3px ink top rules.
- At 560px and below paired form fields and the two usage meters stack.

## Elevation & Depth

The world is flat. There are no box-shadows anywhere in the `.ww` scope. Depth and grouping come from three things only: the 3px ink rule between sections (Deep Concrete for quieter splits inside a column), full-bleed color bands (the ink plan band, the green and indigo closing panels), and the sticky navbar's or sidebar's ink border over the ground. Hover and focus states change fill (Deep Concrete) or underline color, never elevation.

### Named Rules
**The Drawn-Not-Lifted Rule.** Nothing floats. Separation is a line or a color block; if a surface needs to stand out, change its fill or draw a rule, never add a shadow.

## Shapes

Two shapes and a line. Sections, bands, door panels, inputs and alerts are square-edged (0 radius); inputs are only a 3px bottom rule. Every interactive outline (doors, CTA, plan link, menu toggle) is a full pill (999px) with a 3px border. Commit nodes are circles: 14px hollow rings with a 3px role-colored border filled with the ground, a solid green node where a branch forks, an 18px solid ink node where the two lanes join, and a 26px solid vermillion merge node. Branch curves are cubic Béziers drawn with non-scaling 3px strokes.

The brand mark repeats the whole system at 32px (36px in the footer): a green and an indigo lane that curve into one ink node.

### Named Rules
**The One Line Rule.** Every stroke is `--ww-line` (3px): lanes, curves, node borders, section dividers, pill borders, link underlines, focus outlines. Do not introduce a second structural weight.

## Components

### Buttons
Confident pills in role color, with an arrow that nudges forward.
- **Shape:** full pill (999px), 3px border in the fill color or currentColor.
- **Developer door:** Branch Green fill, Graph Ink text, 650 weight, 52px min-height, 20px side padding, 10px gap to a 20px arrow icon.
- **Company door:** Signal Indigo fill, white text, same geometry.
- **Hover / Focus:** fill deepens (Deep Branch Green with white text; Deep Indigo) over 220ms on the ease-out curve; the arrow translates 4px right. Focus outline keeps the role color (Deep Branch Green or Indigo), 3px at 3px offset. Active presses down 1px.
- **Outline (navbar "Crear cuenta"):** transparent with 3px ink border, fills ink with ground text on hover over 200ms.
- **Outline on ink ("Ver planes"):** 3px ground border and ground text on the ink band, inverts to ground fill with ink text on hover; focus outline inside the band turns Branch Green.

### Navigation
- **Style:** sticky header on the ground, 14px vertical padding at the gutter, 3px ink bottom rule. Brand mark plus "WebWorks" at 1.375rem / 750 / width 90%.
- **Links:** 1rem / 500 ink text, 10px 14px padding. Hover and active route show a 3px ink underline at 8px offset; no color change.
- **Mobile (≤860px):** 44px pill menu toggle with 3px ink border and a stroked hamburger/close icon; links stack in a full-width ground panel, 1.125rem, CTA centered below.

### Commit Graph (signature)
- Two vertical 3px lanes (green left, indigo right) through 60px rows; each commit is a hollow circular node on its lane with a Martian Mono hash plus message beside it.
- A branch row curves the green lane toward the center with a solid green node and a Deep Branch Green message on a ground chip (4px 10px padding).
- The merge row forks both lanes into the 26px vermillion node, with a 600-weight merge message below and a Soft Ink "Historial de ejemplo" note.
- **Load replay:** rows animate in sequence with a 150ms stagger: lanes draw from the top (scaleY, 520ms), curves reveal top-down (640ms), nodes scale in (420ms), messages fade from 4px blur (520ms); the merge node arrives last and emits one vermillion ring that expands to an 18px offset and fades (1400ms). All wrapped in `prefers-reduced-motion: no-preference`.
- **Lane focus:** hovering or focusing a door dims the opposite lane's line, nodes, and messages to 0.22 opacity over 260ms.

### Lane Steps
A role-colored vertical 3px line with 14px hollow ring nodes; step title in Title Small ink, detail in Body Soft Ink. Lane title above in the role's text color. On wide screens both lanes fork into a single ink node with a centered 600-weight caption.

### Closing Doors
Two full-bleed square panels in Branch Green (ink text) and Signal Indigo (white text), name at condensed 800 display scale, a one-line description, and a 44px arrow at stroke 2. Hover lifts brightness to 1.06 over 260ms; focus outline sits 8px inside the panel in ink (green) or white (indigo).

### Footer
3px ink top rule, brand mark with name (1.25rem / 750) and Soft Ink meta, links with the 3px underline-on-hover pattern at 7px offset, and a copyright line under a 3px Deep Concrete divider.

### Form Lane (login, registro)
The form is a lane (`.ww-lane`, 44px text indent) and each group of fields is a commit (`.ww-commit`) with a 14px hollow node at its title. The node fills (`.is-done`) when the group is valid, so progress is drawn, not counted. The lane color is `--role`: Graph Ink on login, green or indigo on registration depending on the chosen role.
- **Group title:** Title Small; a `legend` is floated so the fieldset grid does not swallow it.
- **Rows:** paired fields in two columns (gap 16px 20px), top-aligned so an error under one field does not shift its neighbour.
- **Field:** Meta label at 600 above the input, 6px gap. Hint and error below in Small; errors in Error Red at 600.
- **Input:** transparent, no box, 48px min-height, Body text, a 3px Soft Ink bottom rule that turns ink on hover and `--role-ink` on focus with a Deep Concrete fill; invalid inputs take an Error Red rule. Textareas start at 96px.
- **Password reveal:** a 44px round icon button inside the input's right edge, Soft Ink turning ink on hover.
- **Submit (`.ww-button`):** a 52px ink pill with ground text that empties to an outline on hover; disabled at 0.6 opacity with a progress cursor while the request runs. On registration it takes the role fill (green with ink text or indigo with white) and deepens on hover.
- **Alert:** Error Red text at 600 inside a square 3px Error Red border, 12px 16px padding, announced with `role="alert"`.
- **Role toggle:** two equal 52px pills with `aria-pressed`, outlined in their role text color; the pressed one fills (green with ink text, indigo with white). The whole page (lane, submit, selection color) follows the choice.
- **Entrance:** the lane draws from the top (560ms) and nodes scale in with a 150ms stagger, only under `prefers-reduced-motion: no-preference`.

### Plan Columns
Plans are columns under a 3px ink rule, split by 3px ink verticals, never cards. Each column stacks the plan name (Title), the price (Figure with a raised currency), a two-up limits list between two Deep Concrete rules (Deep Branch Green 2rem figures over Meta terms), the benefits as a green lane, and a green "Elegir" pill pinned to the bottom with the forward-nudging arrow. Benefit lanes are drawn per item from node to node, so the branch ends on its last commit instead of overshooting it. A Meta disclaimer below states the prices are examples of the academic project.

### Developer Sidebar
The developer's navigation is their own green lane: a 3px green line through 14px hollow nodes, one per destination (Inicio, Carrito, Tarjetas, Perfil). Stops are 44px tall with the label 34px in, Body at 500; hover adds a green 3px underline; the active route (`routerLinkActive`) fills its node and goes to 700. The brand mark and name sit on top; "Salir" is an ink outline pill at the bottom that fills ink on hover. Under 800px it becomes the horizontal lane described in Layout.

### Dashboard (/pageUser)
- **Greeting:** Headline "Hola, {nombre}." and, on the same baseline, the plan name with a filled green node plus two text links (Mis suscripciones, Ver planes) underlined in green at 6px offset, turning ink on hover.
- **Usage meters:** repositories and projects side by side. Each shows the used count as a Figure, "de {límite}" in Soft Ink and a Meta label. When both limits are 12 or less the quota is drawn as slots: one 14px node per slot on a green line, filled for used, hollow for free. Above 12, both meters switch together to a proportional bar: a green line ending in a solid node where usage stops, over a Deep Concrete track that ends in a hollow limit node. The meters only render once the plan and the repositories have both loaded; they never show assumed limits.
- **Repository log:** repositories as a vertical green commit log. Each row is a full-width button (name, one-line description, Meta count and date) with hollow green nodes joined by the lane; hover fills the row Deep Concrete and opens the repository.
- **Offers branch:** in the side column, up to three open offers as a short indigo branch (hollow indigo nodes, indigo line) because they come from companies; company names in indigo at 600. The branch ends in a "Ver todas las ofertas" link.
- **Received comments:** up to two comments in Body, separated by Deep Concrete rules, with author and score in Meta, ending in "Comentar otros perfiles".
- **States:** every block has its own loading (`role="status"`), error (`role="alert"`) and empty sentence in Body Soft Ink; an empty repository log offers a "Crear repositorio" green pill.
- **Entrance:** slot and bar lanes draw left to right, vertical lanes draw top down and nodes scale in, gated by `prefers-reduced-motion: no-preference`.

## Do's and Don'ts

### Do:
- **Do** scope every public surface with the `.ww` class and read colors, line, fonts, easing, and gutter from the `--ww-*` custom properties.
- **Do** draw every stroke at `--ww-line` (3px): dividers, pill borders, underlines, lanes, node rings, and focus outlines.
- **Do** keep green for developer, indigo for company, and vermillion for the merge node only.
- **Do** use `--ww-ease-out` (cubic-bezier(0.16, 1, 0.3, 1)) at 200-260ms for state changes, and gate entrance choreography behind `prefers-reduced-motion: no-preference`.
- **Do** keep a focus-visible outline on every interactive element, in the role color where the element belongs to a role.
- **Do** label example history as an example; commit rows carry illustrative data, not claims. The same goes for plan prices.
- **Do** draw progress and quotas as commit nodes (a filled node is done or used, a hollow node is pending or free) before reaching for numbers alone.
- **Do** give every data block its own loading, error and empty sentence, and never render limits or counts that have not loaded.

### Don't:
- **Don't** add box-shadows or elevation; separate with the 3px line or a full-bleed color band.
- **Don't** use vermillion on buttons, links, headings, or highlights.
- **Don't** set white text on Branch Green or green text below Deep Branch Green on the grey ground.
- **Don't** use Martian Mono for anything but commit hashes and messages.
- **Don't** round section or band corners; radius is reserved for pills (999px) and circular nodes.
- **Don't** carry the Angular Material indigo-pink palette or Roboto into `.ww` surfaces.
- **Don't** box inputs or wrap plans and dashboard blocks in cards; a field is a 3px bottom rule and a group is separated by a line.
- **Don't** use Error Red for anything but form errors and alerts.
