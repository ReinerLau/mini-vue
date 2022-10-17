/*
 * @Author: reiner850593913 lk850593913@gmail.com
 * @Date: 2022-10-15 10:10:18
 * @LastEditors: reiner850593913 lk850593913@gmail.com
 * @LastEditTime: 2022-10-15 10:12:08
 * @FilePath: \mini-vue\example\helloworld\App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const App = {
  render() {
    return h("div", "hi, " + this.msg);
  },
  setup() {
    return {
      msg: "mini-vue",
    };
  },
};
