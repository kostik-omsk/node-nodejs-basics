import fs from 'fs/promises';

export async function isExists(path) {
  try {
    await fs.access(path);
    return true;
  } catch (error) {
    return false;
  }
}
