import { camelize, toHandlerKey } from "../shared/index";

/*
 * @Author: ReinerLau lk850593913@gmail.com
 * @Date: 2022-10-23 16:46:30
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-10-23 21:54:48
 * @FilePath: \mini-vue\src\runtime-core\componentEmit.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function emit(instance, event, ...args) {
  const { props } = instance;

  const handler = props[toHandlerKey(camelize(event))];
  handler && handler(...args);
}
