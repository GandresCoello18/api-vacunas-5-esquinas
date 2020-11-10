import database from "../../db";
import { Vacunas_INT } from "../../interface/index";

class StoreVacunas {
  /* INSERTAR - POST - CREAR */

  /* SELECT - MOSTRAR - CONSULTAR */

  async consulta_vacunas(): Promise<Vacunas_INT[]> {
    return await new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM vacunas ORDER BY RAND();`,
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }


}

let store = new StoreVacunas();
export default store;