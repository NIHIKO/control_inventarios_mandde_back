"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const login_1 = __importDefault(require("./routes/login"));
const middlewares = __importStar(require("./middlewares/token.middleware"));
const app = (0, express_1.default)();
const mssql = require("mssql");
const config_bd = require("./config/db");
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
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/api/", login_1.default);
app.get("/prueba", middlewares.verificarToken, (_req, res) => {
    console.log("Se ingresó a prueba");
    (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield mssql.connect(config_bd);
            const result = yield mssql.query(`EXEC UsuarioSGA1
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
            @vIdUsuario=0;`);
            console.log(result);
            res.status(200).send(result.recordset);
        }
        catch (err) {
            // ... error checks
            console.log(err);
            res.status(500).send(err);
        }
    }))();
});
app.listen(puerto, () => {
    console.log(`Servidor iniciado el el puerto ${puerto}`);
});
