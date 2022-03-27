import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Item from 'App/Models/Item'
import StoreItemValidator from 'App/Validators/StoreItemValidator'

export default class ItemsController {
  /**
   * @index
   * @description Returns array of items
   * @responseBody 200 - <Item[]>
   */
  public async index({ auth }: HttpContextContract) {
    return Item.query()
      .preload('itemCategory')
      .join('categories', (query) => {
        query
          .on('items.category', '=', 'categories.id')
          .andOnVal('categories.owner', '=', auth.user!.id)
      })
      .select('items.*')
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(StoreItemValidator)
    return Item.create(payload)
  }

  public async show({ auth, params }: HttpContextContract) {
    return Item.query()
      .preload('itemCategory')
      .join('categories', (query) => {
        query
          .on('items.category', '=', 'categories.id')
          .andOnVal('categories.owner', '=', auth.user!.id)
      })
      .select('items.*')
      .where('items.id', params.id)
  }

  public async destroy({ auth, params, response }: HttpContextContract) {
    const item = await Item.query().preload('itemCategory').where('id', params.id).first()
    if (item && item.itemCategory.owner !== auth.user!.id) {
      return response.unauthorized('You are not authorized to do this action')
    }
    if (!item) {
      return response.badRequest("This item doesn't exist")
    }
    return item.delete()
  }
}
