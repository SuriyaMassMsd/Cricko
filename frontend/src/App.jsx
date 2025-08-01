import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { mutate } from "swr";
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
    handleSubmit,
  } = useForm({
    reslover: zodResolver(formSchema),
    defaultValues: {
      name: "Kova Kight Riders",
      matchType: "league",
      startDate: new Date().toISOString().split("T")[0],
    },
  });

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
      // mutate();
    } catch (e) {}
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const submitData = async (datas) => {
    console.log(datas);
    const { name, matchType, startDate } = datas;
    if (datas) {
      try {
        const response = await fetch(`${apiBaseUrl}/createTournament`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, matchType, startDate }),
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
    <div className="px-20">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold py-4">
          Welcome to <span className="text-red-500 font-semibold">Cricko</span>{" "}
          Cricket Scorer
        </h1>
        <div
          onClick={() => setModelBg(!modelBg)}
          title="add team"
          className="font-semibold px-6 py-2 bg-green-500 text-white cursor-pointer rounded hover:bg-yellow-600 duration-700 ease-in-out 2s"
        >
          Create Tournament
        </div>
      </div>
      {modelBg && (
        <div className="fixed inset-0 z-40 flex items-center justify-center ">
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
              className="flex flex-col gap-4 justify-start items-start w-full max-w-md mx-auto p-4"
              onSubmit={handleSubmit(submitData)}
            >
              {/* Team Name */}
              <label htmlFor="name" className="font-medium">
                Enter Team Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your team name"
                {...register("name")}
                className="px-4 py-2 rounded bg-gray-200 w-full border-none outline-none"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}

              {/* Match Type */}
              <label htmlFor="matchType" className="font-medium">
                Match Type
              </label>
              <select
                id="matchType"
                {...register("matchType")}
                className="px-4 py-2 rounded bg-gray-200 w-full border-none outline-none"
              >
                <option value="league">League</option>
                <option value="knockout">Knockout</option>
                <option value="tri-series">Tri-series</option>
                <option value="series">Series</option>
                <option value="single">Single</option>
              </select>
              {errors.matchType && (
                <p className="text-red-500 text-sm">
                  {errors.matchType.message}
                </p>
              )}

              {/* Start Date */}
              <label htmlFor="startDate" className="font-medium">
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                {...register("startDate")}
                className="px-4 py-2 rounded bg-gray-200 w-full border-none outline-none"
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm">
                  {errors.startDate.message}
                </p>
              )}

              {/* Buttons */}
              <div className="flex w-full gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2 bg-blue-900 w-full rounded-xl text-white font-medium"
                >
                  Reset
                </button>
                <button className="px-6 py-2 bg-green-600 w-full rounded-xl text-white font-medium">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="justify-center py-10 items-center gap-10 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] ">
        {teams?.match?.map(({ _id: id, name, matchType }) => {
          return (
            <div
              key={id}
              onClick={() => handleClick(id)}
              className="cursor-pointer shadow-md hover:shadow-lg transition-shadow  2s ease-in-out duration-300 rounded-lg overflow-hidden bg-white  relative "
            >
              <img
                className="w-full h-60 rounded object-cover"
                src="https://imgs.search.brave.com/phfVb1Zyb6Cv4QipBqD14ULbqaGansDSe6X6O7WDp14/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQy/NjI5NTMyNS92ZWN0/b3IvY3JpY2tldC10/b3VybmFtZW50LWNo/YW1waW9uc2hpcC1n/cmVldGluZy1jYXJk/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz05WDI3OHA3dXpv/VldMWW45TVF0cnh1/RlVvY0ZrRU8wcUdV/em5Tck1yWHhnPQ"
                alt=""
              />
              <div className="px-10 py-6">
                <h1 className="text-[20px] font-semibold text-black truncate">
                  {name}
                </h1>
                <span className="absolute  px-3 py-1.5 rounded bg-[#0ead69] text-white font-semibold top-3 right-3 text-xs uppercase tracking-wide">
                  {matchType ? matchType : "dummy"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
