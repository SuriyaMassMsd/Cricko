import { useEffect, useState } from "react";
import { fetchTeams } from "../utils/api";

export const useTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTournaments = async () => {
    try {
      const data = await fetchTeams();
      setTeams(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTournaments();
  }, []);

  return { teams, loading, reload: loadTournaments };
};
