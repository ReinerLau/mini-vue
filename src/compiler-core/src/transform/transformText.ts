/*
 * @Author: ReinerLau lk850593913@gmail.com
 * @Date: 2022-11-20 14:37:44
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-11-20 18:46:50
 * @FilePath: \mini-vue\src\compiler-core\src\transform\transformText.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NodeTypes } from "../ast";
import { isText } from "../utils";

export function transformText(node) {
  let currContainer;
  if (node.type === NodeTypes.ELEMENT) {
    return () => {
      const { children } = node;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (isText(child)) {
          for (let j = i + 1; j < children.length; j++) {
            const next = children[j];
            if (isText(next)) {
              if (!currContainer) {
                currContainer = children[i] = {
                  type: NodeTypes.COMPOUND_EXPRESSION,
                  children: [child],
                };
              }

              currContainer.children.push(" + ");
              currContainer.children.push(next);
              children.splice(j, 1);
              j--;
            }
          }
        }
      }
    };
  }
}
