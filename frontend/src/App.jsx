import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { mutate } from "swr";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Home from "./pages/Home";
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
      <Home />
    </div>
  );
};

export default App;
