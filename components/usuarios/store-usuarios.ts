import database from "../../db";
import { Usuario_INT } from "../../interface/index";

class StoreUsuario {
  /* INSERTAR - POST - CREAR */

  async insertar_usuario(user: Usuario_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO usuarios (id_usuario, email, status, userName, photoURL, fecha_registro, isAdmin) VALUES ('${user.id_usuario}', '${user.email}', '${user.status}', '${user.userName}', '${user.photoURL}', '${user.fecha_registro}', ${user.isAdmin})`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* SELECT - MOSTRAR - CONSULTAR */

  async validar_usuario_existente(email: String): Promise<Usuario_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM usuarios WHERE email = '${email}';`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async consulta_usuario(id_usuario: String): Promise<Usuario_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM usuarios WHERE id_usuario = '${id_usuario}';`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async consulta_usuarios(id_usuario: string): Promise<Usuario_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM usuarios WHERE id_usuario <> '${id_usuario}' ORDER BY id_usuario DESC;`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* PUT - MODIFICAR - ACTUALIZAR */

  async actualizar_rol_usuario(id: string, Admin: boolean) {
    return await new Promise((resolve, reject) => {
      database.query(
        `UPDATE usuarios SET isAdmin = ${Admin} WHERE id_usuario = '${id}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async actualizar_status_usuario(id: string, status: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `UPDATE usuarios SET status = '${status}' WHERE id_usuario = '${id}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* DELETE - BORRAR - ELIMINAR */

  async eliminar_usuario(id: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `DELETE FROM usuarios WHERE id_usuario = '${id}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

}

let store = new StoreUsuario();
export default store;