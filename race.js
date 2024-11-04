// Which is faster? Node.js Readable or Web ReadableStream?

import { fibGen } from './fib.js'
import { Readable } from 'node:stream';

const f = fibGen();

let counter = 0;

const r = new Readable({
  objectMode: true,
  read(size) {
    f.next().then(({ value, done }) => {
      if (done || counter++ > 100000) {
        this.push(null);
      } else {
        this.push(value);
      }
    });
  }
});

r.on('data', (chunk) => {
  console.log(chunk);
});
