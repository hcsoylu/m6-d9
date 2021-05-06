const express = require("express");
const authorRouter = require("./services/author");

const db = require("./db");
const cors = require("cors");

const server = express();

server.use(cors());
server.use(express.json());
server.use("/authors", authorRouter);

db.sequelize
  .sync({ force: false })
  .then((result) => {
    return db.Author.findByPk(1);
  })
  .then(async (author) => {
    if (!author) {
      const newAuthor = await db.Author.create({
        name: "Huseyin",
        surname: "Soylu",
      });
    }
  })
  .then(() => {
    server.listen(process.env.PORT || 8000, () => {
      console.log("server is running on port ", process.env.PORT || 8000);
    });
  });
