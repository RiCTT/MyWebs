/**
 * 本文件为采用了cheerio库编写的脚本，后发现不支持ajax异步生成的源码，放弃采用成puppeteer.js
 */
const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
const baseUrl = 'https://www.90pan.com'

function getList () {
  request.get({
    url: 'https://www.90pan.com/o120457&pg=1',
    strictSSL: false, // allow us to use our self-signed cert for testing
    rejectUnauthorized: false
  }, (err, res, body) => {
    const $ = cheerio.load(body)
    const list = $('.pull-left a')
    const result = []
    list.each((index, item) => {
      result.push(baseUrl + '/' + item.attribs.href)
    })
    fs.writeFile('./links/index.txt', result.join('\n'), (err) => {
      console.log(err)
    })
  })
}

function getOne () {
  request.get({
    url: 'https://www.90pan.com/b1744773',
    strictSSL: false, // allow us to use our self-signed cert for testing
    rejectUnauthorized: false
  }, (err, res, body) => {
    console.log(body)
    const $ = cheerio.load(body)
    const go = $('#go').html()
    console.log(go)
    // console.log(go[1])
  })
}

getOne()
getList()