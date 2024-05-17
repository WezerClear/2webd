import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Menu from "./Components/Menu";
import DisplayHighlight from "./Page/DisplayHighlight";
import AdvancedSearch from "./Page/AdvancedSearch";
import ObjectDetailPage from "./Page/ObjectDetailsPage";

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
        element: <DisplayHighlight />,
      },
      {
        path: "/advanced-search",
        element: <AdvancedSearch />,
      },
      {
        path: "/object/:objectId",
        element: <ObjectDetailPage />,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
