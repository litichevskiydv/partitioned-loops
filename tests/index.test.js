const { forEachAsync, forAsync } = require("../src/index");

test("Must compute sum of numbers in array via async forEachAsync", async () => {
  // Given
  const array = [1, 2, 3, 4, 5];
  const expectedSum = array.reduce((accumulator, currentValue) => accumulator + currentValue);

  // When
  const finalState = await forEachAsync(array, (currentValue, loopState) => (loopState.sum += currentValue), {
    sum: 0
  });

  // Then
  expect(finalState.sum).toBe(expectedSum);
});

test("Must break async forEachAsync", async () => {
  // Given
  const array = [1, 2, 3, 4, 5];
  const expectedSum = array.filter(x => x <= 4).reduce((accumulator, currentValue) => accumulator + currentValue);

  // When
  const finalState = await forEachAsync(
    array,
    (currentValue, loopState) => {
      if (currentValue > 4) loopState.break = true;
      else loopState.sum += currentValue;
    },
    { sum: 0 }
  );

  // Then
  expect(finalState.sum).toBe(expectedSum);
});

test("Must rethrow errors from forEachAsync body", async () => {
  // Given
  const expectedError = new Error("Something went wrong");

  // When, Then
  await expect(
    forEachAsync([1], x => {
      throw expectedError;
    })
  ).rejects.toEqual(expectedError);
});

test("Must compute sum of numbers in array via forAsync", async () => {
  // Given
  const array = [1, 2, 3, 4, 5];
  const expectedSum = array.reduce((accumulator, currentValue) => accumulator + currentValue);

  // When
  const finalState = await forAsync(0, array.length, (i, loopState) => (loopState.sum += array[i]), { sum: 0 });

  // Then
  expect(finalState.sum).toBe(expectedSum);
});

test("Must break forAsync", async () => {
  // Given
  const array = [1, 2, 3, 4, 5];
  const expectedSum = array.filter(x => x <= 4).reduce((accumulator, currentValue) => accumulator + currentValue);

  // When
  const finalState = await forAsync(
    0,
    array.length,
    (i, loopState) => {
      if (array[i] > 4) loopState.break = true;
      else loopState.sum += array[i];
    },
    { sum: 0 }
  );

  // Then
  expect(finalState.sum).toBe(expectedSum);
});

test("Must rethrow errors from forAsync body", async () => {
  // Given
  const expectedError = new Error("Something went wrong");

  // When, Then
  await expect(
    forAsync(0, 1, x => {
      throw expectedError;
    })
  ).rejects.toEqual(expectedError);
});
