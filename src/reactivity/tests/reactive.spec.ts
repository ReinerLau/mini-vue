/*
 * @Author: reiner850593913 lk850593913@gmail.com
 * @Date: 2022-10-02 07:58:11
 * @LastEditors: reiner850593913 lk850593913@gmail.com
 * @LastEditTime: 2022-10-02 13:34:59
 * @FilePath: \mini-vue\src\reactivity\tests\reactive.spec.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { reactive } from "../reactive";

describe("reactive", () => {
  it("happy path", () => {
    const orignal = { foo: 1 };
    const observed = reactive(orignal);
    expect(observed).not.toBe(orignal);
    expect(observed.foo).toBe(1);
  });
});
