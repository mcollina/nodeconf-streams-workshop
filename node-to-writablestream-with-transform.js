import { fibGen } from './fib.js'

const f = fibGen();

function convertNumberToByteArray(n) {
  const buf = new ArrayBuffer(8);
  const view = new DataView(buf);
  view.setBigUint64(0, BigInt(n));
  return new Uint8Array(buf);
}

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

const P = new PushStream(f);

const T = new Transform({
  readableObjectMode: false,
  writableObjectMode: true,
  transform(chunk, _, callback) {
    callback(null, convertNumberToByteArray(chunk));
  }
});

const W = new WritableStream({
  write(chunk) {
    console.log(chunk);
  }
});

await pipeline(P, T, W);
