import { fibGen } from './fib.js'
import { Readable } from 'node:stream';

const f = fibGen();

const r = new Readable({
  objectMode: true,
  read(size) {
    f.next().then(({ value, done }) => {
      if (done) {
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
