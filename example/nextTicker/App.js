/*
 * @Author: reiner850593913 lk850593913@gmail.com
 * @Date: 2022-10-15 10:10:18
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-11-13 16:46:04
 * @FilePath: \mini-vue\example\helloworld\App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  h,
  ref,
  getCurrentInstance,
  nextTick,
} from "../../lib/mini-vue.esm.js";

export const App = {
  name: "App",
  setup() {
    const instance = getCurrentInstance();

    const count = ref(0);
    function onClick() {
      for (let i = 0; i < 10; i++) {
        count.value++;
      }

      nextTick(() => {
        console.log(instance);
      });
    }

    return { count, onClick };
  },
  render() {
    const count = h("p", {}, "count:" + this.count);
    const button = h("button", { onClick: this.onClick }, "test");
    return h("div", {}, [count, button]);
  },
};
