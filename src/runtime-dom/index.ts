import { createRender } from "../runtime-core/index";
export * from "../runtime-core/index";
/*
 * @Author: ReinerLau lk850593913@gmail.com
 * @Date: 2022-10-29 11:13:27
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-11-05 21:51:44
 * @FilePath: \mini-vue\src\rumtime-dom\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function createElement(type) {
  return document.createElement(type);
}

function patchProp(el, key, nextProp) {
  const isOn = (key: string) => /^on[A-Z]/.test(key);
  if (isOn(key)) {
    const event = key.slice(2).toLocaleLowerCase();
    el.addEventListener(event, nextProp);
  } else {
    if (nextProp === undefined || nextProp === null) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, nextProp);
    }
  }
}

function remove(el) {
  const parent = el.parentNode;
  if (parent) {
    parent.removeChild(el);
  }
}

function setElementText(el, text) {
  el.textContent = text;
}

function insert(child, parent, anchor) {
  parent.insertBefore(child, anchor || null);
}

const renderer: any = createRender({
  createElement,
  patchProp,
  insert,
  remove,
  setElementText,
});

export function createApp(...args) {
  return renderer.createApp(...args);
}
