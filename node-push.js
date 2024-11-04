import { fibGen } from './fib.js'

const f = fibGen();

import { Readable } from 'node:stream';

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

p.on('data', (chunk) => {
  console.log(chunk);
});
