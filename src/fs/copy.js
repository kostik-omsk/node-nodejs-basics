import fs from 'fs/promises';
import path from 'path';
import { isExists } from '../helpers/isExists.js';
import { FSError } from '../helpers/errors.js';
import { getDirname } from '../helpers/getDirname.js';

const __dirname = getDirname(import.meta.url);

const source = path.join(__dirname, 'files');
const destination = path.join(__dirname, 'files_copy');

const copy = async () => {
  try {
    const isSorceExists = await isExists(source);
    const isDestinationExists = await isExists(destination);
    if (!isSorceExists || isDestinationExists) {
      throw new Error('FS operation failed');
    }
    await fs.cp(source, destination, { recursive: true });
  } catch (error) {
    throw new FSError(error.message);
  }
};

await copy();
