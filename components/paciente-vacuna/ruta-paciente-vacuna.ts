import { Request, Response, Router } from "express";
import Store from "./store-paciente-vacuna";
import StoreVacuna from '../vacunas/store-vacuna';
import { v4 as uuidv4 } from "uuid";
import Fecha from '../util/util-fecha';
import Respuestas from "../../network/response";
import { Vacunas_INT, Vacuna_Paciente_INT, Vacuna_Paciente_Relacionado_INT } from "../../interface";

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
      const resVP: Array<Vacuna_Paciente_Relacionado_INT> = await Store.consulta_vacunas_por_paciente(id_paciente);
      const vacunas: Array<Vacunas_INT> = await StoreVacuna.consulta_vacunas();

      const data: Array<any> = [];
      const VcFuera: Array<string> = [];

      for(let i = 0; i < resVP.length; i++){
        for(let j = 0; j < vacunas.length; j++){
          if(vacunas[j].vacuna_name === resVP[i].vacuna_name){
            VcFuera.filter(fuera => fuera === vacunas[j].vacuna_name);
            if(VcFuera.length === 0){
              let list = resVP.filter(res_vp => res_vp.vacuna_name === vacunas[j].vacuna_name);
              data.push({vc: vacunas[j].vacuna_name, list});
              VcFuera.push(vacunas[j].vacuna_name);
            }
          }
        }
      }

      console.log(data);
      
      Respuestas.success(req, res, data, 200);
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