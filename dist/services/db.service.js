"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ejecutarConsulta = ejecutarConsulta;
const mssql = require("mssql");
const config_bd = require("../config/db");
function conectarBD() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mssql.connect(config_bd);
    });
}
function desconectarBD() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mssql.close();
    });
}
function ejecutarConsulta(consulta) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield conectarBD();
            return yield mssql.query(consulta);
        }
        catch (ex) {
            console.error(ex);
            return -1;
        }
        finally {
            desconectarBD();
        }
    });
}
