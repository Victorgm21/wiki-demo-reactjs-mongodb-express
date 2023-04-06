const mongoose = require("mongoose");
const validator = require("validator");

// Convierte un String en un object id de mongoose y lo retorna
exports.parseId = (id) => {
  return mongoose.Types.ObjectId(id);
};


// Válida que el titulo no este vacío
exports.validateTitle = (title) => {

  let docTitle = !validator.isEmpty(title);

  return docTitle;


};
