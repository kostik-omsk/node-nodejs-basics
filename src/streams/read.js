import path from 'path';
import { createReadStream } from 'fs';
import { pipeline } from 'node:stream/promises';
import { getDirname } from '../helpers/index.js';

const __dirname = getDirname(import.meta.url);

const read = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToRead.txt');
  const stream = createReadStream(filePath, { encoding: 'utf8' });
  try {
    await pipeline(stream, process.stdout);
  } catch (err) {
    throw new Error(err);
  }
};

await read();
