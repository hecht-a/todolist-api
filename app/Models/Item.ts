import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Category from 'App/Models/Category'

export default class Item extends BaseModel {
  @belongsTo(() => Category, {
    foreignKey: 'category',
  })
  public itemCategory: BelongsTo<typeof Category>

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public category: number

  @column()
  public state: boolean = false

  @column()
  public description: string

  @column.dateTime()
  public start: DateTime

  @column.dateTime()
  public end: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
