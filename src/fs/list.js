import fs from 'fs/promises';
import path from 'path';
import { getDirname, FSError } from '../helpers/index.js';

const __dirname = getDirname(import.meta.url);

const list = async () => {
  const pathFile = path.join(__dirname, 'files');
  try {
    const arrFiles = await fs.readdir(pathFile);
    console.log(arrFiles);
  } catch (error) {
    throw new FSError();
  }
};

await list();
