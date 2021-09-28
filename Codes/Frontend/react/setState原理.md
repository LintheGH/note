---
title: react setState同步异步
date: 2021/6/2 11:03
categories: 
- Code
- React
tags: 
- React
notebook: React
---

react 的 `setState` 在不同的情况下的同步、异步，以及为什么会这么表现。

<!--more-->



先说结论

- `setState`只在合成事件和钩子函数中是“异步”的。在原生事件和`setTimeout`中是同步的
- `setState`的异步并不是内部异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。
- `setState的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和`setTimeout` 中不会批量更新，在“异步”中如果对同一个值进行多次 `setState` ，` setState` 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 `setState` 多个不同的值，在更新时会对其进行合并批量更新。

