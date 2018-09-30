/*Cookie & Session*/
const Koa = require('Koa');
const app = new Koa()
const serve  = require('koa-static')
const path = require('path');

const staticPath = './static'
const fullStaticPath = path.join( __dirname,  staticPath)
app.use(serve(fullStaticPath))
const session = require('koa-session');

/*app.use(async (ctx,next) => {
    ctx.cookies.set('aid', '1', {
        domain: 'localhost',
        path: '/',
        maxAge: 10 * 60 * 1000,
        expires: new Date('2018-09-28 18:07:00'),
        overwrite: false,
        httpOnly: false,
    })
    await next();
    //ctx.body = 'test' + ctx.cookies.get('aid')
})*/

app.keys = ['sess_id'];

const sessionConfig = {
    key: 'koa:sess',
    maxAge: 86400000,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
};

app.use(session(sessionConfig,app));

app.use( async(ctx,next) => {
    await next()
    if(ctx.url === '/favico.ico') return;
    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
    ctx.body = n + ' views'
})

app.listen(3000)