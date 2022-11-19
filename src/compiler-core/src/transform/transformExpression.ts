/*
 * @Author: ReinerLau lk850593913@gmail.com
 * @Date: 2022-11-19 11:24:01
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-11-19 11:40:01
 * @FilePath: \mini-vue\src\compiler-core\src\transform\transformExpression.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NodeTypes } from "../ast";

export function transformExpression(node) {
  if (node.type === NodeTypes.INTERPOLATION) {
    node.content = processExpression(node.content);
  }
}

function processExpression(node) {
  node.content = `_ctx.${node.content}`;
  return node;
}
