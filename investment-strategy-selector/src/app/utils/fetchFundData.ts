// src/utils/fetchFundData.ts

export const fetchFundData = async (fundId: string) => {
  const url = `https://cdn.core3-dev.ajbbuild.uk/interview/${fundId}.json`;

  try {
    const response = await fetch(url, { cache: "force-cache" });
    if (!response.ok) {
      throw new Error(`Failed to fetch fund ${fundId}: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching fund data:", error);
    throw error;
  }
};