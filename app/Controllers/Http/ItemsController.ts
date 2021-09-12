import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Item from "App/Models/Item";
import ItemValidator from "App/Validators/item/ItemValidator";
import type { Item as IItem } from "../../../types";

export default class ItemsController {
  /**
   * Create an item
   * @param auth
   * @param request
   * @return Promise<Item>
   */
  public async store({ auth, request }: HttpContextContract) {
    await auth.use("api").authenticate();
    const payload = await request.validate(ItemValidator);
    // @ts-ignore
    return await Item.create(payload);
  }

  /**
   * Get items according to a category
   * @param request
   * @param auth
   * @return Promise<Item[]>
   */
  public async index({ params, auth }: HttpContextContract) {
    await auth.use("api").authenticate();
    return Item.query().select("*").where("category", params.category);
  }

  public async update({ params, auth, request }: HttpContextContract) {
    await auth.use("api").authenticate();
    const item = (await Item.find(params.id))!;

    const body: IItem = request.body();
    const keys = Object.keys(body);
    const source = ["name", "description", "category", "start", "end"];

    if (keys.map((item) => source.includes(item)).includes(true)) {
      keys.forEach((key) => {
        if (source.includes(key)) {
          item[key] = body[key];
        }
      });
      return item.save();
    }

    item.state = !item.state;
    return item.save();
  }

  public async delete({ auth, params }) {
    await auth.use("api").authenticate();
    const item = await Item.find(params.id);
    if (item === null) {
      return {
        error: {
          message: `Item with id: ${params.id} is not found.`,
        },
      };
    }
    await item.delete();
    return {
      message: `Item with id: ${params.id} has been deleted.`,
    };
  }

  public async get({ auth }: HttpContextContract) {
    await auth.use("api").authenticate();
    const { id } = auth.user!;
    return Item.query().select("*").where("owner", id);
  }
}
