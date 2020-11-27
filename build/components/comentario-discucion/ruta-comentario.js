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
const store_comentarios_1 = __importDefault(require("./store-comentarios"));
const util_fecha_1 = __importDefault(require("../util/util-fecha"));
const uuid_1 = require("uuid");
const response_1 = __importDefault(require("../../network/response"));
class Comentario {
    constructor() {
        this.router = express_1.Router();
        this.ruta();
    }
    /* USUARIO */
    crear_comentario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario, id_discucion_mencion, comentario } = req.body || null;
            try {
                const coment = {
                    id_comentario_mencion: uuid_1.v4(),
                    id_usuario,
                    id_discucion_mencion,
                    fecha_comentario: util_fecha_1.default.fecha_con_hora_actual(),
                    comentario,
                };
                yield store_comentarios_1.default.insertar_comentario(coment);
                const resComentario = yield store_comentarios_1.default.consulta_comentario_mencione(coment.id_comentario_mencion);
                response_1.default.success(req, res, resComentario, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error en crear comentario en discucion');
            }
        });
    }
    get_comentarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comentarios = yield store_comentarios_1.default.consulta_comentarios_menciones();
                response_1.default.success(req, res, comentarios, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error al mostrar comentario en discucion');
            }
        });
    }
    eliminar_comentario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_comentario } = req.params || null;
            try {
                yield store_comentarios_1.default.eliminar_comentario(id_comentario);
                response_1.default.success(req, res, { removed: true }, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error al eliminar comentario en discucion');
            }
        });
    }
    ruta() {
        /* entry point user */
        this.router.post("/", this.crear_comentario);
        this.router.get("/", this.get_comentarios);
        this.router.delete("/:id_comentario", this.eliminar_comentario);
    }
}
let comentario = new Comentario();
exports.default = comentario.router;
