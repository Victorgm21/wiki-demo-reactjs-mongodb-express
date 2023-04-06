import { useState } from "react";
import { wikiApiRequest } from "../helpers/requests";
import { urlConfig } from "../urlConfig";

export const useForm = () => {
  const [articleName, setArticleName] = useState("");

  const updateTitle = (e) => {
    setArticleName(e.target.value);
  };

  ////////////////////////////////////////////////////////////////////
  // Funcion para guardar un nuevo articulo en la base de datos
  ////////////////////////////////////////////////////////////////////

  const saveInBackend = async (e) => {
    // Evitar que se recargue la página
    e.preventDefault();
    // Datos obtenidos del formulario
    const doc = {
      title: e.target.title.value,
      content: e.target.content.value,
      category: e.target.category.value,
    };

    // Se hace la petición post, llamando la función proveniente del archivo requests.js
    const { datos, cargando } = await wikiApiRequest(
      urlConfig.url + "/create",
      "POST",
      doc
    );
    return datos;
  };

  const saveImgInBackend = async (formData, id) => {

    const { datos } = await wikiApiRequest(
      urlConfig.url + "/upload/" + id,
      "POST",
      formData,
      true
    );
    return datos;
  };

  // Return de useForm
  return {
    articleName: articleName,
    updateTitle,
    saveInBackend,
    saveImgInBackend,
  };
};
