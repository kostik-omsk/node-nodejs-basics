import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const source = path.join(__dirname, 'files');

const isExists = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch (error) {
    return false;
  }
};

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
    console.log('Error:', error.message);
  }
};

await rename();
