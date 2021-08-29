import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Item from "App/Models/Item";
import ItemValidator from "App/Validators/item/ItemValidator";
import Logger from "@ioc:Adonis/Core/Logger";

export default class ItemsController {
  /**
   * Create an item
   * @param auth
   * @param request
   * @return Promise<Item>
   */
  public async store({auth, request}: HttpContextContract) {
    await auth.use("api").authenticate();
    try {
      const payload = await request.validate(ItemValidator);
      // @ts-ignore
      return await Item.create(payload);
    } catch (e) {
      Logger.warn(e);
    }
  }

  /**
   * Get items according to a category
   * @param request
   * @param auth
   * @return Promise<Item[]>
   */
  public async index({ params, auth }: HttpContextContract){
    await auth.use("api").authenticate()
    return Item.query().select("*").where("category", params.category)
  }

  public async update({ params, auth }: HttpContextContract) {
    await auth.use("api").authenticate();
    const item = (await Item.find(params.id))!
    item.state = !item.state
    return item.save()
  }

  public async delete({ auth, params }) {
    await auth.use("api").authenticate();
    const item = (await Item.find(params.id))!
    return item.delete()
  }

  public async get({ auth }: HttpContextContract) {
    await auth.use("api").authenticate();
    const {id} = auth.user!;
    return Item.query().select("*").where("owner", id);
  }
}
