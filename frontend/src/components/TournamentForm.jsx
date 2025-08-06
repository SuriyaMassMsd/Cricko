import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTournament } from "../utils/api";
import { z } from "zod";

const TournamentForm = ({ onClose, onSuccess }) => {
  const tournamentSchema = z.object({
    name: z.string().min(3, "Team name is required"),
    matchType: z.enum(["league", "knockout", "tri-series", "series", "single"]),
    startDate: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(tournamentSchema),
    defaultValues: {
      name: "Kova Kight Riders",
      matchType: "league",
      startDate: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = async (data) => {
    console.log(data);

    try {
      await createTournament(data);
      reset();
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error creating tournament", error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black opacity-45"
      ></div>
      <div className="relative z-50 w-[400px] bg-white rounded-xl px-8 py-6">
        <h1 className="text-xl font-semibold text-center pb-4  ">
          Create Tournament
        </h1>
        <form
          className="flex flex-col gap-4 justify-start items-start w-full max-w-md mx-auto p-4"
          onSubmit={handleSubmit(onSubmit)}
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
            <p className="text-red-500 text-sm">{errors.matchType.message}</p>
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
            <p className="text-red-500 text-sm">{errors.startDate.message}</p>
          )}

          {/* Buttons */}
          <div className="flex w-full gap-4 pt-2">
            <button
              type="button"
              onClick={() => reset()}
              className="px-6 py-2 bg-blue-900 w-full rounded-xl text-white font-medium cursor-pointer"
            >
              Reset
            </button>
            <button className="px-6 py-2 bg-green-600 w-full rounded-xl text-white font-medium cursor-pointer">
              Submit
            </button>
          </div>
          <span
            className="bg-gray-900 text-xl font-semibold flex justify-center items-center w-8 h-8 text-white absolute -top-1 -right-2 rounded-full cursor-pointer hover:bg-gray-700 transition-all 2s ease-in-out duration-300"
            onClick={onClose}
          >
            x
          </span>
        </form>
      </div>
    </div>
  );
};

export default TournamentForm;
