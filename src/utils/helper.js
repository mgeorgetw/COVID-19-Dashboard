// Transposes {'Key': 'Value'} to {x: key, y:value}
export const transposeKeyValue = (data) =>
  Object.entries(data).map(([key, value]) => ({
    // Shortens date string
    // x: key.replace(/\/\d{2}$/g, ""),
    x: key,
    y: value,
  }));

// Calculates daily new cases & deaths
export const calDailyDifference = (data) =>
  data.map((cur, index, array) => ({
    ...cur,
    y: index > 0 ? cur.y - array[index - 1].y : 0,
  }));

export const calPercentage = (numerator, denominator) =>
  Number(((numerator / denominator) * 100).toFixed(2));

export const calculateRemToPixels = (rem) =>
  rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

export const sumValuesInObject = (data, key) =>
  data.reduce(
    (prev, cur) => prev + cur[key],
    0 // initialValue
  );
