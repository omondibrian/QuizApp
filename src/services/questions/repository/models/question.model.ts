/* istanbul ignore file */
import Knex = require("knex");
import { Model } from "objection";

import { con } from "../../../../constants/config";

import TableName from "../../../../constants/tableNames";


const config = con[process.env.NODE_ENV || "development"];
const database = Knex(config);
Model.knex(database);

export default class Quiz extends Model {
  _id?: number;
  question: string;
  
  static get tableName(): string {
    return TableName.quiz;
  }

  static get idColumn() :string{
    return '_id';
  } 
  
}
