/*
 * @Author: ReinerLau lk850593913@gmail.com
 * @Date: 2022-11-04 22:49:42
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-11-04 22:55:53
 * @FilePath: \mini-vue\example\update\ArrayToText.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { h, ref } from "../../lib/mini-vue.esm.js";

export const ArrayToText = {
  setup() {
    const isChange = ref(false);
    window.isChange = isChange;
    return {
      isChange,
    };
  },
  render() {
    const prevChildren = [h("div", {}, "A"), h("div", {}, "B")];
    const nextChildren = "newChildren";

    return this.isChange
      ? h("div", {}, nextChildren)
      : h("div", {}, prevChildren);
  },
};
