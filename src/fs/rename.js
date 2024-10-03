import fs from 'fs/promises';
import path from 'path';

import { getDirname, FSError, isExists } from '../helpers/index.js';

const __dirname = getDirname(import.meta.url);
const source = path.join(__dirname, 'files');

const rename = async () => {
  const file = path.join(source, 'wrongFilename.txt');
  const fileRename = path.join(source, 'properFilename.md');

  try {
    const isFileExists = await isExists(file);
    const isFileRenameExists = await isExists(fileRename);

    if (!isFileExists && isFileRenameExists) {
      throw new Error('FS operation failed');
    }
    await fs.rename(file, fileRename);
  } catch (error) {
    throw new FSError(error.message);
  }
};

await rename();
