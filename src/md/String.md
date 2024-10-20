# String

创建 String 有三种形式

- 字面量

```js
const str = "abc"; // 创建的是字符串原始值，typeof str === 'string'
```

- String

```js
const str = String(1); // 创建的是字符串原始值，typeof str === 'string'
```

- new String 当成构造函数使用 （不建议使用这种方式）

```js
const str = new String(123); // 创建的是一个String对象，type str === 'object'
```

## 静态方法

### String.fromCharCode()

返回 UTF-16 码序列创建的字符。

#### 入参

一个介于 0 和 65535（0xFFFF 2^16）之间的数字，表示一个 UTF-16 码元。大于 0xFFFF 的数字会被截断为最后的 16 位。不进行有效性检查。

```js
String.fromCharCode(97); // a
```

### String.fromCharPoint()

根据指定的码位序列返回一个字符串

#### 入参

一个介于 0 和 0x10FFFF（包括两者）之间的整数，表示一个 Unicode 码位。

```js
String.fromCodePoint(97); // a
```

#### 小结

在日常使用时，通常可以认作 String.fromCharCode 和 String.fromCodePoint 的结果一样（注意 Unicode 码范围）

### String.raw

raw 这个 String 的静态方法我实在看不出来有什么用处，暂时没用到过，先不深究。

## String 方法

### at(index)

返回字符串 index 所在的字符

```js
const str = "hello world";
console.log(str.at(0)); // h
console.log(str.at(-1)); // d
```

#### 访问字符

字符串中访问字符的方式有两种：

- at(index)
- [], 使用方括号进行字符串访问，注意这种方式删除或为其赋值的行为是不生效的。因为涉及的属性是不可写（writable）也不可配置 (configurable)的。

### charAt

返回一个由给定索引处的单个 UTF-16 码元构成的新字符串。

当访问值大于 65535 的完整字符，请使用 codePointAt() 和 String.fromCodePoint() 代替。

```js
const str = "hello";

str.charAt(0); // h

console.log(String.fromCodePoint("a".codePointAt(0))); // a
```

### charCodeAt()

返回一个整数，表示给定索引处的 UTF-16 码元，其值介于 0 和 65535 之间。

如果要访问更完整的字符码元，使用 codePointAt() 代替。

### codePointAt()

返回一个非负整数，该整数是从给定索引开始的字符的 Unicode 码位值。请注意，索引仍然基于 UTF-16 码元，而不是 Unicode 码位。

#### 总结

字符 与 Unicode 码互转，记住两个方法即可

```js
String.fromCodePoint(97); // a

"a".codePointAt(0); // 97
```

### concat()

将字符串参数连接到调用的字符串，并返回一个新的字符串。

建议还是使用字符串模板 或者 '+'，更简单。

### endWith()

用于判断一个字符串是否以指定字符串结尾，如果是则返回 true，否则返回 false。

### includes()

执行<b>区分大小写</b>的搜索，以确定是否可以在一个字符串中找到另一个字符串，并根据情况返回 true 或 false。

#### 字符串的比较是区分大小写的 (=== 或 ==)

如果不区分大小写的比较，需要将两个比较的字符统一进行大小写转换。

```js
const a = "abc";
const b = "Abc";

if (a.toLocaleUpperCase() === b.toLocaleUpperCase()) {
  console.log(true);
} else {
  console.log(false);
}
```

### indexOf()

在字符串中搜索指定子字符串，并返回其第一次出现的位置索引。<b>它可以接受一个可选的参数指定搜索的起始位置，如果找到了指定的子字符串，则返回的位置索引大于或等于指定的数字</b>。

indexOf 的可选参数这种用法平时用得较少，可能不太清楚。

```js
const paragraph = "I think Ruth's dog is cuter than your dog!";

const searchTerm = "dog";
const indexOfFirst = paragraph.indexOf(searchTerm);

console.log(`The index of the first "${searchTerm}" is ${indexOfFirst}`);
// Expected output: "The index of the first "dog" is 15"

console.log(`The index of the second "${searchTerm}" is ${paragraph.indexOf(searchTerm, indexOfFirst + 1)}`);
// Expected output: "The index of the second "dog" is 38"
```

### lastIndexOf()

搜索该字符串并返回指定子字符串最后一次出现的索引。它可以接受一个可选的起始位置参数，并返回指定子字符串在<b>小于或等于</b>指定数字的索引中的最后一次出现的位置。

### isWellFormed()

返回一个表示该字符串是否包含单独代理项的布尔值，如果字符串不包含单独代理项，返回 true，否则返回 false。(UTF-16 编码中有代理对的概念，简单理解 65536 以内返回 true，超过返回 false)

#### 避免 encodeURI() 错误

如果传递的字符串格式不正确， encodeURI 会抛出错误。可以通过使用 isWellFormed() 在将字符串传递给 encodeURI() 之前测试字符串来避免这种情况。

```js
const illFormed = "https://example.com/search?q=\uD800";
// const lFormed = "https://example.com/search?q=\uD83D\uDE04";

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
```

### localCompare(compareChar, locales?, options?)

返回一个数字，表示参考字符串在排序顺序中是在给定字符串之前、之后还是与之相同，于比较字符串（compareString）之前则为负数；如果引用字符串存在于比较字符串之后则为正数；相等的时候返回 0。

确定字符在给定字符前后顺序, 受语言集影响。

```js
console.log("a".localeCompare("d")); // -1
```

### match() && matchAll()

检索字符串与正则表达式进行匹配的结果。

```js
const matchStr = "遇事不决，可问春风; 春风不决，既随己心";

console.log(matchStr.match("春风")); // [ '春风', index: 7, input: '遇事不决，可问春风; 春风不决，既随己心', groups: undefined ]
console.log(matchStr.match(/春风/g)); // [ '春风', '春风' ]

console.log([...matchStr.matchAll("春风")]);
// [
//  [ '春风', index: 7, input: '遇事不决，可问春风; 春风不决，既随己心', groups: undefined ],
//  [ '春风', index: 11, input: '遇事不决，可问春风; 春风不决，既随己心', groups: undefined ]
//]
```

### normalize()

返回该字符串的 Unicode 标准化形式

```js
const num = "\u0041\u006d\u00e9\u006c\u0069\u0065";
console.log(num.normalize());
```

### padEnd(targetLength, padString?)

将当前字符串从末尾开始填充给定的字符串（如果需要会重复填充），直到达到给定的长度。填充是从当前字符串的末尾开始的。

targetLength 限制最终长度
padString 可选，默认是''空字符

### padStart(targetLength, padString?)

用另一个字符串填充当前字符串（如果需要会重复填充），直到达到给定的长度。填充是从当前字符串的开头开始的。

### repeat(count)

返回一个新字符串，其中包含指定数量的所调用的字符串副本，这些副本连接在一起。

```js
const mood = "Happy! ";

console.log(`I feel ${mood.repeat(3)}`);
// Expected output: "I feel Happy! Happy! Happy! "
```

### replace()

返回一个新字符串，其中一个、多个或所有匹配的 pattern 被替换为 replacement。pattern 可以是字符串或 RegExp，replacement 可以是字符串或一个在每次匹配时调用的函数。如果 pattern 是字符串，则<b>只会替换第一个匹配项</b>。原始的字符串不会改变。

```js
const paragraph = "I think Ruth's dog is cuter than your dog!";

console.log(paragraph.replace("Ruth's", "my"));
// Expected output: "I think my dog is cuter than your dog!"

const regex = /Dog/i;
console.log(paragraph.replace(regex, "ferret"));
// Expected output: "I think Ruth's ferret is cuter than your dog!"
```

### replaceAll()

返回一个新字符串，其中所有匹配 pattern 的部分都被替换为 replacement。pattern 可以是一个字符串或一个 RegExp，replacement 可以是一个字符串或一个在每次匹配时调用的函数。原始字符串保持不变。

```js
const paragraph = "I think Ruth's dog is cuter than your dog!";

console.log(paragraph.replaceAll("dog", "monkey"));
// Expected output: "I think Ruth's monkey is cuter than your monkey!"

// Global flag required when calling replaceAll with regex
const regex = /Dog/gi;
console.log(paragraph.replaceAll(regex, "ferret"));
// Expected output: "I think Ruth's ferret is cuter than your ferret!"
```

### serch()

用于在 String 对象中执行正则表达式的搜索，寻找匹配项, 如果匹配成功，则返回正则表达式在字符串中<b>首次匹配的索引</b>；否则，返回 -1。

```js
const matchStr = "遇事不决，可问春风; 春风不决，既随己心";

console.log(matchStr.search("春风")); // 7
console.log(matchStr.search(/春风/g)); // 7
```

### slice(start, end)

提取字符串的一部分，并将其作为<b>新字符串返回，而不修改原始字符串</b>。截取范围 [start, end), 如果是负数，从末尾开始向前截取。

### split()

接受一个模式，通过搜索模式将字符串分割成一个有序的子串列表，将这些子串放入一个数组，并返回该数组。

### startWith(searchString, position = 0)

用来判断当前字符串是否以另外一个给定的子字符串开头，并根据判断结果返回 true 或 false。

searchString 期望匹配的 string
position 期望被找到的起始位置，默认为 0

### substring(indexStart, indexEnd)

返回该字符串从起始索引到结束索引（不包括）的部分（新字符串），如果未提供结束索引，则返回到字符串末尾的部分。截取范围是 [start, end）

### [Symbol.iterator]()

一个新的可迭代迭代器对象，它以字符串值中的 Unicode 码位生成单独的字符串。

```js
const str = "A\uD835\uDC68B\uD835\uDC69C\uD835\uDC6A";

for (const v of str) {
  console.log(v);
}
// "A"
// "\uD835\uDC68"
// "B"
// "\uD835\uDC69"
// "C"
// "\uD835\uDC6A"
```

### toLocaleUpperCase() & toLocaleLowerCase() & toUpperCase() & toLowerCase()

字符串大小写转换，带 locale 的方法会根据指定区域设置转换大小写，在大多数情况下，这将产生与 不带 locale 的方法生成相同的结果，但对于某些区域设置（例如土耳其语），它们的大小写映射与 Unicode 的默认映射不同，可能会得到不同的结果。

```js
"ALPHABET".toLocaleLowerCase(); // 'alphabet'

"\u0130".toLocaleLowerCase("tr") === "i"; // true
"\u0130".toLocaleLowerCase("en-US") === "i"; // false

const locales = ["tr", "TR", "tr-TR", "tr-u-co-search", "tr-x-turkish"];
"\u0130".toLocaleLowerCase(locales) === "i"; // true
```

### trim() & trimEnd() & trimStart()

trim() 方法会从字符串的两端移除空白字符，并返回一个新的字符串，而不会修改原始字符串。

trimEnd() 方法会从字符串的结尾移除空白字符，并返回一个新的字符串，而不会修改原始字符串。

trimStart() 方法会从字符串的开头移除空白字符，并返回一个新的字符串，而不会修改原始字符串。

### 小结

String 的方法很多，重点要掌握 slice、substring、split、toLocaleUpperCase、toLocaleLowerCase、trim、trimEnd、trimStart、includes、indexOf、lastIndexOf、charPointAt、replace。

## 字符串相关算法

### 求最长回文子串

- 中心扩展法
  以字符 s[i] 为中心，向两边扩展，判断是否 s[left] === s[right]，是的话则最大回文子串长度加 1。
  start = right - left + 1，遍历完字符串后，根据 s.substring(start, maxLen) 得到最长回文字串。
  注意，回文子串存在奇数长度回文子串和偶数长度回文子串两种情况。所以在遍历的时候两种情况的中心扩展都要进行。

- Manncher 算法
  在中心扩展基础上，利用备忘录的策略减少重复探索是否是回文子串的步骤。
  关键的第一步，通过使用额外的字符对原字符串进行处理（在原字符串的首尾和每个字符中间都加上一个特殊字符），这可以将两种情况的回文串（奇/偶）都转化成了奇数回文串这一种情形来处理。
  第二步，利用一个辅助数组 p 来记录处理后的字符串 newStr 的每个字符 p[i] 的最大回文半径(最大回文半径是包含 i 所在字符自身的)。
  第三步就是 Manacher 算法的具体实施过程:
  - 如果当前字符 i < right, 也就是在当前右边界范围 right 内的字符，都可以使用辅助数组 p 记录的值来得到当前 p[i] 的值。
    - p[i] = Math.min(right - i, p[2 * center - i]) 这里取两者中的最小值可以确保此时的 p[i] 在当前最大回文串长度内，此时的 p[i] 并不一定时 p[i] 的最终值，因为还没考虑 i > right（即当前字符超出当前最长回文子串的长度内的情形）
  - 否则（i >= right）时，这时由于辅助数组 p 只能记录历史值，此时新的回文子串情况还是未知，就只能通过中心扩展的方法去获取最新的回文子串值。
    - 中心扩展，用一个 while 循环判断 newStr[i - p[i] - 1] === new [i + p[i] + 1] 的字符是否相等，相等则是回文串；
    - i - p[i] 和 i + p[i] 则是利用回文串的对称性， -1 和 +1 则是代表在前一步（历史记录的最长回文串）的情况下继续往下推演。
  - 如果以 i 为中心的回文半径扩展超过了 right，则更新 center 和 right；
  - 如果当前 p[i] 得到的最新值大于记录的 maxLen，就更新 maxLen 和 start。
