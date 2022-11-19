import { NodeTypes } from "./ast";
import { helperMapName, TO_DISPLAY_STRING } from "./runtimeHelpers";

/*
 * @Author: ReinerLau lk850593913@gmail.com
 * @Date: 2022-11-18 22:11:37
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-11-19 12:01:20
 * @FilePath: \mini-vue\src\compiler-core\src\codegen.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function generate(ast) {
  const context = createCodegenContext();
  const { push } = context;
  genFunctionPreamble(ast, context);
  const functionName = "render";
  const args = ["_ctx", "_cache"];
  const signature = args.join(", ");
  push(`function ${functionName}(${signature}){`);
  push("return ");

  genNode(ast.codegenNode, context);
  push("}");

  return {
    code: context.code,
  };
}

function genFunctionPreamble(ast, context) {
  const { push } = context;
  const vueBinging = "Vue";
  const aliasHelpers = (s) => `${helperMapName[s]}: _${helperMapName[s]}`;
  if (ast.helpers.length > 0) {
    push(`const { ${ast.helpers.map(aliasHelpers)} } = ${vueBinging}`);
  }
  push("\n");
  push("return ");
}

function createCodegenContext() {
  const context = {
    code: "",
    push(source) {
      context.code += source;
    },
    helper(key) {
      return `_${helperMapName[key]}`;
    },
  };

  return context;
}

function genNode(node, context) {
  switch (node.type) {
    case NodeTypes.TEXT:
      genText(node, context);
      break;
    case NodeTypes.INTERPOLATION:
      genInterpolation(node, context);
      break;
    case NodeTypes.SIMPLE_EXPRESSION:
      genExpression(node, context);
      break;
    default:
      break;
  }
}
function genText(node: any, context: any) {
  const { push } = context;
  push(`"${node.content}"`);
}

function genInterpolation(node, context) {
  const { push, helper } = context;
  push(`${helper(TO_DISPLAY_STRING)}(`);
  genNode(node.content, context);
  push(`)`);
}

function genExpression(node, context) {
  const { push } = context;
  push(`${node.content}`);
}
