import { Worker } from 'worker_threads';
import { cpus } from 'os';

const workerFile = new URL('./worker.js', import.meta.url);
const cpu = cpus();

const performCalculations = async () => {
  let number = 10;

  const workerResults = await Promise.allSettled(
    cpu.map(
      (_, i) =>
        new Promise((resolve, reject) => {
          const worker = new Worker(workerFile, { workerData: number + i });
          worker.on('message', resolve);
          worker.on('error', reject);
        }),
    ),
  );

  const arrResults = workerResults.map(({ status, value }) => {
    return {
      status: status === 'fulfilled' ? 'resolved' : 'error',
      data: status === 'fulfilled' ? value : null,
    };
  });

  console.log(arrResults);
};

await performCalculations();
