import React from "react";
import { urlConfig } from "../../../urlConfig";

export const Card = ({ title, content, img }) => {
  return (
    <div className="card">
      {}
      <img
        src={urlConfig.url + "/img/" + img}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text text-secondary">{content}</p>
        <a href="#" className="btn btn-primary">
          Read full article...
        </a>
      </div>
    </div>
  );
};
