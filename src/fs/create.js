import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {
  const filePath = path.join(__dirname, 'files', 'fresh.txt');
  const content = 'I am fresh and young';

  try {
    await fs.access(filePath);
    throw new Error('FS operation failed');
  } catch (error) {
    if (error.code === 'ENOENT') {
      try {
        await fs.writeFile(filePath, content);
        console.log('Файл fresh.txt успешно создан в папке files!');
      } catch (writeError) {
        console.error(writeError);
      }
    } else {
      console.error(error);
    }
  }
};

await create();
