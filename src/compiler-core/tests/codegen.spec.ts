/*
 * @Author: ReinerLau lk850593913@gmail.com
 * @Date: 2022-11-18 22:05:31
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-11-19 11:26:42
 * @FilePath: \mini-vue\src\compiler-core\tests\codegen.spec.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { generate } from "../src/codegen";
import { baseParse } from "../src/parse";
import { transform } from "../src/transform";
import { transformExpression } from "../src/transform/transformExpression";

describe("codegen", () => {
  it("string", () => {
    const ast = baseParse("hi");

    transform(ast);
    const { code } = generate(ast);

    expect(code).toMatchSnapshot();
  });

  it("interpolation", () => {
    const ast = baseParse("{{message}}");

    transform(ast, {
      nodeTransforms: [transformExpression],
    });
    const { code } = generate(ast);

    expect(code).toMatchSnapshot();
  });
});
