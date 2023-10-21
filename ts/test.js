const generateArray = (unique_items = 10000, dups = 9) => {
    const array = new Array(unique_items).fill(0).map((_, k) => k + 1);
    for (let i = 0; i < 9; i++) {
        const length = array.length
        for (let j = 0; j < length; j++) {
            array.push(array[j]);
        }
    }
    return array;
};
const testA = (arr, counter = 1, times = 100, spread = false) => {
    console.log('TEST: ' + counter + (spread ? ' with spread.' : ' without spread.'));
    const then = performance.now();
    for (let i = 0; i < times; i++) {
        if (spread) {
            const s = new Set([...arr]);
        } else {
            const s = new Set(arr);
        }
        
    }
    const now = performance.now();
    console.log(now - then);
    return now - then;
};
const testB = (arr, times = 100) => {
    console.log('TEST for loop');
    const then = performance.now();
    for (let i = 0; i < times; i++) {
        const s = new Set();
        for (const item in arr) {
            s.add(item);
        }
    }
    const now = performance.now();
    console.log(now - then);
    return now - then;
};


const testFromSet = (set, counter = 0, times = 100) =>  {
    console.log(`TEST ${counter} Array.from`);
    const then = performance.now(); 
    for (let i = 0; i < times; i++) {
        const values = set.values();
        const a = Array.from(values);
    }
    const now = performance.now();
    console.log(now - then);
    return now - then;
}

const testSpreadSet = (set, counter = 0, times = 100) => {
    console.log(`TEST ${counter} spead`);
    const then = performance.now();
    for (let i = 0; i < times; i++) {
        const a = [...set];
    }
    const now = performance.now();
    console.log(now - then);
    return now - then;
}

const arr = generateArray(80000);
set = new Set(arr);


let a = 0;
let b = 0;
for (let i = 0; i < 100; i++) {
    console.log("========")
    // a += testA(arr, i)
    // b += testA(arr, i, 100, true)
    a += testFromSet(set, i, 100);
    b += testSpreadSet(set, i, 100); 
    console.log("========")
}

a /= 100;
b /= 100;

console.log("A test " + a + ", B test: " + b);