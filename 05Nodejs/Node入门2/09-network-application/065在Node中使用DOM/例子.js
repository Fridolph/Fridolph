var jsdom = require('jsdom');

jsdom.env(
  '<p class="intro">Welcome to Node in Practice</p>',
  ['http://code.jquery.com/jquery.js'],
  (errors, window) => {
    console.log('Intro:', window.$('.intro').text());
  }
);