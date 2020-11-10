import database from "../../db";
import { Discucion_INT } from "../../interface/index";

class StoreUsuario {
  /* INSERTAR - POST - CREAR */

  async insertar_discucion(discucion: Discucion_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO discucion (id_discucion, asunto, contenido, id_usuario, fecha_discucion) VALUES ('${discucion.id_discucion}', '${discucion.asunto}', '${discucion.contenido}', '${discucion.id_usuario}', '${discucion.fecha_discucion}')`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* SELECT - MOSTRAR - CONSULTAR */

  async consulta_discucion(id_discucion: string): Promise<Discucion_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT discucion.id_discucion, discucion.asunto, discucion.contenido, discucion.fecha_discucion, discucion.id_usuario, usuarios.userName, usuarios.photoURL, usuarios.isAdmin, paciente.id_paciente, paciente.codigo, paciente.nombres, paciente.apellidos, paciente.img, discucion_menciones.id_discucion_mencion  FROM discucion_menciones INNER JOIN paciente ON paciente.id_paciente = discucion_menciones.id_paciente INNER JOIN discucion ON discucion.id_discucion = discucion_menciones.id_discucion INNER JOIN usuarios ON usuarios.id_usuario = discucion.id_usuario WHERE discucion.id_discucion = '${id_discucion}';`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async consulta_discuciones(fecha_discucion: string): Promise<Discucion_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT discucion.id_discucion, discucion.asunto, discucion.contenido, discucion.fecha_discucion, discucion.id_usuario, usuarios.userName, usuarios.photoURL, usuarios.isAdmin, paciente.id_paciente, paciente.codigo, paciente.nombres, paciente.apellidos, paciente.img, discucion_menciones.id_discucion_mencion FROM discucion_menciones INNER JOIN paciente ON paciente.id_paciente = discucion_menciones.id_paciente INNER JOIN discucion ON discucion.id_discucion = discucion_menciones.id_discucion INNER JOIN usuarios ON usuarios.id_usuario = discucion.id_usuario WHERE discucion.fecha_discucion = '${fecha_discucion}';`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* PUT - MODIFICAR - ACTUALIZAR */

  /* DELETE - BORRAR - ELIMINAR */

  async eliminar_discucion(id_discucion: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `DELETE FROM discucion WHERE id_discucion = '${id_discucion}';`,
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