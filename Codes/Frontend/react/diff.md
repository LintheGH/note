---
title: react diff
date: 2021/5/10 17:21
categories: 
- Code
- React
tags: 
- React
notebook: React
---
现代前端框架最基本的最广泛应用的就是`virtualDOM`和`Diff`算法。react的diff算法分三种层面做了优化`tree diff`、`component diff`、`element diff`。

本文实现对element diff的超简实现。

<!--more-->

首先react对tree的对比处理是，tree中同层级的节点才会进行比较，不同级别则直接进行删除、添加

然后对形同层级中的组件进行对比处理。

- 如果是同一类型组件，继续tree diff的方法遍历子节点
- 如果不是，则直接重新渲染组件

最后对于相同节点的比较element diff。对于同级别diff中，有相同节点而位置不同对情况，react引入了key作为优化手段。详细可以[看这里](https://zhuanlan.zhihu.com/p/20346379)



### 实现一个超简版的react diff

- 创建virtualDOM，以及实现virtualDOM渲染DOM

  ```javascript element.js
  class Element {
    constructor(type, props, children) {
      this.type = type
      this.props = props
      this.children = children
    }
  }
  
  function createElement(type, props, children) {
    return new Element(type, props, children);
  }
  
  function render(domObject) {
    const el = document.createElement(domObjet.type)
    
    for(let key in domObject.props){
      setAttr(el, key, value)
    }
    
    domObject.children.forEach(child => {
      child = child instanceof Element? render(child) : document.createTextNode(child)
      el.appendChild(child)
    })
  }
  
  function setAttr(el, key, value) {
    switch() {
           case 'value':
              if(
                el.tagName.toLowerCase() === 'input' || 
                el.tagName.toLowerCase() === 'textarea'
              ) {
                el.value = value
              } else {
                el.setAttribute(key, value)
              }
           break;
           case 'style':
           		el.style.cssText = value
           break;
           default:
           		el.setAttribute(key, value)
           break;
    }
  }
  
  function renderDOM(el, target) {
    target.appendChild(el)
  }
  
  export {
  	Element,
    createElement,
    setAttr,
    renderDOM
  }
  ```

- 创建virtualDOM以及渲染到页面中

  ```javascript index.js
  import { createElement, render, renderDOM } from 'element.js'
  
  let virtualDom = createElement('ul', {class: 'list'}, [
    createElement('li', {class: 'item'}, ['周杰伦']),
    createElement('li', {class: 'item'}, ['林俊杰']),
    createElement('li', {class: 'item'}, ['王力宏'])
  ]);
  
  let el = render(virtualDom);
  let target = document.getElementById('root');
  renderDOM(el, target)
  ```

  <img src="https://tva1.sinaimg.cn/large/008i3skNgy1gqeastsadvj318s09kjrr.jpg" style="zoom:33%;" />

- 当需要重新渲染如调用了`setState`后，对virtualDOM tree进行diff

  ```javascript diff.js
  function diff(oldTree, newTree) {
    let patches = {}; // 需要打的补丁
    let index = 0; // tree 顶层
    walk(oldTree, newTree, index, patches);
  }
  
  function walk(oldTree, newTree, index, patches) {
    let current = []
    if(!newTree) { // 新树不存在，表示删除了整个节点
      current.push({type: 'REMOVE', index})
    } else if(typeof oldTree === 'string'&& typeof newTree === 'string') { // 字符串节点
      if(oldTree !== newTree) {
        current.push({type: 'TEXT', text: newTree})
      }
    } else if((oldTree&&oldTree.type) === (newTree&&newTree.type)) {// 类型相同，比较属性及子节点
      let attrObj = diffAttr(oldTree.props, newTree.props); // 比较获得需要打补丁的属性
      if(Object.keys(attrObj).length) { // 有属性补丁
        current.push({type: 'ATTR', attr: attrObj})
      }
      diffChildren(oldTree.children, newTree.children, patches)
    } else { // 节点被替换了
       current.push({type: 'REPLACE', newTree})
    }
    patches[index] = current;// 打入补丁
  }
  
  function diffAttr(oldProps, newProps){
    let patch = {}
    for(let key in oldProps) {// 
      if(oldProps[key] !== newProps[key]) { // 旧属性被修改、删除
        patch[key] = newProps[key]
      }
    }
    for(let key in newProps) {// 遍历新属性，看是否有添加新属性
      if(!oldProps.hasOwnProperty(key)) {
        patch[key] = newProps[key]
      }
    }
    return patch;
  };
  
  let num = 1; // 使用全局的索引
  function diffChildren(oldChildren, newChildren, patches) {
    oldChildren.forEach((child, index) => {
      walk(child, newChildren[index], num++, patches) // 层级递增
    })
  };
  
  export default diff
  ```

- 添加一个virtualDOM，对比

  ```javascript index.js
  import diff from './diff.js'
  ...
  let virtualDom2 = createElement('ul', {class: 'list-group'}, [
    createElement('li', {class: 'item active'}, ['七里香']),
    createElement('li', {class: 'item'}, ['一千年以后']),
    createElement('li', {class: 'item'}, ['需要人陪'])
  ]);
  const patches = diff(virtualDom, virtualDom2);
  console.log(patches)
  ```

  <img src="https://tva1.sinaimg.cn/large/008i3skNgy1gqec76h8kmj31qq0iqmxw.jpg" style="zoom:33%;" />

- 打补丁

  ```javascript patch.js
  import { setAttr, render, Element } from './element.js'
  
  let index = 0;
  let allPatches;
  function patch(el, patches) {
    allPatches = {...patches}
    
    walk(el, patches)
  }
  
  function walk(el) {
    const current = allPatches[index++]
   	const childNodes = el.childNodes
    
    childNodes.forEach(child => walk(child))
    
    if(current&&current.length) { // 有补丁
      doPath(el, current)
    }
  }
  
  function doPath(el, patches) {
    patches.forEach(patch => {
      switch(patch.type) {
        case 'REMOVE':
          el.parentNode.removeChild(el);
        break;
        case 'TEXT':
        	el.textContent = patch.text
        break;
        case 'ATTR':
          for(let key in patch.attr) {
            const value = patch.attr[key]
            if(value) {
              setAttr(el, key, value)
            } else {
              el.removeAttribute(key)
            }
          }
        break;
        case 'REPLACE':
        	let newEl = patch.newTree
          newEl = newEl instanceof Element ? render(newEl) : document.createTextNode(newEl)
          el.parentNode.replaceChild(newEl, el)
        break;
        default:
        break;
      }
    })
  }
  
  export default patch
  ```

- 对DOM进行打补丁

  ```javascript index.js
  import patch from './patch.js'
  ...
  
  patch(el, patches);
  ```

  <img src="https://tva1.sinaimg.cn/large/008i3skNgy1gqeib5excxj30zq0ca74r.jpg" style="zoom:33%;" />



至此完成了一个超简单版本对diff。