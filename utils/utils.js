export const getRandomValue = (min, max) => {
  if (min === undefined && max === undefined) {
    return Math.random();
  } else if (min !== undefined && max === undefined) {
    return min + Math.random() * (1 - min);
  } else if (min !== undefined && max !== undefined) {
    return min + Math.random() * (max - min);
  } else {
    return undefined;
  }
};

export const getRandomNum = (value = 0.5) => {
  return Math.random() - value;
};

export const getRandomPosition = (multiplier = 1) => {
  let x = getRandomNum() * multiplier;
  let y = getRandomNum() * multiplier;
  let z = getRandomNum() * multiplier;
  return [x, y, z];
};

export const getRandomRotation = (min = 0, max = Math.PI) => {
  let x = getRandomValue(min, max);
  let y = getRandomValue(min, max);
  let z = getRandomValue(min, max);
  return [x, y, z];
};
