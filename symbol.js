let sym = Symbol.for('symbol01');
let sym1 = Symbol.for('symbol01');

let sym2 = Symbol('symbol01');
let sym3 = Symbol('symbol01');

const sumName = Symbol.keyFor(sym);
// console.log(sym, sym1, sym === sym1, sumName);


let person = {
    name: 'Jack',
    age: 20,
    [Symbol.for('pass')]: 'one12'
}

console.log(person[Symbol.for('pass')]);
console.log(Object.getOwnPropertySymbols(person));