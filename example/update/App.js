/*
 * @Author: ReinerLau lk850593913@gmail.com
 * @Date: 2022-11-01 12:35:08
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-11-03 22:57:43
 * @FilePath: \mini-vue\example\update\App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { h, ref } from "../../lib/mini-vue.esm.js";

export const App = {
  render() {
    return h("div", { ...this.props }, [
      h("div", {}, "count:" + this.count),
      h("button", { onClick: this.onClick }, "test"),
      h("button", { onClick: this.onClickDemo1 }, "foo -> new-foo"),
      h("button", { onClick: this.onClickDemo2 }, "foo -> undefined || null"),
      h("button", { onClick: this.onClickDemo3 }, "foo,bar,baz -> foo,baz"),
    ]);
  },
  setup() {
    const count = ref(0);

    const props = ref({
      foo: "foo",
      bar: "bar",
      baz: "baz",
    });

    function onClick() {
      count.value++;
    }

    function onClickDemo1() {
      props.value.foo = "new-foo";
    }

    function onClickDemo2() {
      props.value.foo = undefined;
    }

    function onClickDemo3() {
      props.value = {
        foo: "foo",
        baz: "baz",
      };
    }

    return {
      count,
      onClick,
      onClickDemo1,
      onClickDemo2,
      onClickDemo3,
      props,
    };
  },
};
