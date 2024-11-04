import { fibonacci, fibGen } from './fib.js'

const f = fibGen();

import { Readable, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

class PushStream extends Readable {
  constructor(generator) {
    super({ objectMode: true });
    this.generator = generator;

    this.timer = setTimeout(() => {
      this.generator.next().then(({ value, done }) => {
        if (done) {
          this.push(null);
        } else {
          if (this.push(value)) {
            this.timer.refresh();
          }
        }
      })
    }, 10)
  }

  _read() {
  }

  _destroy(err, cb) {
    clearTimeout(this.timer);
    this.generator.return();
    cb(err);
  }
}

const p = new PushStream(f);

const w = new WritableStream({
  write(chunk) {
    console.log(chunk);
  }
})

await pipeline(p, w)
