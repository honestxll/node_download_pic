const http = require('http')
const fs = require('fs')
const path = require("path")

const File = require('./utils/file')
const imageDownload = require('./utils/imageDownload')

const download = './download'
const tempDir = './template.html'

http.createServer(function(request, response) {

  /**
   * 下载图片
   */
  const _html = File.readFile(tempDir)
  const reg = /http:\/\/m.suzhouzixin.cn.*(jpg|png|gif)/g
  const result = _html.match(reg)

  for (let i in result) {
    const fileName = path.basename(result[i])
    const filepath = `${ download }/${ fileName }`

    imageDownload(result[i])
      .then(data => {
        File.writeFile(filepath, data, i)
      })
      .catch(error => {
        console.log(`出错了`, error)
      })
  }

  /**
   * 响应 html
   */
  htmlResponse = File.readFile('./www/index.html')
  response.write(htmlResponse)
  response.end()

}).listen("3000", function() {
  console.log("run in 3000")
})
