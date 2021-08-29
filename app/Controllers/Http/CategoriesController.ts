import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import CategoryValidator from "App/Validators/category/CategoryValidator";
import Category from "App/Models/Category";

export default class CategoriesController {
  /**
   * Create a category
   * @param auth
   * @param request
   */
  public async store({ auth, request }: HttpContextContract) {
    await auth.use("api").authenticate();
    const payload = await request.validate(CategoryValidator);
    if (
      (await Category.query().where("name", payload.name).where("owner", auth.use("api").user!.id))
        .length !== 0
    ) {
      return {
        error: "Category already exists",
      };
    }
    return await Category.create(payload);
  }

  /**
   * Get categories owned by the user according to the API key
   * @param auth
   * @return Category
   */
  public async index({ auth }: HttpContextContract) {
    await auth.use("api").authenticate();
    return Category.query().select("*").where("owner", auth.use("api").user!.id)
  }

  /**
   *
   * @param auth
   * @param params
   */
  public async delete({ auth, params }: HttpContextContract) {
    await auth.use("api").authenticate();
    const category = (await Category.find(params.id))!
    return category.delete()
  }

  public async get({ auth, params }: HttpContextContract) {
    await auth.use("api").authenticate();
    return Category.find(params.id)
  }
}
