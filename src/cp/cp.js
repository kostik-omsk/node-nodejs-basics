import { spawn } from 'child_process';
import { getDirname } from '../helpers/getDirname.js';

const __dirname = getDirname(import.meta.url);

const spawnChildProcess = async (args) => {
  const child_process_path = `${__dirname}/files/script.js`;

  const child = spawn('node', [child_process_path, ...args]);

  process.stdin.pipe(child.stdin);

  child.stdout.pipe(process.stdout);
};

spawnChildProcess(['arg1', 'arg2', 'arg3']);
