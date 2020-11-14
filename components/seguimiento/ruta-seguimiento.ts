import { Request, Response, Router } from "express";
import Store from "./store-seguimiento";
import StorePaciente from '../paciente/store-paciente';
import { v4 as uuidv4 } from "uuid";
import Fecha from '../util/util-fecha';
import Respuestas from "../../network/response";
import { Peso_Altura_INT } from "../../interface";

class Seguimiento {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  /* USUARIO */

  async registro_seguimiento(req: Request, res: Response) {
    const { peso, altura, id_paciente } = req.body || null;

    try {
        const seguimiento: Peso_Altura_INT = {
            id_seguimiento: uuidv4(),
            id_paciente,
            peso,
            altura,
            fecha_seguimineto: Fecha.fecha_con_hora_actual(),
        };

        await Store.registrar_seguimiento(seguimiento);
        await StorePaciente.editar_peso_altura(seguimiento.peso, seguimiento.altura, seguimiento.id_paciente);
        const resPaciente = await StorePaciente.consulta_paciente(seguimiento.id_paciente);
        Respuestas.success(req, res, resPaciente, 200);
    } catch (error) {
        Respuestas.error(req, res, error, 500, 'Error en registrar seguimiento peso y altura');
    }
  }

  async get_seguimiento(req: Request, res: Response){
    const { id_paciente } = req.params || null;

    try {
      const seguimiento = await Store.consulta_seguimiento(id_paciente);
      Respuestas.success(req, res, seguimiento, 200);
    } catch (error) {
      Respuestas.error(req, res, error, 500, 'Error al mostrar seguimiento peso y altura');
    }
  }

  ruta() {
    /* entry point user */
    this.router.post("/", this.registro_seguimiento);
    this.router.get("/:id_paciente", this.get_seguimiento);
  }
}

let seguimiento = new Seguimiento();
export default seguimiento.router;