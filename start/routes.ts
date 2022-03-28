/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import AutoSwagger from 'adonis-autoswagger'
import * as fs from 'fs/promises'
import * as path from 'path'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})

Route.group(() => {
  Route.post('register', 'AuthController.register').as('register')
  Route.post('login', 'AuthController.login').as('login')
  Route.get('me', 'AuthController.me').as('test')
}).as('user')

Route.group(() => {
  Route.get('/swagger/:directory/:file', async ({ params }: HttpContextContract) => {
    return fs.readFile(path.join(__dirname, `../swagger/${params.directory}/${params.file}`), {
      encoding: 'utf-8',
    })
  }).as('swagger schemas')

  Route.get('/swagger', async () => {
    return fs.readFile(path.join(__dirname, '../swagger.yml'), { encoding: 'utf-8' })
  }).as('swagger')

  Route.get('/docs', async () => {
    return AutoSwagger.ui('/swagger')
  }).as('docs')
}).as('doc')

Route.group(() => {
  Route.resource('categories', 'CategoriesController').apiOnly()
  Route.resource('items', 'ItemsController').apiOnly()
}).middleware('auth')

Route.get('/foo', async ({ inertia }) => {
  return inertia.render('Foo', { text: 'Hello, World!' })
})
