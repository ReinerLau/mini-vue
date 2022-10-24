/*
 * @Author: reiner850593913 lk850593913@gmail.com
 * @Date: 2022-10-20 22:26:22
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-10-24 21:11:52
 * @FilePath: \mini-vue\src\shared\ShapFlags.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const enum ShapFlags {
  ELEMENT = 1,
  STATEFUL_COMPONENT = 1 << 1,
  TEXT_CHILDREN = 1 << 2,
  ARRAY_CHILDREN = 1 << 3,
  SLOT_CHILDREN = 1 << 4,
}
