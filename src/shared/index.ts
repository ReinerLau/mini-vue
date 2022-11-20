/*
 * @Author: reiner850593913 lk850593913@gmail.com
 * @Date: 2022-10-04 07:32:34
 * @LastEditors: ReinerLau lk850593913@gmail.com
 * @LastEditTime: 2022-11-20 15:01:18
 * @FilePath: \mini-vue\src\shared\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const extend = Object.assign;

export function isObject(val) {
  return val !== null && typeof val === "object";
}

export function isString(val) {
  return typeof val === "string";
}

export function hasChange(oldValue, newValue) {
  return !Object.is(oldValue, newValue);
}

export const hasOwn = (val, key) =>
  Object.prototype.hasOwnProperty.call(val, key);

export const camelize = (str) => {
  return str.replace(/-(\w)/, (_, c) => {
    return c ? c.toUpperCase() : "";
  });
};

const captilize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const toHandlerKey = (str) => {
  return str ? "on" + captilize(str) : "";
};

export const EMPTY_OBJECT = {};
