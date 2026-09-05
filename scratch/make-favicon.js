const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgBuffer = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#10233F"/>
  <rect x="10" y="10" width="44" height="44" rx="6" fill="none" stroke="#C8A15A" stroke-width="2.5"/>
  <text x="32" y="44" font-family="Georgia, serif" font-size="32" font-weight="bold" fill="#C8A15A" text-anchor="middle">A</text>
</svg>
`);

async function generateFavicon() {
  const png32 = await sharp(svgBuffer).resize(32, 32).toBuffer();
  fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), png32);
  fs.writeFileSync(path.join(__dirname, '../public/icon.png'), png32);
  fs.writeFileSync(path.join(__dirname, '../src/app/favicon.ico'), png32);
  console.log('Favicon generated successfully!');
}

generateFavicon().catch(console.error);
