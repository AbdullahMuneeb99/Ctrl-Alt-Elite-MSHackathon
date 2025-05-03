// Utility for API calls
export async function fetchData(endpoint) {
  const response = await fetch(endpoint);
  return response.json();
}
