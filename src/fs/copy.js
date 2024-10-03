import fs from 'fs/promises';
import path from 'path';
import { isExists } from '../helpers/isExists.js';
import { FSError } from '../helpers/errors.js';
import { getDirname } from '../helpers/getDirname.js';

const __dirname = getDirname(import.meta.url);
const source = path.join(__dirname, 'files');
const destination = path.join(__dirname, 'files_copy');

const copyDirectory = async (src, dest) => {
  try {
    await fs.mkdir(dest, { recursive: true });

    const entries = await fs.readdir(src, { withFileTypes: true });

    const promises = entries.map(async (entry) => {
      const sourcePath = path.join(src, entry.name);
      const destinationPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        await copyDirectory(sourcePath, destinationPath);
      } else {
        await fs.copyFile(sourcePath, destinationPath);
      }
    });

    await Promise.all(promises);
  } catch (error) {
    throw new FSError(error.message);
  }
};

const copy = async () => {
  try {
    const isSorceExists = await isExists(source);
    const isDestinationExists = await isExists(destination);

    if (!isSorceExists || isDestinationExists) {
      throw new Error('FS operation failed');
    }

    await copyDirectory(source, destination);
  } catch (error) {
    throw new FSError(error.message);
  }
};

await copy();
