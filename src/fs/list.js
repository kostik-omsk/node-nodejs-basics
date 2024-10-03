import fs from 'fs/promises';
import path from 'path';
import { getDirname, FSError } from '../helpers/index.js';

const __dirname = getDirname(import.meta.url);

const list = async () => {
  try {
    const files = await fs.readdir(path.join(__dirname, 'files'));
    files.forEach((file) => console.log(file));
  } catch (error) {
    throw new FSError(error.message);
  }
};

await list();
