/*Static Server*/
const Koa = require('koa')
const path = require('path')
const mimes = require('./util/mime')
const content = require('./util/content')

const app = new Koa()
const staticPath = './static'

function parseMime(url){
    let extname = path.extname(url)
    extname = extname ? extname.slice(1): 'unknown'
    return mimes[extname]
}

app.use(async(ctx) => {
    let fullStaticPath = path.join(__dirname,staticPath)
    let _content = await content(ctx,fullStaticPath)
    let _mime = parseMime(ctx.url)
    if(_mime){
        ctx.type = _mime
    }

    if(_mime && _mime.indexOf('image/')>=0){
        ctx.res.writeHead(200)
        ctx.res.write(_content,'binary')
        ctx.res.end()
    }else{
        ctx.body = _content
    }
})

app.listen(3000)