import { effect } from "../reactivity/effect";
import { EMPTY_OBJECT } from "../shared";
import { ShapFlags } from "../shared/ShapFlags";
import { createComponentInstance, setupComponent } from "./component";
import { createAppApi } from "./createApp";
import { Fragment, Text } from "./vnode";

/*
 * @Author: reiner850593913 lk850593913@gmail.com
 * @Date: 2022-10-15 10:44:19
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-11-03 23:10:42
 * @FilePath: \mini-vue\src\runtime-core\renderer.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function createRender(options) {
  const {
    createElement: hostCreateElement,
    patchProp: hostPatchProp,
    insert: hostInsert,
  } = options;

  function render(vnode, container) {
    patch(null, vnode, container, null);
  }

  function patch(n1, n2, container, parentComponent) {
    const { type, shapFlag } = n2;

    switch (type) {
      case Fragment:
        processFragment(n1, n2, container, parentComponent);
        break;
      case Text:
        processText(n1, n2, container);
        break;
      default:
        if (shapFlag & ShapFlags.ELEMENT) {
          processElement(n1, n2, container, parentComponent);
        } else if (shapFlag & ShapFlags.STATEFUL_COMPONENT) {
          processComponent(n1, n2, container, parentComponent);
        }
    }
  }

  function processText(n1, n2, container) {
    const { children } = n2;
    const textNode = (n2.el = document.createTextNode(children));
    container.append(textNode);
  }

  function processFragment(n1, n2, container, parentComponent) {
    mountChildern(n2, container, parentComponent);
  }

  function processElement(n1, n2, container, parentComponent) {
    if (!n1) {
      mountElement(n2, container, parentComponent);
    } else {
      patchElement(n1, n2, container);
    }
  }

  function patchElement(n1, n2, container) {
    const oldProps = n1.props || EMPTY_OBJECT;
    const newProps = n2.props || EMPTY_OBJECT;

    const el = (n2.el = n1.el);

    patchProps(el, oldProps, newProps);
  }

  function patchProps(el, oldProps, newProps) {
    if (oldProps !== newProps) {
      for (let key in newProps) {
        const newProp = newProps[key];
        const oldProp = oldProps[key];
        if (oldProp !== newProp) {
          hostPatchProp(el, key, newProp);
        }
      }

      if (oldProps !== EMPTY_OBJECT) {
        for (let key in oldProps) {
          if (!(key in oldProps)) {
            hostPatchProp(el, key, null);
          }
        }
      }
    }
  }

  function mountElement(vnode, container, parentComponent) {
    const el = (vnode.el = hostCreateElement(vnode.type));

    const { children } = vnode;
    if (vnode.shapFlag & ShapFlags.TEXT_CHILDREN) {
      el.textContent = children;
    } else if (vnode.shapFlag & ShapFlags.ARRAY_CHILDREN) {
      mountChildern(vnode, el, parentComponent);
    }

    const { props } = vnode;
    for (const key in props) {
      const val = props[key];

      hostPatchProp(el, key, val);
    }

    hostInsert(el, container);
  }

  function mountChildern(vnode, el, parentComponent) {
    vnode.children.forEach((v) => {
      patch(null, v, el, parentComponent);
    });
  }

  function processComponent(n1, n2, container, parentComponent) {
    mountComponent(n2, container, parentComponent);
  }

  function mountComponent(initialVNode, container, parentComponent) {
    const instance = createComponentInstance(initialVNode, parentComponent);

    setupComponent(instance);
    setupRenderEffect(instance, initialVNode, container);
  }

  function setupRenderEffect(instance, initialVNode, container) {
    effect(() => {
      if (!instance.isMounted) {
        const { proxy } = instance;
        const subTree = (instance.subTree = instance.render.call(proxy));

        patch(null, subTree, container, instance);

        initialVNode.el = subTree.el;
        instance.isMounted = true;
      } else {
        const { proxy } = instance;
        const subTree = instance.render.call(proxy);
        const prevSubTree = instance.subTree;

        patch(prevSubTree, subTree, container, instance);
      }
    });
  }

  return {
    createApp: createAppApi(render),
  };
}
