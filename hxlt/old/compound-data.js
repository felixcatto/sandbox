
// Lol 
// Функция это рли данные.
// Функция это тип данных
// Она становится типом данных благодаря замыканию
function cons(a, b) {
    return (message) => {
      if (message == 'car') 
        return a;
      else if (message == 'cdr')
        return b;
    };
}
function car(pair) {
    return pair('car');
}
function cdr(pair) {
    return pair('cdr');
}








function distance(point1, point2) {
    const val1 = Math.pow(getX(point2) - getX(point1), 2);
    const val2 = Math.pow(getY(point2) - getY(point1), 2);
    return Math.sqrt(val1 + val2);
}



function quadrant(point) {
  if (getX(point) == 0 || getY(point) == 0) {
    return null
  }
  else if (getX(point) > 0) {
    if (getY(point) > 0) {
      return 1;
    }
    else {
      return 4;
    }
  }
  else if (getX(point) < 0) {
    if (getY(point) > 0) {
      return 2;
    }
    else {
      return 3;
    }
  }
}



function makePoint(x, y) {
    return cons(x, y);
}
function getX(point) {
    return car(point);
}
function getY(point) {
    return cdr(point);
}










function makeSegment(point1, point2) {
  return cons(point1, point2);
}
function startSegment(segment) {
  return car(segment);
}
function endSegment(segment) {
  return cdr(segment);
}
function toStr(segment) {
  const x1 = getX(car(segment));
  const x2 = getX(cdr(segment));
  const y1 = getY(car(segment));
  const y2 = getY(cdr(segment));
  return `[(${x1}, ${y1}), (${x2}, ${y2})]`;
}
function midpointSegment(segment) {
  const x1 = (getX(car(segment)) + getX(cdr(segment))) / 2;
  const y1 = (getY(car(segment)) + getY(cdr(segment))) / 2;
  return makePoint(x1, y1);
}


































function makeRectangle(point, width, height) {
  return cons(point, makePoint(width, height));
}
function square(rectangle) {
  const width = car(cdr(rectangle));
  const height = cdr(cdr(rectangle));
  return width * height;
}
function perimeter(rectangle) {
  const width = car(cdr(rectangle));
  const height = cdr(cdr(rectangle));
  return 2 * (width + height);
}
function containsTheOrigin(rectangle) {
  const width = car(cdr(rectangle));
  const height = cdr(cdr(rectangle));
  const x1 = getX(car(rectangle));
  const y1 = getY(car(rectangle));
  const x2 = width + x1;
  const y2 = y1 - height;
  debugger;
  return quadrant(makePoint(x1, y1)) == 2 
    && quadrant(makePoint(x2, y1)) == 1
    && quadrant(makePoint(x1, y2)) == 3
    && quadrant(makePoint(x2, y2)) == 4;
}
















function compose(f, g) {
  return (value) => {
    return f(g(value));
  };
}



export flip = (f) => (x, y) => f(y, x);














// Magic
const cons = (x, y) => (m) => m(x, y);
const car = (pair) => pair((x, y) => x);
const cdr = (pair) => pair((x, y) => y);

function cons(x, y) {
    return function(f) {
        return f(x, y);
    };
}
// z = cons(1, 2);
// z((x, y) => x);
// END



















function make(numer, denom) {
    return cons(numer, denom);
}
function numer(rational) {
    return car(rational);
}
function denom(rational) {
    return cdr(rational);
}
function toString(rational) {
    return `${numer(rational)} / ${denom(rational)}`;
}
function isEqual(r1, r2) {
    return numer(r1) * denom(r2)  == numer(r2) * denom(r1);
}
function add(r1, r2) {
    const a = numer(r1);
    const b = denom(r1);
    const c = numer(r2);
    const d = denom(r2);
    return make(a * d + b * c, b * d);
}
function sub(r1, r2) {
    const a = numer(r1);
    const b = denom(r1);
    const c = numer(r2);
    const d = denom(r2);
    return make(a * d - b * c, b * d);
}
function mul(r1, r2) {
    const a = numer(r1);
    const b = denom(r1);
    const c = numer(r2);
    const d = denom(r2);
    return make(a * c, b * d);
}
function div(r1, r2) {
    const a = numer(r1);
    const b = denom(r1);
    const c = numer(r2);
    const d = denom(r2);
    return make(a * d, b * c);
}








// TASK 2
// Пары неотрицательных чисел можно представить, используя только числа и арифметические операции. Для этого можно считать, что пара это 2^a * 3^b;

// Функции car и cdr при этом будут просто вычислять, соответственно, кратность двойки и тройки в разложении своего аргумента на простые сомножители.


function loop(n, modulo) {
    let i = 0;
    while(n%modulo == 0) {
        n = n/modulo;
        i += 1;
    }
    return i;
}

function cons(a, b) {
    return Math.pow(2, a) * Math.pow(3, b);
}
function car(n) {
    return loop(n, 2);
}
function cdr(n) {
    return loop(n, 3);
}

export { cons, car, cdr };











// TASK3
// Экспортируйте тройку True, False, If, используя только функции, внутри которых только функции. ;) То есть нельзя пользоваться встроенными в язык if, а так же true/false.

// Пример:
// If(True)('one')('two'); // one
// If(False)('one')('two'); // two
// Из вызовов выше можно сразу увидеть, что If это функция, внутри которой матрешка из двух функций.

function If(f) {
    return f;
}
function True(arg1) {
    return (arg2) => arg1;
}
function False(arg1) {
    return (arg2) => arg2;
}


// function If(p) {
//     return function(t) {
//         return  function(e) {
//             return  p(t)(e);
//         }
//     }
// }

// const True = x => () => x;
// const False = () => y => y;


const tru = t => f => t;
const fls = t => f => f;
const If = func => t => f => func(t)(f);
// Фактически (func, t, f) можно рассматривать как аргументы одной функции.
// Прост вызывать If надо не как If(func, t, f), а как If(func)(t)(f)
// If(True)('one')('two')
// Т.е. все это из-за того, что функции могут принимать только 1 аргумент.

if fls a b
(((if fls) a) b)

if fls           <=> t => f => fls(t)(f)
(if fls) a      <=> f => fls(a)(f)
((if fls) a) b <=> fls(a)(b)

fls(a)(b)
fls(a)           <=> f => f
fls(a)(b)      <=> b




and = λx. λy. x y fls
const and = x => y => x(y)(fls);
and tru <=> y => tru(y)(fls)
and tru tru <=> tru(tru)(fls)

const or = x => y => x(tru)(y);
const not = x => x(fls)(tru);

// all table
tru tru tru <=> tru
tru tru fls <=> tru
tru fls tru <=> fls
tru fls fls <=> fls

fls tru tru <=> tru
fls tru fls <=> fls
fls fls tru <=> tru
fls fls fls <=> fls


// or complete
tru tru tru <=> tru
tru tru fls <=> tru
fls tru tru <=> tru
fls tru fls <=> fls

// and complete
tru tru fls <=> tru
tru fls fls <=> fls
fls tru fls <=> fls
fls fls fls <=> fls








// TASK3
// Реализуйте число Zero и операцию Succ (увеличение на единицу)

// Пример:
// const two = Succ(Succ(Zero));

// // Немного хитрый способ трансформировать число черча в обычное представление.
// // Откровенно говоря, устройство самих чисел еще хитрее ;)
// zero(x => x + 1)(0); // 0
// two(x => x + 1)(0); // 2

// const four = Succ(Succ(two));
// four(x => x + 1)(0); // 4
// 0 ≡ λs.λz. z
const zero = sfunc => z => z;
const one = sfunc => z => sfunc(z);
const two = sfunc => z => sfunc(sfunc(z));
const succ = cnum => sfunc => z => sfunc(cnum(sfunc)(z));