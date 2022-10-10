import { extend } from "../shared";

/*
 * @Author: reiner850593913 lk850593913@gmail.com
 * @Date: 2022-10-02 08:38:24
 * @LastEditors: reiner850593913 lk850593913@gmail.com
 * @LastEditTime: 2022-10-10 12:31:57
 * @FilePath: \mini-vue\src\reactivity\effect.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 正在执行的依赖实例
let activeEffect;
let shouldTrack;

class ReactiveEffect {
  private _fn: any;
  deps = [];
  active = true;
  onStop?: () => void;
  scheduler?: Function;

  constructor(fn, scheduler?) {
    this._fn = fn;
    this.scheduler = scheduler;
  }

  run() {
    if (!this.active) {
      // 此时 shouldTrack 为 false 或者 undefined，执行也不会收集依赖
      return this._fn();
    }
    shouldTrack = true;
    activeEffect = this;
    // 此时 shouldTrack 为 true，执行会收集依赖
    const result = this._fn();
    // 记得要初始化全局变量
    shouldTrack = false;
    return result;
  }

  stop() {
    if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}

function cleanupEffect(effect) {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect);
  });
  effect.deps.length = 0;
}

/**
 * @description: 初始化一个effect实例并执行一次传进来的方法
 * @param {*} fn 依赖的方法
 * @return {*}
 */
export function effect(fn, options: any = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler);
  // 方便后续合并各种选项
  extend(_effect, options);

  _effect.run();

  const runner: any = _effect.run.bind(_effect);
  // 存储当前 runner 对应的 effect 实例
  runner._effect = _effect;

  return runner;
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
  if (!isTracking()) return;

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

  trackEffect(dep);
}

export function trackEffect(dep) {
  if (dep.has(activeEffect)) return;

  dep.add(activeEffect);
  // 反向收集当前 effect 被收录其中的依赖集合
  activeEffect.deps.push(dep);
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

  triggerEffects(dep);
}

export function triggerEffects(dep) {
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}

export function stop(runner) {
  runner._effect.stop();
}

export function isTracking() {
  return shouldTrack && activeEffect;
}
