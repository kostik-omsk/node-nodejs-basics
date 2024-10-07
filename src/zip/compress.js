import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'node:stream/promises';
import zlib from 'zlib';

const compress = async () => {
  const filePath = new URL('./files/fileToCompress.txt', import.meta.url);
  const readStream = createReadStream(filePath);
  const gzip = zlib.createGzip();
  const writeStream = createWriteStream(new URL('./files/archive.gz', import.meta.url));

  try {
    await pipeline(readStream, gzip, writeStream);
    console.log('File compressed');
  } catch (err) {
    throw new Error(err.message);
  }
};

await compress();
