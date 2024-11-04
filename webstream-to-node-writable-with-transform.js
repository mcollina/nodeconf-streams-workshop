import { fibGen } from './fib.js'
import { Writable } from 'node:stream';
import { pipeline } from 'node:stream/promises';

function convertNumberToByteArray(n) {
  const buf = new ArrayBuffer(8);
  const view = new DataView(buf);
  view.setBigUint64(0, BigInt(n));
  return new Uint8Array(buf);
}


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

const transform = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(convertNumberToByteArray(chunk));
  }
});

const writable = new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk);
    callback();
  }
});

await pipeline(readable, transform, writable);
