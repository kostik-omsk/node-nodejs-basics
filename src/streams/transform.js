import { pipeline } from 'node:stream/promises';
import { TransformStream } from 'node:stream/web';

const transformReversesText = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk.toString().split('').reverse().join('') + '\n');
  },
});

const transform = async () => {
  try {
    await pipeline(process.stdin, transformReversesText, process.stdout);
  } catch (err) {
    throw new Error(err);
  }
};

await transform();
