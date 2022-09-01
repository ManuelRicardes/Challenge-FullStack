'use strict'

const UserController = require('../app/Controllers/Http/UserController')
const OperationController = require('../app/Controllers/Http/OperationController')
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

//registro y login de usuario
Route.post('/user/register', 'UserController.store')
Route.post('/user/login', 'UserController.login')

//crud de operaciones
Route.get('/operaciones/:user_id','OperationController.index')
Route.post('/operaciones','OperationController.create')
// Route.put('/operaciones','OperationController')
// Route.delete('/operaciones','OperationController')