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
const store_vacuna_1 = __importDefault(require("./store-vacuna"));
const response_1 = __importDefault(require("../../network/response"));
class Vacunas {
    constructor() {
        this.router = express_1.Router();
        this.ruta();
    }
    get_vacunas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resVacuna = yield store_vacuna_1.default.consulta_vacunas();
                response_1.default.success(req, res, resVacuna, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error al mostrar vacunas');
            }
        });
    }
    ruta() {
        /* entry point user */
        this.router.get("/", this.get_vacunas);
    }
}
let vacuna = new Vacunas();
exports.default = vacuna.router;
