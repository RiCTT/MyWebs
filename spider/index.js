const puppeteer = require('puppeteer')
const fs = require('fs')
const request = require('request')
const baseUrl = 'https://www.90pan.com/o120457&pg='
const totalPage = 1

async function getList(page) {
  let list = await page.$$('.fileicon + a')
  let result = []
  for (let i = 0; i < list.length; i++) {
    const res = await page.evaluate(el => el.href, list[i])
    result.push(res)
  }
  return result
}

function download(requestUrl, fileName) {
  const stream = fs.createWriteStream('./mp3/' + fileName)
  
  request(requestUrl, function (err, resp, body) {
    console.log(err)
    console.log(resp)
    console.log(body)
  })
    .pipe(stream)
    .on('close', function(err) {
      if (err) {
        console.log(fileName + '下载失败！！！！')
      } else {
        console.log(fileName + '下载成功')
      }
  })
}

// function downloadByHttp(url, filename) {
//   http.request(url, { timeout: 10 * 60 * 1000 }, function(resp){
//     var imgData = ""
//     resp.setEncoding("binary")

//     resp.on('data',function(chunk){
//         imgData+=chunk         
//     })

//     resp.on('end', function () {
//       fs.writeFile('./http/' + filename, imgData, "binary", function (err) {
//         if (err) {
//           console.log("[downloadPic]文件   "+filename+"  下载失败.")
//           console.log(err)
//         } else {
//           console.log(filename+"下载成功")
//         }
//       })
//     })
//   })
// }

async function goDetailPageAndDownload(page, hrefList) {
  hrefList = [hrefList[0]]
  for (let i = 0; i < hrefList.length; i++) {
    await page.goto(hrefList[i], {
      timeout: 0
    })
    const downloadEleList = await page.$$('#go a')
    const downloadEle = downloadEleList[0]
    const downloadHref = await page.evaluate(el => {
      if (el) {
        return el.href
      }
    }, downloadEle)
    const fileNameEle = await page.$('.span9 h1')
    const fileName = await page.evaluate(el => {
      return el.textContent.replace(/\s/g, '').split('-')[1]
    }, fileNameEle)
    if (downloadHref) {
      download(downloadHref, fileName)
      // downloadByHttp(downloadHref, fileName)
    }
  }
}

async function main() {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  for (let i = 0; i < totalPage; i++) {
    const url = baseUrl + (i + 1)
    await page.goto(url, {
      timeout: 0
    })
    const hrefList = await getList(page)
    await goDetailPageAndDownload(page, hrefList)
  }
}

// async function test() {
//   const browser = await puppeteer.launch({ headless: true })
//   const page = await browser.newPage()
//   await goDetailPageAndDownload(page, ['https://www.90pan.com/b1744757'])
// }

// test()
main()
