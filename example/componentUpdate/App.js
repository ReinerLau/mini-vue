/*
 * @Author: reiner850593913 lk850593913@gmail.com
 * @Date: 2022-10-15 10:10:18
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-11-13 13:55:34
 * @FilePath: \mini-vue\example\helloworld\App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { h, ref } from "../../lib/mini-vue.esm.js";
import { Child } from "./Child.js";

export const App = {
  name: "App",
  setup() {
    const msg = ref("child-props-msg");
    function changeChildProps() {
      msg.value = "test";
    }

    const count = ref(0);
    function changeCount() {
      count.value++;
    }

    return { msg, changeChildProps, count, changeCount };
  },
  render() {
    const app = h("p", {}, "App");
    const changeChildPropButton = h(
      "button",
      { onClick: this.changeChildProps },
      "changeChildProps"
    );
    const child = h(Child, { msg: this.msg });

    const count = h("p", {}, "count:" + this.count);
    const changeCountButton = h(
      "button",
      { onClick: this.changeCount },
      "changeCountButton"
    );
    return h("div", {}, [
      app,
      changeChildPropButton,
      child,
      changeCountButton,
      count,
    ]);
  },
};
