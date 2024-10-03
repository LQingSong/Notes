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
  if (s.length < 2) return;

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
  // 扩展时，利用p[i]
  for (let i = 0, center = 0, right = 0; i < newStr.length; i++) {
    if (i < right) {
      p[i] = Math.min(right - i, p[2 * center - i]);
    }

    while (i - p[i] - 1 >= 0 && i + p[i] + 1 < newStr.length && newStr[i - p[i] - 1] === newStr[i + p[i] + 1]) {
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

};
// @lc code=end

