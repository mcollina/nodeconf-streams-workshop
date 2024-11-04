import { fibGen } from './fib.js';
import { setTimeout as sleep } from 'node:timers/promises';
const f = fibGen();

const readable = new ReadableStream({
  highwaterMark: 16,
  async pull(controller) {
    const chunk = await f.next();
    controller.enqueue(chunk.value);
  }
});

for await (const chunk of readable) {
  await sleep(10);
  console.log(chunk);
}
