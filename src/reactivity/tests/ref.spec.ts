/*
 * @Author: reiner850593913 lk850593913@gmail.com
 * @Date: 2022-10-09 22:27:13
 * @LastEditors: reiner850593913 lk850593913@gmail.com
 * @LastEditTime: 2022-10-10 20:22:11
 * @FilePath: \mini-vue\src\reactivity\tests\ref.spec.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { effect } from "../effect";
import { ref } from "../ref";

describe("ref", () => {
  it("happy path", () => {
    const foo = ref(1);
    expect(foo.value).toBe(1);
  });

  it("should be reactive", () => {
    const foo = ref(1);
    let dummy;
    let call = 0;
    effect(() => {
      call++;
      dummy = foo.value;
    });

    expect(dummy).toBe(1);
    foo.value = 2;
    expect(foo.value).toBe(2);
    expect(dummy).toBe(2);
    expect(call).toBe(2);

    foo.value = 2;
    expect(call).toBe(2);
  });

  it("nested should be reactive", () => {
    const foo = ref({
      count: 1,
    });
    let dummy;
    effect(() => {
      dummy = foo.value.count;
    });
    expect(dummy).toBe(1);
    foo.value.count++;
    expect(dummy).toBe(2);
  });
});
