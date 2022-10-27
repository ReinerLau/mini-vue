/*
 * @Author: ReinerLau lk850593913@gmail.com
 * @Date: 2022-10-23 16:33:42
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-10-27 22:56:34
 * @FilePath: \mini-vue\example\componentEmit\App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { h, provide, inject } from "../../lib/mini-vue.esm.js";

export const App = {
  name: "App",
  render() {
    const Provider = {
      setup() {
        provide("foo", "foo");
        provide("bar", "bar");
      },
      render() {
        const provider = h("p", {}, "Provider");
        return h("div", {}, [provider, h(ProviderTwo)]);
      },
    };

    const ProviderTwo = {
      setup() {
        provide("foo", "fooTwo");
        const foo = inject("foo");
        return {
          foo,
        };
      },
      render() {
        const provider = h("p", {}, `ProviderTwo-${this.foo}`);
        return h("div", {}, [provider, h(Consumer)]);
      },
    };

    const Consumer = {
      setup() {
        const foo = inject("foo");
        const bar = inject("bar");
        const baz = inject("baz", "defaultValue");

        return {
          foo,
          bar,
          baz,
        };
      },
      render() {
        return h("div", {}, `Consumer-${this.foo}-${this.bar}-${this.baz}`);
      },
    };

    return h("div", {}, [h(Provider)]);
  },
  setup() {},
};
