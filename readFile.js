const fs = require('fs')

module.exports = function (filepath) {
  return fs.readFileSync(filepath, 'utf-8')
}
