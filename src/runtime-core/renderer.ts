import { ShapFlags } from "../shared/ShapFlags";
import { createComponentInstance, setupComponent } from "./component";

/*
 * @Author: reiner850593913 lk850593913@gmail.com
 * @Date: 2022-10-15 10:44:19
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-10-22 10:22:05
 * @FilePath: \mini-vue\src\runtime-core\renderer.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function render(vnode, container) {
  patch(vnode, container);
}

function patch(vnode, container) {
  if (vnode.shapFlag & ShapFlags.ELEMENT) {
    processElement(vnode, container);
  } else if (vnode.shapFlag & ShapFlags.STATEFUL_COMPONENT) {
    processComponent(vnode, container);
  }
}

function processElement(vnode, container) {
  mountElement(vnode, container);
}

function mountElement(vnode, container) {
  const el = (vnode.el = document.createElement(vnode.type));

  const { children } = vnode;
  if (vnode.shapFlag & ShapFlags.TEXT_CHILDREN) {
    el.textContent = children;
  } else if (vnode.shapFlag & ShapFlags.ARRAY_CHILDREN) {
    mountChildern(vnode, el);
  }

  const { props } = vnode;
  for (const key in props) {
    const val = props[key];
    const isOn = (key: string) => /^on[A-Z]/.test(key);
    if (isOn(key)) {
      const event = key.slice(2).toLocaleLowerCase();
      el.addEventListener(event, val);
    } else {
      el.setAttribute(key, val);
    }
  }

  container.append(el);
}

function mountChildern(vnode, el) {
  vnode.children.forEach((v) => {
    patch(v, el);
  });
}

function processComponent(vnode, container) {
  mountComponent(vnode, container);
}

function mountComponent(initialVNode, container) {
  const instance = createComponentInstance(initialVNode);

  setupComponent(instance);
  setupRenderEffect(instance, initialVNode, container);
}

function setupRenderEffect(instance, initialVNode, container) {
  const { proxy } = instance;
  const subTree = instance.render.call(proxy);

  patch(subTree, container);

  initialVNode.el = subTree.el;
}
