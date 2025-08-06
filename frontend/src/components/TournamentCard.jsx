import { useNavigate } from "react-router-dom";

const TournamentCard = ({ _id: id, name, matchType }) => {
  const navigate = useNavigate();

  return (
    <div
      key={id}
      onClick={() => navigate(`/players/${id}`)}
      className="cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg bg-white overflow-hidden relative w-[350px]"
    >
      <img
        src="https://imgs.search.brave.com/mIOjy51pdPGV_F86TMbegXDavppXAOVDbi3w50WSzWk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjMv/NDQyLzc5My9zbWFs/bC9yZWFsaXN0aWMt/YmF0LWhpdHRpbmct/YmFsbC1vbi1hYnN0/cmFjdC1iYWNrZ3Jv/dW5kLWZvci1jcmlj/a2V0LWxlYWd1ZS10/b3VybmFtZW50LXBv/c3Rlci1vci1iYW5u/ZXItZGVzaWduLXZl/Y3Rvci5qcGc"
        alt={name}
        className="w-full h-60 object-cover"
      />
      <div className="px-6 py-4">
        <h2 className="text-xl capitalize font-semibold truncate">{name}</h2>
        <span
          className="absolute top-3 right-3 shadow-[0_0_30px_#10b981]
 bg-[#0ead69] text-white text-xs px-2 py-1 rounded uppercase"
        >
          {matchType || "Unknown"}
        </span>
      </div>
    </div>
  );
};

export default TournamentCard;
