export async function fetchData(url) {
  const res = await fetch(url);
  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
}
