# String

创建String有三种形式
- 字面量
```js
const str = 'abc'; // 创建的是字符串原始值，typeof str === 'string'
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
在日常使用时，通常可以认作 String.fromCharCode 和 String.fromCodePoint 的结果一样（注意Unicode码范围）

### String.raw
raw 这个String的静态方法我实在看不出来有什么用处，暂时没用到过，先不深究。

## String 方法

### at(index)
返回字符串 index 所在的字符

```js
const str = 'hello world';
console.log(str.at(0)); // h
console.log(str.at(-1)); // d
```

#### 访问字符
字符串中访问字符的方式有两种：
 - at(index)
 - [], 使用方括号进行字符串访问，注意这种方式删除或为其赋值的行为是不生效的。因为涉及的属性是不可写（writable）也不可配置 (configurable)的。


### charAt
返回一个由给定索引处的单个 UTF-16 码元构成的新字符串。

当访问值大于65535的完整字符，请使用 codePointAt() 和 String.fromCodePoint() 代替。

```js
const str = 'hello';

str.charAt(0); // h

console.log(String.fromCodePoint('a'.codePointAt(0))); // a
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

'a'.codePointAt(0); // 97
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
const a = 'abc';
const b = 'Abc';

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

const searchTerm = 'dog';
const indexOfFirst = paragraph.indexOf(searchTerm);

console.log(`The index of the first "${searchTerm}" is ${indexOfFirst}`);
// Expected output: "The index of the first "dog" is 15"

console.log(
  `The index of the second "${searchTerm}" is ${paragraph.indexOf(
    searchTerm,
    indexOfFirst + 1,
  )}`,
);
// Expected output: "The index of the second "dog" is 38"
```

### lastIndexOf()
搜索该字符串并返回指定子字符串最后一次出现的索引。它可以接受一个可选的起始位置参数，并返回指定子字符串在<b>小于或等于</b>指定数字的索引中的最后一次出现的位置。

### isWellFormed()

返回一个表示该字符串是否包含单独代理项的布尔值，如果字符串不包含单独代理项，返回 true，否则返回 false。(UTF-16编码中有代理对的概念，简单理解65536以内返回true，超过返回false)

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