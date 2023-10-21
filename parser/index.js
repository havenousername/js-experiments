const updateParserState = (state, index, result) => ({
    ...state, 
    index,
    result
});

const updateParserResult = (state, result) => ({
    ...state, 
    result
});

const updateParserError = (state, error) => ({
    ...state, 
    isError: true,
    error,
});


const str = s => (parserState) => {
    if (parserState.isError) {
        return parserState;
    }

    const { targetString, index } = parserState;
    const slicedTarget = targetString.slice(index);

    if (slicedTarget.length === 0) {
        return updateParserError(parserState, `str: Tried to match "${s}", but do Unexpected error`);
    }

    if (targetString.slice(index).startsWith(s)) {
        // success!
        return updateParserState(parserState, index + s.length, s);
    } 

    return updateParserError(parserState, `Tried to match ${s}, but got "${targetString.slice(index, index + 10)}"`);
}

const sequenceOf = parsers => parserState => {
    if (parserState.isError) {
        return parserState;
    }
    const results = [];
    let nextState = parserState;

    for (let p of parsers) {
        nextState = p(nextState);
        results.push(nextState.result);
    }

    return updateParserResult(nextState, results);
}

// parser :: ParserState => ParserState 

const run = (parser, targetString) => {
    const initialState = {
        targetString,
        index: 0,
        result: null,
        isError: false,
        error: null
    }
    return parser(initialState);
}

// how we want to use it 

const parser = sequenceOf([
    str('hello there'),
    str('goodbye there')
]);

console.log(
    run(parser, '')
);