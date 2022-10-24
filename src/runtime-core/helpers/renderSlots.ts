/*
 * @Author: ReinerLau lk850593913@gmail.com
 * @Date: 2022-10-24 20:15:09
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-10-24 20:56:39
 * @FilePath: \mini-vue\src\runtime-core\helpers\renderSlots.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createVnode } from "../vnode";

export function renderSlots(slots, name, props) {
  const slot = slots[name];
  if (slot) {
    if (typeof slot === "function") {
      return createVnode("div", {}, slot(props));
    }
  }
}
