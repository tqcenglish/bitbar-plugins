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
    text: 'Unicorns',
    color: '#ff79d7',
    submenu: [{
      text: ':book: sxq',
      href: 'my.oschina.net/songxinqiang/home'
    }]
  },
  bitbar.sep,
]

async getData()=> {
  https.get(options, (res) => {
    res.on('data', (data) => {
      html += data;
    }).on('end', () => {
      let data = $(html).find('#main-anchor > div.panels-body > div > div:nth-child(1) > div.flex-grow.tweet-body > div.tweet-dedails > div.post > div.post-detail')
      if (data && data['0']) {
        display[0].text = data['0'].innerHTML;
      }
    })
  })
}

await getData()
