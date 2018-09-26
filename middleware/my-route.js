const fs = require('fs')
const routeList = require('../route');

function render(page) {
    return new Promise((resolve, reject) => {
        let viewUrl = `./view/${page}`
        fs.readFile(viewUrl, "binary", (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

async function route(url) {
    let html = await render(routeList[url])
    return html
}
function parsePostData(ctx){
    return new Promise((resolve, reject) => {
        try {
            let postData = '';
            ctx.req.addListener('data',(data)=>{
                postData+=data
            })
            ctx.req.addListener('end',()=>{
                let parseData = parseQueryStr(postData)
                resolve(parseData)
            })
        }catch(err){
            reject(err)
        }
    })
}

function parseQueryStr(queryStr){
    let queryData = {}
    let queryArray = queryStr.split('&')
    for(let item of queryArray){
        let kv = item.split('=')
        queryData[kv[0]] = decodeURIComponent(kv[1])
    }
    return queryData
}

module.exports = function () {
    return async function (ctx, next) {
        if (ctx.url === '/form' && ctx.method === 'POST') {
            let postData = await parsePostData(ctx)
            console.log(postData)
            ctx.body = postData
        } else {
            ctx.body = await route(ctx.url);
        }
        await next()
    }
}