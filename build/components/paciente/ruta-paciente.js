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
const store_paciente_1 = __importDefault(require("./store-paciente"));
const uuid_1 = require("uuid");
const multer_1 = __importDefault(require("multer"));
const response_1 = __importDefault(require("../../network/response"));
const shortid_1 = __importDefault(require("shortid"));
class Paciente {
    constructor() {
        this.router = express_1.Router();
        this.ruta();
    }
    store_file() {
        const storage = multer_1.default.diskStorage({
            destination: function (req, file, cb) {
                cb(null, "./public/pacientes");
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname);
            },
        });
        const fileFilter = (req, file, cb) => {
            if (file.mimetype === "image/jpg" ||
                file.mimetype === "image/jpeg" ||
                file.mimetype === "image/png") {
                cb(null, true);
            }
            else {
                cb(null, false);
            }
        };
        const upload = multer_1.default({
            storage: storage,
            limits: { fileSize: 1024 * 1024 * 5 },
            fileFilter: fileFilter,
        });
        return upload;
    }
    /* USUARIO */
    create_paciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nacimiento, nombres, apellidos, peso, altura, temperatura, codigo, id_representante } = req.body || null;
            try {
                const exit = yield store_paciente_1.default.validar_paciente_existente(codigo);
                if (exit.length === 0) {
                    const paciente = {
                        id_paciente: uuid_1.v4(),
                        nombres,
                        apellidos,
                        nacimiento,
                        peso,
                        altura,
                        temperatura,
                        id_representante,
                        codigo: shortid_1.default.generate(),
                        img: req.file.originalname ? req.file.originalname : 'default.png',
                    };
                    yield store_paciente_1.default.insertar_paciente(paciente);
                    const repres = yield store_paciente_1.default.consulta_paciente(paciente.id_paciente);
                    response_1.default.success(req, res, repres, 200);
                }
                else {
                    response_1.default.success(req, res, { feeback: `El codigo ${codigo} ya existe, intentelo otra vez` }, 200);
                }
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error en crear paciente');
            }
        });
    }
    get_representante(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repaciente = yield store_paciente_1.default.consulta_pacientes();
                response_1.default.success(req, res, repaciente, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error al mostrar paciente');
            }
        });
    }
    eliminar_paciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_paciente } = req.params || null;
            try {
                yield store_paciente_1.default.eliminar_paciente(id_paciente);
                response_1.default.success(req, res, { removed: true }, 200);
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error al eliminar paciente');
            }
        });
    }
    actualizar_paciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_paciente } = req.params || null;
            const { nombres, apellidos, representante } = req.body || null;
            console.log(req.body);
            try {
                if (nombres && apellidos && representante) {
                    yield store_paciente_1.default.actualizar_user(id_paciente, nombres, apellidos, Number(representante));
                    const paciente = yield store_paciente_1.default.consulta_paciente(id_paciente);
                    response_1.default.success(req, res, { removed: true, paciente: paciente }, 200);
                }
                else {
                    response_1.default.success(req, res, { feeback: `Hay campos vacios, por favor revisa y vuelve a intentar.` }, 200);
                }
            }
            catch (error) {
                response_1.default.error(req, res, error, 500, 'Error al Actualizar paciente');
            }
        });
    }
    ruta() {
        /* entry point user */
        const upload = this.store_file();
        this.router.post("/", upload.single('img'), this.create_paciente);
        this.router.get("/", this.get_representante);
        this.router.delete("/:id_paciente", this.eliminar_paciente);
        this.router.put("/:id_paciente", this.actualizar_paciente);
    }
}
let paciente = new Paciente();
exports.default = paciente.router;
