const fib_memo = (n, cache = []) => {
    if  (cache[n]) {
        return cache[n];
    } else {
        if (n < 3) {
            return 1;
        } else {
            cache[n] = fib_memo(n - 1, cache) + fib_memo(n - 2, cache)
        }
    }

    return cache[n];
}

console.log(fib_memo(6700));
