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
class StorePaciVacu {
    /* INSERTAR - POST - CREAR */
    registrar_paciente_vacuna(PV) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`INSERT INTO vacuna_paciente (id_vacuna_paciente, id_paciente, id_usuario, id_vacuna, fecha_vacuna, observaciones) VALUES ('${PV.id_vacuna_paciente}', '${PV.id_paciente}', '${PV.id_usuario}', ${PV.id_vacuna}, '${PV.fecha_vacuna}', '${PV.observaciones}')`, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    /* SELECT - MOSTRAR - CONSULTAR */
    consulta_paciente_vacuna(id_vacuna_paciente) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`SELECT vacuna_paciente.fecha_vacuna, vacuna_paciente.observaciones, vacuna_paciente.id_vacuna_paciente, usuarios.id_usuario, usuarios.userName, usuarios.photoURL, usuarios.isAdmin, vacunas.vacuna_name FROM vacuna_paciente INNER JOIN usuarios ON usuarios.id_usuario = vacuna_paciente.id_usuario INNER JOIN vacunas ON vacunas.id_vacuna = vacuna_paciente.id_vacuna INNER JOIN paciente ON paciente.id_paciente = vacuna_paciente.id_paciente WHERE vacuna_paciente.id_vacuna_paciente = '${id_vacuna_paciente}';`, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    consulta_vacunas_por_paciente(id_paciente) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`SELECT vacuna_paciente.fecha_vacuna, vacuna_paciente.observaciones, vacuna_paciente.id_vacuna_paciente, usuarios.id_usuario, usuarios.userName, usuarios.photoURL, usuarios.isAdmin, vacunas.vacuna_name FROM vacuna_paciente INNER JOIN usuarios ON usuarios.id_usuario = vacuna_paciente.id_usuario INNER JOIN vacunas ON vacunas.id_vacuna = vacuna_paciente.id_vacuna INNER JOIN paciente ON paciente.id_paciente = vacuna_paciente.id_paciente WHERE paciente.id_paciente = '${id_paciente}';`, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
    /* PUT - MODIFICAR - ACTUALIZAR */
    /* DELETE - BORRAR - ELIMINAR */
    eliminar_discucion(id_discucion) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                db_1.default.query(`DELETE FROM discucion WHERE id_discucion = '${id_discucion}';`, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        });
    }
}
let store = new StorePaciVacu();
exports.default = store;
