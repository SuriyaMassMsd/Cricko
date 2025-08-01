import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const Players = () => {
  const apiBaseUrl = import.meta.env.VITE_BASE_URL;
  const [modelBg, setModelBg] = useState(false);
  const [players, setPlayers] = useState([]);
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      playerName: "",
      role: "batsman",
      battingStyle: "",
      bowlingStyle: "",
      jerseyNumber: "",
      teamId: "", // pass from props
    },
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

  const submitData = (data) => {
    console.log(data);
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
          <div className="relative z-50 w-full max-w-lg bg-white shadow-xl rounded-xl px-8 py-6 mx-4">
            {/* Close Button */}
            <button
              onClick={() => setModelBg(false)}
              className="absolute top-3 right-3 bg-gray-900 text-white text-lg w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700 transition"
            >
              ×
            </button>

            {/* Modal Title */}
            <h1 className="text-2xl font-semibold text-center pb-4">
              Create Tournament
            </h1>

            {/* Form */}
            <form
              className="flex flex-col gap-4 justify-start items-start w-full max-w-md mx-auto p-4"
              onSubmit={handleSubmit(submitData)}
            >
              {/* Player Name */}
              <label htmlFor="playerName" className="font-medium">
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

              {/* Role */}
              <label htmlFor="role" className="font-medium">
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
                <p className="text-red-500 text-sm">{errors.role.message}</p>
              )}

              {/* Batting Style */}
              <label htmlFor="battingStyle" className="font-medium">
                Batting Style
              </label>
              <input
                id="battingStyle"
                type="text"
                placeholder="e.g. Right-hand bat"
                {...register("battingStyle")}
                className="px-4 py-2 rounded bg-gray-200 w-full border-none outline-none"
              />

              {/* Bowling Style */}
              <label htmlFor="bowlingStyle" className="font-medium">
                Bowling Style
              </label>
              <input
                id="bowlingStyle"
                type="text"
                placeholder="e.g. Right-arm fast"
                {...register("bowlingStyle")}
                className="px-4 py-2 rounded bg-gray-200 w-full border-none outline-none"
              />

              {/* Jersey Number */}
              <label htmlFor="jerseyNumber" className="font-medium">
                Jersey Number
              </label>
              <input
                id="jerseyNumber"
                type="number"
                placeholder="Enter jersey number"
                {...register("jerseyNumber")}
                className="px-4 py-2 rounded bg-gray-200 w-full border-none outline-none"
              />

              {/* Hidden Team ID (from props) */}
              <input type="hidden" value={""} {...register("teamId")} />

              {/* Buttons */}
              <div className="flex w-full gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2 bg-blue-900 w-full rounded-xl text-white font-medium"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 w-full rounded-xl text-white font-medium"
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
            {players.map(({ _id: id, playerName }) => (
              <div
                key={id}
                className="w-[320px] max-w-xs bg-white rounded-2xl overflow-hidden shadow-md cursor-pointer transition-shadow ease-in-out duration-300 hover:shadow-lg"
              >
                {/* Player Image */}
                <img
                  src="https://imgs.search.brave.com/EdUDgFxOWJY4ctoYqC0PihEVUkN0lMop-fUM2qHRDc4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9m/cm9udC12aWV3LW1h/bGUtcnVnYnktcGxh/eWVyLWhvbGRpbmct/YmFsbC13aXRoLWNv/bG9yLWVmZmVjdF8y/My0yMTQ4NzkzMzIy/LmpwZz9zZW10PWFp/c19oeWJyaWQmdz03/NDA"
                  alt="Player"
                  className="w-full h-52 object-cover"
                />

                {/* Player Info */}
                <div className="p-4 flex flex-col items-center text-center">
                  <h2 className="text-xl font-bold text-gray-900">
                    {playerName}
                  </h2>
                  <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full mt-1">
                    INDIA
                  </span>

                  {/* Stats */}
                  <div className="w-full grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div>
                      <p className="text-gray-500">Matches</p>
                      <p className="font-bold text-lg text-gray-800">274</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Runs</p>
                      <p className="font-bold text-lg text-gray-800">10673</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Average</p>
                      <p className="font-bold text-lg text-gray-800">49.9</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Strike Rate</p>
                      <p className="font-bold text-lg text-gray-800">93.8</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // ❌ No Players Created Message
          <div className="flex flex-col items-center justify-center w-full text-center py-12">
            <img
              src="https://cdn-icons-png.flaticon.com/512/7486/7486640.png"
              alt="No Players"
              className="w-40 h-40 mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-700">
              No players created
            </h2>
            <div className="flex justify-center items-center space-x-2 mt-2">
              <p className="text-gray-500 ">Click To</p>
              <span
                className="w-6 h-6 bg-green-600 rounded-full p-2 text-white font-semibold flex justify-center items-center cursor-pointer"
                onClick={() => setModelBg(!modelBg)}
              >
                +
              </span>
              <p>Create Players</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Players;
