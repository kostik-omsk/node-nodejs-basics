import fs from 'fs/promises';
import path from 'path';
import { getDirname } from '../helpers/getDirname.js';
import { isExists } from '../helpers/isExists.js';
import { FSError } from '../helpers/errors.js';

const __dirname = getDirname(import.meta.url);
const content = 'I am fresh and young';

const create = async () => {
  const filePath = path.join(__dirname, 'files', 'fresh.txt');

  try {
    const isFileExists = await isExists(filePath);

    if (isFileExists) {
      throw new Error('FS operation failed');
    }

    await fs.writeFile(filePath, content);
  } catch (error) {
    throw new FSError(error.message);
  }
};

await create();
