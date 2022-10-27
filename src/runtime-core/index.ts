/*
 * @Author: reiner850593913 lk850593913@gmail.com
 * @Date: 2022-10-15 10:16:38
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-10-27 21:22:32
 * @FilePath: \mini-vue\src\runtime-core\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export { createApp } from "./createApp";
export { h } from "./h";
export { renderSlots } from "./helpers/renderSlots";
export { createTextVNode } from "./vnode";
export { getCurrentInstance } from "./component";
export { provide, inject } from "./apiInject";
