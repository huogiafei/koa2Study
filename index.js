const Koa = require('Koa');
const app = new Koa()
const myRoute = require('./middleware/my-route');

/*
app.use(async(ctx,next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time')
    console.log(`${ctx.method} ${ctx.url} - ${rt}`)
})

app.use(async(ctx,next) =>{
    const start = Date.now();
    await next();
    const time = Date.now()-start
    ctx.set('X-Response-Time',time+'ms')
})
*/

app.use(myRoute())

app.listen(3000,()=>{
    console.log("running")
})