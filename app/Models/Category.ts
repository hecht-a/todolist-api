import { DateTime } from "luxon";
import { BaseModel, beforeCreate, column } from "@ioc:Adonis/Lucid/Orm";
import { v4 as uuid } from "@lukeed/uuid";

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public uuid: string;

  @column()
  public name: string;

  @column()
  public owner: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async generateUUID(category: Category) {
    category.uuid = uuid();
  }
}
