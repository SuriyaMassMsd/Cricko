import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Players = () => {
  const apiBaseUrl = import.meta.env.VITE_BASE_URL;
  const [players, setPlayers] = useState([]);
  const { id } = useParams();

  const fetchPlayers = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/getTeamPlayer/${id}`);
      const data = await response.json();
      if (response.ok) {
        setPlayers(data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  console.log(players);

  return <div>Players</div>;
};

export default Players;
