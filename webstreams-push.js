import { fibGen } from './fib.js'

const f = fibGen();

const readable = new ReadableStream({
  start(controller) {
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
  },
  cancel() {
    clearTimeout(timer);
    f.return();
  }
});



for await (const chunk of readable) {
  console.log(chunk);
}
