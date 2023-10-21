const generateArray = (unique_items = 10000, dups = 9) => {
  const array = new Array(unique_items).fill(0).map((_,k) => k + 1)
  for (let i = 0; i < 9; i++) {
    for (const el of array) {
      array.push(el)
    }
  }
  return array
}

const testA = (arr: number[], times = 100) => {
  console.log('TEST [...]')
  const then = performance.now();
  for (let i = 0; i < times; i++) {
    const s = new Set([...arr]);
  }
  const now = performance.now();
  console.log(then - now);
}

const testB = (arr: number[], times = 100) => {
  console.log('TEST for loop')
  const then = performance.now();
  for (let i = 0; i < times; i++) {
    const s = new Set();
    for (const item in arr) {
      s.add(item);
    }
  }
  const now = performance.now();
  console.log(then - now);
}
//const arr = generateArray(1000)
//testA(arr,1)
//testB(arr, 1)




const array = new Array(10).fill(0).map((_,k) => k + 1)
for (let i = 0; i < 9; i++) {
  for (const el of array) {
    array.push(el)
  }
}

console.log(array);