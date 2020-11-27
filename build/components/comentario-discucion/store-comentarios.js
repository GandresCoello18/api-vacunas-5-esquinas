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
class StoreComentario {
    /* INSERTAR - POST - CREAR */
    insertar_comentario(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`INSERT INTO comentarios_menciones (id_comentario_mencion, id_usuario, id_discucion_mencion, fecha_comentario, comentario) VALUES ('${comment.id_comentario_mencion}', '${comment.id_usuario}', '${comment.id_discucion_mencion}', '${comment.fecha_comentario}', '${comment.comentario}');`, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    /* SELECT - MOSTRAR - CONSULTAR */
    consulta_comentarios_menciones() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`SELECT comentarios_menciones.id_comentario_mencion, comentarios_menciones.id_usuario, comentarios_menciones.id_discucion_mencion, comentarios_menciones.fecha_comentario, comentarios_menciones.comentario, usuarios.userName, usuarios.photoURL, usuarios.isAdmin FROM comentarios_menciones INNER JOIN usuarios ON usuarios.id_usuario = comentarios_menciones.id_usuario;`, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    consulta_comentario_mencione(id_comentario_mencion) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`SELECT comentarios_menciones.id_comentario_mencion, comentarios_menciones.id_usuario, comentarios_menciones.id_discucion_mencion, comentarios_menciones.fecha_comentario, comentarios_menciones.comentario, usuarios.userName, usuarios.photoURL, usuarios.isAdmin FROM comentarios_menciones INNER JOIN usuarios ON usuarios.id_usuario = comentarios_menciones.id_usuario WHERE comentarios_menciones.id_comentario_mencion = '${id_comentario_mencion}';`, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    /* PUT - MODIFICAR - ACTUALIZAR */
    /* DELETE - BORRAR - ELIMINAR */
    eliminar_comentario(id_comentario_mencion) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`DELETE FROM comentarios_menciones WHERE id_comentario_mencion = '${id_comentario_mencion}' `, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
}
let store = new StoreComentario();
exports.default = store;
