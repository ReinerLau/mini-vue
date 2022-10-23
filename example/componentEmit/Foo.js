/*
 * @Author: ReinerLau lk850593913@gmail.com
 * @Date: 2022-10-23 16:33:42
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-10-23 17:13:22
 * @FilePath: \mini-vue\example\componentEmit\Foo.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { h } from "../../lib/mini-vue.esm.js";

export const Foo = {
  setup(props, { emit }) {
    function onAdd() {
      emit("add", 1, 2);
      emit("add-foo");
    }

    return {
      onAdd,
    };
  },
  render() {
    const bar = h("button", { onClick: this.onAdd }, "test emit");
    const foo = h("p", {}, "foo");
    return h("div", {}, [foo, bar]);
  },
};
