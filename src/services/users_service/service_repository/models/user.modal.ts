/* istanbul ignore file */
import Knex = require("knex");
import { Model } from "objection";

import { con } from "../../../../constants/config";

import TableName from "../../../../constants/tableNames";


const config = con[process.env.NODE_ENV || "development"];
const database = Knex(config);
Model.knex(database);

export default class User extends Model {
  _id?: number;
  name: string;
  email: string;
  phone_number: string;
  profile_image_url: string;
  address_id: string;
  password: string;
  interests: string;
  static get tableName(): string {
    return TableName.user;
  }

  static get idColumn() :string{
    return '_id';
  } 
  
}
