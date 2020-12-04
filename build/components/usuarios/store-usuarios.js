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
    insertar_usuario(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`INSERT INTO usuarios (id_usuario, email, status, userName, photoURL, fecha_registro, isAdmin) VALUES ('${user.id_usuario}', '${user.email}', '${user.status}', '${user.userName}', '${user.photoURL}', '${user.fecha_registro}', ${user.isAdmin})`, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    /* SELECT - MOSTRAR - CONSULTAR */
    validar_usuario_existente(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`SELECT * FROM usuarios WHERE email = '${email}';`, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    consulta_usuario(id_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`SELECT * FROM usuarios WHERE id_usuario = '${id_usuario}';`, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    consulta_usuarios(id_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`SELECT * FROM usuarios WHERE id_usuario <> '${id_usuario}' ORDER BY id_usuario DESC;`, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    /* PUT - MODIFICAR - ACTUALIZAR */
    actualizar_rol_usuario(id, Admin) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`UPDATE usuarios SET isAdmin = ${Admin} WHERE id_usuario = '${id}' `, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    actualizar_status_usuario(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`UPDATE usuarios SET status = '${status}' WHERE id_usuario = '${id}' `, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    /* DELETE - BORRAR - ELIMINAR */
    eliminar_usuario(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`DELETE FROM usuarios WHERE id_usuario = '${id}' `, (err, data) => {
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
