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

module.exports.forEachAsync = async function(source, body, loopState) {
  return await new Promise(resolve => {
    forEachBody(source[Symbol.iterator](), body, loopState || {}, resolve);
  });
};

module.exports.forAsync = async function(fromInclusive, toExclusive, body, loopState) {
  return await new Promise(resolve => {
    forEachBody(range(fromInclusive, toExclusive), body, loopState || {}, resolve);
  });
};
