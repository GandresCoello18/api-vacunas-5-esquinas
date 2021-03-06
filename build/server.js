"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_pino_logger_1 = __importDefault(require("express-pino-logger"));
// puntos de entrada
const rutas_1 = __importDefault(require("./network/rutas"));
const ruta_usuarios_1 = __importDefault(require("./components/usuarios/ruta-usuarios"));
const ruta_representante_1 = __importDefault(require("./components/representante/ruta-representante"));
const ruta_paciente_1 = __importDefault(require("./components/paciente/ruta-paciente"));
const ruta_discucion_1 = __importDefault(require("./components/discuciones/ruta-discucion"));
const ruta_vacuna_1 = __importDefault(require("./components/vacunas/ruta-vacuna"));
const ruta_comentario_1 = __importDefault(require("./components/comentario-discucion/ruta-comentario"));
const ruta_paciente_vacuna_1 = __importDefault(require("./components/paciente-vacuna/ruta-paciente-vacuna"));
const ruta_seguimiento_1 = __importDefault(require("./components/seguimiento/ruta-seguimiento"));
const { config } = require("./config/index");
const logger_1 = require("./components/util/logger");
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set("port", config.port);
        this.app.use(helmet_1.default());
        this.app.use(cors_1.default({
            origin: [
                "https://vacunas-5-esquinas.vercel.app",
                "http://localhost:3000",
            ],
        }));
        this.app.use(express_pino_logger_1.default({ logger: logger_1.logger }));
        this.app.use(body_parser_1.default.json());
        this.app.use("/static", express_1.default.static("public"));
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
    }
    routes() {
        // peticiones de datos con api rest
        this.app.use("/api", rutas_1.default);
        this.app.use("/api/usuario", ruta_usuarios_1.default);
        this.app.use("/api/representante", ruta_representante_1.default);
        this.app.use("/api/paciente", ruta_paciente_1.default);
        this.app.use("/api/discucion", ruta_discucion_1.default);
        this.app.use("/api/vacuna", ruta_vacuna_1.default);
        this.app.use("/api/comentario", ruta_comentario_1.default);
        this.app.use("/api/vacuna-paciente", ruta_paciente_vacuna_1.default);
        this.app.use("/api/seguimiento", ruta_seguimiento_1.default);
        // se ejecuta si no encuentra la ruta
        this.app.get("*", function (req, res) {
            res.send('RUTA NO EXISTENTE');
        });
    }
    start() {
        this.app.listen(this.app.get("port"), () => console.log(`RUN SERVER NODE... port ${this.app.get("port")}`));
    }
}
const server = new Server();
server.start();
