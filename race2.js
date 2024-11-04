// Which is faster? Node.js Readable or Web ReadableStream?

import { fibGen } from './fib.js'
import { Readable } from 'node:stream';

const f = fibGen();

let counter = 0;

const r = new ReadableStream({
  async pull(controller) {
    const { value, done } = await f.next();
    if (done || counter++ > 100000) {
      controller.close();
    } else {
      controller.enqueue(value);
    }
  }
});

for await (const chunk of r) {
  console.log(chunk);
}
