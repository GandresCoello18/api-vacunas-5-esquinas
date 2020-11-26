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
const store_representante_1 = __importDefault(require("./store-representante"));
// import { v4 as uuidv4 } from "uuid";
const response_1 = __importDefault(require("../../network/response"));
class Representante {
    constructor() {
        this.router = express_1.Router();
        this.ruta();
    }
    /* USUARIO */
    crear_representante(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cedula, nombres, apellidos, sexo } = req.body || null;
            try {
                const exit = yield store_representante_1.default.validar_representante_existente(cedula);
                if (exit.length === 0) {
                    const representante = {
                        cedula,
                        nombres,
                        apellidos,
                        sexo,
                    };
                    yield store_representante_1.default.insertar_representante(representante);
                    const repres = yield store_representante_1.default.validar_representante_existente(representante.cedula);
                    response_1.default.success(req, res, repres, 200);
                }
                else {
                    response_1.default.success(req, res, { feeback: `La identificacion ${cedula} ya existe, intente con otra CI` }, 200);
                }
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error en crear representante');
            }
        });
    }
    get_representante(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repres = yield store_representante_1.default.consulta_representantes();
                response_1.default.success(req, res, repres, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error al mostrar representante');
            }
        });
    }
    delete_representate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cedula } = req.params || null;
            try {
                yield store_representante_1.default.eliminar_representantes(Number(cedula));
                response_1.default.success(req, res, { removed: true }, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error al eliminar representante');
            }
        });
    }
    ruta() {
        /* entry point user */
        this.router.post("/", this.crear_representante);
        this.router.get("/", this.get_representante);
        this.router.delete("/:cedula", this.delete_representate);
    }
}
let repres = new Representante();
exports.default = repres.router;
