const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

const dbUri = process.env.DBURI;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = () => {
  const connect = () => {
    mongoose
      .connect(dbUri, options)
      .then(() => console.log("[DB] mongoose connected"))
      .catch((err) => console.log(err));
  };
  connect();
};
