const BASE_URL = "https://perk-api-production.up.railway.app"; //"http://localhost:3000"; //

export async function fetchUniversalTree() {
  try {
    const res = await fetch(`${BASE_URL}/tree`);
    const data = await res.json();
    return data;
  } catch {
    throw new Error("There was an error fetching the universal tree");
  }
}
