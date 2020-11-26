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
const store_vacuna_1 = __importDefault(require("../vacunas/store-vacuna"));
const store_seguimiento_1 = __importDefault(require("../seguimiento/store-seguimiento"));
const uuid_1 = require("uuid");
const util_fecha_1 = __importDefault(require("../util/util-fecha"));
const response_1 = __importDefault(require("../../network/response"));
const util_fecha_2 = __importDefault(require("../util/util-fecha"));
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
                    observaciones: observaciones ? observaciones : 'Sin observaciones',
                    fecha_vacuna: util_fecha_1.default.fecha_con_hora_actual(),
                };
                const Seguimientos = yield store_seguimiento_1.default.consulta_seguimiento(id_paciente);
                const SeguimientoDeHoy = Seguimientos.filter(item => { var _a; return ((_a = item.fecha_seguimineto) === null || _a === void 0 ? void 0 : _a.indexOf(util_fecha_2.default.fecha_actual())) !== -1; });
                if (SeguimientoDeHoy.length !== 0) {
                    if (SeguimientoDeHoy[0].temperatura > 37 || SeguimientoDeHoy[0].peso < 2400 || SeguimientoDeHoy[0].altura < 45) {
                        response_1.default.success(req, res, { feeback: `La temperatura, peso o altura no es la adecuada para colocar esta vacuna.` }, 200);
                    }
                    else {
                        yield store_paciente_vacuna_1.default.registrar_paciente_vacuna(vacuna_paciente);
                        const repres = yield store_paciente_vacuna_1.default.consulta_paciente_vacuna(vacuna_paciente.id_vacuna_paciente);
                        response_1.default.success(req, res, repres, 200);
                    }
                }
                else {
                    response_1.default.success(req, res, { feeback: `No se encontro el seguimiento de altura, peso y temperatura.` }, 200);
                }
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
                const resVP = yield store_paciente_vacuna_1.default.consulta_vacunas_por_paciente(id_paciente);
                const vacunas = yield store_vacuna_1.default.consulta_vacunas();
                const data = [];
                const VcFuera = [];
                for (let i = 0; i < resVP.length; i++) {
                    for (let j = 0; j < vacunas.length; j++) {
                        if (vacunas[j].vacuna_name === resVP[i].vacuna_name) {
                            VcFuera.filter(fuera => fuera === vacunas[j].vacuna_name);
                            if (VcFuera.length === 0) {
                                let list = resVP.filter(res_vp => res_vp.vacuna_name === vacunas[j].vacuna_name);
                                data.push({ vc: vacunas[j].vacuna_name, list });
                                VcFuera.push(vacunas[j].vacuna_name);
                            }
                        }
                    }
                }
                response_1.default.success(req, res, data, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error al mostrar vacuna del paciente');
            }
        });
    }
    get_count_vacuna_paciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_vacuna, id_paciente } = req.params || null;
            try {
                const count_pv = yield store_paciente_vacuna_1.default.consulta_cantidad_vacuna_por_paciente(id_paciente, Number(id_vacuna));
                const vacuna = yield store_vacuna_1.default.consulta_vacuna(Number(id_vacuna));
                if (count_pv.length < vacuna[0].cantidad) {
                    if (count_pv.length) {
                        response_1.default.success(req, res, { feeback: `Cuenta con: ${count_pv.length} dosis por ahora` }, 200);
                    }
                    else {
                        response_1.default.success(req, res, { feeback: `Por el momento no contiene ninguna dosis` }, 200);
                    }
                }
                else {
                    response_1.default.success(req, res, { feeback: `Cantidad maxima para esta vacuna: ${vacuna[0].cantidad}` }, 200);
                }
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error en cantidad vacuna del paciente');
            }
        });
    }
    ruta() {
        /* entry point user */
        this.router.post("/", this.registro_vacuna_paciente);
        this.router.get("/:id_paciente/:id_vacuna", this.get_count_vacuna_paciente);
        this.router.get("/:id_paciente", this.get_vacuna_paciente);
    }
}
let pv = new PaicenteVacuna();
exports.default = pv.router;
