import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import RegisterUserValidator from "App/Validators/auth/RegisterUserValidator";
import User from "App/Models/User";
import LoginUserValidator from "App/Validators/auth/LoginUserValidator";
import ApiToken from "App/Models/ApiToken";
import Category from "App/Models/Category";

export default class UsersController {
  /**
   * Create account
   * @param request
   * @param response
   */
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(RegisterUserValidator);
    const user = await User.create(payload);

    await Category.create({name: "default", owner: user.id})

    return response.created(user);
  }

  /**
   * Create API key
   * @param request
   * @param auth
   * @param response
   * @return API key and user infos
   */
  public async create({ request, auth, response }: HttpContextContract) {
    const { email, password } = await request.validate(LoginUserValidator);

    const userInfos = await User.findBy("email", email);

    if(userInfos) {
      const token = await ApiToken.findBy("user_id", userInfos.id)
      if(token) {
        await token.delete()
      }
    }

    const { token } = await auth.use("api").attempt(email, password);
    const user = auth.user!;

    return response.ok({
      token,
      ...user.serialize(),
    });
  }

  /**
   * Get account information with API key
   * @param auth
   * @return User infos
   */
  public async index({ auth }: HttpContextContract) {
    await auth.use("api").authenticate();
    return auth.use("api").user;
  }
}
