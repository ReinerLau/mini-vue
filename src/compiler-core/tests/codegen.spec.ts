/*
 * @Author: ReinerLau lk850593913@gmail.com
 * @Date: 2022-11-18 22:05:31
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-11-18 22:32:52
 * @FilePath: \mini-vue\src\compiler-core\tests\codegen.spec.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { generate } from "../src/codegen";
import { baseParse } from "../src/parse";
import { transform } from "../src/transform";

describe("codegen", () => {
  it("happy path", () => {
    const ast = baseParse("hi");

    transform(ast);
    const { code } = generate(ast);

    expect(code).toMatchSnapshot();
  });
});
