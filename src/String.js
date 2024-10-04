/**
 * 字符串的操作（增删改查、是否原地修改以及生成一个新的字符串）
 * 
 * 总结来说，JavaScript中的字符串是不可变的，任何对字符串的修改操作都会创建一个新的字符串
 */

const str = 'hello world';

/**
 * String 实例方法
 * 
 */
console.log(str.charAt(1)); // 返回字符串中指定位置的字符
console.log(str.charCodeAt(0)); // 返回字符串中指定位置的字符的 Unicode 编码

console.log(str, str.concat('123')); // 连接字符串, 返回新的字符串, 通常也不这么用，直接用 '+' 或者 字符串模板

console.log(str, str.includes('hello')); // 判断字符串是否包含指定的子字符串
console.log(str, str.indexOf('hello')); // 返回字符串中指定子字符串的第一个出现位置的索引
console.log(str, str.lastIndexOf('hello')); // 返回字符串中指定子字符串的最后一个出现位置的索引

console.log(str, str.match('hello')); // 返回一个包含匹配结果的数组，如果没有匹配到则返回 null
console.log(str, str.replace('hello', 'hi')); // 替换字符串中的指定子字符串，返回一个新的字符串
console.log(str, str.search('ello')); // 返回字符串中指定子字符串的第一个出现位置的索引，如果没有匹配到则返回 -1

console.log(str, str.slice(0, 5)); // 提取字符串的一部分，返回一个新的字符串
console.log(str, str.split(' ')); // 将字符串分割成一个字符串数组
console.log(str, str.substring(0, 5)); // 提取字符串的一部分，返回一个新的字符串

// toLocaleLowerCase() 和 toLocaleUpperCase() 方法是根据本地语言环境的约定将字符串转换为小写或大写，返回一个新的字符串
// toLowerCase() 和 toUpperCase() 方法是将字符串转换为小写或大写，返回一个新的字符串
console.log(str, str.toLocaleLowerCase()); // 将字符串转换为小写，返回一个新的字符串
console.log(str, str.toLocaleUpperCase()); // 将字符串转换为大写，返回一个新的字符串
console.log(str, str.toLowerCase()); // 将字符串转换为小写，返回一个新的字符串
console.log(str, str.toUpperCase()); // 将字符串转换为大写，返回一个新的字符串

console.log(str, str.trim()); // 去除字符串两端的空格，返回一个新的字符串
console.log(str, str.trimStart()); // 去除字符串开头的空格，返回一个新的字符串
console.log(str, str.trimEnd()); // 去除字符串结尾的空格，返回一个新的字符串

console.log(str, str.valueOf()); // 返回字符串对象的原始值，返回一个新的字符串


/**
 * String 静态方法
 *
 */
console.log(String.fromCharCode(97)); // 从 Unicode 编码返回一个字符
console.log(String.fromCodePoint(97)); // 从 Unicode 编码返回一个字符


console.log('====去除特殊字符====');

const special = '123\nabc\t123\r123';
// \s 匹配任何空白字符，包括空格、制表符、换页符等
// \S 匹配任何非空白字符
console.log(special.replace(/\s/g, '&'));

console.log('====去除特殊字符==== end');


/**
 * 赋值操作 对源数据的影响
 * 
 * 原始对象
 *   基本类型（String | Number | Boolean | Null | Undefined | Symbol）
 *   赋值操作相当于重新开辟内存空间
 * 
 * 复杂对象（Object | Array）
 * 
 * 如果是直接整体的赋值一个新对象，那么是重新开辟内存空间
 * 如果是对对象的某个属性进行修改，那么是在原内存空间上进行修改
 * 
 */

let originString = 'abc';

let copyString = originString;

// copyString = '123';
copyString[0] = '1';
console.log(originString); // 输出 abc
console.log(copyString); // 输出 123
console.log(copyString[0]);

let originArray = ['a', 'b', 'c'];

let copyArray = originArray;

copyArray = ['1', '2', '3'];

console.log(originArray); // 输出 ['a', 'b', 'c']
console.log(copyArray); // 输出 ['1', '2', '3']

let originArra2 = ['a', 'b', 'c', { name: 'd' }];
let copyArray2 = originArra2;

// copyArray2 = ['1', '2', '3', { name: '4' }];
copyArray2[0] = '1';
copyArray2[3].name = '4';

console.log(originArra2); // 输出 ['a', 'b', 'c', { name: 'd' }]
console.log(copyArray2); // 输出 ['1', '2', '3', { name: '4' }]


let originObject = { first: 'a', second: 'b' };
let copyObject = originObject;

copyObject.first = '1';
copyObject.second = '2';

console.log(originObject); // 输出 { first: '1', second: '2' }
console.log(copyObject); // 输出 { first: '1', second: '2' }


const objectString = new String(123);
console.log(objectString);


console.log('==== String Static Function ====');

console.log(String.fromCharCode(3));

console.log(String.fromCodePoint(3));


console.log('==== String Static Function ==== end');

console.log('==== String Instance Function ====');

const hello_world = 'Hello World';

console.log(hello_world.at(1));
console.log(hello_world.at(-1));


console.log(String.fromCodePoint('a'.codePointAt(0)));


console.log(String.fromCodePoint(97));

console.log('a'.codePointAt(0))


const a = 'abc';
const b = 'Abc';

if (a.toLocaleUpperCase() === b.toLocaleUpperCase()) {
  console.log(true);
} else {
  console.log(false);
}

const illFormed = "https://example.com/search?q=\uD83D\uDE04";

try {
  encodeURI(illFormed);
} catch (e) {
  console.log(e); // URIError: URI malformed
}

if (illFormed.isWellFormed()) {
  console.log(encodeURI(illFormed));
} else {
  console.warn("Ill-formed strings encountered."); // Ill-formed strings encountered.
}

'a'.localeCompare();

console.log('a'.localeCompare('d'));

const matchStr = '遇事不决，可问春风; 春风不决，既随己心';

console.log(matchStr.match('春风'));
console.log(matchStr.match(/春风/g));
console.log([...matchStr.matchAll('春风')]);


const num = '\u0041\u006d\u00e9\u006c\u0069\u0065';
console.log(num.normalize());

console.log(matchStr.search('春风'));
console.log(matchStr.search(/春风/g));

const padString = '好';
console.log(padString, padString.padStart(2, '你'));


console.log('==== String Instance Function ==== end');


console.log('==== Manacher ====');
const s = 'ababbabc';

function Manacher(s) {
  if (s.length < 2) return;

  let start = 0, maxLen = 1;

  let padStr = '#';
  for (let i = 0; i < s.length; i++) {
    padStr += s[i] + '#';
  }

  let p = new Array(padStr.length).fill(0);

  for (let i = 0, center = 0, right = 0; i < padStr.length; i++) {

    if (i < right) {
      p[i] = Math.min(right - i, p[2 * center - i]);
    }

    while (i - p[i] - 1 >= 0 && i + p[i] + 1 < padStr.length && padStr[i - p[i] - 1] === padStr[i + p[i] + 1]) {
      p[i]++;
    }

    if (i + p[i] > right) {
      center = i;
      right = i + p[i];
    }

    if (p[i] > maxLen) {
      maxLen = p[i];
      start = (i - maxLen) / 2;
    }
  }

  return s.substring(start, start + maxLen);
}

console.log(`字符串：${s}, 最长回文子串长度为 ${Manacher(s)}`);

console.log('==== Manacher ==== end');








