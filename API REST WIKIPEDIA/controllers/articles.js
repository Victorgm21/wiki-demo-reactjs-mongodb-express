const model = require("../models/articles");
const helper = require("./helpers/validaciones");
const fs = require("fs");
const path = require("path");

///////////////////////////////////////////////////////////////
/// Obtener todos los articulos
///////////////////////////////////////////////////////////////

exports.getArticles = (req, res) => {
  model.find({}, (error, docs) => {
    if (error || !docs) {
      return res.status(400).json({
        status: "Error",
        msg: "No hay información disponible",
      });
    }
    return res.status(200).json({ status: "succesfull", docs });
  });
};

///////////////////////////////////////////////////////////////
/// Get... get article by id
///////////////////////////////////////////////////////////////

exports.getArticleById = (req, res) => {
  id = req.params.id;
  model.findById(id, (error, doc) => {
    if (error) {
      return res.status(400).json({ status: "error", error: error });
    }
    return res.status(200).json(doc);
  });
};

///////////////////////////////////////////////////////////////
/// Delete... Eliminar un articulo de la base de datos
///////////////////////////////////////////////////////////////

exports.deleteArticle = (req, res) => {
  let id = req.params.id;
  model
    .findOneAndDelete({ _id: id })
    .then((doc) => {
      if (doc) {
        res.send({ status: "succesfull", doc: doc });
      } else {
        res.send({
          status: "succesfull",
          info: "This document does not exist, or was previously deleted.",
        });
      }
    })
    .catch((err) => {
      res.status(400).send({ status: "error", error: err });
    });
};

///////////////////////////////////////////////////////////////
/// Update... Actualizar documento en la base de datos
///////////////////////////////////////////////////////////////

exports.updateArticle = (req, res) => {
  id = req.params.id;
  doc = req.body;
  model
    .findOneAndUpdate({ _id: id }, doc, { new: true })
    .then((doc) => {
      res.send({ status: "succesfull", doc: doc });
    })
    .catch((err) => {
      res.status(400).send({ status: "error", error: err });
    });
};

///////////////////////////////////////////////////////////////
/// Search... Buscar articulos por el título
///////////////////////////////////////////////////////////////
exports.findArticles = (req, res) => {
  const query = req.params.query;
  model.find({ $text: { $search: query } }, (err, docs) => {
    if (err || !docs || docs.length === 0) {
      return res.status(404).json({ status: "error", error: "Not found data" });
    }
    return res.status(200).send({
      status: "sucessfull",
      docs: docs,
    });
  });
};

///////////////////////////////////////////////////////////////
/// Post... Crear articulo (Y guardar en la base de datos)
///////////////////////////////////////////////////////////////

exports.createArticle = (req, res) => {
  let params = req.body;

  // Validacion de los datos (Solo titulo por ahora)
  const flag = helper.validateTitle(params.title);

  // Guardamos el documento en la base de datos
  if(flag){
    newDoc = new model(params);
    model.create(newDoc, (error, doc) => {
      if (error) {
        return res.status(400).json({
          status: "error",
          error: "An error has occurred while saving the document.",
        });
      }

      // Guardamos en la base de datos

      return res.status(200).json({
        status: "sucessfull",
        doc: doc,
      });
    });
  } else{
      return res.status(400).json({
        status: "error",
        error: "Missing title",
      });
  }
};

///////////////////////////////////////////////////////////////
/// Upload... Subir imagenes
///////////////////////////////////////////////////////////////

exports.uploadImg = (req, res) => {
  console.log(req.file);
  if (!req.file && !req.files) {
    return res
      .status(404)
      .json({ status: "error", message: "no images were sent" });
  }
  let originalName = req.file.originalname;
  let splitedName = originalName.split(".");
  let fileExtension = splitedName[1];
  if (
    fileExtension != "jpg" &&
    fileExtension != "jpeg" &&
    fileExtension != "png"
  ) {
    fs.unlink(req.file.path, (err) => {
      return res.json({ status: "error", error: "only jpg files" });
    });
  } else {
    let id = req.params.id;
    let filePath = req.file.path;
    model
      .findOneAndUpdate({ _id: id }, { img: req.file.filename }, { new: true })
      .exec((error, doc) => {
        if (error || !doc) {
          return res.status(400).json({ status: "error", error });
        } else {
          return res.status(200).json({ status: "success", doc });
        }
      });
  }
};

///////////////////////////////////////////////////////////////
/// Mostrar imagenes a través de una ruta
///////////////////////////////////////////////////////////////

exports.viewImg = (req, res) => {
  fileName = req.params.filename;
  imgPath = "./img/articles/" + fileName;
  fs.stat(imgPath, (error, imgExist) => {
    if (imgExist) {
      return res.sendFile(path.resolve(imgPath));
    } else {
      return res.status(404).json({
        status: "error",
        error: "Img does not exists",
        imgPath,
        imgExist,
        fileName,
      });
    }
  });
};
