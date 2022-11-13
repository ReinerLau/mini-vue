/*
 * @Author: ReinerLau lk850593913@gmail.com
 * @Date: 2022-11-13 13:59:29
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-11-13 14:19:13
 * @FilePath: \mini-vue\src\runtime-core\componentUpdateUtils.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function shouldUpdateComponent(prevVNode, nextVNode) {
  const { props: prevProps } = prevVNode;
  const { props: nextProps } = nextVNode;
  for (const key in nextProps) {
    if (nextProps[key] !== prevProps[key]) {
      return true;
    }
  }
  return false;
}
