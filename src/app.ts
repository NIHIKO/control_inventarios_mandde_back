import express from "express";
const cors = require('cors');

import loginRouter from "./routes/login";
import usuariosRouter from "./routes/usuarios";
import ciudadesRouter from "./routes/ciudad";
import documentosIdentidadRouter from "./routes/documentos";
import clientesRouter from "./routes/clientes";
import ordenesRouter from "./routes/ordenes";
import perfilesRouter from "./routes/perfiles";
import bodegasRouter from "./routes/bodegas";
import consultorRouter from "./routes/consultor";

const app = express();
const puerto = process.env.API_PUERTO || 3000;
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,OPTIONS,POST,PUT',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  exposedHeaders: 'Authorization'
};

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

app.use("/api/", loginRouter);
app.use("/api/", usuariosRouter);
app.use("/api/", ciudadesRouter);
app.use("/api/", documentosIdentidadRouter);
app.use("/api/", clientesRouter);
app.use("/api/", ordenesRouter);
app.use("/api/", perfilesRouter);
app.use("/api/", bodegasRouter);
app.use("/api/", consultorRouter);

app.listen(puerto, () => {
  console.log(`Servidor iniciado el el puerto ${puerto}`);
});
