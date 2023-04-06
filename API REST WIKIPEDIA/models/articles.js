const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    category:{
      type: String,
      default: "Tech"
    },
    content: {
      type: String,
      default: "",
    },
    img: {
      type: String,
      default:
        "https://blogs.iadb.org/conocimiento-abierto/wp-content/uploads/sites/10/2017/11/technology-banner.jpg",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

schema.index({ title: "text" });

module.exports = mongoose.model("articulo", schema);
