/*Static Server with Koa-static*/
const Koa = require('koa');
const path = require('path')
const serve  = require('koa-static')
const fs = require('fs')

const app = new Koa();

const staticPath = './static'
const fullStaticPath = path.join( __dirname,  staticPath)
app.use(serve(staticPath))


function dir(url ,reqPath) {
    let contentList = walk(reqPath)
    let html = `<ul>`
    for(let item of contentList){
        html = `
            ${html}<li><a href="${url==='/'?'':url}/${item}">${item}</a>`
    }
    html = `${html}</ul>`
    return html
}

function walk(filePath){
    let dirList = [],fileList = [];
    let files = fs.readdirSync(filePath)
    for(item of files){
        if(item.split('\.').length>1){
            dirList.push(item)
        }else{
            fileList.push(item)
        }
    }
    return dirList.concat(fileList)
}

async function content(ctx ,fullStaticPath) {
    let reqPath = path.join(fullStaticPath,ctx.url)
    let exist = fs.existsSync(reqPath)
    let content = ""
    if(exist){
        let stat = fs.statSync(reqPath)
        if(stat.isDirectory()){
            content = dir(ctx.url,reqPath)
        }
    }else{
        content = `<h1>404 Not Found</h1>`
    }
    return content
}

app.use( async ( ctx ) => {
    console.log(ctx.url)
    let _content = await content(ctx,fullStaticPath)
    ctx.body = _content
})

app.listen(3000);