/*
 * @Author: reiner850593913 lk850593913@gmail.com
 * @Date: 2022-10-17 18:51:29
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-11-20 19:48:46
 * @FilePath: \mini-vue\src\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export * from "./runtime-dom";

import { baseCompile } from "./compiler-core/src";
import * as runtimeDom from "./runtime-dom";
import { registerRuntimeCompiler } from "./runtime-dom";

function compileToFunction(template) {
  const { code } = baseCompile(template);
  const render = new Function("Vue", code)(runtimeDom);
  return render;
}

registerRuntimeCompiler(compileToFunction);
