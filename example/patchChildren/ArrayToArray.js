/*
 * @Author: ReinerLau lk850593913@gmail.com
 * @Date: 2022-11-05 20:13:06
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-11-05 23:07:09
 * @FilePath: \mini-vue\example\patchChildren\ArrayToArray.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { h, ref } from "../../lib/mini-vue.esm.js";

export const ArrayToArray = {
  setup() {
    const isChange = ref(false);
    window.isChange = isChange;
    return {
      isChange,
    };
  },
  render() {
    // 左侧对比移动指针
    // const prevChildren = [
    //   h("div", { key: "A" }, "A"),
    //   h("div", { key: "B" }, "B"),
    //   h("div", { key: "C" }, "C"),
    // ];
    // const nextChildren = [
    //   h("div", { key: "A" }, "A"),
    //   h("div", { key: "B" }, "B"),
    //   h("div", { key: "D" }, "D"),
    //   h("div", { key: "E" }, "E"),
    // ];

    // 右侧对比移动指针
    // const prevChildren = [
    //   h("div", { key: "A" }, "A"),
    //   h("div", { key: "B" }, "B"),
    //   h("div", { key: "C" }, "C"),
    // ];
    // const nextChildren = [
    //   h("div", { key: "D" }, "D"),
    //   h("div", { key: "E" }, "E"),
    //   h("div", { key: "B" }, "B"),
    //   h("div", { key: "C" }, "C"),
    // ];

    // 新的比老的多 - 创建 - 左侧
    // const prevChildren = [
    //   h("div", { key: "A" }, "A"),
    //   h("div", { key: "B" }, "B"),
    // ];
    // const nextChildren = [
    //   h("div", { key: "A" }, "A"),
    //   h("div", { key: "B" }, "B"),
    //   h("div", { key: "C" }, "C"),
    //   h("div", { key: "D" }, "D"),
    // ];

    // 新的比老的多 - 创建 - 右侧
    const prevChildren = [
      h("div", { key: "A" }, "A"),
      h("div", { key: "B" }, "B"),
    ];
    const nextChildren = [
      h("div", { key: "D" }, "D"),
      h("div", { key: "C" }, "C"),
      h("div", { key: "A" }, "A"),
      h("div", { key: "B" }, "B"),
    ];

    // 老的比新的多 - 删除 - 左侧
    // const prevChildren = [
    //   h("div", { key: "A" }, "A"),
    //   h("div", { key: "B" }, "B"),
    //   h("div", { key: "C" }, "C"),
    //   h("div", { key: "D" }, "D"),
    // ];
    // const nextChildren = [
    //   h("div", { key: "A" }, "A"),
    //   h("div", { key: "B" }, "B"),
    // ];

    // 老的比新的多 - 删除 - 右侧
    // const prevChildren = [
    //   h("div", { key: "C" }, "C"),
    //   h("div", { key: "D" }, "D"),
    //   h("div", { key: "A" }, "A"),
    //   h("div", { key: "B" }, "B"),
    // ];
    // const nextChildren = [
    //   h("div", { key: "A" }, "A"),
    //   h("div", { key: "B" }, "B"),
    // ];

    return this.isChange
      ? h("div", {}, nextChildren)
      : h("div", {}, prevChildren);
  },
};
