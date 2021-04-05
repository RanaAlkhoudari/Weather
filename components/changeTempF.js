export function changeTempF(temperature) {
  const result = ((temperature - 273.15) * 9) / 5 + 32;
  return result.toFixed(0);
}
