import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
  try {
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');
    const content = await fs.readFile(filePath, 'utf8');
    console.log(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('FS operation failed');
    }
  }
};

await read();
