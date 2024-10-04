import { Worker } from 'worker_threads';
import { cpus } from 'os';

const workerFile = new URL('./worker.js', import.meta.url);
const cpu = cpus();
// const cpu = Array.from({ length: 4 }); // you can set the number of default threads

const performCalculations = async () => {
  let number = 10;

  const arrWorkers = await Promise.allSettled(
    cpu.map(
      (_, i) =>
        new Promise((resolve, reject) => {
          const worker = new Worker(workerFile, { workerData: number + i });
          worker.on('message', resolve);
          worker.on('error', reject);
        }),
    ),
  );

  const arrResults = arrWorkers.map(({ status, value }) => {
    return {
      status: status === 'fulfilled' ? 'resolved' : 'error',
      data: status === 'fulfilled' ? value : null,
    };
  });

  console.log(arrResults);
};

await performCalculations();
