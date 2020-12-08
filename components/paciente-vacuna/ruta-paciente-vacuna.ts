import { Request, Response, Router } from "express";
import Store from "./store-paciente-vacuna";
import StoreVacuna from '../vacunas/store-vacuna';
import StoreSeguimiento from '../seguimiento/store-seguimiento';
import { v4 as uuidv4 } from "uuid";
import Fecha from '../util/util-fecha';
import Respuestas from "../../network/response";
import { Peso_Altura_INT, Vacunas_INT, Vacuna_Paciente_INT, Vacuna_Paciente_Relacionado_INT } from "../../interface";
import fechas from "../util/util-fecha";
import moment from "moment";

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
            observaciones: observaciones ? observaciones : 'Sin observaciones',
            fecha_vacuna: Fecha.fecha_con_hora_actual(),
        };

        const Seguimientos = await StoreSeguimiento.consulta_seguimiento(id_paciente);
        const SeguimientoDeHoy = Seguimientos.filter(item => item.fecha_seguimiento?.indexOf(fechas.fecha_actual()) !== -1);

        if(SeguimientoDeHoy.length !== 0){
          if(SeguimientoDeHoy[0].temperatura > 37 || SeguimientoDeHoy[0].peso < 2400 || SeguimientoDeHoy[0].altura < 45){
            Respuestas.success(
              req,
              res,
              { feeback: `La temperatura, peso o altura no es la adecuada para colocar esta vacuna.` },
              200
            );
          }else{
            const count_pv = await Store.consulta_cantidad_vacuna_por_paciente(id_paciente, Number(id_vacuna));
            const vacuna = await StoreVacuna.consulta_vacuna(Number(id_vacuna));

            if(count_pv.length < vacuna[0].cantidad){
              await Store.registrar_paciente_vacuna(vacuna_paciente);
              const repres = await Store.consulta_paciente_vacuna(vacuna_paciente.id_vacuna_paciente);
              Respuestas.success(req, res, repres, 200);
            }else{
              Respuestas.success(
                req,
                res,
                { feeback: `Dosis completa de vacuna seleccioada.` },
                200
              );
            }
          }
        }else{
          Respuestas.success(
            req,
            res,
            { feeback: `No se encontro el seguimiento de altura, peso y temperatura.` },
            200
          );
        }
    } catch (error) {
        Respuestas.error(req, res, error, 500, 'Error en registrar vacuna del paciente');
    }
  }

  async get_vacuna_paciente(req: Request, res: Response){
    const { id_paciente } = req.params || null;

    try {
      const seguimiento: Array<Peso_Altura_INT> = await StoreSeguimiento.consulta_seguimiento(id_paciente);
      const resVP: Array<Vacuna_Paciente_Relacionado_INT> = await Store.consulta_vacunas_por_paciente(id_paciente);
      const vacunas: Array<Vacunas_INT> = await StoreVacuna.consulta_vacunas();

      const data: Array<any> = [];
      let VcFuera: Array<string> = [];
      let echo: Array<string> = [];

      for(let i = 0; i < resVP.length; i++){
        for(let j = 0; j < vacunas.length; j++){
          if(!echo.some(item => item === resVP[i].vacuna_name)){
            VcFuera = [];
          }
          if(vacunas[j].vacuna_name === resVP[i].vacuna_name){
            VcFuera.filter(fuera => fuera === vacunas[j].vacuna_name);
            if(VcFuera.length === 0){
              let list = resVP.filter(res_vp => res_vp.vacuna_name === vacunas[j].vacuna_name);
              for(let k = 0; k < list.length; k++){
                const seguir = seguimiento.find(item => moment(`${item.fecha_seguimiento}`).format('LL') == moment(list[k].fecha_vacuna).format('LL'));
                if(seguir){
                  list[k].peso = seguir?.peso;
                  list[k].altura = seguir?.altura;
                  list[k].temperatura = seguir?.temperatura;
                }
              }
              data.push({vc: vacunas[j].vacuna_name, list});
              VcFuera.push(vacunas[j].vacuna_name);
            }
            const f = echo.some(item => item === vacunas[j].vacuna_name);
            if(!f){
              echo.push(vacunas[j].vacuna_name);
            }
          }
        }
      }

      Respuestas.success(req, res, data, 200);
    } catch (error) {
      Respuestas.error(req, res, error, 500, 'Error al mostrar vacuna del paciente');
    }
  }

  async get_count_vacuna_paciente(req: Request, res: Response) {
    const { id_vacuna, id_paciente } = req.params || null;

    try {

        const count_pv = await Store.consulta_cantidad_vacuna_por_paciente(id_paciente, Number(id_vacuna));
        const vacuna = await StoreVacuna.consulta_vacuna(Number(id_vacuna));

        if(count_pv.length < vacuna[0].cantidad){
          if(count_pv.length){
            Respuestas.success(
              req,
              res,
              { feeback: `Cuenta con: ${count_pv.length} dosis por ahora` },
              200
            );
          }else{
            Respuestas.success(
              req,
              res,
              { feeback: `Por el momento no contiene ninguna dosis` },
              200
            );
          }
        }else{
          Respuestas.success(
            req,
            res,
            { feeback: `Cantidad maxima para esta vacuna: ${vacuna[0].cantidad}` },
            200
          );
        }
    } catch (error) {
        Respuestas.error(req, res, error, 500, 'Error en cantidad vacuna del paciente');
    }
  }

  ruta() {
    /* entry point user */
    this.router.post("/", this.registro_vacuna_paciente);
    this.router.get("/:id_paciente/:id_vacuna", this.get_count_vacuna_paciente);
    this.router.get("/:id_paciente", this.get_vacuna_paciente);
  }
}

let pv = new PaicenteVacuna();
export default pv.router;