import { fibGen } from './fib.js';
import { setTimeout as sleep } from 'node:timers/promises';

const f = fibGen();

while (true) {
  await sleep(10);
  console.log((await f.next()).value);
}

