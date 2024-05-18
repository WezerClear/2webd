import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

const Menu: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">Metropolitan Museum of Art</Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/advanced-search" className="navbar-link">Recherche Avancée</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
