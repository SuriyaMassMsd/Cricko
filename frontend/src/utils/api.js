const apiBaseUrl = import.meta.env.VITE_BASE_URL;

export const fetchTournaments = async () => {
  const res = await fetch(`${apiBaseUrl}/getMatch`);
  if (!res.ok) throw new Error("Failed to fetch matches");
  return res.json();
};

export const fetchTeams = async () => {
  const res = await fetch(`${apiBaseUrl}/getTeams`);
  if (!res.ok) throw new Error("Failed to fetch teams");
  return res.json();
};

export const createTournament = async (tournament) => {
  const { name, matchType, startDate } = tournament;

  console.log(name, matchType, startDate);

  const res = await fetch(`${apiBaseUrl}/createTournament`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, matchType, startDate }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Creation failed");
  return data;
};

export const createTeams = async (teams) => {
  // for (let pair of teams.entries()) {
  //   console.log("Sending:", pair[0], pair[1]);
  // }

  const res = await fetch(`${apiBaseUrl}/createTeam`, {
    method: "POST",
    body: teams,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Creation failed");
  return data;
};
