/**
 * 简易文本编辑器，初始为空行，光标在行首，默认小写；请实现如下功能
 *
 * a-z 按下键盘对应的26个字母键，在光标位置输入一个字符。
 * @表示大小写切换。
 * + 在光标位置换行，把光标右边的内容作为新行插入在当前行之后。
 * ~ 表示退格键，可删除光标左边字符；当光标在行首时，将当前行拼接到上一行（如果存在）行尾。
 * - 表示删除键，可删除光标右边字符；当光标在行尾时，将当前行拼接到下一行（如果存在）行首。
 * ^*<> 分别表示上下左右方向键；
 * 左右移动，光标横向移动一个位置；
 * 当光标在行首时，左键移动到上一行行尾；
 * 当光标在行尾时，右键移动到下一行行首；
 * 上下移动，光标纵向移动一行；
 * 若在首行上移，或者末行下移，则移动无效；
 * 相邻行：如果目标行内容长度小于光标的列位置，则光标移动到目标行行尾。注意：仅根据当前光标的列位置来移动，不记忆之前的位置。
 * 请根据键盘输入信息 inputStr，输出最终的文本内容。
 *
 * 输入1
 * "aaaa+bbbb~@cc<<<^--d@d"
 * 输出1
 * ["aaDd", "bbbCC"]
 *
 * 输入2
 * "za+b+cd^*e^^~*~>>~"
 * 输出2
 * ["abced"]
 *
 * 输入3
 * "^*><+++^^a**b+^"
 * 输出3
 * ["", "a", "", "b", ""]
 */
// @ts-check
class Solution {
  flag = false; // 大小写状态，false表示小写，true表示大写

  /**
   * 初始化编辑器状态
   */
  constructor() {
    this.lines = []; // 文本的行数组
    this.cursor = { line: 0, col: 0 }; // 光标位置，行和列
  }

  /**
   * 处理键盘输入字符串
   * @param {string} inputStr - 键盘输入字符串
   * @returns {string[]} - 最终的文本内容
   */
  strEdit(inputStr) {
    for (let i = 0; i < inputStr.length; i++) {
      const ch = inputStr[i];
      this.handleInput(ch);
    }
    return this.lines;
  }

  /**
   * 处理单个键盘输入字符
   * @param {string} ch - 键盘输入字符
   */
  handleInput(ch) {
    if (/[a-z]/i.test(ch)) {
      this.insertChar(ch);
    } else if (ch === "@") {
      this.switchUpperOrLower();
    } else if (ch === "+") {
      this.lineBreak();
    } else if (ch === "~") {
      this.backspace();
    } else if (ch === "-") {
      this.delete();
    } else if (ch === "^" || ch === "*" || ch === "<" || ch === ">") {
      this.moveCursor(ch);
    }
  }

  /**
   * 在光标位置插入字符
   * @param {string} ch - 要插入的字符
   */
  insertChar(ch) {
    if (this.flag && /[a-z]/.test(ch)) {
      ch = ch.toUpperCase();
    }
    const line = this.lines[this.cursor.line] || "";
    this.lines[this.cursor.line] = line.slice(0, this.cursor.col) + ch + line.slice(this.cursor.col);
    this.cursor.col++;
  }

  /**
   * 切换大小写状态
   */
  switchUpperOrLower() {
    this.flag = !this.flag;
  }

  /**
   * 在光标位置换行
   */
  lineBreak() {
    const line = this.lines[this.cursor.line] || "";
    const beforeCursor = line.slice(0, this.cursor.col);
    const afterCursor = line.slice(this.cursor.col);
    this.lines.splice(this.cursor.line, 1, beforeCursor, afterCursor);
    this.cursor.line++;
    this.cursor.col = 0;
  }

  /**
   * 退格删除光标左边的字符
   */
  backspace() {
    if (this.cursor.col === 0) {
      if (this.cursor.line > 0) {
        const prevLine = this.lines[this.cursor.line - 1];
        const currentLine = this.lines[this.cursor.line];
        this.lines[this.cursor.line - 1] = prevLine + currentLine;
        this.lines.splice(this.cursor.line, 1);
        this.cursor.line--;
        this.cursor.col = prevLine.length;
      }
    } else {
      const line = this.lines[this.cursor.line];
      this.lines[this.cursor.line] = line.slice(0, this.cursor.col - 1) + line.slice(this.cursor.col);
      this.cursor.col--;
    }
  }

  /**
   * 删除光标右边的字符
   */
  delete() {
    if (this.cursor.col === this.lines[this.cursor.line].length) {
      if (this.cursor.line < this.lines.length - 1) {
        const nextLine = this.lines[this.cursor.line + 1];
        const currentLine = this.lines[this.cursor.line];
        this.lines[this.cursor.line] = currentLine + nextLine;
        this.lines.splice(this.cursor.line + 1, 1);
      }
    } else {
      const line = this.lines[this.cursor.line];
      this.lines[this.cursor.line] = line.slice(0, this.cursor.col) + line.slice(this.cursor.col + 1);
    }
  }

  /**
   * 移动光标
   * @param {string} direction - 移动方向
   */
  moveCursor(direction) {
    switch (direction) {
      case "^":
        this.cursor.line = Math.max(0, this.cursor.line - 1);
        break;
      case "*":
        this.cursor.line = Math.min(this.lines.length - 1, this.cursor.line + 1);
        break;
      case "<":
        this.cursor.col = Math.max(0, this.cursor.col - 1);
        break;
      case ">":
        const line = this.lines[this.cursor.line] || "";
        this.cursor.col = Math.min(line.length, this.cursor.col + 1);
        break;
      default:
        break;
    }
  }
}

function test() {
  const solution = new Solution();
  console.log(solution.strEdit("aaaa+bbbb~@cc<<<^--d@d"));
  console.log(solution.strEdit("za+b+cd^*e^^~*~>>~"));
  console.log(solution.strEdit("^*><+++^^a**b+^"));
}

test();
