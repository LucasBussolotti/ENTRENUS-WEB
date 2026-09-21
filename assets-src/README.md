# assets-src

Originales que **no** se despliegan: esta carpeta queda fuera de `public/`, así que
Next no la sirve ni la incluye en el build.

## reels/

Los MP4 tal como salieron de la edición: 1080x1920 a ~10.000 kb/s, ~30 MB cada uno.
Lo que consume el sitio son las versiones recomprimidas de `public/images/REELS/web/`
(720x1280, ~2 MB) junto a su portada `.webp`.

Para regenerarlas después de cambiar un master:

```bash
ffmpeg -i assets-src/reels/REEL1.mp4 \
  -vf scale=720:-2 -c:v libx264 -preset slow -crf 30 \
  -profile:v high -pix_fmt yuv420p -an -movflags +faststart \
  public/images/REELS/web/REEL1.mp4

ffmpeg -ss 0.5 -i assets-src/reels/REEL1.mp4 -frames:v 1 \
  -vf scale=540:-2 -quality 72 public/images/REELS/web/REEL1.webp
```

`-movflags +faststart` importa: mueve el índice al principio del archivo para que
el navegador pueda empezar a reproducir sin descargarlo entero.
