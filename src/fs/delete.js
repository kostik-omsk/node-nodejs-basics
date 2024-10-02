import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remove = async () => {
  try {
    const filePath = path.join(__dirname, 'files', 'fileToRemove.txt');
    await fs.unlink(filePath);
    console.log('File removed');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('FS operation failed');
    }
  }
};

await remove();
