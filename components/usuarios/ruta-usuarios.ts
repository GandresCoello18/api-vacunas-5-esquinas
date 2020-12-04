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
              isAdmin: false,
              photoURL,
              fecha_registro: Fechas.fecha_actual(),
            };

            await Store.insertar_usuario(user);
            const usuario = await Store.consulta_usuario(user.id_usuario);
            Respuestas.success(req, res, {usuario: usuario}, 200);
          }else{
              Respuestas.success(
                  req,
                  res,
                  { feeback: "Bienvenido de nuevo", usuario: cuenta },
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

  async delete_user(req: Request, res: Response){
    const { id_usuario } = req.params || null;

    try {
        await Store.eliminar_usuario(id_usuario);
        Respuestas.success(req, res, {removed: true}, 200);
    } catch (error) {
      Respuestas.error(req, res, error, 500, 'Error al mostrar session del usuario');
    }
  }

  async actualizar_rol(req: Request, res: Response){
    const { id_usuario } = req.params || null;

    try {
        const User = await Store.consulta_usuario(id_usuario);
        const rol: boolean = User[0].isAdmin ? false : true;
        await Store.actualizar_rol_usuario(id_usuario, rol);
        User[0].isAdmin = rol;
        Respuestas.success(req, res, {update: true, user: User}, 200);
    } catch (error) {
      Respuestas.error(req, res, error, 500, 'Error al editar el rol del usuario');
    }
  }

  async actualizar_estado(req: Request, res: Response){
    const { id_usuario } = req.params || null;
    const { status } = req.body || null;

    try {
        const User = await Store.consulta_usuario(id_usuario);
        await Store.actualizar_status_usuario(id_usuario, status);
        User[0].status = status;
        Respuestas.success(req, res, {update: true, user: User}, 200);
    } catch (error) {
      Respuestas.error(req, res, error, 500, 'Error al editar el estado del usuario');
    }
  }

  ruta() {
    /* entry point user */
    this.router.post("/", this.crear_usuario);
    this.router.get("/session/:id_usuario", this.get_usuarios_session);
    this.router.get("/:id_usuario", this.get_usuarios);
    this.router.delete("/:id_usuario", this.delete_user);
    this.router.put("/rol/:id_usuario", this.actualizar_rol);
    this.router.put("/status/:id_usuario", this.actualizar_estado);
  }
}

let user = new Usuario();
export default user.router;