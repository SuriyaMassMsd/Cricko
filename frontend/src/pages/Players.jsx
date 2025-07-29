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

  return (
    <div className="flex justify-center py-10 items-center gap-10">
      {players?.map(({ _id: id, playerName }) => {
        return (
          <div key={id} className="flex flex-col justify-center items-center">
            <img
              className="w-20 h-20 rounded-full"
              src="https://imgs.search.brave.com/EdUDgFxOWJY4ctoYqC0PihEVUkN0lMop-fUM2qHRDc4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9m/cm9udC12aWV3LW1h/bGUtcnVnYnktcGxh/eWVyLWhvbGRpbmct/YmFsbC13aXRoLWNv/bG9yLWVmZmVjdF8y/My0yMTQ4NzkzMzIy/LmpwZz9zZW10PWFp/c19oeWJyaWQmdz03/NDA"
              alt=""
            />
            <h1 className="font-semibold text-2xl">{playerName}</h1>
          </div>
        );
      })}
      <div></div>
    </div>
  );
};

export default Players;
