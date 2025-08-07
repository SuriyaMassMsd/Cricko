import React, { useState } from "react";
import { createTeams, fetchTeams } from "../utils/api";
import { useTeams } from "../hooks/useTeams";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useParams } from "react-router-dom";
import TeamCard from "../components/TeamCard";

const Teams = () => {
  const [modelBg, setModelBg] = useState(false);
  const { teams, loading, reload } = useTeams();
  const { id } = useParams();

  const teamSchema = z.object({
    teamName: z.string().min(3, { message: "Team name is required" }),
    tournamentId: z.string().min(1, { message: "Team is required" }),
    teamProfilePic: z.custom(
      (val) => val instanceof FileList && val.length > 0,
      {
        message: "Team profile picture is required",
      }
    ),
  });

  const submitData = async (data) => {
    console.log(data);
    const formData = new FormData();

    for (const key in data) {
      const value = data[key];

      if (key === "teamProfilePic" && value instanceof FileList) {
        formData.append("teamProfilePic", value[0]);
      } else {
        formData.append(key, value);
      }
    }
    console.log(formData);

    try {
      if (formData) {
        await createTeams(formData);
        reset();
        reload();
        setModelBg(!modelBg);
      }
    } catch (e) {
      console.error("Error creating teams", e.message);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(teamSchema),
  });

  console.log(teams);

  return (
    <div className="">
      {teams && teams.filter((team) => team?.tournamentId == id).length > 0 ? (
        teams
          .filter((team) => team?.tournamentId == id)
          .map((team) => (
            <div key={team._id} className="p-10">
              <TeamCard {...team} />
            </div>
          ))
      ) : (
        <div className="flex flex-col items-center justify-center w-full mt-10">
          <img
            src="/No-team.png"
            alt="No teams"
            className="w-[300px] h-auto object-cover"
          />
        </div>
      )}

      {modelBg && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          {/* Backdrop */}
          <div
            onClick={() => setModelBg(false)}
            className="absolute inset-0 bg-black opacity-45"
          ></div>

          {/* Modal Box */}
          <div className="relative z-50 w-full max-w-md bg-white shadow-xl rounded-xl px-10 py-8 ">
            {/* Close Button */}
            <button
              onClick={() => setModelBg(false)}
              className="absolute top-3 right-3 bg-gray-900 text-white text-lg w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700 transition cursor-pointer"
            >
              ×
            </button>

            {/* Modal Title */}
            <div className="flex justify-center items-center">
              <h1 className="text-2xl font-semibold text-center ">
                Create Team
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
              {/* Player Name */}

              <label htmlFor="teamName" className="font-medium py-2">
                Team Name
              </label>
              <input
                id="teamName"
                type="text"
                placeholder="Enter team name"
                {...register("teamName", {
                  required: "Team name is required",
                })}
                className="px-4 py-2 rounded bg-gray-200 w-full border-none outline-none"
              />
              {errors.teamName && (
                <p className="text-red-500 text-sm">
                  {errors.teamName.message}
                </p>
              )}

              <div className="felx flex-col">
                <label htmlFor="teamProfilePic" className="font-medium">
                  Team Photo
                </label>
                <input
                  type="file"
                  id="teamProfilePic"
                  accept="image/*"
                  {...register("teamProfilePic")}
                  className="px-10 py-2 w-full bg-gray-400 cursor-pointer rounded mt-2"
                />
                {errors.teamProfilePic && (
                  <p className="text-red-500 text-sm">
                    {errors.teamProfilePic.message}
                  </p>
                )}
              </div>

              {/* Hidden Team ID (from props) */}
              <input type="hidden" value={id} {...register("tournamentId")} />

              {/* Buttons */}
              <div className="flex w-full gap-4 pt-4">
                <button
                  type="button"
                  onClick={reset}
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
      <h1
        onClick={() => setModelBg(!modelBg)}
        className="w-14 h-14 text-3xl bg-green-600 rounded-full p-2 text-white font-semibold flex justify-center items-center cursor-pointer bottom-10 absolute right-14"
      >
        +
      </h1>
    </div>
  );
};

export default Teams;
