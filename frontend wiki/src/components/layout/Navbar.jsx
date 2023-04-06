import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-light px-4 mb-5">
        <div className="container-fluid">
          {/* ICONO */}
          <NavLink to="/" className="navbar-brand text-primary">
            <i className="bi bi-clipboard2-check-fill"></i>
            <span>WikiTech</span>
          </NavLink>
          {/* BUTON HAMBURGUESA */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menu"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* ELEMENTOS DEL MENU */}
          <div className="collapse navbar-collapse" id="menu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink to="/home" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/articles" className="nav-link">
                  Articles
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="search" className="nav-link">
                  Search
                </NavLink>
              </li>
              <li className="nav-item">
                <a
                  href="https://victor-gouveia.netlify.app"
                  className="nav-link"
                >
                  Contact
                </a>
              </li>
              <NavLink to="/new-article">
                <button className="btn btn-primary" type="submit">
                  New article
                </button>
              </NavLink>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
