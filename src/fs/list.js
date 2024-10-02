import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const list = async () => {
  try {
    const files = await fs.readdir(path.join(__dirname, 'files'));
    files.forEach((file) => console.log(file));
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('FS operation failed');
    }
  }
};

await list();
