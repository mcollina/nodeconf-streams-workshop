import { fibonacci, fibGen } from './fib.js'

const f = fibGen();

import { Readable, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { setTimeout as sleep } from 'node:timers/promises';

const w = new WritableStream({
  async write(chunk) {
    await sleep(10);
    console.log(chunk);
  }
})

await pipeline(f, w)
