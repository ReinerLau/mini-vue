import { NodeTypes } from "./ast";

/*
 * @Author: ReinerLau lk850593913@gmail.com
 * @Date: 2022-11-13 20:40:42
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-11-14 22:03:33
 * @FilePath: \mini-vue\src\compiler-core\src\parse.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const enum TagTypes {
  START,
  END,
}

export function baseParse(content: string) {
  const context = createParseContext(content);

  return createRoot(parseChildren(context));
}

function parseChildren(context) {
  const nodes: any = [];
  let node;
  const s = context.source;
  if (s.startsWith("{{")) {
    node = parseInterpolation(context);
  } else if (s[0] === "<") {
    if (/[a-z]/i.test(s[1])) {
      node = parseElement(context);
    }
  }

  if (!node) {
    node = parseText(context);
  }

  nodes.push(node);
  return nodes;
}

function parseText(context) {
  const content = parseTextData(context, context.source.length);

  advanceBy(context, content.length);

  return {
    type: NodeTypes.TEXT,
    content,
  };
}

function parseTextData(context: any, length: any) {
  return context.source.slice(0, length);
}

function parseElement(context) {
  const element = parseTag(context, TagTypes.START);
  parseTag(context, TagTypes.END);

  return element;
}

function parseTag(context: any, type: TagTypes) {
  const match: any = /^<\/?([a-z]*)/i.exec(context.source);
  const tag = match[1];

  advanceBy(context, match[0].length);
  advanceBy(context, 1);

  if (type === TagTypes.END) return;

  return {
    type: NodeTypes.ELEMENT,
    tag,
  };
}

function parseInterpolation(context) {
  const openDelimiter = "{{";
  const closeDelimiter = "}}";

  const closeIndex = context.source.indexOf(
    closeDelimiter,
    openDelimiter.length
  );
  advanceBy(context, openDelimiter.length);
  const rawContentLength = closeIndex - openDelimiter.length;
  const rawContent = parseTextData(context, rawContentLength);
  const content = rawContent.trim();
  advanceBy(context, rawContentLength + closeDelimiter.length);

  return {
    type: NodeTypes.INTERPOLATION,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      content,
    },
  };
}

function advanceBy(context: any, length: number) {
  context.source = context.source.slice(length);
}

function createRoot(children) {
  return {
    children,
  };
}

function createParseContext(content) {
  return {
    source: content,
  };
}
