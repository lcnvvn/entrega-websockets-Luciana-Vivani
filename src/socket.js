import { Server } from "socket.io";
import path from "path";
import { getJSONFromFile, saveJSONToFile } from "./utilities.js";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from 'uuid';

let io;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "/db/products.json");
const products = await getJSONFromFile(dbPath);

const getNewId = () => uuidv4();

export const init = (httpServer) => {

  io = new Server(httpServer);

  io.on('connection', (socketClient) => {
    console.log(`Se conectó el cliente (${socketClient.id})`);
    socketClient.emit('prueba')
    socketClient.emit('listProducts', products)
    
    socketClient.on('addProduct', async (newProduct) => {
      newProduct.id = getNewId();
      console.log('probando add product');
      console.log(newProduct);
      io.emit('listProducts', products)
      products.push(newProduct);
      await saveJSONToFile(dbPath, products);
      return res.status(201).json(newProduct)
    })
  });

  console.log('Server socket running 🚀');
};


export const emitFromApi = (event, data) => io.emit(event, data);