/*
 * @Author: ReinerLau lk850593913@gmail.com
 * @Date: 2022-11-18 21:25:35
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-11-18 21:51:15
 * @FilePath: \mini-vue\src\compiler-core\tests\transform.spec.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NodeTypes } from "../src/ast";
import { baseParse } from "../src/parse";
import { transform } from "../src/transform";

describe("transform", () => {
  it("happy path", () => {
    const ast = baseParse("<div>hi,{{message}}</div>");

    const plugin = (node) => {
      if (node.type === NodeTypes.TEXT) {
        node.content += " mini-vue";
      }
    };

    transform(ast, {
      nodeTransforms: [plugin],
    });

    const nodeText = ast.children[0].children[0];
    expect(nodeText.content).toBe("hi, mini-vue");
  });
});
