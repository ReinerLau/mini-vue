/*
 * @Author: reiner850593913 lk850593913@gmail.com
 * @Date: 2022-10-17 21:24:15
 * @LastEditors: reiner850593913 lk850593913@gmail.com
 * @LastEditTime: 2022-10-17 21:24:54
 * @FilePath: \mini-vue\src\runtime-core\h.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createVnode } from "./vnode";

export function h(type, props?, children?) {
  return createVnode(type, props, children);
}
