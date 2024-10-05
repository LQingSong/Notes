/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  if (s.length < 2) return s;

  let start = 0, maxLen = 1;

  // 中心扩展法
  // function expandAroungCenter(left, right) {
  //   // s[left] === s[right]
  //   while (left >= 0 && right < s.length && s[left] === s[right]) {
  //     if (right - left + 1 > maxLen) {
  //       maxLen = right - left + 1;
  //       start = left;
  //     }
  //     left--;
  //     right++;
  //   }
  // }

  // for (let i = 0; i < s.length; i++) {
  //   expandAroungCenter(i, i); // 奇数长度回文
  //   expandAroungCenter(i, i + 1); // 偶数长度回文
  // }

  // return s.substring(start, start + maxLen);


  // Manacher 算法

  let newStr = '#';
  for (let i = 0; i < s.length; i++) {
    newStr += s[i] + '#';
  }

  // p[i] 表示以字符s[i]为中心的最长回文半径,包括s[i]本身
  let p = new Array(newStr.length).fill(0);

  // 从左到右遍历预处理后的字符串，以每个字符为中心，向两边扩展，计算p[i]的值。

  // i 当前处理的字符的索引
  // center 当前已知的最长回文子串的中心
  // right 当前已知的最长回文子串的右边界
  // 循环遍历预处理后的字符串 newStr
  for (let i = 0, center = 0, right = 0; i < newStr.length; i++) {
    // 如果 i < right ，则可以利用对称性来初始化 p[i] 的值。p[i] 表示以字符 newStr[i] 为中心的最长回文半径
    // 这里 p[i] 只是暂时的一个根据当前已知 p 的历史数据得到一个在当前最大回文字符串内的值，
    // 如果出了当前最大字符串时 p[i] 的值由中心扩展来更新
    if (i < right) {
      // Math.min(right - i, p[2 * center - i]) 取两者中的最小值，可以确保 p[i] 不会超出已知的最长回文子串的右边界
      p[i] = Math.min(right - i, p[2 * center - i]);
    }

    // 否则，使用中心扩展
    // 使用一个 while 循环 来尝试扩展以 i 为中心的回文半径。
    // 检查 i - p[i] - 1 和 i + p[i] + 1 两个位置的字符是否相等，如果相等则继续扩展。
    while (i - p[i] - 1 >= 0 && i + p[i] + 1 < newStr.length && newStr[i - p[i] - 1] === newStr[i + p[i] + 1]) {
      p[i]++;
    }

    // 如果以 i 为中心的回文半径扩展超过了 right，则更新 center 和 right
    if (i + p[i] > right) {
      center = i;
      right = i + p[i];
    }

    // 如果 p[i] 大于当前的 maxLen，则更新 maxLen 和 start
    // start 是最长回文子串在原始字符串 s 中的起始位置
    if (p[i] > maxLen) {
      maxLen = p[i];
      start = (i - maxLen) / 2;
    }
  }
  // 根据 start 和 maxLen，从原始字符串 s 中截取并返回最长回文串。
  return s.substring(start, start + maxLen);
};
// @lc code=end

