# Pagina_RN — Blog del curso de Realidad Nacional (UCSUR)

## Resumen del proyecto

Blog/sitio web para el curso **Realidad Nacional** (HUM 204) del Departamento Académico de Cursos Básicos de la **Universidad Científica del Sur**, ciclo académico **2026-1**. Trabajo grupal cuyo objetivo es publicar, semana a semana, los entregables del equipo y enriquecerlos con el contenido visto en clase.

El sitio se construye reutilizando la plantilla **Jekyll Chirpy** (https://github.com/cotes2020/jekyll-theme-chirpy.git), de la cual se debe extraer únicamente el diseño visual aprovechable. Todo lo específico de Jekyll (Ruby, gems, layouts `.html` con liquid, CI específico de GitHub Pages para Jekyll, etc.) debe ser eliminado o reemplazado por una stack más simple a definir en una iteración posterior.

## Identidad del curso

- **Curso:** Realidad Nacional (código HUM 204)
- **Universidad:** Universidad Científica del Sur (UCSUR)
- **Departamento:** Cursos Básicos
- **Ciclo:** 2026-1
- **Modalidad:** Presencial
- **Docente:** Cenepo Gutierrez, Auroni
- **Naturaleza:** Curso teórico que analiza la realidad peruana a través de sus ejes histórico, social, cultural, económico y político.

## Equipo

- Abanto Huertas, Leonardo Manuel
- Lopez Chambillo, Gabriela Nicol
- Vargas Flores, Angel Jaime
- Vergara Carpio, Grecia Hadid

## Estructura académica del curso

El curso se divide en cuatro módulos:

1. **Módulo 1 — El Perú y sus orígenes:** evolución política, económica y social en la formación de la República.
2. **Módulo 2 — El Perú institucional:** organización del Estado, marco normativo y organizaciones representativas.
3. **Módulo 3 — El Perú en lo económico y social:** situación socioeconómica y propuestas de mejora.
4. **Módulo 4 — Visión de país hacia un futuro sostenible:** retos pendientes para el desarrollo del Perú.

### Evaluaciones (referencia)

| Cód  | Detalle                  | Semana    | Peso |
|------|--------------------------|-----------|------|
| ED   | Cuestionario diagnóstico | Semana 2  | 0%   |
| EC1  | Sustentación de video    | Semana 5  | 18%  |
| EP   | Evaluación parcial       | Semana 8  | 20%  |
| EC2  | Sustentación de foro     | Semana 12 | 18%  |
| EC3  | Sustentación de megazord | Semana 15 | 19%  |
| EF   | Evaluación final         | Semana 16 | 25%  |

## Contenido del sitio (semanas trabajadas a la fecha)

| Semana | Tema (PPT del curso)                                  | Entregable grupal                          |
|--------|-------------------------------------------------------|--------------------------------------------|
| 1      | La República Peruana en sus inicios                   | Guía de Discusión Grupal — Sesión 01       |
| 2      | Democracia y Autoritarismo en la República Peruana    | Guía de Discusión Grupal — Sesión 02       |
| 3      | Prosperidad económica y corrupción                    | Guía de Discusión Grupal — Sesión 03       |
| 4      | Terrorismo en el Perú                                 | Guía de Discusión Grupal — Sesión 04       |

Las **PPTs del curso** dan el marco conceptual y los temas oficiales de cada sesión. Las **guías grupales** contienen la producción del equipo: reflexiones individuales por integrante, argumentos de avance/retroceso, preguntas de análisis y conclusiones. Cada semana del blog debe estructurarse a partir del entregable grupal correspondiente, usando la PPT como contexto/encuadre.

## Carpetas de contenido fuente

- `informacion_curso/` — PDFs de las diapositivas oficiales del curso (semanas 1 a 4 a la fecha). Sirven como contexto temático.
- `semanas/semana_N/` — Guías de discusión del equipo (PDF por sesión). **Es el contenido que debe publicarse** en cada post/sección semanal.

## Plantilla base y plan de trabajo

- **Plantilla origen:** https://github.com/cotes2020/jekyll-theme-chirpy.git (tema Chirpy para Jekyll).
- **Lo que se conserva:** estética visual, tipografía, layouts conceptuales (lista de posts, post detalle, sidebar, taxonomías por categorías/tags), modo claro/oscuro, paleta y componentes.
- **Lo que se elimina:** todo el aparato Jekyll/Ruby (`Gemfile`, `_config.yml`, `_plugins`, `_layouts`/`_includes` con Liquid, `tools`, scripts de gem, CI específico de Jekyll, post seed, etc.). El código solo debe quedarse con los assets reutilizables (CSS/SCSS, JS de UI, fuentes, íconos, imágenes neutras).

### Skills/recursos de diseño instalados

- `frontend-design` y `frontend-patterns` (de `affaan-m/everything-claude-code`) en `.claude/skills/` — registrados en `skills-lock.json`.
- `airtable-design` (skill local en `.claude/skills/airtable-design/SKILL.md`) — wrapper que obliga a leer `DESIGN.md` antes de escribir UI. **No** está en `skills-lock.json` (no fue instalado por la CLI `skills`); es un skill manual del proyecto.
- `DESIGN.md` en la raíz, generado por `getdesign add airtable`. **Es la fuente de verdad del lenguaje visual** (paleta, tipografía Haas Grotesk, signature cards, botones, etc.). Cualquier trabajo de UI debe abrir este archivo antes de escribir código.

### Flujo previsto

1. Limpiar el repo Chirpy: dejar solo los assets visuales y referencias de layout aprovechables.
2. Definir la stack final (a decidir junto con el usuario antes de codificar; opciones razonables: HTML estático + CSS, Astro, o un SSG no-Jekyll). Aún **no asumir** stack.
3. Aplicar el lenguaje visual del `DESIGN.md` (estilo Airtable) sobre los componentes rescatados.
4. Iterar el diseño usando los skills `frontend-design` y `frontend-patterns`.
5. Volcar el contenido de las semanas (a partir de las guías) en posts/secciones del sitio.

## Convenciones para futuras iteraciones

- El idioma del sitio es **español** (textos, slugs, metadatos).
- Mantener el nombre del curso, ciclo, docente y equipo de forma consistente con esta CLAUDE.md.
- Cada semana publicada debe citar/atribuir lo escrito por cada integrante cuando provenga de la guía grupal.
- Antes de tocar archivos de la plantilla, consultar `DESIGN.md` para que el rediseño respete el lenguaje Airtable adoptado.
- No introducir dependencias de Jekyll/Ruby en código nuevo.
