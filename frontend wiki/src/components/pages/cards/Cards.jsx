import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import "./cards.css";

export const Cards = ({ cardDocs }) => {
  const textExample =
    "Wikitech es una enciclopedia en línea gratuita y editable. Su objetivo es proporcionar acceso a información precisa y confiable en una amplia variedad de temas. Los artículos de WikiTech son escritos por voluntarios de todo el mundo y se editan en línea.";
  return (
    <>
      {cardDocs != null &&
        cardDocs.map((content) => {
          return (
            <div className="col-md-4" key={content._id}>
              <Card
                title={content.title}
                content={content.content.substring(0, 254) || textExample}
                img={content.img}
              ></Card>
            </div>
          );
        })}

    </>
  );
};
