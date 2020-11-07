import { Request, Response, Router } from "express";
import Store from "./store-representante";
// import { v4 as uuidv4 } from "uuid";
import Respuestas from "../../network/response";
import { Representantes_INT } from "../../interface";

class Representante {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  /* USUARIO */

  async crear_representante(req: Request, res: Response) {
    const { cedula, nombres, apellidos, sexo } = req.body || null;

    try {
          const exit = await Store.validar_representante_existente(cedula);
          if(exit.length === 0){
            const representante: Representantes_INT = {
              cedula,
              nombres,
              apellidos,
              sexo,
            };

            await Store.insertar_representante(representante);
            const repres = await Store.validar_representante_existente(representante.cedula);
            Respuestas.success(req, res, repres, 200);
          }else{
              Respuestas.success(
                  req,
                  res,
                  { feeback: `La identificacion ${cedula} ya existe, intente con otra CI` },
                  200
              );
          }
    } catch (error) {
        Respuestas.error(req, res, error, 500, 'Error en crear representante');
    }
  }

  async get_representante(req: Request, res: Response){
    try {
      const repres = await Store.consulta_representantes();
      Respuestas.success(req, res, repres, 200);
    } catch (error) {
      Respuestas.error(req, res, error, 500, 'Error al mostrar representante');
    }
  }

  ruta() {
    /* entry point user */
    this.router.post("/", this.crear_representante);
    this.router.get("/", this.get_representante);
  }
}

let repres = new Representante();
export default repres.router;