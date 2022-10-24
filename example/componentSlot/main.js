/*
 * @Author: reiner850593913 lk850593913@gmail.com
 * @Date: 2022-10-15 10:10:13
 * @LastEditors: reiner850593913 lk850593913@gmail.com
 * @LastEditTime: 2022-10-17 21:35:48
 * @FilePath: \mini-vue\example\helloworld\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { App } from "./App.js";
import { createApp } from "../../lib/mini-vue.esm.js";

const rootContainer = document.querySelector("#app");
createApp(App).mount(rootContainer);
