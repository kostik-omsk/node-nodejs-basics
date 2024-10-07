import path from 'path';
import { readFile } from 'fs/promises';
import { release, version } from 'node:os';
import { createServer as createServerHttp } from 'node:http';
import { fileURLToPath } from 'url';
import './files/c.js';

const random = Math.random();

let unknownObject;

if (random > 0.5) {
  unknownObject = JSON.parse(await readFile(new URL('./files/a.json', import.meta.url)));
  // (ExperimentalWarning) marked as experimental in node v22.9.0
  // unknownObject = (await import('./files/a.json', { with: { type: 'json' } })).default;
} else {
  unknownObject = JSON.parse(await readFile(new URL('./files/b.json', import.meta.url)));
  // (ExperimentalWarning) marked as experimental in node v22.9.0
  // unknownObject = (await import('./files/a.json', { with: { type: 'json' } })).default;
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };
