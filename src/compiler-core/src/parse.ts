import { NodeTypes } from "./ast";

/*
 * @Author: ReinerLau lk850593913@gmail.com
 * @Date: 2022-11-13 20:40:42
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-11-17 21:51:45
 * @FilePath: \mini-vue\src\compiler-core\src\parse.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const enum TagTypes {
  START,
  END,
}

export function baseParse(content: string) {
  const context = createParseContext(content);

  return createRoot(parseChildren(context, []));
}

function parseChildren(context, ancestors) {
  const nodes: any = [];

  while (!isEnd(context, ancestors)) {
    let node;
    const s = context.source;

    if (s.startsWith("{{")) {
      node = parseInterpolation(context);
    } else if (s[0] === "<") {
      if (/[a-z]/i.test(s[1])) {
        node = parseElement(context, ancestors);
      }
    }

    if (!node) {
      node = parseText(context);
    }

    nodes.push(node);
  }

  return nodes;
}

function isEnd(context, ancestors) {
  const s = context.source;
  if (s.startsWith("</")) {
    for (let i = ancestors.length - 1; i >= 0; i--) {
      const tag = ancestors[i];
      if (startsWithEndTagOpen(s, tag)) {
        return true;
      }
    }
  }
  return !s;
}

function parseText(context) {
  const endTokens = ["<", "{{"];
  let endIndex = context.source.length;
  for (let i = 0; i < endTokens.length; i++) {
    const endToken = endTokens[i];
    const index = context.source.indexOf(endToken);
    if (index !== -1 && endIndex > index) {
      endIndex = index;
    }
  }
  const content = parseTextData(context, endIndex);

  advanceBy(context, content.length);

  return {
    type: NodeTypes.TEXT,
    content,
  };
}

function parseTextData(context: any, length: any) {
  return context.source.slice(0, length);
}

function parseElement(context, ancestors) {
  const element: any = parseTag(context, TagTypes.START);
  ancestors.push(element.tag);
  element.children = parseChildren(context, ancestors);
  ancestors.pop();

  if (startsWithEndTagOpen(context.source, element.tag)) {
    parseTag(context, TagTypes.END);
  } else {
    throw new Error(`缺少结束标签:${element.tag}`);
  }

  return element;
}

function startsWithEndTagOpen(source, tag) {
  return (
    source.startsWith("</") &&
    source.slice(2, 2 + tag.length).toLowerCase() === tag.toLowerCase()
  );
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
