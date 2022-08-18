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
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import { Runner } from '@japa/runner'

import postRoutes from './routes/posts'

postRoutes()


Route.where('id', {
  match: /^[0-9]+$/,
  cast: id => Number(id)
})

Route.get('/img/:UserID/*', async({params}) => {
  return params
})

Route.get('/', async (ctx) => {
  const postUrl = Route.makeUrl('posts.show',[1],{
    qs: {
      test: 'testing-querry-string',
      another: 'testing'
    },
    prefixUrl: 'http://localhost:3333'
  })

  const postUrlBuilder = Route.builder()
  .qs({ test: 'this-is-a-test' })
  .prefixUrl('/builder')
  .params({ id: 1 })
  .make('posts.show')

  const postUrlSigned = Route.makeSignedUrl('/test-signature', {
    expiresIn: '10s'
  })

  const postUrlBuilderSigned = Route.builder()
    .makeSigned('/test-signature',{ expiresIn: '1h' })

  return {
    postUrl,
    postUrlBuilder,
    postUrlSigned,
    postUrlBuilderSigned 
  }
  return ctx.view.render('welcome')
})

Route.get('/test',async () => {
  return 'Working'
})

Route.get('/test-signature', async ({ request, response }) => {
  if(request.hasValidSignature()){
    return 'is valid'
  }
  return response.redirect().toRoute('posts.show', [1], {qs: {test: 'test'}})
  return 'is invalid'
})

Route.get('posts/topics/:topic?', ({params}) => {
  return `topic is ${params.topic}`
}).where('topic', Route.matchers.slug())



