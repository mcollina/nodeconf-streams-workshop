import { fibGen } from './fib.js'

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

for await (const chunk of readable) {
  console.log(chunk);
}
