import { isReadonly, shallowReadonly } from "../reactive";

/*
 * @Author: reiner850593913 lk850593913@gmail.com
 * @Date: 2022-10-07 21:56:48
 * @LastEditors: reiner850593913 lk850593913@gmail.com
 * @LastEditTime: 2022-10-07 22:05:43
 * @FilePath: \mini-vue\src\reactivity\tests\shallowReadonly.spec.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
describe("shallowReadonly", () => {
  it("happy path", () => {
    const obj = shallowReadonly({ foo: { bar: 1 } });
    expect(isReadonly(obj)).toBe(true);
    expect(isReadonly(obj.foo)).toBe(false);
  });

  it("should call console.warn when set", () => {
    const observed = shallowReadonly({ foo: 1 });
    console.warn = jest.fn();
    observed.foo = 2;
    expect(console.warn).toHaveBeenCalled();
  });
});
