/*
 * @Author: ReinerLau lk850593913@gmail.com
 * @Date: 2022-11-04 22:48:20
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-11-05 00:01:38
 * @FilePath: \mini-vue\example\patchChildren\App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { h } from "../../lib/mini-vue.esm.js";
import { ArrayToText } from "./ArrayToText.js";
import { TextToText } from "./TextToText.js";
import { TextToArray } from "./TextToArray.js";

export const App = {
  render() {
    return h("div", {}, [
      h("p", {}, "App"),
      // h(ArrayToText),
      // h(TextToText),
      h(TextToArray),
    ]);
  },
  setup() {},
};
