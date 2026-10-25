import { readdir, writeFile } from 'node:fs/promises';

const folder = new URL('../assets/team-gallery/', import.meta.url);
const allowed = /\.(png|jpe?g|webp|gif)$/i;
const files = (await readdir(folder, { withFileTypes: true }))
  .filter(entry => entry.isFile() && allowed.test(entry.name))
  .map(entry => entry.name)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

await writeFile(new URL('../assets/team-gallery.json', import.meta.url), `${JSON.stringify(files, null, 2)}\n`);
console.log(`Indexed ${files.length} team photos.`);
