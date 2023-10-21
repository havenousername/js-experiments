"use strict"

const generateObject = {
    start: 1,
    end: 10,
};

generateObject[Symbol.iterator] = function () {
    let current = this.start;
    let last = this.end;

    return {
        next() {
            if (current <= last) {
                return {
                    done: false,
                    value: current++
                }
            } else {
                return {
                    done: true 
                }
            }
        }
    }
}

const newObj = {
    name: 'Bugai',
    username: 'Oliev',
    password: 'pass01'
}

newObj[Symbol.iterator] = function () {
    let i = Object.keys(this).length - 1;

    return {
        next: () => {
            return {
                done: (i >= 0) ? false : true,
                value: Object.values(this)[i--] 
            }
        }
    }
}

for (let n of generateObject) {
    console.log(n);
}

for (let i of newObj) {
    console.log(i);
}