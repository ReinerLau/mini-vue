/*
 * @Author: reiner850593913 lk850593913@gmail.com
 * @Date: 2022-10-05 08:40:40
 * @LastEditors: reiner850593913 lk850593913@gmail.com
 * @LastEditTime: 2022-10-07 11:52:13
 * @FilePath: \mini-vue\src\reactivity\tests\readonly.spec.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { isReadonly, readonly } from "../reactive";

describe("readonly", () => {
  it("happy path", () => {
    const original = { foo: 1, bar: { foo: 1 } };
    const observed = readonly(original);

    expect(observed).not.toBe(original);
    expect(observed.foo).toBe(1);
    expect(isReadonly(observed)).toBe(true);
    expect(isReadonly(original)).toBe(false);
    expect(isReadonly(observed.bar)).toBe(true);
    expect(isReadonly(original.bar)).toBe(false);
  });

  it("should call console.warn when set", () => {
    const observed = readonly({ foo: 1 });
    console.warn = jest.fn();
    observed.foo = 2;
    expect(console.warn).toHaveBeenCalled();
  });
});
