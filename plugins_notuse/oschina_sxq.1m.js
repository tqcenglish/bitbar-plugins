#!/usr/bin/env /usr/local/bin/node
 // https://my.oschina.net/songxinqiang/home 获取最新动弹
const {
  JSDOM
} = require("jsdom");
const {
  window
} = new JSDOM(`...`);
const bitbar = require('bitbar');

let $ = require('jquery')(window);
let https = require('https')
let options = {
  host: 'my.oschina.net',
  path: '/songxinqiang/home'
}

let html = '';
let display = [{
    text: 'wait...',
    color: bitbar.darkMode ? 'white' : 'red',
    dropdown: false
  },
  bitbar.sep,
  {
    text: 'wait...',
    color: '#ff79d7',
    href: 'my.oschina.net/songxinqiang/home',
    dropdown: true
  },
]

let getData = async() => {
  await https.get(options, (res) => {
    res.on('data', (data) => {
      html += data;
    }).on('end', () => {
      let text = $(html).find('#main-anchor > div.panels-body > div > div:nth-child(1) > div.flex-grow.tweet-body > div.tweet-dedails > div.post > div.post-detail')
      if (text && text['0']) {
        display[0].text = text['0'].innerHTML;
      }

      let news = $(html).find('#main-anchor > div.panels-body > div > div:nth-child(1) > div.flex-grow.tweet-body > div.tweet-dedails > div.reply-title > a')
      if (news && news['0'] && news['0'].innerHTML.trim()) {
        display[2].text = news['0'].innerHTML.trim();
      }else{
        let dongtan = $(html).find('#main-anchor > div.panels-body > div > div:nth-child(1) > div.flex-grow.tweet-body > div.tweet-dedails > div.post > div.reply-quote > div > div')
        if(dongtan && dongtan['0']){
          display[2].txt = dongtan['0'].innerHTML.trim() || 'just a error dongtan';
        }
      } 

      let url = $(html).find('#main-anchor > div.panels-body > div > div:nth-child(1) > div.flex-grow.tweet-body > div.relation-data > a')
      if (url && url['0']) {
        display[2].href = url['0'].href;
      }
      bitbar(display)
    })
  })
}

getData()