export async function fetchFundDetails(fundId: string) {
  const apiUrl = `https://cdn.core3-dev.ajbbuild.uk/interview/${fundId}.json`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error("Failed to fetch fund details");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}