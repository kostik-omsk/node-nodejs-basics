import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'node:stream/promises';
import zlib from 'zlib';
const decompress = async () => {
  const filePath = new URL('./files/archive.gz', import.meta.url);
  const readStream = createReadStream(filePath);
  const unzip = zlib.createGunzip();
  const writeStream = createWriteStream(new URL('./files/fileToCompress.txt', import.meta.url));

  try {
    await pipeline(readStream, unzip, writeStream);
    console.log('File decompressed.');
  } catch (err) {
    throw new Error(err.message);
  }
};

await decompress();
