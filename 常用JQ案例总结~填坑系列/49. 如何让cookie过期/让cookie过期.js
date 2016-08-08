var date = new Date(); 
date.setTime(date.getTime() + (x * 60 * 1000)); 
$.cookie('example', 'foo', { expires: date });