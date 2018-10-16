const http = require('http')
const fs = require('fs')
const path = require("path")
const readFile = require('./readFile')
const imageDownload = require('./imageDownload')

console.log(imageDownload)

const download = './download'

http.createServer(function(request, response) {

  const _html = readFile('./template.html')

  const reg = /http:\/\/m.suzhouzixin.cn.*(jpg|png|gif)/g
  const result = _html.match(reg)

  for (let i in result) {
    const fileName = path.basename(result[i])

    imageDownload(result[i])
      .then(data => {
        fs.writeFile(`${ download }/${ fileName }`, data, (e, d) => {
          if (e) {
            console.log(`文件 ${ i } 下载错误 ${ e }`)
          } else {
            console.log(`文件 ${ i } 下载成功`)
          }
        })
      })
      .catch(error => {
        console.log(`出错了`, error)
      })
  }
  response.end('<h1>Node.js</h1>')
}).listen("3000", function() {
  console.log("run in 3000")
})
