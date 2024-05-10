import { Link } from "react-router-dom";

export function Menu() {
  return (
    <div style={{ display: "flex", flexFlow: "row nowrap", gap: 10 }}>
      <Link to="/">Accueil</Link>
      <Link to="/contact">Contact</Link>
    </div>
  );
}
