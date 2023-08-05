import { Seeder, Factory } from 'typeorm-seeding';
import { DataSource } from 'typeorm';
import { User } from './../../../src/user/entities/user.entity';
import { EMAIL, EMPLYEE_ID, LASTNAME, ROLE, USERNAME, USER_ID, PASSWORD } from '../../../constants';
import * as bcrypt from 'bcrypt';
export default class SeederUserClass implements Seeder {
  public async run(factory: Factory, connection: DataSource): Promise<any> {

    await connection
      .createQueryBuilder()
      .insert()
      .into('users') // Replace 'User' with the actual table name in your database
      .values([
        {
          username: USERNAME,
          emplyeeId: EMPLYEE_ID,
          userId: USER_ID,
          email: EMAIL,
          lastName: LASTNAME,
          role: ROLE,
          password: await hashPassword(PASSWORD),
        },
      ])
      .execute();
  }
}

//encrypt password
async function hashPassword(password: string) {
  const saltRounds = 10;

  const hashedPassword: string = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err)
      resolve(hash)
    });
  })

  return hashedPassword
}
