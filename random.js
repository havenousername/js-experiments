/**
 * 
 * @param {Number} seed 
 * @param {Number} times 
 * @param {Number} a 
 * @param {Number} c 
 * @param {Number} m 
 */
function linearCongruentalGenerator(
  seed,
  times,
  a,
  c,
  m
) {
  const calc = () => (a * seed + c) % m;
  
  for (let i = 0; i < times; i++) {
    seed = calc(seed);
  }

  return seed;
}
/**
 * 
 * @param {int} seed 
 */
function lcg(seed = new Date().getTime()) {
  return linearCongruentalGenerator(seed, 10, seed * 10000, seed * 90, seed * 99934);
}

/**
 * 
 * @param {Number} seed 
 * @returns {Number} random
 */
function random(seed = new Date().getTime()) {
  return +('0.' + lcg(seed));
}

const getNumberInRange = (end = 10, init = 0) => {
  const r = random();
  if (r < 0.14) return 0;
  return Math.round(r * end) - 1 - init;
}

const factorial = (n, cache = []) => {
  if (cache[n]) return cache[n];
  if (n < 1) return 1;
  cache[n] = n * factorial(n-1, cache);
  return cache[n];
}

const isCombination = (array) => {
  const variations = array.reduce((acc, el) => el.length > acc.length ? el : acc, []);
  const n = array.length;
  const r = variations.length;
  return factorial(n) / (factorial(n - r) * factorial(r))
}

const isCartesian = (array) => {
  const variations = array.reduce((acc, el) => el.length > acc.length ? el : acc, []);
  return Math.pow(2, variations.length) === array.length;
}

function cartesian(nums) {
  const result = [];
  const n = nums.length;

  for (let i = 0; i < Math.pow(2, n); i++) {
      const subset = [];
      for (let j = 0; j < n; j++) {
          if ((i & (1 << j)) > 0) {
              subset.push(nums[j]);
          }
      }
      result.push(subset);
  }

  return result;
}

const generateRndSorted = (array, generateIndex = true, rndSorted = Array(array.length).fill(undefined)) => {
  const indexes = array.map((el) => {
    let index = getNumberInRange(array.length);
    while (!!rndSorted[index] || rndSorted[index] === 0) {
      index = getNumberInRange(array.length);
    }
    console.log(index);
    rndSorted[index] = el;
    return index;
  });
  if (generateIndex) {
    return indexes;
  }
  return rndSorted;
}

function Probability(initialState) {
  const state = {
    experiment: initialState?.experiment ?? '',
    // sample space
    omega: initialState?.omage ?? new Set(),
    // F events
    eventSpace: initialState?.eventSpace ?? [],
  };

  const isInOmega = (events) => {
    for (const event of events) {
      if (!state.omega.has(event)) {
        return false;
      }
    }
    return true
  }

  const generateRandom = (cumulative, i) => {
    if (cumulative < 0.1 ) return cumulative;
    let rand = random(Date.now() + i);
    while (rand > cumulative) {
      rand = random();
    } 

    return rand;
  }

  return () => ({
    setExperiment(exp) {
      state.experiment = exp;
      state.omega = new Set();
      state.eventSpace = [];
    },
    getExperiment() {
      return state.experiment;
    },
    /**
     * 
     * @param {Array} space 
     * @param {Array} events 
     */
    initializeSampleSpace(space, events) {
      for (const spaceElement of space) {
        state.omega.add(spaceElement);
      }

      if (!isInOmega(events)) {
        throw new Error(`Cannot find event ${events} in ${space}`);
      }

      const newEventSpace = [];
      let cumulative = 1;

      events = cartesian(events).sort((a, b) => a.length > b.length ? 1 : -1);

      if (!isCartesian(events)) {
        throw new Error("Not cartesian events.")
      }

      // !works only with sorted cartesian events
      const isCountCumulative = (events, i) => {
        return events[i+1].length >= 2;
      }

      for (let i = 0; i < events.length; i++) {
        if (events[i].length < 2) {
          const rand = generateRandom(cumulative, i);
          const generateProbability = () => isCountCumulative(events, i) ?  Math.max(cumulative, 0) : cumulative >= 0 ? rand : 0; 
          const event = {
            element: events[i],
            prob: generateProbability(),
          };
          cumulative = cumulative - rand;
          newEventSpace.push(event);
        } else {
          // Comes from the Axiom of probability, for disjoints events
           newEventSpace.push({
            element: events[i],
            prob: newEventSpace
              .filter((el) => el.element.length === 1 && events[i].find(event => event === el.element[0]))
              .reduce((acc, el) => acc + el.prob, 0)
           });
        }
      }
      state.eventSpace = newEventSpace;    
    },

    checkAxioms() {
      return {
        allSpacesPositive: state.eventSpace.every(el => el.prob >= 0),
        probabilityOmega: (state.eventSpace
          .filter(i => i.element.length < 2)
          .reduce((acc, i) => acc + i.prob, 0))
          .toPrecision(5) == 1,
      };
    },

    /**
     * 
     * @param {Object} eventOne 
     * @param {Object} eventTwo 
     * @returns {Boolean}
     */
    areDisjointEvents(eventOne, eventTwo) {
      let one, two;
      if (eventOne.element.length > eventTwo.element.length) {
        one = eventTwo;
        two = eventOne;
      } else {
        one = eventOne;
        two = eventTwo;
      }
      return !one.element.every(el => two.element.find(el2 => el2 === el));
    },

    getEventSpace() {
      return state.eventSpace;
    },
  }) 
}

const newProbability = Probability();
const probability = newProbability();
probability.setExperiment("tossing a six-sided die");
probability.initializeSampleSpace([1, 2, 3, 4, 5, 6], [1, 2, 3]);

const eventSpace = probability.getEventSpace();
console.log(eventSpace);
console.log(probability.checkAxioms());

// console.log(probability.areDisjointEvents(eventSpace[1], eventSpace[1]));
console.log(cartesian(eventSpace));
