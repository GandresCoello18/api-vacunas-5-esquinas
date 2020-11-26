import database from "../../db";
import { Paciente_INT } from "../../interface/index";

class StoreUsuario {
  /* INSERTAR - POST - CREAR */

  async insertar_paciente(paciente: Paciente_INT) {
    return await new Promise((resolve, reject) => {
      database.query(
        `INSERT INTO paciente (id_paciente, nombres, apellidos, nacimiento, peso, altura, codigo, img, id_representante, temperatura) VALUES ('${paciente.id_paciente}', '${paciente.nombres}', '${paciente.apellidos}', '${paciente.nacimiento}', ${paciente.peso}, ${paciente.altura}, '${paciente.codigo}', '${paciente.img}', ${paciente.id_representante}, ${paciente.temperatura})`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* SELECT - MOSTRAR - CONSULTAR */

  async validar_paciente_existente(codigo: string): Promise<Paciente_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM paciente WHERE codigo = '${codigo}';`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async consulta_paciente(id_paciente: string): Promise<Paciente_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM paciente WHERE id_paciente = '${id_paciente}';`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  async consulta_pacientes(): Promise<Paciente_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM paciente ORDER BY id_paciente DESC;`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }
  
  async editar_peso_altura(peso: number, altura: number, id_paciente: string): Promise<any> {
    return await new Promise((resolve, reject) => {
      database.query(
        `UPDATE paciente SET peso = ${peso}, altura = ${altura} WHERE id_paciente = '${id_paciente}';`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* PUT - MODIFICAR - ACTUALIZAR */

  async actualizar_user(id_user: string, nombres: string, apellidos: string, representante: number) {
    return await new Promise((resolve, reject) => {
      database.query(
        `UPDATE paciente SET id_representante = ${representante}, apellidos = '${apellidos}', nombres = '${nombres}' WHERE id_paciente = '${id_user}' `,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }

  /* DELETE - BORRAR - ELIMINAR */

  async eliminar_paciente(id_paciente: string) {
    return await new Promise((resolve, reject) => {
      database.query(
        `DELETE FROM paciente WHERE id_paciente = '${id_paciente}';`,
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