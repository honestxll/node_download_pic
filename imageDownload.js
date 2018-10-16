const http = require('http')

module.exports = function (url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, function(response) {
        const buffer = []
        response.on('data', content => buffer.push(content))
        response.on('end', () => resolve(Buffer.concat(buffer)))
        response.on('error', error => reject(error))
      })
      .on('error', error => reject(error))
  })
}
