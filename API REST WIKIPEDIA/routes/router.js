const { Router } = require("express");

const router = Router();

const controller = require("../controllers/articles");

//
// Configuración multer (subir imagenes)
//
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./img/articles/");
  },
  filename: (req, file, cb) => {
    cb(null, "post" + Date.now() + file.originalname);
  },
});

const imgs = multer({ storage: storage });

///
/// RUTAS
///

// Buscar por texto (coincidencias)
router.get("/find/:query", controller.findArticles);

// Obtener todos los articulos
router.get("/articles", controller.getArticles);

// Obtener articulo por id
router.get("/article/:id", controller.getArticleById);

// Ruta para visualizar las imagenes
router.get("/img/:filename", controller.viewImg);

// Crear articulo
router.post("/create", controller.createArticle);

// Borrar articulo por id
router.delete("/delete/:id", controller.deleteArticle);

// Editar articulo por id
router.put("/update/:id", controller.updateArticle);

// Subir imagen
router.post("/upload/:id", [imgs.single("file")], controller.uploadImg);

///
/// EXPORT
///

module.exports = router;
