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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../db"));
class StoreMenciones {
    /* INSERTAR - POST - CREAR */
    insertar_mencion(id_discucion_mencion, id_paciente, id_discucion) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`INSERT INTO discucion_menciones (id_discucion_mencion, id_paciente, id_discucion) VALUES ('${id_discucion_mencion}', '${id_paciente}', '${id_discucion}')`, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    /* SELECT - MOSTRAR - CONSULTAR */
    consulta_mencion(id_discucion_mencion) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`SELECT * FROM discucion_menciones WHERE id_discucion_mencion = '${id_discucion_mencion}';`, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    /* PUT - MODIFICAR - ACTUALIZAR */
    /* DELETE - BORRAR - ELIMINAR */
    eliminar_mencion(id_discucion_mencion) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`DELETE FROM discucion_menciones WHERE id_discucion_mencion = '${id_discucion_mencion}';`, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
}
let store = new StoreMenciones();
exports.default = store;
