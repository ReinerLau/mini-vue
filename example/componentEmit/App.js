/*
 * @Author: ReinerLau lk850593913@gmail.com
 * @Date: 2022-10-23 16:33:42
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-10-23 17:12:14
 * @FilePath: \mini-vue\example\componentEmit\App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { h } from "../../lib/mini-vue.esm.js";
import { Foo } from "./Foo.js";

export const App = {
  render() {
    return h("div", {}, [
      (h("p", {}, "App"),
      h(Foo, { onAdd: this.onAddEmit, onAddFoo: this.onAddFoo })),
    ]);
  },
  setup() {
    function onAddEmit(a, b) {
      console.log("onAdd", a, b);
    }

    function onAddFoo() {
      console.log("onAddFoo");
    }

    return {
      onAddEmit,
      onAddFoo,
    };
  },
};
