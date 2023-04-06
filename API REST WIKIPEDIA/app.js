const express = require("express");
const app = express();
const dataBase = require("./database/connection");
const cors = require("cors");
const morgan = require("morgan");

//
// Convertir body a objeto js
//

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//
// MIDDLEWARES
//

app.use(morgan("dev"));
app.use(cors());
app.use("/api/",require("./routes/router"));

//
// SERVIDOR
//

app.listen("3000", ()=>{
	console.log("Servidor corriendo en localhost:3000");
});

//
// Base de datos (Mongoose)
//

dataBase();