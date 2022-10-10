/*
 * @Author: reiner850593913 lk850593913@gmail.com
 * @Date: 2022-10-10 22:51:53
 * @LastEditors: reiner850593913 lk850593913@gmail.com
 * @LastEditTime: 2022-10-10 23:35:01
 * @FilePath: \mini-vue\src\reactivity\tests\computed.spec.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { computed } from "../computed";
import { reactive } from "../reactive";

describe("computed", () => {
  it("happy path", () => {
    const user = reactive({
      age: 18,
    });

    const age = computed(() => {
      return user.age;
    });

    expect(age.value).toBe(18);
  });

  it("should compute lazily", () => {
    const obj = reactive({
      foo: 1,
    });

    const getter = jest.fn(() => {
      return obj.foo;
    });

    const cValue = computed(getter);

    expect(getter).not.toHaveBeenCalled();

    cValue.value;
    expect(getter).toHaveBeenCalledTimes(1);

    cValue.value;
    expect(getter).toHaveBeenCalledTimes(1);

    obj.foo = 2;
    expect(getter).toHaveBeenCalledTimes(1);
    expect(cValue.value).toBe(2);
    expect(getter).toHaveBeenCalledTimes(2);

    cValue.value;
    expect(getter).toHaveBeenCalledTimes(2);
  });
});
