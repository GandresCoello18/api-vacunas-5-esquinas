import { Request, Response, Router } from "express";
import Store from "./store-paciente";
import { v4 as uuidv4 } from "uuid";
import multer from 'multer';
import Respuestas from "../../network/response";
import { Paciente_INT } from "../../interface";
import shortid from 'shortid';

class Paciente {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  store_file() {
    const storage = multer.diskStorage({
      destination: function (req: any, file: any, cb: any) {
        cb(null, "./public/pacientes");
      },
      filename: function (req: Request, file: any, cb: any) {
        cb(null, file.originalname);
      },
    });
    const fileFilter = (
      req: any,
      file: { mimetype: string },
      cb: (arg0: null, arg1: boolean) => void
    ) => {
      if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    };
    const upload = multer({
      storage: storage,
      limits: { fileSize: 1024 * 1024 * 5 },
      fileFilter: fileFilter,
    });
    return upload;
  }

  /* USUARIO */

  async create_paciente(req: Request, res: Response) {
    const { nacimiento, nombres, apellidos, peso, altura, temperatura, codigo, id_representante } = req.body || null;

    try {
          const exit = await Store.validar_paciente_existente(codigo);
          if(exit.length === 0){
            const paciente: Paciente_INT = {
              id_paciente: uuidv4(),
              nombres,
              apellidos,
              nacimiento,
              peso,
              altura,
              temperatura,
              id_representante,
              codigo: shortid.generate(),
              img: req.file.originalname ? req.file.originalname : 'default.png',
            };

            await Store.insertar_paciente(paciente);
            const repres = await Store.consulta_paciente(paciente.id_paciente);
            Respuestas.success(req, res, repres, 200);
          }else{
              Respuestas.success(
                  req,
                  res,
                  { feeback: `El codigo ${codigo} ya existe, intentelo otra vez` },
                  200
              );
          }
    } catch (error) {
        Respuestas.error(req, res, error, 500, 'Error en crear paciente');
    }
  }

  async get_representante(req: Request, res: Response){
    try {
      const repaciente = await Store.consulta_pacientes();
      Respuestas.success(req, res, repaciente, 200);
    } catch (error) {
      Respuestas.error(req, res, error, 500, 'Error al mostrar paciente');
    }
  }

  async eliminar_paciente(req: Request, res: Response){
    const { id_paciente } = req.params || null;

    try {
      await Store.eliminar_paciente(id_paciente);
      Respuestas.success(req, res, {removed: true}, 200);
    } catch (error) {
      Respuestas.error(req, res, error, 500, 'Error al eliminar paciente');
    }
  }

  async actualizar_paciente(req: Request, res: Response){
    const { id_paciente } = req.params || null;
    const { nombres, apellidos, representante } = req.body || null;
    console.log(req.body);

    try {
      if(nombres && apellidos && representante){
        await Store.actualizar_user(id_paciente, nombres, apellidos, Number(representante));
        const paciente = await Store.consulta_paciente(id_paciente);
        Respuestas.success(req, res, {removed: true, paciente: paciente}, 200);
      }else{
        Respuestas.success(
          req,
          res,
          { feeback: `Hay campos vacios, por favor revisa y vuelve a intentar.` },
          200
        );
      }
    } catch (error) {
      Respuestas.error(req, res, error, 500, 'Error al Actualizar paciente');
    }
  }

  ruta() {
    /* entry point user */
    const upload = this.store_file();
    this.router.post("/", upload.single('img'), this.create_paciente);
    this.router.get("/", this.get_representante);
    this.router.delete("/:id_paciente", this.eliminar_paciente);
    this.router.put("/:id_paciente", this.actualizar_paciente);
  }
}

let paciente = new Paciente();
export default paciente.router;