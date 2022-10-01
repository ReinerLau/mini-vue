/*
 * @Author: reiner850593913 lk850593913@gmail.com
 * @Date: 2022-10-01 16:21:10
 * @LastEditors: reiner850593913 lk850593913@gmail.com
 * @LastEditTime: 2022-10-01 17:22:25
 * @FilePath: \mini-vue\src\reactivity\tests\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { add } from "../index";

it("init", () => {
  expect(add(1, 2)).toBe(3);
});
