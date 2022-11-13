/*
 * @Author: ReinerLau lk850593913@gmail.com
 * @Date: 2022-10-23 10:39:58
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-11-13 12:16:31
 * @FilePath: \mini-vue\example\helloworld\Foo.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { h } from "../../lib/mini-vue.esm.js";

export const Child = {
  name: "Child",
  setup() {
    return {};
  },
  render() {
    return h("div", {}, "msg:" + this.$props.msg);
  },
};
