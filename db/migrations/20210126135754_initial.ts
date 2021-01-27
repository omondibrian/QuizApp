import * as Knex from "knex";
import orderedTableNames from "../../src/constants/orderedTableNames";
import TableName from "../../src/constants/tableNames";
import { addDefaultColumns } from "../../src/lib/tableUtiles";


export async function up(knex: Knex): Promise<void> {
      //User Table
      await knex.schema.createTable(
        TableName.user,
        (table: Knex.CreateTableBuilder) => {
          table.increments("_id").notNullable().primary();
          table.string("name").notNullable();
          table.string("interests").notNullable();
          table.string("email", 254).notNullable().unique();
          table.string("password").notNullable();
          table.integer("phone_number").notNullable().unique();
          table
            .string("profile_image_url")
            .defaultTo("../static/defaultProfileImage.jpg");
         
          addDefaultColumns(table);
        }
      )

      //Quiz Table
      await knex.schema.createTable(
        TableName.quiz,
        (table: Knex.CreateTableBuilder) => {
          table.increments("_id").notNullable().primary();
          table.string("question").notNullable();
          addDefaultColumns(table);
        }
      )
}


export async function down(knex: Knex): Promise<void> {
  await Promise.all(
    orderedTableNames.map(async (tableName: string) =>
      knex.schema.dropTableIfExists(tableName)
    )
  );
}

