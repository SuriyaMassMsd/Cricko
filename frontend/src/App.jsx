import React, { useEffect, useState } from "react";

const App = () => {
  const [teams, setTeams] = useState();
  const apiBaseUrl = import.meta.env.VITE_BASE_URL;

  console.log(apiBaseUrl);

  const fetchTeams = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/getTeams`);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchTeams();
  }, []);
  return <div>App</div>;
};

export default App;
