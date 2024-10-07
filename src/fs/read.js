import fs from 'fs/promises';
import path from 'path';
import { getDirname, FSError } from '../helpers/index.js';

const __dirname = getDirname(import.meta.url);

const read = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

  try {
    const content = await fs.readFile(filePath, 'utf8');
    console.log(content);
  } catch (error) {
    throw new FSError();
  }
};

await read();
