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
const store_seguimiento_1 = __importDefault(require("./store-seguimiento"));
const store_paciente_1 = __importDefault(require("../paciente/store-paciente"));
const uuid_1 = require("uuid");
const util_fecha_1 = __importDefault(require("../util/util-fecha"));
const response_1 = __importDefault(require("../../network/response"));
class Seguimiento {
    constructor() {
        this.router = express_1.Router();
        this.ruta();
    }
    /* USUARIO */
    registro_seguimiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { peso, altura, id_paciente, temperatura } = req.body || null;
            try {
                const seguimiento = {
                    id_seguimiento: uuid_1.v4(),
                    id_paciente,
                    peso,
                    altura,
                    temperatura,
                    fecha_seguimiento: util_fecha_1.default.fecha_con_hora_actual(),
                };
                yield store_seguimiento_1.default.registrar_seguimiento(seguimiento);
                yield store_paciente_1.default.editar_peso_altura(seguimiento.peso, seguimiento.altura, seguimiento.id_paciente);
                const resPaciente = yield store_paciente_1.default.consulta_paciente(seguimiento.id_paciente);
                response_1.default.success(req, res, resPaciente, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error en registrar seguimiento peso y altura');
            }
        });
    }
    get_seguimiento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_paciente } = req.params || null;
            try {
                const seguimiento = yield store_seguimiento_1.default.consulta_seguimiento(id_paciente);
                response_1.default.success(req, res, seguimiento, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error al mostrar seguimiento peso y altura');
            }
        });
    }
    ruta() {
        /* entry point user */
        this.router.post("/", this.registro_seguimiento);
        this.router.get("/:id_paciente", this.get_seguimiento);
    }
}
let seguimiento = new Seguimiento();
exports.default = seguimiento.router;
