import * as Knex from 'knex';
import orderedTableNames from '../../src/constants/orderedTableNames';
import TableName from '../../src/constants/tableNames';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await Promise.all(
    orderedTableNames.map(
      async (tableName: string) => await knex(tableName).del()
    )
  );
  const newUser = {
    name: 'testUser',
    password: 'test',
    email: 'testUser@test.com',
    phone_number: '13011999',
    profile_image_url: 'testpath//test.jpg',
    interests: 'web development',
  };
  // Inserts seed entry
  await knex(TableName.user).insert(newUser);
  const quiz = {
    question: 'what does EUCCOSA stand for',
  };
  await knex(TableName.quiz).insert(quiz);
}
