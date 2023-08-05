import { Seeder, Factory } from 'typeorm-seeding';
import { DataSource } from 'typeorm';
import { create, deleteValve, findOne, update, findAll, TOPIC_ID } from '../../../constants'

export default class SeederActionClass implements Seeder {
  public async run(factory: Factory, connection: DataSource): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into('action')
      .values([
        { action: [create, deleteValve, findOne, update, findAll] },

      ])
      .execute();
  }
}
