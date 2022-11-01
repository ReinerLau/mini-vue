/*
 * @Author: ReinerLau lk850593913@gmail.com
 * @Date: 2022-11-01 12:35:08
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-11-01 12:42:17
 * @FilePath: \mini-vue\example\update\App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { h, ref } from "../../lib/mini-vue.esm.js";

export const App = {
  render() {
    return h("div", {}, [
      h("div", {}, "count:" + this.count),
      h("button", { onClick: this.onClick }, "test"),
    ]);
  },
  setup() {
    const count = ref(0);

    function onClick() {
      count.value++;
    }

    return {
      count,
      onClick,
    };
  },
};
