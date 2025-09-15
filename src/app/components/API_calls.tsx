import { cache } from "react";

async function Level(endpoint: string, jsonsubmit: any) {
  const url = `https://trail-api-y0t9.onrender.com/${endpoint}`;
  let response;

  if (endpoint === "submit") {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        connections: [["A", "1"]]
      }),
    });
  } else { 
    response = await fetch(url, { method: "POST" });
  }

  if (!response.ok) throw new Error(`Failed to fetch Data: ${response.status}`);

  const data = await response.json();
  console.log(`API response data:`, data);
  return data;
}

export default Level;
