import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Item from 'App/Models/Item'

export default class Category extends BaseModel {
  @belongsTo(() => User, {
    foreignKey: 'owner',
  })
  public categoryOwner: BelongsTo<typeof User>

  @hasMany(() => Item, {
    foreignKey: 'category',
  })
  public items: HasMany<typeof Item>

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public owner: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
