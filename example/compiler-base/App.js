/*
 * @Author: reiner850593913 lk850593913@gmail.com
 * @Date: 2022-10-15 10:10:18
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-11-20 19:51:21
 * @FilePath: \mini-vue\example\helloworld\App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ref } from "../../lib/mini-vue.esm.js";

export const App = {
  template: "<div>hi,{{count}}</div>",
  setup() {
    const count = (window.count = ref(1));
    return {
      count,
    };
  },
};
