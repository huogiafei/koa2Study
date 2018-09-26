const fs = require('fs')

/**
 * read file
 * @param filePath
 * @returns {*}
 */
function file(filePath) {
    return fs.readFileSync(filePath,'binary')
}

module.exports = file