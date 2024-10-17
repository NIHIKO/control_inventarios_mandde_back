import express from "express";
import loginRouter from "./routes/login";
import * as middlewares from './middlewares/token.middleware';

const app = express();
const mssql = require("mssql");
const config_bd = require("./config/db");
const puerto = process.env.API_PUERTO || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/api/", loginRouter);

app.get("/prueba", middlewares.verificarToken,(_req, res) => {
  console.log("Se ingresó a prueba");

  (async () => {
    try {
      await mssql.connect(config_bd);
      const result = await mssql.query(
        `EXEC UsuarioSGA1
            @vOpcion='Lista Usuarios',
            @vNumDocumento='830025582',
            @vNumDocumentoA="0", --Documento anterior
            @vNomUsuario="0",
            @vDirUsuario="0",
            @vTelUsuario="0",
            @vCodCiudad=0,
            @vUsuario="0",
            @vUsuarioA="0",
            @vClave="0",
            @vUsrProcesa="0",
            @vUsrCaptura="0",
            @vUsrModifica="0",
            @vCodPerfil="0",
            @vMcaActivo="0",
            @vCodProyecto="0",
            @vIdUsuario=0;`
      );

      console.log(result);

      res.status(200).send(result.recordset);
    } catch (err) {
      // ... error checks
      console.log(err);
      res.status(500).send(err);
    }
  })();
});

app.listen(puerto, () => {
  console.log(`Servidor iniciado el el puerto ${puerto}`);
});


