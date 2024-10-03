import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import { pipeline } from 'node:stream/promises';
import { getDirname } from '../helpers/index.js';

const __dirname = getDirname(import.meta.url);

const calculateHash = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');
  const hash = crypto.createHash('sha256');

  try {
    const readStream = fs.createReadStream(filePath);
    await pipeline(readStream, hash);
    console.log(hash.digest('hex'));
  } catch (error) {
    throw new Error(error.message);
  }
};

await calculateHash();
