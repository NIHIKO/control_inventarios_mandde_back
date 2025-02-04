import express from "express";
const cors = require('cors');
const config = require("./config/config.js");

import loginRouter from "./routes/login";
import usuariosRouter from "./routes/usuarios";
import ciudadesRouter from "./routes/ciudad";
import documentosIdentidadRouter from "./routes/documentos";
import clientesRouter from "./routes/clientes";
import ordenesRouter from "./routes/ordenes";
import perfilesRouter from "./routes/perfiles";
import bodegasRouter from "./routes/bodegas";
import consultorRouter from "./routes/consultor";
import inventarioRouter from "./routes/inventario";
import informesRouter from "./routes/informes";
import importarDatosRouter from "./routes/importar-datos";

const app = express();
const puerto = config.puerto;
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,OPTIONS,POST,PUT',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  exposedHeaders: 'Authorization'
};
app.use(express.json({limit: '50mb'}));
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Expose-Headers", "Authorization");
  next();
});
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(config.apiDir, loginRouter);
app.use(config.apiDir, usuariosRouter);
app.use(config.apiDir, ciudadesRouter);
app.use(config.apiDir, documentosIdentidadRouter);
app.use(config.apiDir, clientesRouter);
app.use(config.apiDir, ordenesRouter);
app.use(config.apiDir, perfilesRouter);
app.use(config.apiDir, bodegasRouter);
app.use(config.apiDir, consultorRouter);
app.use(config.apiDir, inventarioRouter);
app.use(config.apiDir, informesRouter);
app.use(config.apiDir, importarDatosRouter);

app.listen(puerto, () => {
  console.log(`Servidor iniciado el el puerto ${puerto}`);
});

console.log(config);
