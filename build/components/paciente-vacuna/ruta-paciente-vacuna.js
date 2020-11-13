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
const store_paciente_vacuna_1 = __importDefault(require("./store-paciente-vacuna"));
const uuid_1 = require("uuid");
const util_fecha_1 = __importDefault(require("../util/util-fecha"));
const response_1 = __importDefault(require("../../network/response"));
class PaicenteVacuna {
    constructor() {
        this.router = express_1.Router();
        this.ruta();
    }
    /* USUARIO */
    registro_vacuna_paciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_vacuna, id_paciente, id_usuario, observaciones } = req.body || null;
            try {
                const vacuna_paciente = {
                    id_vacuna_paciente: uuid_1.v4(),
                    id_paciente,
                    id_usuario,
                    id_vacuna,
                    observaciones,
                    fecha_vacuna: util_fecha_1.default.fecha_con_hora_actual(),
                };
                console.log(vacuna_paciente);
                yield store_paciente_vacuna_1.default.registrar_paciente_vacuna(vacuna_paciente);
                const repres = yield store_paciente_vacuna_1.default.consulta_paciente_vacuna(vacuna_paciente.id_vacuna_paciente);
                response_1.default.success(req, res, repres, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error en registrar vacuna del paciente');
            }
        });
    }
    get_vacuna_paciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_paciente } = req.params || null;
            try {
                const repres = yield store_paciente_vacuna_1.default.consulta_vacunas_por_paciente(id_paciente);
                response_1.default.success(req, res, repres, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error al mostrar vacuna del paciente');
            }
        });
    }
    ruta() {
        /* entry point user */
        this.router.post("/", this.registro_vacuna_paciente);
        this.router.get("/:id_paciente", this.get_vacuna_paciente);
    }
}
let pv = new PaicenteVacuna();
exports.default = pv.router;
