import { ShapFlags } from "../shared/ShapFlags";

/*
 * @Author: ReinerLau lk850593913@gmail.com
 * @Date: 2022-10-24 20:00:46
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-10-24 21:15:11
 * @FilePath: \mini-vue\src\runtime-core\componentSlot.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function initSlots(instance, children) {
  const { vnode } = instance;
  if (vnode.shapFlag & ShapFlags.SLOT_CHILDREN) {
    normalizeObjectSlots(children, instance.slots);
  }
}

function normalizeObjectSlots(children, slots) {
  for (const key in children) {
    const value = children[key];
    slots[key] = (props) => normalizeSlotValue(value(props));
  }
}

function normalizeSlotValue(value) {
  return Array.isArray(value) ? value : [value];
}
