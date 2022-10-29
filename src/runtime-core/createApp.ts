import { createVnode } from "./vnode";

/*
 * @Author: reiner850593913 lk850593913@gmail.com
 * @Date: 2022-10-15 10:17:02
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-10-29 11:23:39
 * @FilePath: \mini-vue\src\runtime-core\createApp.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function createAppApi(render) {
  return function createApp(rootComponent) {
    return {
      mount(rootContainer) {
        const vnode = createVnode(rootComponent);

        render(vnode, rootContainer);
      },
    };
  };
}
