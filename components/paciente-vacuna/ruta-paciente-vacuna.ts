import { Request, Response, Router } from "express";
import Store from "./store-paciente-vacuna";
import { v4 as uuidv4 } from "uuid";
import Fecha from '../util/util-fecha';
import Respuestas from "../../network/response";
import { Representantes_INT, Vacuna_Paciente_INT } from "../../interface";

class PaicenteVacuna {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  /* USUARIO */

  async registro_vacuna_paciente(req: Request, res: Response) {
    const { id_vacuna, id_paciente, id_usuario, observaciones } = req.body || null;

    try {
        const vacuna_paciente: Vacuna_Paciente_INT = {
            id_vacuna_paciente: uuidv4(),
            id_paciente,
            id_usuario,
            id_vacuna,
            observaciones,
            fecha_vacuna: Fecha.fecha_con_hora_actual(),
        };

        console.log(vacuna_paciente);

        await Store.registrar_paciente_vacuna(vacuna_paciente);
        const repres = await Store.consulta_paciente_vacuna(vacuna_paciente.id_vacuna_paciente);
        Respuestas.success(req, res, repres, 200);
    } catch (error) {
        Respuestas.error(req, res, error, 500, 'Error en registrar vacuna del paciente');
    }
  }

  async get_vacuna_paciente(req: Request, res: Response){
    const { id_paciente } = req.params || null;

    try {
      const repres = await Store.consulta_vacunas_por_paciente(id_paciente);
      Respuestas.success(req, res, repres, 200);
    } catch (error) {
      Respuestas.error(req, res, error, 500, 'Error al mostrar vacuna del paciente');
    }
  }

  ruta() {
    /* entry point user */
    this.router.post("/", this.registro_vacuna_paciente);
    this.router.get("/:id_paciente", this.get_vacuna_paciente);
  }
}

let pv = new PaicenteVacuna();
export default pv.router;