import React, { useEffect, useState } from "react";
import { Cards } from "./cards/Cards";
import { urlConfig } from "../../urlConfig";
import { wikiApiRequest } from "../../helpers/requests";
import { Navigate, NavLink } from "react-router-dom";


export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const getArticles = async () => {
    const url = urlConfig.url + "/articles";
    const { datos, cargando } = await wikiApiRequest(url, "GET");
    if (datos.status === "succesfull") {
      setArticles(datos.docs);
    }
    setLoading(false);
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      <div className="title-container">
        <h1 className="h1">These are the latest articles published.</h1>
        <p className="text-secondary">
          You can filter by category or <NavLink to="/search">click here</NavLink> to do a
          search.
        </p>
      </div>
      <div className="container d-flex justify-content-center contenedor">
        <div className="card-filter text-secondary ">
          <ul className="border-bottom border-primary border-3">
            <li className="filter activado">All</li>
            <li className="filter">Software</li>
            <li className="filter">Hardware</li>
            <li className="filter">Developing</li>
          </ul>
        </div>
        <div className="row">
          {loading ? (
            "Loading articles..."
          ) : articles.length >= 1 ? (
            <Cards cardDocs={articles}></Cards>
          ) : (
            "No se han encontrado resultados"
          )}
        </div>
      </div>
    </>
  );
};
