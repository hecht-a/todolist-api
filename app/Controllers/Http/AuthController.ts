import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterValidator from 'App/Validators/RegisterValidator'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/LoginValidator'

export default class AuthController {
  /**
   * Create an account
   * @param request
   */
  public async register({ request }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)
    return User.create(payload)
  }

  /**
   * Create ane API key
   * @param auth
   * @param request
   * @param response
   */
  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator)
    try {
      return auth.attempt(email, password, {
        expiresIn: '1day',
      })
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  /**
   * Get logged user informations
   * @param auth
   */
  public async me({ auth }: HttpContextContract) {
    return User.query()
      .preload('categories', (query) => {
        query.preload('items')
      })
      .where('id', auth.user!.id)
  }
}
