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
                        isAdmin: false,
                        photoURL,
                        fecha_registro: util_fecha_1.default.fecha_actual(),
                    };
                    yield store_usuarios_1.default.insertar_usuario(user);
                    const usuario = yield store_usuarios_1.default.consulta_usuario(user.id_usuario);
                    response_1.default.success(req, res, { usuario: usuario }, 200);
                }
                else {
                    response_1.default.success(req, res, { feeback: "Bienvenido de nuevo", usuario: cuenta }, 200);
                }
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error en crear usuario');
            }
        });
    }
    get_usuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario } = req.params || null;
            try {
                const dataUser = yield store_usuarios_1.default.consulta_usuarios(id_usuario);
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
    delete_user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario } = req.params || null;
            try {
                yield store_usuarios_1.default.eliminar_usuario(id_usuario);
                response_1.default.success(req, res, { removed: true }, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error al mostrar session del usuario');
            }
        });
    }
    actualizar_rol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario } = req.params || null;
            try {
                const User = yield store_usuarios_1.default.consulta_usuario(id_usuario);
                const rol = User[0].isAdmin ? false : true;
                yield store_usuarios_1.default.actualizar_rol_usuario(id_usuario, rol);
                User[0].isAdmin = rol;
                response_1.default.success(req, res, { update: true, user: User }, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error al editar el rol del usuario');
            }
        });
    }
    actualizar_estado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario } = req.params || null;
            const { status } = req.body || null;
            try {
                const User = yield store_usuarios_1.default.consulta_usuario(id_usuario);
                yield store_usuarios_1.default.actualizar_status_usuario(id_usuario, status);
                User[0].status = status;
                response_1.default.success(req, res, { update: true, user: User }, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error al editar el estado del usuario');
            }
        });
    }
    ruta() {
        /* entry point user */
        this.router.post("/", this.crear_usuario);
        this.router.get("/session/:id_usuario", this.get_usuarios_session);
        this.router.get("/:id_usuario", this.get_usuarios);
        this.router.delete("/:id_usuario", this.delete_user);
        this.router.put("/rol/:id_usuario", this.actualizar_rol);
        this.router.put("/status/:id_usuario", this.actualizar_estado);
    }
}
let user = new Usuario();
exports.default = user.router;
