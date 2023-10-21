const A = require("arcsecond");

const tag = type => value => ({ type, value })

const stringParser = A.sequenceOf([
    A.sequenceOf([
        A.letters,
        A.digits,
    ]).map(tag('letterDigits')),
    A.str('hello').map(tag('string')),
    A.many(A.char(' ')).map(tag('whitespace')),
    A.str('world').map(tag('string')),
    A.endOfInput.map(tag('endOfInput'))
]).map(tag('outTree'))

console.log(stringParser.run('sdfsdfsdfsdf1223434hello         world').result);