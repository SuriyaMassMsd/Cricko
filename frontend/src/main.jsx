import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Players from "./pages/Players.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/players/:id",
    element: <Players />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={route} />
);
