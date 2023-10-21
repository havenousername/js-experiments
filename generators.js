// Generators

function *generate() {

    try {
        yield 1;
        yield 2;
        yield 3;
    } catch (e) {
        console.log(e);
    }
    
}

// console.log(generate());

// let iter = generate();


// console.log(iter.next());
// console.log(iter.return());
// console.log(iter.throw(new Error('Error')));


function *generateRange(start, end) {
    let current = start;

    while (current <= end) {
        yield current++;
    }
}


for (let number of generateRange(1, 100)) {
    console.log(number);
}


// Set and Map 

// Map 
let map = new Map();

// or 
/*
    let map = new Map([
        ['str', 'string'],
        [13, 'number']
    ])

*/
map
    .set('str', 'string')
    .set(100, 'number')
    .set(false, 'boolean');

for (let m of map) {
    console.log(m);
}    
console.log(map.size, map.has('3'));

// Iterators
// keys(), values(), entries();

console.log(map.delete(100));


// Set 
let j = {name: 'l'};
let k = {name: 'k'};
let n = {name: 'n'};


// WeakMap, WeakMap