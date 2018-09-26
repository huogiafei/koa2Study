const path = require('path')
const fs = require('fs')

const dir = require('./dir')
const file = require('./file')

/**
 *
 * @param ctx
 * @param fullStaticPath
 * @returns {Promise<void>}
 */
async function content(ctx ,fullStaticPath) {
    console.log(ctx.url)
    let reqPath = path.join(fullStaticPath,ctx.url)
    let exist = fs.existsSync(reqPath)

    let content = ""

    if(exist){
        let stat = fs.statSync(reqPath)
        if(stat.isDirectory()){
            content = dir(ctx.url,reqPath)
        }else{
            content = await file(reqPath )
        }
    }else{
        content = `<h1>404 Not Found</h1>`
    }
    return content
}

module.exports = content;