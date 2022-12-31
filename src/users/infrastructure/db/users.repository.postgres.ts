import Message from "../../../context/responses/Message";

import User from "../../domain/User";
import UsersRepository from "../../domain/users.repository";
import executeQuery from "../../../context/db/postgres.connector";
//security
import { compare, hash } from "../../../context/security/encrypter";

export default class UsersRepositoryPostgres implements UsersRepository {
  async create(user: User): Promise<Message> {
    if (user.name && user.password) {
      await executeQuery(
        `insert into users values ('${user.name}','${hash(user.password)}')`
      );
      const message: Message = {
        text: `El usuario ${user.name} ha sido creado`,
      };
      return message;
    }
    const message: Message = {
      text: "No se ha proporcionado correctamente el usuario",
    };
    return message;
  }
  async login(user: User): Promise<Boolean> {
    if (user.name && user.password) {
      const result: any[] = await executeQuery(`
            select * 
            from users 
            where name = '${user.name}'`);
      const userFromDB = result[0];
      if (userFromDB && compare(user.password, userFromDB.password)) {
        return true;
      }
    }
    return false;
  }
}
