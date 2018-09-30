const Koa = require('koa');
const path = require('path');
const koaNunjucks = require('koa-nunjucks-2');

const app = new Koa();

app.use(koaNunjucks({
    ext:"html",
    path: path.join(__dirname,'view'),
    nunjucksConfig:{
        trimBlocks:true
    }
}))

app.use(async(ctx) =>{
    await ctx.render('home',{double:'rainbow'});
});

app.listen(3000,()=>{
    console.log('nunjucks')
})
