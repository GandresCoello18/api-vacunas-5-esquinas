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
const store_discucion_1 = __importDefault(require("./store-discucion"));
const store_paciente_1 = __importDefault(require("../paciente/store-paciente"));
const store_menciones_1 = __importDefault(require("./store-menciones"));
const uuid_1 = require("uuid");
const util_fecha_1 = __importDefault(require("../util/util-fecha"));
const response_1 = __importDefault(require("../../network/response"));
class Discucion {
    constructor() {
        this.router = express_1.Router();
        this.ruta();
    }
    create_discucion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario, asunto, contenido, pacientes } = req.body || null;
            try {
                const discucion = {
                    id_discucion: uuid_1.v4(),
                    id_usuario,
                    asunto,
                    contenido,
                    pacientes,
                    fecha_discucion: util_fecha_1.default.fecha_actual(),
                };
                yield store_discucion_1.default.insertar_discucion(discucion);
                discucion.pacientes.map((code) => __awaiter(this, void 0, void 0, function* () {
                    const thisPaciente = yield store_paciente_1.default.validar_paciente_existente(code);
                    return yield store_menciones_1.default.insertar_mencion(uuid_1.v4(), thisPaciente[0].id_paciente, discucion.id_discucion);
                }));
                const repres = yield store_discucion_1.default.consulta_discucion(discucion.id_discucion);
                response_1.default.success(req, res, repres, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error en crear discucion');
            }
        });
    }
    get_discuciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repaciente = yield store_discucion_1.default.consulta_discuciones();
                response_1.default.success(req, res, repaciente, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error al mostrar discuciones');
            }
        });
    }
    ruta() {
        /* entry point user */
        this.router.post("/", this.create_discucion);
        this.router.get("/", this.get_discuciones);
    }
}
let discucion = new Discucion();
exports.default = discucion.router;