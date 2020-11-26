import { Request, Response, Router } from "express";
import Store from "./store-discucion";
import StorePaciente from '../paciente/store-paciente';
import StoreMencion from './store-menciones';
import { v4 as uuidv4 } from "uuid";
import Fechas from '../util/util-fecha';
import Respuestas from "../../network/response";
import { Discucion_INT } from "../../interface";

class Discucion {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  async create_discucion(req: Request, res: Response) {
    const { id_usuario, asunto, contenido, pacientes } = req.body || null;

    try {
        const discucion: Discucion_INT = {
            id_discucion: uuidv4(),
            id_usuario,
            asunto,
            contenido,
            pacientes,
            fecha_discucion: Fechas.fecha_actual(),
        };

        await Store.insertar_discucion(discucion);

        discucion.pacientes.map( async code => {
            const thisPaciente = await StorePaciente.validar_paciente_existente(code);
            return await StoreMencion.insertar_mencion(uuidv4(), thisPaciente[0].id_paciente, discucion.id_discucion);
        });

        let repres;

        setTimeout( async () => {
          repres = await Store.consulta_discucion(discucion.id_discucion);
          Respuestas.success(req, res, repres, 200);
        }, 1000);
    } catch (error) {
        Respuestas.error(req, res, error, 500, 'Error en crear discucion');
    }
  }

  async get_discuciones(req: Request, res: Response){
    const { fecha_discucion } = req.params || null;

    try {
      const repaciente = await Store.consulta_discuciones(fecha_discucion);
      Respuestas.success(req, res, repaciente, 200);
    } catch (error) {
      Respuestas.error(req, res, error, 500, 'Error al mostrar discuciones');
    }
  }

  async get_mis_menciones(req: Request, res: Response){
    const { id_paciente } = req.params || null;

    try {
      const MisMenciones = await Store.consulta_mis_menciones(id_paciente);
      Respuestas.success(req, res, MisMenciones, 200);
    } catch (error) {
      Respuestas.error(req, res, error, 500, 'Error al mostrar mis menciones');
    }
  }

  async eliminar_discucion(req: Request, res: Response){
    const { id_discucion } = req.params || null;

    try {
      await Store.eliminar_discucion(id_discucion);
      Respuestas.success(req, res, {removed: true}, 200);
    } catch (error) {
      Respuestas.error(req, res, error, 500, 'Error al eliminar mis menciones');
    }
  }

  ruta() {
    /* entry point user */
    this.router.post("/", this.create_discucion);
    this.router.get("/mis-menciones/:id_paciente", this.get_mis_menciones);
    this.router.get("/:fecha_discucion", this.get_discuciones);
    this.router.delete("/:id_discucion", this.eliminar_discucion);
  }
}

let discucion = new Discucion();
export default discucion.router;
