import express from "express";
import productsRouter from "./routers/products.router.js";
import cartsRouter from "./routers/carts.router.js";
import indexRouter from "./routers/index.router.js";
import path from "path";
import { __dirname } from "./utilities.js";
import handlebars from "express-handlebars";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use("/api", productsRouter, cartsRouter);
app.use("/", productsRouter, indexRouter)

app.use((error, req, res, next) => {
  const message = `⚠️ Ha ocurrido un error: ${error.message}`;
  res.status(500).json({ status: "error", message });
});

export default app;
