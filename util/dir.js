const url =  require('url')
const fs = require('fs')
const path = require('path')

const walk = require('./walk')

function dir(url ,reqPath) {
    let contentList = walk(reqPath)
    console.log(contentList)
    let html = `<ul>`
    for(let item of contentList){
        html = `
            ${html}<li><a href="${url==='/'?'':url}/${item}">${item}</a>`
    }
    html = `${html}</ul>`
    return html
}

module.exports = dir