import fs from 'fs/promises';
import path from 'path';
import { getDirname, FSError } from '../helpers/index.js';

const __dirname = getDirname(import.meta.url);

const remove = async () => {
  try {
    const filePath = path.join(__dirname, 'files', 'fileToRemove.txt');
    await fs.unlink(filePath);
  } catch (error) {
    throw new FSError();
  }
};

await remove();
