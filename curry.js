Function.prototype.curry = function (...args ) {
  const currying = (fn, ...args) => 
    (fn.length <= args.length) ?
      fn(...args) 
      : (...others) => currying(fn, ...args, ...others);
  return currying(this, ...args);
}

function curry(_f) {
  return (x) => (y) => (z) => _f(x,y,z);
}

function f(x, y, z) {
  return x + y + z;
}

console.log(curry(f)(1)(2, 3)(3));

console.log(f.curry(1)(2, 3)(3));

