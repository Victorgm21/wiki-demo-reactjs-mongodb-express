import React from "react";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";

export const CreateArticle = () => {
  // Destructure de las funciones que vienen en useForm
  const { updateTitle, articleName, saveInBackend, saveImgInBackend } =
    useForm();

  // Resultado de enviar al formulario (Si fallo, o todo correcto)
  const [status, setStatus] = useState("");

  // Cuando se envia el formulario
  const doRequest = async (e) => {
    const doc = await saveInBackend(e);
    console.log(doc.doc._id);
    // Verifico si la petición se realizo correctamente o devolvio error
    if (doc.status === "sucessfull") {
      // Selecciono el elemento html que contiene la imagen
      const fileInput = document.querySelector("#file");
      // Creo un form data
      const formDataImg = new FormData();
      // Al form data le integro la imagen
      formDataImg.append("file", fileInput.files[0]);
      // Ejecutando funcion para guardar la imagen
      const imgDoc = await saveImgInBackend(formDataImg, doc.doc._id);
      // resultado de la operación
      console.log(imgDoc);
      // actualizo status
      setStatus("sent");
    }
    if (doc.status === "error") {
      setStatus("not_sent");
    }
  };

  return (
    <div className="container my-4">
      <div className="container-fluid">
        <p className="h2 mb-3">Creating article: {articleName}</p>
        <form onSubmit={doRequest}>
          <div className="form-group mb-3">
            <label htmlFor="title">Título</label>
            <input
              name="title"
              type="text"
              className="form-control"
              id="title"
              placeholder="Escribe el título aquí"
              onChange={updateTitle}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="content">Contenido</label>
            <textarea
              name="content"
              className="form-control"
              id="content"
              rows="10"
              placeholder="Escribe el contenido aquí"
            ></textarea>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="category">Categoría</label>
            <select className="form-control" id="category" name="category">
              <option value="tech">Tech</option>
              <option value="developing">Developing</option>
              <option value="software">Software</option>
              <option value="hardware">Hardware</option>
            </select>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="image">Imagen</label>
            <input
              name="img"
              type="file"
              className="form-control form-control-sm"
              id="file"
            />
          </div>
          <button type="submit" className="btn btn-primary mb-3">
            Create
          </button>
        </form>

        {status == "not_sent" ? (
          <div className="alert alert-danger" role="alert">
            An error occurred while creating the article()
          </div>
        ) : (
          ""
        )}

        {status == "sent" ? (
          <div className="alert alert-success" role="alert">
            The article has been created correctly. Click here to view it.
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
