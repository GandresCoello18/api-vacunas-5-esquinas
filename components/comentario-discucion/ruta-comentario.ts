import { Request, Response, Router } from "express";
import Store from "./store-comentarios";
import Fechas from "../util/util-fecha";
import { v4 as uuidv4 } from "uuid";
import Respuestas from "../../network/response";
import { Comentario_Discucion_INT } from "../../interface";

class Comentario {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  /* USUARIO */

  async crear_comentario(req: Request, res: Response) {
    const { id_usuario,  id_discucion_mencion, comentario } = req.body || null;

    try {
        const coment: Comentario_Discucion_INT = {
            id_comentario_mencion: uuidv4(),
            id_usuario,
            id_discucion_mencion,
            fecha_comentario: Fechas.fecha_con_hora_actual(),
            comentario,
        }

        await Store.insertar_comentario(coment);
        const resComentario = await Store.consulta_comentario_mencione(coment.id_comentario_mencion);
        Respuestas.success(req, res, resComentario, 200);
    } catch (error) {
        Respuestas.error(req, res, error, 500, 'Error en crear comentario en discucion');
    }
  }

  async get_comentarios(req: Request, res: Response){

    try {
      const comentarios = await Store.consulta_comentarios_menciones();
      Respuestas.success(req, res, comentarios, 200);
    } catch (error) {
      Respuestas.error(req, res, error, 500, 'Error al mostrar comentario en discucion');
    }
  }

  ruta() {
    /* entry point user */
    this.router.post("/", this.crear_comentario);
    this.router.get("/", this.get_comentarios);
  }
}

let comentario = new Comentario();
export default comentario.router;