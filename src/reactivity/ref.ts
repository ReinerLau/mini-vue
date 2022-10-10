import { hasChange, isObject } from "../shared";
import { trackEffect, triggerEffects, isTracking } from "./effect";
import { reactive } from "./reactive";

/*
 * @Author: reiner850593913 lk850593913@gmail.com
 * @Date: 2022-10-09 22:28:56
 * @LastEditors: reiner850593913 lk850593913@gmail.com
 * @LastEditTime: 2022-10-10 20:35:24
 * @FilePath: \mini-vue\src\reactivity\ref.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
class RefImpl {
  private _value: any;
  private dep = new Set();
  private _rawValue: any;
  constructor(value) {
    this._rawValue = value;
    this._value = convert(value);
  }

  get value() {
    trackRefValue(this.dep);
    return this._value;
  }

  set value(newValue) {
    if (hasChange(this._rawValue, newValue)) {
      this._rawValue = newValue;
      this._value = convert(newValue);
      triggerEffects(this.dep);
    }
  }
}

export function ref(value) {
  return new RefImpl(value);
}

function trackRefValue(dep) {
  if (isTracking()) {
    trackEffect(dep);
  }
}

function convert(value) {
  return isObject(value) ? reactive(value) : value;
}
