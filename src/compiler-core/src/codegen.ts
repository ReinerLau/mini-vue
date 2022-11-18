/*
 * @Author: ReinerLau lk850593913@gmail.com
 * @Date: 2022-11-18 22:11:37
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-11-18 23:06:09
 * @FilePath: \mini-vue\src\compiler-core\src\codegen.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function generate(ast) {
  const context = createCodegenContext();
  const { push } = context;
  push("return ");
  const functionName = "render";
  const args = ["_ctx", "_cache"];
  const signature = args.join(", ");
  push(`function ${functionName}(${signature}){`);
  push("return ");

  genCode(ast.codegenNode, context);
  push("}");

  return {
    code: context.code,
  };
}

function createCodegenContext() {
  const context = {
    code: "",
    push(source) {
      context.code += source;
    },
  };

  return context;
}

function genCode(node, context) {
  const { push } = context;
  push(`"${node.content}"`);
}
