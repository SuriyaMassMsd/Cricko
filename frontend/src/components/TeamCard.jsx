import React from "react";
import { useNavigate } from "react-router-dom";

const TeamCard = ({ teamName, teamProfilePic, _id: id }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/players/${id}`)}
      className="cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg bg-white overflow-hidden relative w-[350px]"
    >
      <img
        className="w-full h-60 object-cover"
        src={teamProfilePic}
        alt={teamName}
      />
      <div className="px-10 py-6">
        <h1 className="capitalize text-black text-xl">{teamName}</h1>
      </div>
    </div>
  );
};

export default TeamCard;
