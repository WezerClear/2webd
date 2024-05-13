import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Menu from "./Components/Menu"; // Utilisez une lettre minuscule pour "components"
import DisplayHighlight from "./Page/DisplayHighlight"; // Assurez-vous que ce chemin est correct

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: (
      <div>
        Page non trouvée
        <br />
        <a href="/">Retour à l'accueil</a>
      </div>
    ),
    element: (
      <div>
        <h1>Menu Musée</h1>
        <Menu /> {/* Utilisez Menu sans accolades */}
        <Outlet />
      </div>
    ),
    children: [
      {
        path: "/",
        element: <DisplayHighlight />, // Assurez-vous que ce chemin est correct
      },
      // Ajoutez d'autres routes ici si nécessaire
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
