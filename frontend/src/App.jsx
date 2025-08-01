import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mutate } from "swr";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const App = () => {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [modelBg, setModelBg] = useState(false);
  const apiBaseUrl = import.meta.env.VITE_BASE_URL;

  const formSchema = z.object({
    name: z.string().min(3, "Team name is required"),
    matchType: z.enum(["league", "knockout", "tri-series", "series", "single"]),
    startDate: z.date(),
  });

  const {
    register,
    formState: { errors },
    reset,
  } = useForm(reslover);

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
      mutate();
    } catch (e) {}
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (teamName) {
      try {
        const response = await fetch(`${apiBaseUrl}/createTournament`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ teamName }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log(data.teamName);
        } else {
          console.error("Error:", data.message || "Something went wrong");
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    }
  };

  const handleReset = () => {
    setTeamName("");
  };

  return (
    <div>
      {modelBg && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div
            onClick={() => setModelBg(false)}
            className="absolute inset-0 bg-black opacity-45"
          ></div>
          <div className="relative z-50 w-[400px] h-auto bg-white shadow-xl rounded-xl px-10 py-6">
            <span
              className="bg-gray-900 text-xl font-semibold flex justify-center items-center w-8 h-8 text-white absolute -top-1 -right-2 rounded-full cursor-pointer hover:bg-gray-700 transition-all 2s ease-in-out duration-300"
              onClick={() => setModelBg(!modelBg)}
            >
              x
            </span>
            <h1 className="text-xl font-semibold text-center pb-4">
              Create Tournament
            </h1>
            <form
              className="flex flex-col gap-4 justify-start items-start"
              onSubmit={handleSubmit}
            >
              <label htmlFor="teamName" className="font-medium ">
                Enter Team Name
              </label>
              <input
                id="teamName"
                value={teamName}
                placeholder="enter your team name"
                onChange={(e) => setTeamName(e.target.value)}
                type="text"
                className="px-8 py-2 rounded bg-gray-200 w-full border-none outline-none"
              />
              <div className="flex w-full gap-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-blue-900 cursor-pointer w-full rounded-xl text-white font-medium"
                >
                  Reset
                </button>
                <button className="px-6 py-2 bg-green-600 cursor-pointer w-full rounded-xl text-white font-medium">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
        <div
          onClick={() => setModelBg(!modelBg)}
          className="bg-gray-300 w-16 h-16 rounded-full text-[50px] flex justify-center items-center cursor-pointer "
          title="add team"
        >
          +
        </div>
      </div>
    </div>
  );
};

export default App;
