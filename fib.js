
export function fibonacci(n) {
  let a = 0, b = 1, c = 0;
  for (let i = 0; i < n; i++) {
    c = a + b;
    a = b;
    b = c;
  }
  return a;
}

export async function* fibGen() {
  let n = 0;
  let reverse = false;
  while (true) {
    yield fibonacci(reverse ? n-- : n++);
    if (n === 100 || n === 0) reverse = !reverse;
  }
}
