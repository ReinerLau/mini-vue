import { ShapFlags } from "../shared/ShapFlags";

/*
 * @Author: reiner850593913 lk850593913@gmail.com
 * @Date: 2022-10-15 10:19:00
 * @LastEditors: reiner850593913 lk850593913@gmail.com
 * @LastEditTime: 2022-10-20 22:36:44
 * @FilePath: \mini-vue\src\runtime-core\vnode.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function createVnode(type, props?, children?) {
  const vnode = {
    type,
    props,
    children,
    shapFlag: getShapFlag(type),
    el: null,
  };

  if (typeof children === "string") {
    vnode.shapFlag |= ShapFlags.TEXT_CHILDREN;
  } else if (Array.isArray(children)) {
    vnode.shapFlag |= ShapFlags.ARRAY_CHILDREN;
  }

  return vnode;
}
function getShapFlag(type) {
  return typeof type === "string"
    ? ShapFlags.ELEMENT
    : ShapFlags.STATEFUL_COMPONENT;
}
