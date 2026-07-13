import sharp from "sharp";

const inputPath =
  "public/images/cursors/mystic-cursor-hover.png";

const outputPath =
  "public/images/cursors/mystic-cursor-hover-48.png";

await sharp(inputPath)
  .resize(48, 48, {
    fit: "contain",
    background: {
      r: 0,
      g: 0,
      b: 0,
      alpha: 0,
    },
  })
  .png()
  .toFile(outputPath);

console.log(`Cursor hover generado en: ${outputPath}`);