import database from "../../db";
import { Comentario_Discucion_INT } from "../../interface/index";

class StoreComentario {
  /* INSERTAR - POST - CREAR */

  async insertar_comentario(comment: Comentario_Discucion_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO comentarios_menciones (id_comentario_mencion, id_usuario, id_discucion_mencion, fecha_comentario, comentario) VALUES ('${comment.id_comentario_mencion}', '${comment.id_usuario}', '${comment.id_discucion_mencion}', '${comment.fecha_comentario}', '${comment.comentario}');`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* SELECT - MOSTRAR - CONSULTAR */

  async consulta_comentarios_menciones(): Promise<Comentario_Discucion_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT comentarios_menciones.id_comentario_mencion, comentarios_menciones.id_usuario, comentarios_menciones.id_discucion_mencion, comentarios_menciones.fecha_comentario, comentarios_menciones.comentario, usuarios.userName, usuarios.photoURL, usuarios.isAdmin FROM comentarios_menciones INNER JOIN usuarios ON usuarios.id_usuario = comentarios_menciones.id_usuario;`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async consulta_comentario_mencione(id_comentario_mencion: string): Promise<Comentario_Discucion_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT comentarios_menciones.id_comentario_mencion, comentarios_menciones.id_usuario, comentarios_menciones.id_discucion_mencion, comentarios_menciones.fecha_comentario, comentarios_menciones.comentario, usuarios.userName, usuarios.photoURL, usuarios.isAdmin FROM comentarios_menciones INNER JOIN usuarios ON usuarios.id_usuario = comentarios_menciones.id_usuario WHERE comentarios_menciones.id_comentario_mencion = '${id_comentario_mencion}';`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* PUT - MODIFICAR - ACTUALIZAR */

  /* DELETE - BORRAR - ELIMINAR */

  async eliminar_comentario(id_comentario_mencion: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `DELETE FROM comentarios_menciones WHERE id_comentario_mencion = '${id_comentario_mencion}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

}

let store = new StoreComentario();
export default store;