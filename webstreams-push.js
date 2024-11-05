import { fibGen } from './fib.js'

const f = fibGen();

const readable = new ReadableStream({
  start(controller) {
    this.timer = setTimeout(() => {
      f.next().then(({ value, done }) => {
        if (done) {
          controller.close();
        } else {
          controller.enqueue(value);
          if (controller.desiredSize > 0) {
            this.timer.refresh();
          }
        }
      })
    }, 10);
  },
  pull(controller) {
    this.timer.refresh();
  },
  cancel() {
    clearTimeout(this.timer);
    f.return();
  }
});



for await (const chunk of readable) {
  console.log(chunk);
}
