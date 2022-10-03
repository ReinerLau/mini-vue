/*
 * @Author: reiner850593913 lk850593913@gmail.com
 * @Date: 2022-10-02 08:38:24
 * @LastEditors: reiner850593913 lk850593913@gmail.com
 * @LastEditTime: 2022-10-03 18:31:30
 * @FilePath: \mini-vue\src\reactivity\effect.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
class ReactiveEffect {
  private _fn: any;
  public scheduler: Function | undefined;

  constructor(fn, scheduler?) {
    this._fn = fn;
    this.scheduler = scheduler;
  }

  run() {
    activeEffect = this;
    return this._fn();
  }
}

// 正在执行的依赖实例
let activeEffect;
/**
 * @description: 初始化一个effect实例并执行一次传进来的方法
 * @param {*} fn 依赖的方法
 * @return {*}
 */
type effectOptions = {
  scheduler?: Function;
};
export function effect(fn, options: effectOptions = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler);
  _effect.run();

  return _effect.run.bind(_effect);
}

// 收集不同响应式对象对应的依赖容器
const targetMap = new Map();
/**
 * @description: 收集依赖，以key为基准
 * @param {*} target 要操作的对象
 * @param {*} key 要读取的属性
 * @return {*}
 */
export function track(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }
  dep.add(activeEffect);
}

/**
 * @description: 触发依赖
 * @param {*} target 要操作的对象
 * @param {*} key 要设置的属性
 * @return {*}
 */
export function trigger(target, key) {
  let depsMap = targetMap.get(target);
  let dep = depsMap.get(key);

  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}
