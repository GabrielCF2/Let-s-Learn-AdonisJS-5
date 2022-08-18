import Route from '@ioc:Adonis/Core/Route'

export default function postRoutes(){
    Route.group(()=>{

        Route.get('/', async() => {
        return 'listing posts'
        }).as('index')

        Route.get('/:id', async({ params }) =>{
        return `get single post with a id of ${params.id}`
        }).as('show')

        Route.post('/', async() => {
        return 'creating a post'
        }).as('store')

        Route.put('/:id',async ({params}) => {
        return 'updating a post'
        }).as('update')

        Route.delete('/:id', async (ctx) =>{
        return `deleting a post with a id of ${ctx.params.id}`
        }).as('destroy')

    }).prefix('/posts').as('posts')
}
