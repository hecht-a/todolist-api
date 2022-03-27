import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import StoreCategoryValidator from 'App/Validators/StoreCategoryValidator'

export default class CategoriesController {
  public async index({ auth }: HttpContextContract) {
    return Category.query().preload('items').where('owner', auth.user!.id)
  }

  public async store({ auth, request }: HttpContextContract) {
    const { name } = await request.validate(StoreCategoryValidator)
    return Category.create({ name, owner: auth.user!.id })
  }

  public async show({ auth, params }: HttpContextContract) {
    return Category.query().preload('items').where('owner', auth.user!.id).andWhere('id', params.id)
  }

  public async destroy({ auth, params, response }: HttpContextContract) {
    const category = await Category.query().where('id', params.id).first()
    if (category && category.owner !== auth.user!.id) {
      return response.unauthorized('You are not authorized to do this action')
    }
    if (!category) {
      return response.badRequest("This category doesn't exist")
    }
    return category.delete()
  }
}
