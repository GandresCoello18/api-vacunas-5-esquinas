import { Request, Response, Router } from "express";
import Store from "./store-usuarios";
import Fechas from "../util/util-fecha";
import Respuestas from "../../network/response";
import {
    Usuario_INT
} from "../../interface";

class Usuario {
  router: Router;

  constructor() {
    this.router = Router();
    this.ruta();
  }

  /* USUARIO */

  async crear_usuario(req: Request, res: Response) {
    const { uid, email, displayName, photoURL } = req.body || null;

    try {
          const cuenta = await Store.validar_usuario_existente(email);
          if(cuenta.length === 0){
            const user: Usuario_INT = {
              id_usuario: uid,
              email,
              status: 'registrado',
              userName: displayName,
              isadmin: true,
              photoURL,
              fecha_registro: Fechas.fecha_actual(),
            };

            await Store.insertar_usuario(user);
            const usuario = await Store.consulta_usuario(user.id_usuario);
            Respuestas.success(req, res, usuario, 200);
          }else{
              Respuestas.success(
                  req,
                  res,
                  { feeback: "Bienvenido de nuevo" },
                  200
              );
          }
    } catch (error) {
        Respuestas.error(req, res, error, 500, 'Error en crear usuario');
    }
  }

  async get_usuarios(req: Request, res: Response){
    const { id_usuario } = req.params || null;

    try {
      const dataUser = await Store.consulta_usuarios(id_usuario);
      Respuestas.success(req, res, dataUser,200);
    } catch (error) {
      Respuestas.error(req, res, error, 500, 'Error al mostrar usuarios');
    }
  }

  async get_usuarios_session(req: Request, res: Response){
    const { id_usuario } = req.params || null;

    try {
      const UserSession = await Store.consulta_usuario(id_usuario);
      Respuestas.success(req, res, {session: UserSession[0]}, 200);
    } catch (error) {
      Respuestas.error(req, res, error, 500, 'Error al mostrar session del usuario');
    }
  }

  ruta() {
    /* entry point user */
    this.router.post("/", this.crear_usuario);
    this.router.get("/session/:id_usuario", this.get_usuarios_session);
    this.router.get("/:id_usuario", this.get_usuarios);
  }
}

let user = new Usuario();
export default user.router;