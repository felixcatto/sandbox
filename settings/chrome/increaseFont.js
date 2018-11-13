var p = [].slice.call(document.querySelectorAll('p'));
var code = [].slice.call(document.querySelectorAll('code'));
var pre = [].slice.call(document.querySelectorAll('pre'));
var els = p.concat(code).concat(pre);
els.forEach(el => {
  el.style.fontSize = '20px';
  el.style.fontFamily = 'Roboto';
  el.style.lineHeight = 1.5;
  el.style.marginBottom = '22px';
});

https://mrcoles.com/bookmarklet/

javascript:(function()%7Bvar%20p%20%3D%20%5B%5D.slice.call(document.querySelectorAll('p'))%3Bvar%20code%20%3D%20%5B%5D.slice.call(document.querySelectorAll('code'))%3Bvar%20pre%20%3D%20%5B%5D.slice.call(document.querySelectorAll('pre'))%3Bvar%20els%20%3D%20p.concat(code).concat(pre)%3Bels.forEach(el%20%3D%3E%20%7Bel.style.fontSize%20%3D%20'20px'%3Bel.style.fontFamily%20%3D%20'Roboto'%3Bel.style.lineHeight%20%3D%201.5%3Bel.style.marginBottom%20%3D%20'22px'%3B%7D)%7D)()
