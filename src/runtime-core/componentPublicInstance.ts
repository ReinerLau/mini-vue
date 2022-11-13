import { hasOwn } from "../shared/index";

/*
 * @Author: reiner850593913 lk850593913@gmail.com
 * @Date: 2022-10-19 23:17:25
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-11-13 12:17:37
 * @FilePath: \mini-vue\src\runtime-core\componentPublicInstance.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const publicPropertiesMap = {
  $el: (i) => i.vnode.el,
  $slots: (i) => i.slots,
  $props: (i) => i.props,
};

export const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { setupState, props } = instance;

    if (hasOwn(setupState, key)) {
      return setupState[key];
    } else if (hasOwn(props, key)) {
      return props[key];
    }
    const publicGetter = publicPropertiesMap[key];
    if (publicGetter) {
      return publicGetter(instance);
    }
  },
};
