const { Sequelize, DataTypes } = require("sequelize");
const Author = require("./authors");
const Category = require("./categories");
const Article = require("./articles");
const Review = require("./reviews");

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: "postgres",
  }
);

const models = {
  Author: Author(sequelize, DataTypes),
  Category: Category(sequelize, DataTypes),
  Article: Article(sequelize, DataTypes),
  Review: Review(sequelize, DataTypes),
  sequelize: sequelize,
};

models.Author.belongsToMany(models.Article, { through: "AuthorArticle" });
models.Article.belongsToMany(models.Author, { through: "AuthorArticle" });

models.Article.hasOne(models.Category);
models.Category.belongsTo(models.Article);
models.Article.hasMany(models.Review);
models.Review.belongsTo(models.Article);
models.Review.hasOne(models.Author);
models.Author.belongsTo(models.Review);
sequelize
  .authenticate()
  .then(() => console.log("Connection established"))
  .catch((e) => console.log("Connection failed ", e));

module.exports = models;
