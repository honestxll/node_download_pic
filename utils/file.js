const fs = require('fs')

module.exports = {
  readFile: function (filepath) {
    return fs.readFileSync(filepath, 'utf-8')
  },
  writeFile: function (filepath, buffer, i) {
    fs.writeFile(filepath, buffer, (e, d) => {
      if (e) {
        console.log(`文件 ${ i } 下载错误 ${ e }`)
      } else {
        console.log(`文件 ${ i } 下载成功`)
      }
    })
  }
}
