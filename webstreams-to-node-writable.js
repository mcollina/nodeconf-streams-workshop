import { fibGen } from './fib.js'
import { Writable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const f = fibGen();

let controller;
const readable = new ReadableStream({
  start(c) {
    controller = c;
  }
});

const timer = setTimeout(() => {
  f.next().then(({ value, done }) => {
    if (done) {
      controller.close();
    } else {
      controller.enqueue(value);
      timer.refresh();
    }
  })
}, 10);

const writable = new Writable({
  objectMode: true,
  write(chunk, encoding, callback) {
    console.log(chunk);
    callback();
  }
});

await pipeline(readable, writable);
