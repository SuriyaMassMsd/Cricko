import { useEffect, useState } from "react";
import { fetchTournaments } from "../utils/api";

export const useTournaments = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTournaments = async () => {
    try {
      const data = await fetchTournaments();
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
