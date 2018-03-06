var p = [].slice.call(document.querySelectorAll('p'));
var li = [].slice.call(document.querySelectorAll('li'));
var els = p.concat(li);
els.forEach(el => {
  el.style.fontSize = '20px';
  el.style.fontFamily = 'Roboto';
  el.style.lineHeight = 1.5;
  el.style.marginBottom = '22px';
});

javascript:(function()%7Bvar p %3D %5B%5D.slice.call(document.querySelectorAll('p'))%3Bvar li %3D %5B%5D.slice.call(document.querySelectorAll('li'))%3Bvar els %3D p.concat(li)%3Bels.forEach(el %3D> %7Bel.style.fontSize %3D '20px'%3Bel.style.fontFamily %3D 'Roboto'%3Bel.style.lineHeight %3D 1.5%3Bel.style.marginBottom %3D '22px'%3B%7D)%7D)()
