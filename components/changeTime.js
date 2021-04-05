export function changeTime(time) {
  const date = new Date(time * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const formattedTime = hours + ":" + minutes.substr(-2);
  return formattedTime;
}
