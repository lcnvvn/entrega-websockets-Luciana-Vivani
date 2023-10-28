import { Router } from "express";
import path from "path";
import { getJSONFromFile, getNewId, saveJSONToFile } from "../utilities.js";
import { fileURLToPath } from "url";
import { emitFromApi } from "../socket.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "../db/products.json");
const products = await getJSONFromFile(dbPath);

const router = Router();

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", products);
});

router.post("/realtimeproducts", (req, res) => {
  emitFromApi("realTimeProducts", products);
  return res.status(201).json(newProduct);
});

export default router;
