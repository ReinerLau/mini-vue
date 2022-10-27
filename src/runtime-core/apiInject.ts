import { getCurrentInstance } from "./component";

/*
 * @Author: ReinerLau lk850593913@gmail.com
 * @Date: 2022-10-27 21:21:32
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-10-27 22:55:26
 * @FilePath: \mini-vue\src\runtime-core\apiInject.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function provide(key, value) {
  const currentInstance = getCurrentInstance();
  if (currentInstance) {
    let { provides } = currentInstance;
    const parentProvides = currentInstance.parent.provides;
    if (provides === parentProvides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}

export function inject(key, defalutValue) {
  const currentInstance = getCurrentInstance();
  if (currentInstance) {
    const parentProvides = currentInstance.parent.provides;
    if (key in parentProvides) {
      return parentProvides[key];
    } else if (defalutValue) {
      if (typeof defalutValue === "function") {
        return defalutValue();
      }
      return defalutValue;
    }
  }
}
