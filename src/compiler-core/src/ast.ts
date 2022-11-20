import { CREATE_ELEMENT_VNODE } from "./runtimeHelpers";

/*
 * @Author: ReinerLau lk850593913@gmail.com
 * @Date: 2022-11-13 21:26:10
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-11-20 17:05:12
 * @FilePath: \mini-vue\src\compiler-core\src\ast.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const enum NodeTypes {
  INTERPOLATION,
  SIMPLE_EXPRESSION,
  ELEMENT,
  TEXT,
  ROOT,
  COMPOUND_EXPRESSION,
}

export function createVNodeCall(context, tag, props, children) {
  context.helper(CREATE_ELEMENT_VNODE);

  return {
    type: NodeTypes.ELEMENT,
    tag,
    props,
    children,
  };
}
