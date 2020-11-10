import { Request, Response, Router } from "express";
import Store from "./store-vacuna";
import Respuestas from "../../network/response";

class Vacunas {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  async get_vacunas(req: Request, res: Response){
    try {
      const resVacuna = await Store.consulta_vacunas();
      Respuestas.success(req, res, resVacuna, 200);
    } catch (error) {
      Respuestas.error(req, res, error, 500, 'Error al mostrar vacunas');
    }
  }

  ruta() {
    /* entry point user */
    this.router.get("/", this.get_vacunas);
  }
}

let vacuna = new Vacunas();
export default vacuna.router;
