export function changeTempC(temperature) {
  const result = temperature - 273.15;
  return result.toFixed(0);
}
