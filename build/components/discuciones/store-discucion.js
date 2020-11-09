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
class StoreUsuario {
    /* INSERTAR - POST - CREAR */
    insertar_discucion(discucion) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`INSERT INTO discucion (id_discucion, asunto, contenido, id_usuario, fecha_discucion) VALUES ('${discucion.id_discucion}', '${discucion.asunto}', '${discucion.contenido}', '${discucion.id_usuario}', '${discucion.fecha_discucion}')`, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    /* SELECT - MOSTRAR - CONSULTAR */
    consulta_discucion(id_discucion) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`SELECT discucion.id_discucion, discucion.asunto, discucion.contenido, discucion.fecha_discucion, discucion.id_usuario, usuarios.userName, usuarios.photoURL, usuarios.isAdmin, paciente.codigo, paciente.nombres, paciente.apellidos, paciente.img FROM discucion_menciones INNER JOIN paciente ON paciente.id_paciente = discucion_menciones.id_paciente INNER JOIN discucion ON discucion.id_discucion = discucion_menciones.id_discucion INNER JOIN usuarios ON usuarios.id_usuario = discucion.id_usuario WHERE discucion.id_discucion = '${id_discucion}';`, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    consulta_discuciones() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`SELECT discucion.id_discucion, discucion.asunto, discucion.contenido, discucion.fecha_discucion, discucion.id_usuario, usuarios.userName, usuarios.photoURL, usuarios.isAdmin, paciente.codigo, paciente.nombres, paciente.apellidos, paciente.img FROM discucion_menciones INNER JOIN paciente ON paciente.id_paciente = discucion_menciones.id_paciente INNER JOIN discucion ON discucion.id_discucion = discucion_menciones.id_discucion INNER JOIN usuarios ON usuarios.id_usuario = discucion.id_usuario;`, (err, data) => {
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
let store = new StoreUsuario();
exports.default = store;
