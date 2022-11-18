import { NodeTypes } from "./ast";

/*
 * @Author: ReinerLau lk850593913@gmail.com
 * @Date: 2022-11-18 21:32:11
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-11-18 21:58:25
 * @FilePath: \mini-vue\src\compiler-core\src\transform.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function transform(root, options) {
  const context = createNodeTransformContext(root, options);
  traverseNode(root, context);
}

function createNodeTransformContext(root, options) {
  const context = {
    root,
    nodeTransforms: options.nodeTransforms || [],
  };

  return context;
}

function traverseNode(node, context) {
  const nodeTransforms = context.nodeTransforms;
  for (let i = 0; i < nodeTransforms.length; i++) {
    const nodeTransform = nodeTransforms[i];
    nodeTransform(node);
  }

  traverseChildren(node, context);
}

function traverseChildren(node, context) {
  const children = node.children;
  if (children) {
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      traverseNode(node, context);
    }
  }
}
