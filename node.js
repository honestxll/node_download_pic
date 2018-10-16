const http = require('http')
const fs = require('fs')
const path = require("path")
const readFile = require('./readFile')

const download = './download'

http.createServer(function(request, response) {

  const _html = readFile('./template.html')

  const reg = /http:\/\/m.suzhouzixin.cn.*(jpg|png|gif)/g
  const result = _html.match(reg)
  console.log(result)

  for (let i in result) {
    fs.readFile(result[i], (error, data) => {
      if (error) {
        console.log(`文件 ${ i } 读取错误 ${ error }`)
      } else {
        console.log(`文件 ${ i } 读取成功`)
        const fileName = path.basename(result[i])

        fs.writeFile(`${ download }/${ fileName }`, data, (e, d) => {
          if (e) {
            console.log(`文件 ${ i } 下载错误 ${ e }`)
          } else {
            console.log(`文件 ${ i } 下载成功`)
          }
        })
      }
    })
  }
  response.end('<h1>Node.js</h1>')
}).listen("3000", function() {
  console.log("run in 3000")
})
