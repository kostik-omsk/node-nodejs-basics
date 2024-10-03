import path from 'path';
import { createWriteStream } from 'fs';
import { pipeline } from 'node:stream/promises';
import { getDirname } from '../helpers/index.js';

const __dirname = getDirname(import.meta.url);
const write = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');
  const outputStream = createWriteStream(filePath, { encoding: 'utf8' });

  try {
    await pipeline(process.stdin, outputStream);
  } catch (err) {
    throw new Error(err);
  }
};

await write();
