import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PlayerCard from "../components/PlayerCard";

const Players = () => {
  const apiBaseUrl = import.meta.env.VITE_BASE_URL;
  const [modelBg, setModelBg] = useState(false);
  const [players, setPlayers] = useState([]);
  const { id } = useParams();

  const playerSchema = z.object({
    playerName: z.string().min(1, { message: "Player name is required" }),

    role: z.enum(["batsman", "bowler", "all-rounder", "wicket-keeper"], {
      errorMap: () => ({ message: "Select a valid player role" }),
    }),

    teamId: z.string().min(1, { message: "Team is required" }),

    battingStyle: z.string().optional(),

    bowlingStyle: z.string().optional(),

    jerseyNumber: z
      .union([z.string(), z.number()])
      .optional()
      .refine((val) => val === undefined || !isNaN(Number(val)), {
        message: "Jersey number must be a number",
      }),

    profilePic: z.custom((val) => val instanceof FileList && val.length > 0, {
      message: "Profile picture is required",
    }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(playerSchema),
  });

  const handleReset = () => reset();

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

  const submitData = async (data) => {
    console.log(data);
    const formData = new FormData();

    for (const key in data) {
      const value = data[key];

      if (key === "profilePic" && value instanceof FileList) {
        formData.append("profilePic", value[0]);
      } else {
        formData.append(key, value);
      }
    }

    try {
      const response = await fetch(`${apiBaseUrl}/createPlayer`, {
        method: "POST",

        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Success:", data);
      } else {
        console.error("❌ Error:", data.message || "Upload failed");
      }
    } catch (err) {
      console.error("❌ Network Error:", err);
    }
  };

  return (
    <div>
      {modelBg && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          {/* Backdrop */}
          <div
            onClick={() => setModelBg(false)}
            className="absolute inset-0 bg-black opacity-45"
          ></div>

          {/* Modal Box */}
          <div className="relative z-50 w-full max-w-xl bg-white shadow-xl rounded-xl px-10 py-8 ">
            {/* Close Button */}
            <button
              onClick={() => setModelBg(false)}
              className="absolute top-3 right-3 bg-gray-900 text-white text-lg w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700 transition cursor-pointer"
            >
              ×
            </button>

            {/* Modal Title */}
            <div className="flex justify-center items-center">
              <h1 className="text-2xl font-semibold text-center pb-4">
                Create Player
              </h1>
              <img
                src="/ipl-logo.png"
                alt="player with bat"
                className="w-14 h-auto"
              />
            </div>

            {/* Form */}
            <form
              className="flex flex-col gap-4 justify-start items-start w-full max-w-lg mx-auto "
              onSubmit={handleSubmit(submitData)}
            >
              <div className="grid grid-cols-2 gap-8 ">
                {/* Player Name */}
                <div className="flex flex-col ">
                  <label htmlFor="playerName" className="font-medium py-2">
                    Player Name
                  </label>
                  <input
                    id="playerName"
                    type="text"
                    placeholder="Enter player name"
                    {...register("playerName", {
                      required: "Player name is required",
                    })}
                    className="px-4 py-2 rounded bg-gray-200 w-full border-none outline-none"
                  />
                  {errors.playerName && (
                    <p className="text-red-500 text-sm">
                      {errors.playerName.message}
                    </p>
                  )}
                </div>

                {/* Role */}
                <div className="flex flex-col ">
                  <label htmlFor="role" className="font-medium py-2">
                    Role
                  </label>
                  <select
                    id="role"
                    {...register("role", { required: "Role is required" })}
                    className="px-4 py-2 rounded bg-gray-200 w-full border-none outline-none"
                  >
                    <option value="batsman">Batsman</option>
                    <option value="bowler">Bowler</option>
                    <option value="all-rounder">All-Rounder</option>
                    <option value="wicket-keeper">Wicket Keeper</option>
                  </select>
                  {errors.role && (
                    <p className="text-red-500 text-sm">
                      {errors.role.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Batting Style */}
              <div className="grid grid-cols-2 gap-8 ">
                <div className="flex flex-col">
                  <label htmlFor="battingStyle" className="font-medium py-2">
                    Batting Style
                  </label>
                  <input
                    id="battingStyle"
                    type="text"
                    placeholder="e.g. Right-hand bat"
                    {...register("battingStyle")}
                    className="px-4 py-2 rounded bg-gray-200 w-full border-none outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  {/* Bowling Style */}
                  <label htmlFor="bowlingStyle" className="font-medium py-2">
                    Bowling Style
                  </label>
                  <input
                    id="bowlingStyle"
                    type="text"
                    placeholder="e.g. Right-arm fast"
                    {...register("bowlingStyle")}
                    className="px-4 py-2 rounded bg-gray-200 w-full border-none outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="felx flex-col">
                  <label htmlFor="jerseyNumber" className="font-medium">
                    Jersey Number
                  </label>
                  <input
                    id="jerseyNumber"
                    type="number"
                    placeholder="Enter jersey number"
                    {...register("jerseyNumber")}
                    className="px-4 py-2 rounded bg-gray-200 w-full border-none outline-none mt-2"
                  />
                </div>

                <div className="felx flex-col">
                  <label htmlFor="profilePic" className="font-medium">
                    Profile Photo
                  </label>
                  <input
                    type="file"
                    id="profilePic"
                    accept="image/*"
                    {...register("profilePic")}
                    className="px-10 py-2 w-full bg-gray-400 cursor-pointer rounded mt-2"
                  />
                  {errors.profilePic && (
                    <p className="text-red-500 text-sm">
                      {errors.profilePic.message}
                    </p>
                  )}
                </div>
              </div>
              {/* Hidden Team ID (from props) */}
              <input type="hidden" value={id} {...register("teamId")} />

              {/* Buttons */}
              <div className="flex w-full gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2 bg-blue-900 w-full rounded-xl text-white font-medium  cursor-pointer transition-all ease-in-out duration-300 hover:bg-blue-700"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 w-full rounded-xl text-white font-medium cursor-pointer transition-all ease-in-out duration-300 hover:bg-green-800"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex justify-center py-10 items-center gap-10">
        {players && players.length > 0 ? (
          // ✅ Players Available
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {players.map((datas, i) => (
              // <div
              //   key={id}
              //   className="w-[320px] max-w-xs bg-white rounded-2xl overflow-hidden shadow-md cursor-pointer transition-shadow ease-in-out duration-300 hover:shadow-lg"
              // >
              //   {/* Player Image */}
              //   <img
              //     src="https://imgs.search.brave.com/EdUDgFxOWJY4ctoYqC0PihEVUkN0lMop-fUM2qHRDc4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9m/cm9udC12aWV3LW1h/bGUtcnVnYnktcGxh/eWVyLWhvbGRpbmct/YmFsbC13aXRoLWNv/bG9yLWVmZmVjdF8y/My0yMTQ4NzkzMzIy/LmpwZz9zZW10PWFp/c19oeWJyaWQmdz03/NDA"
              //     alt="Player"
              //     className="w-full h-52 object-cover"
              //   />

              //   {/* Player Info */}
              //   <div className="p-4 flex flex-col items-center text-center">
              //     <h2 className="text-xl font-bold text-gray-900">
              //       {playerName}
              //     </h2>
              //     <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full mt-1">
              //       INDIA
              //     </span>

              //     {/* Stats */}
              //     <div className="w-full grid grid-cols-2 gap-4 mt-4 text-sm">
              //       <div>
              //         <p className="text-gray-500">Matches</p>
              //         <p className="font-bold text-lg text-gray-800">274</p>
              //       </div>
              //       <div>
              //         <p className="text-gray-500">Runs</p>
              //         <p className="font-bold text-lg text-gray-800">10673</p>
              //       </div>
              //       <div>
              //         <p className="text-gray-500">Average</p>
              //         <p className="font-bold text-lg text-gray-800">49.9</p>
              //       </div>
              //       <div>
              //         <p className="text-gray-500">Strike Rate</p>
              //         <p className="font-bold text-lg text-gray-800">93.8</p>
              //       </div>
              //     </div>
              //   </div>
              // </div>
              // <div className="flex w-46 p-6 bg-white h-auto" key={id}>
              //   <img
              //     src={
              //       profilePic
              //         ? profilePic
              //         : "https://imgs.search.brave.com/EdUDgFxOWJY4ctoYqC0PihEVUkN0lMop-fUM2qHRDc4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9m/cm9udC12aWV3LW1h/bGUtcnVnYnktcGxh/eWVyLWhvbGRpbmct/YmFsbC13aXRoLWNv/bG9yLWVmZmVjdF8y/My0yMTQ4NzkzMzIy/LmpwZz9zZW10PWFp/c19oeWJyaWQmdz03/NDA"
              //     }
              //     alt=""
              //     className="w-24 h-24 rounded-full"
              //   />
              //   <h2 className="text-xl font-bold text-gray-900">
              //     {playerName}
              //   </h2>
              // </div>
              <PlayerCard data={datas} key={i} />
            ))}
          </div>
        ) : (
          // ❌ No Players Created Message
          <div className="flex flex-col items-center justify-center w-full text-center py-12">
            <img
              src="/no-player.png"
              alt="No Players"
              className="w-[300px] h-auto mb-4"
            />
          </div>
        )}
      </div>
      <span
        className="w-14 h-14 text-3xl bg-green-600 rounded-full p-2 text-white font-semibold flex justify-center items-center cursor-pointer bottom-10 absolute right-14"
        onClick={() => setModelBg(!modelBg)}
      >
        +
      </span>
    </div>
  );
};

export default Players;
