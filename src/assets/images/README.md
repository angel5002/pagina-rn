# Imágenes de las semanas

Cada sesión tiene su propia carpeta. Soltá los archivos donde corresponde y luego declarálos en la frontmatter del markdown de la semana — Astro se encarga de optimizarlos (resize, formato moderno, lazy-loading).

## Convención de carpetas

```
src/assets/images/
├── semana-01/
├── semana-02/
├── semana-03/
└── semana-04/
```

Los nombres de archivo pueden ser libres (`cover.jpg`, `01-mapa.jpg`, `boom-guano.png`…). Conviene que la **portada** se llame `cover.jpg` o `cover.png` por consistencia, pero no es obligatorio.

## Formatos aceptados

`.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, `.gif`, `.svg`. Astro convertirá a WebP/AVIF en build automáticamente — vos podés subir lo que tengas a mano.

## Cómo declararlas en la semana

En `src/content/weeks/semana-XX.md`, en la frontmatter:

```yaml
cover:
  src: ../../assets/images/semana-01/cover.jpg
  alt: "Vista de la Plaza Mayor de Lima en 1854"
  credit: "Archivo Histórico — Biblioteca Nacional"

gallery:
  - src: ../../assets/images/semana-01/01-decreto-huancayo.jpg
    alt: "Reproducción del Decreto de Huancayo, 1854"
    caption: "Decreto firmado por Ramón Castilla aboliendo la esclavitud."
    credit: "Ministerio de Cultura"
  - src: ../../assets/images/semana-01/02-jerarquia-estamental.png
    alt: "Diagrama de la jerarquía estamental virreinal"
    caption: "La sociedad colonial estaba dividida en grupos rígidos."
```

`cover` y `gallery` son **opcionales**. Si no hay imagen, la portada se renderiza con un bloque de color firmado por la paleta Airtable (peach / mint / yellow / mustard según el `surface` declarado en la semana).

## Tamaños sugeridos

- **Cover**: ancho mínimo 1600 px, ratio 16:9 o 21:9. Se mostrará a ancho completo de la columna principal.
- **Galería**: mínimo 1200 px de ancho. Se mostrarán en grilla responsive y Astro generará variantes para móvil y desktop.
