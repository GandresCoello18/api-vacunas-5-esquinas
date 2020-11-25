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
class StoreSeguimiento {
    /* INSERTAR - POST - CREAR */
    registrar_seguimiento(seguimineto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`INSERT INTO seguimiento (id_seguimiento, peso, altura, id_paciente, fecha_seguimiento, temperatura) VALUES ('${seguimineto.id_seguimiento}', ${seguimineto.peso}, ${seguimineto.altura}, '${seguimineto.id_paciente}', '${seguimineto.fecha_seguimineto}', ${seguimineto.temperatura})`, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    /* SELECT - MOSTRAR - CONSULTAR */
    consulta_seguimiento(id_paciente) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`SELECT seguimiento.id_seguimiento, seguimiento.peso, seguimiento.altura, seguimiento.temperatura, seguimiento.id_paciente, seguimiento.fecha_seguimiento FROM seguimiento INNER JOIN paciente ON paciente.id_paciente = seguimiento.id_paciente WHERE paciente.id_paciente = '${id_paciente}';`, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    /* PUT - MODIFICAR - ACTUALIZAR */
    /* DELETE - BORRAR - ELIMINAR */
    eliminar_discucion(id_discucion) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`DELETE FROM discucion WHERE id_discucion = '${id_discucion}';`, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
}
let store = new StoreSeguimiento();
exports.default = store;
