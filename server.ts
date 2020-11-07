import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import expressPinoLogger from "express-pino-logger";

// puntos de entrada
import IndexRouter from "./network/rutas";
import Usuarios from './components/usuarios/ruta-usuarios';
import Representante from './components/representante/ruta-representante';

const { config } = require("./config/index");
import { logger } from "./components/util/logger";

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    this.app.set("port", config.port);
    this.app.use(helmet());
    this.app.use(
      cors({
        origin: [
          "https://seguro-social.vercel.app",
          "http://localhost:3000",
        ],
      })
    );
    this.app.use(expressPinoLogger({ logger: logger }));
    this.app.use(bodyParser.json());
    this.app.use("/static", express.static("public"));
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  routes() {
    // peticiones de datos con api rest
    this.app.use("/api", IndexRouter);
    this.app.use("/api/usuario", Usuarios);
    this.app.use("/api/representante", Representante);
    // se ejecuta si no encuentra la ruta
    this.app.get("*", function (req, res) {
      res.send('RUTA NO EXISTENTE');
    });
  }

  start() {
    this.app.listen(this.app.get("port"), () =>
      console.log("RUN SERVER NODE...")
    );
  }
}

const server = new Server();
server.start();
