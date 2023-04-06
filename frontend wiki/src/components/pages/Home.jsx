import React from "react";
import "./home.css";
import { Cards } from "./cards/Cards";
import { NavLink } from "react-router-dom";
export const Home = () => {
  return (
    <>
      <div className="home-title-container container my-5">
        <h1 className="h1">Thousands of technology articles in one place.</h1>
        <p className="text-secondary">
          WikiTech is an encyclopedia, understood as a support that allows the
          collection, storage and transmission of information in a structured
          way.
        </p>
        <NavLink to="/articles">
          <button type="button" className="btn btn-primary me-2">
            See articles
          </button>
        </NavLink>
        <NavLink to="/new-article">
          <button type="button" className="btn btn-primary">
            New article
          </button>
        </NavLink>
        <p className="h5 mt-3">You can search anything.</p>
        <form className="d-flex flex-column flex-md-row col-6 mx-auto my-3">
          <input
            className="form-control me-md-2 mb-2 mb-md-0"
            type="search"
            placeholder="Buscar"
            aria-label="Buscar"
          />
          <button className="btn btn-outline-primary" type="submit">
            Buscar
          </button>
        </form>
      </div>
    </>
  );
};
