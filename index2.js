const Koa = require('koa');
const app = new Koa()
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');


const router = new Router();

router.get('/', (ctx, next) => {
    ctx.body = 'index'
}).get('/form', (ctx, next) => {
    ctx.body = `
        <h1>form</h1>
        <form action="/form" method="POST">
            <p><input type="text" name="fullname"></p>
            <p><input type="text" name="nickname"></p>
            <button>submit</button>
        </form>
    `
}).post('/form', (ctx, next) => {
    ctx.body = ctx.request.body
})

app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())

app.listen('3000', () => {
    console.log('running')
})
