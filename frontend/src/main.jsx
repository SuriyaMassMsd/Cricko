import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Players from "./pages/Players.jsx";
import Teams from "./pages/Teams.jsx";
import CricketScoringUI from "./pages/ScoreCard.jsx";
import ScoreUi from "./pages/ScoreUi.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/players/:id",
    element: <Players />,
  },
  {
    path: "/teams/:id",
    element: <Teams />,
  },
  {
    path: "/scorecard",
    element: <CricketScoringUI />,
  },
  {
    path: "/scoreui",
    element: <ScoreUi />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={route} />
);
