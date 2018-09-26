const Koa = require('koa');
const path = require('path')
const serve  = require('koa-static')
const fs = require('fs')

const app = new Koa();

const staticPath = './static'
const fullStaticPath = path.join( __dirname,  staticPath)
app.use(serve(fullStaticPath))


let html=''

function fileTree(filePath){
    fs.readdir(filePath,(err,files)=>{
        if(err){
            console.warn(err)
        }else{

            for(let file of files){
                let filedir = path.join(filePath,file);
                console.log(file)
                fs.stat(filedir,(error,stats)=>{
                    if(error){
                        console.warn('attach file failed')
                    }else{
                       if(stats.isDirectory()){
                            fileTree(filedir)
                       }else{
                           html = `${html}<li>
                                <a href="${filedir}">${file}</a>
                            </li>`
                       }
                    }
                })
            }
        }
    })
}
fileTree(fullStaticPath)

app.use( async ( ctx ) => {
    ctx.body = `<ul>${html}</ul>`
})

app.listen(3000);