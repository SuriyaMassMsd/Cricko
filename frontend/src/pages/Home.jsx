import { useState } from "react";
import TournamentForm from "../components/TournamentForm";
import TournamentCard from "../components/TournamentCard";
import { useTournaments } from "../hooks/useTournaments";

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const { teams, reload } = useTournaments();

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold py-4">
          Welcome to <span className="text-red-500">Cricko</span> Cricket Scorer
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-yellow-600 cursor-pointer"
        >
          Create Tournament
        </button>
      </div>

      {showForm && (
        <TournamentForm onClose={() => setShowForm(false)} onSuccess={reload} />
      )}

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-10 py-10">
        {teams?.match?.map((team) => (
          <TournamentCard key={team._id} {...team} />
        ))}
      </div>
    </div>
  );
};

export default Home;
