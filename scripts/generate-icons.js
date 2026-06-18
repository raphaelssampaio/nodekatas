const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const SVG_PATH = path.join(PUBLIC_DIR, 'icon.svg');

const PNG_TARGETS = [
  { file: 'icon-192.png', size: 192 },
  { file: 'icon-512.png', size: 512 },
  { file: 'apple-touch-icon.png', size: 180 },
];

const FAVICON_SIZE = 32;

function pngToIco(pngBuffer, size) {
  const headerSize = 6;
  const dirEntrySize = 16;
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const dirEntry = Buffer.alloc(dirEntrySize);
  dirEntry.writeUInt8(size >= 256 ? 0 : size, 0);
  dirEntry.writeUInt8(size >= 256 ? 0 : size, 1);
  dirEntry.writeUInt8(0, 2);
  dirEntry.writeUInt8(0, 3);
  dirEntry.writeUInt16LE(1, 4);
  dirEntry.writeUInt16LE(32, 6);
  dirEntry.writeUInt32LE(pngBuffer.length, 8);
  dirEntry.writeUInt32LE(headerSize + dirEntrySize, 12);

  return Buffer.concat([header, dirEntry, pngBuffer]);
}

async function main() {
  if (!fs.existsSync(SVG_PATH)) {
    throw new Error(`Source SVG not found at ${SVG_PATH}`);
  }
  const svgBuffer = fs.readFileSync(SVG_PATH);

  for (const { file, size } of PNG_TARGETS) {
    const outPath = path.join(PUBLIC_DIR, file);
    await sharp(svgBuffer, { density: 384 })
      .resize(size, size)
      .png()
      .toFile(outPath);
    console.log(`Created ${file} (${size}x${size})`);
  }

  const faviconPng = await sharp(svgBuffer, { density: 384 })
    .resize(FAVICON_SIZE, FAVICON_SIZE)
    .png()
    .toBuffer();
  const icoBuffer = pngToIco(faviconPng, FAVICON_SIZE);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.ico'), icoBuffer);
  console.log(`Created favicon.ico (${FAVICON_SIZE}x${FAVICON_SIZE})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
