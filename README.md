# Notes

记录所学、所知、所见、所思

## 如何记录

应当利于理解，有序，以便后续复读亦可通顺。

## TODO

将本仓库做成网页，待评论，这样更方便与人分享。

## JS String 字符串的操作

[String.md](./src/md/String.md)

`重新理解 String 类型，注意一些以前未曾注意的点，例如 String 一旦创建是不可变的（不变指的是对String的操作不影响原字符串），还要掌握String常见的方法。`

## JS 文件编写技巧

有时候我们写的是 js 文件而不是 ts 文件，又想有 ts 的静态检查功能，就可以在文件开头加上如下代码：

```js
// @ts-check
```
