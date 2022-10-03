/*
 * @Author: reiner850593913 lk850593913@gmail.com
 * @Date: 2022-10-02 08:31:33
 * @LastEditors: reiner850593913 lk850593913@gmail.com
 * @LastEditTime: 2022-10-03 18:45:55
 * @FilePath: \mini-vue\src\reactivity\tests\effect.spec.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { reactive } from "../reactive";
import { effect } from "../effect";

describe("effect", () => {
  it("happy path", () => {
    const user = reactive({
      age: 10,
    });

    let nextAge;
    effect(() => {
      nextAge = user.age + 1;
    });

    expect(nextAge).toBe(11);
    user.age++;
    expect(nextAge).toBe(12);
  });

  it("should return runner when call effect", () => {
    let foo = 10;
    const runner = effect(() => {
      foo++;
      return "foo";
    });

    expect(foo).toBe(11);
    const r = runner();
    expect(foo).toBe(12);
    expect(r).toBe("foo");
  });

  it("scheduler", () => {
    let dummy;
    let run;
    const scheduler = jest.fn(() => {
      run = runner;
    });
    const obj = reactive({ foo: 1 });
    const runner = effect(
      () => {
        dummy = obj.foo;
      },
      {
        scheduler,
      }
    );

    // 刚执行 effect，scheduler 还没有被调用
    expect(scheduler).not.toHaveBeenCalled();
    // 触发更新后 scheduler 被调用
    obj.foo++;
    expect(scheduler).toHaveBeenCalledTimes(1);
    // 但不会触发依赖
    expect(dummy).toBe(1);
    // 手动触发依赖
    run();
    expect(dummy).toBe(2);
  });
});
