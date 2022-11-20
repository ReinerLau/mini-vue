/*
 * @Author: ReinerLau lk850593913@gmail.com
 * @Date: 2022-11-20 19:17:34
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-11-20 20:07:57
 * @FilePath: \mini-vue\src\compiler-core\src\compile.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { generate } from "./codegen";
import { baseParse } from "./parse";
import { transform } from "./transform";
import { transformElement } from "./transform/transformElement";
import { transformExpression } from "./transform/transformExpression";
import { transformText } from "./transform/transformText";

export function baseCompile(template) {
  const ast = baseParse(template);

  transform(ast, {
    nodeTransforms: [transformExpression, transformElement, transformText],
  });

  return generate(ast);
}
