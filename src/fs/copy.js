import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const source = path.join(__dirname, 'files');
const destination = path.join(__dirname, 'files_copy');

const isExists = async (path) => {
  try {
    await fs.access(path);
    return true;
  } catch (error) {
    return false;
  }
};
const copyDirectory = async (src, dest) => {
  try {
    await fs.mkdir(dest, { recursive: true });

    const entries = await fs.readdir(src, { withFileTypes: true });
    console.log('Entries:', entries);

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
    console.log('Error in copying directory:', error.message);
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
    console.log('Error:', error.message);
  }
};

await copy();
