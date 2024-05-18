import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import "../App.css";

const Menu: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-menu">
        <li className="navbar-item">
        <Link to="/" className="navbar-link">Metropolitan Museum of Art</Link>
          </li>
          <li className="navbar-item">
            <Link to="/object" className="navbar-link">Museum</Link>
          </li>
          <li className="navbar-item">
            <Link to="/advanced-search" className="navbar-link">Recherche Avancée</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
