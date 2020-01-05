function forEachBody(iterator, body, loopState, callback) {
  const iteratorState = iterator.next();
  if (iteratorState.done || loopState.break === true) callback(loopState);
  else {
    body(iteratorState.value, loopState);
    setImmediate(forEachBody.bind(null, iterator, body, loopState, callback));
  }
}

function* range(fromInclusive, toExclusive) {
  while (fromInclusive < toExclusive) yield fromInclusive++;
}

async function forEachAsync(source, body, loopState) {
  return await new Promise(resolve => {
    forEachBody(source[Symbol.iterator](), body, loopState || {}, resolve);
  });
};

async function forAsync(fromInclusive, toExclusive, body, loopState) {
  return await forEachAsync(range(fromInclusive, toExclusive), body, loopState);
};

module.exports = { forAsync, forEachAsync};
