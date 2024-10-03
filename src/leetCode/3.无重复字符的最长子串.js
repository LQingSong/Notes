/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let left = 0, right = 0, maxLength = 0;
  let charSet = new Set();

  while (right < s.length) {
    if (!charSet.has(s[right])) {
      charSet.add(s[right]);
      maxLength = Math.max(maxLength, right - left + 1);
      right++;
    } else {
      charSet.delete(s[left]);
      left++;
    }
  }

  return maxLength;
}
// @lc code=end

