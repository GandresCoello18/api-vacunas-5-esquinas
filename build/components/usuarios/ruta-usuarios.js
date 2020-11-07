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
const express_1 = require("express");
const store_usuarios_1 = __importDefault(require("./store-usuarios"));
const util_fecha_1 = __importDefault(require("../util/util-fecha"));
const response_1 = __importDefault(require("../../network/response"));
class Usuario {
    constructor() {
        this.router = express_1.Router();
        this.ruta();
    }
    /* USUARIO */
    crear_usuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uid, email, displayName, photoURL } = req.body || null;
            try {
                const cuenta = yield store_usuarios_1.default.validar_usuario_existente(email);
                if (cuenta.length === 0) {
                    const user = {
                        id_usuario: uid,
                        email,
                        status: 'registrado',
                        userName: displayName,
                        isadmin: true,
                        photoURL,
                        fecha_registro: util_fecha_1.default.fecha_actual(),
                    };
                    yield store_usuarios_1.default.insertar_usuario(user);
                    const usuario = yield store_usuarios_1.default.consulta_usuario(user.id_usuario);
                    response_1.default.success(req, res, usuario, 200);
                }
                else {
                    response_1.default.success(req, res, { feeback: "Bienvenido de nuevo" }, 200);
                }
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error en crear usuario');
            }
        });
    }
    get_usuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataUser = yield store_usuarios_1.default.consulta_usuarios();
                response_1.default.success(req, res, dataUser, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error al mostrar usuarios');
            }
        });
    }
    get_usuarios_session(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario } = req.params || null;
            try {
                const UserSession = yield store_usuarios_1.default.consulta_usuario(id_usuario);
                response_1.default.success(req, res, { session: UserSession[0] }, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error al mostrar session del usuario');
            }
        });
    }
    ruta() {
        /* entry point user */
        this.router.post("/", this.crear_usuario);
        this.router.get("/session/:id_usuario", this.get_usuarios_session);
        this.router.get("/", this.get_usuarios);
    }
}
let user = new Usuario();
exports.default = user.router;
