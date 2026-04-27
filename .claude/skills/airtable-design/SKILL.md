---
name: airtable-design
description: Lenguaje visual del proyecto, inspirado en Airtable. Usar SIEMPRE antes de escribir o modificar cualquier UI (HTML, CSS/SCSS, componentes, layouts) en este blog del curso de Realidad Nacional. Define paleta, tipografía, jerarquía, botones, tarjetas signature y resto del sistema.
origin: local
---

# Airtable Design (proyecto Pagina_RN)

Sistema de diseño del sitio. Generado por `getdesign add airtable` y guardado como `DESIGN.md` en la raíz del proyecto.

## Cuándo usar

Cualquier tarea que toque UI: nuevas páginas, posts, componentes, ajustes de tipografía/espaciado/color, o portar piezas del Chirpy original al lenguaje del proyecto. Antes de iterar el diseño con `frontend-design` o `frontend-patterns`, consulta este skill primero.

## Cómo usar

1. **Lee `DESIGN.md` en la raíz del proyecto** — es la fuente de verdad. Contiene paleta, tipografía (Haas Grotesk), tokens, jerarquía, especificaciones de botones (CTA pill negro, outline blanco), tarjetas signature (coral, verde oscuro, durazno, navy), patrones de hero, listas, etc.
2. Aplica los tokens y reglas de `DESIGN.md` literalmente. No reinventes valores: usa los nombres y hex que define.
3. Si una pieza del Chirpy (en `chirpy_template/_sass/`) entra en conflicto con `DESIGN.md`, manda `DESIGN.md`.
4. Si `DESIGN.md` no cubre un caso, extiende siguiendo su lenguaje (sobrio, editorial, blanco como canvas, voltaje en signature cards), y deja la decisión registrada al hacer el cambio.

## Anti-patrones

- Hardcodear colores o tipografías que no aparecen en `DESIGN.md`.
- Usar negritas "por defecto" — Haas Grotesk va en pesos modestos.
- Mezclar el azul corporativo de las PPTs UCSUR con la paleta del sitio: la identidad visual del blog es Airtable, no UCSUR.

## Archivo de referencia

`DESIGN.md` (en la raíz del proyecto, ~35 KB). Ábrelo completo cuando arranques una sesión de UI; no trabajes "de memoria".
