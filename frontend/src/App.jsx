import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [teams, setTeams] = useState([]);
  const apiBaseUrl = import.meta.env.VITE_BASE_URL;

  console.log(teams);

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/players/${id}`);
  };

  const fetchTeams = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/getMatch`);
      const data = await response.json();
      if (response.ok) {
        setTeams(data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchTeams();
  }, []);
  return (
    <div className="flex justify-center py-10 items-center gap-10">
      {teams?.match?.map(({ _id: id, name, matchType }) => {
        return (
          <div
            key={id}
            onClick={() => handleClick(id)}
            className="hover:scale-105 cursor-pointer transition-all 2s ease-in-out bg-gray-300 rounded w-[300px] h-[350px]  relative"
          >
            <img
              className="w-full h-auto rounded"
              src="https://imgs.search.brave.com/phfVb1Zyb6Cv4QipBqD14ULbqaGansDSe6X6O7WDp14/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQy/NjI5NTMyNS92ZWN0/b3IvY3JpY2tldC10/b3VybmFtZW50LWNo/YW1waW9uc2hpcC1n/cmVldGluZy1jYXJk/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz05WDI3OHA3dXpv/VldMWW45TVF0cnh1/RlVvY0ZrRU8wcUdV/em5Tck1yWHhnPQ"
              alt=""
            />
            <div className="px-10 py-6">
              <h1 className="text-[20px] font-semibold text-black">{name}</h1>
              <span className="absolute -top-0 -right-0 px-3 py-1.5 rounded bg-[#0ead69] text-white font-semibold">
                {matchType ? matchType : "dummy"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
