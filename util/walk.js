const fs = require('fs')
const mime = require('./mime')

function walk(reqPath) {
    let files = fs.readdirSync(reqPath);

    let dirList = [],fileList = [];
    for(item of files){
        let itemArr = item.split('\.')
        let itemMime = (itemArr.length > 1)?itemArr[itemArr.length-1]:'undefined'

        if(typeof  mime[itemMime] === 'undefined'){
            dirList.push(item)
        }else{
            fileList.push(item)
        }
    }
    return dirList.concat(fileList)
}

module.exports = walk;