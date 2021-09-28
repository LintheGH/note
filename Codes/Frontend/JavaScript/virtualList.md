---
title: 虚拟列表
tags: [JavaScript]
date: 2021/06/07 09:58:17
categories: 
- Code
- JavaScript
---

对于不能使用分页方式来加载的长列表，同时渲染大量DOM会导致客户端卡顿。
虚拟列表，即对可视区域进行渲染，非可见区域隐藏或部分渲染，提高性能表现的的一种实现。属于按需加载的范畴。

[【前端进阶】高性能渲染十万条数据（虚拟列表）](https://juejin.cn/post/6844903982742110216)

<!--more-->

#### 固定高度的虚拟列表实现

- 虚拟列表的实现，既是对于固定可视区域高度内的数据进行渲染。关键在滚动后列表便宜量和数据量的关系，通过这个便宜量计算数据的起始索引和结束索引（对于快速上拉下拉白屏的问题，需要适当扩大渲染数据量），然后对渲染的真实列表进行对应滚动便宜。

  ```javascript tsx
  import React, {useEffect, useRef, useState, useMemo} from 'react'
  import  './index.css'
  
  export default function Index({
    itemHeight=50, // 列表每项的高度
    bufferAbove=1, // 上缓冲比例
    bufferBellow=1, // 下缓冲比例
  }) {
    const [data, setData] = useState<any[]>([]);
    const [listHeight, setListHeight] = useState<number>(0);
    const [scrollTop, setScrollTop] = useState<number>(0);
    const [start, setStart] = useState<number>(0);
    const [end, setEnd] = useState<number>(0);
  
    const container = useRef<HTMLDivElement>(null)
    const listContainer = useRef<HTMLDivElement>(null)
  
    const onScroll = () => {
      scrollSet()
    }
  
    const generateData = (): Array<any> => {
      return new Array(100000).fill({}).map((item, index) => ({name: 'list-item', id: index + index + ''}))
    }
  
    const scrollSet = () => {
      const scrollTop = container.current?.scrollTop || 0,
      listHeight = listContainer.current?.offsetHeight || 0,
      start = Math.floor(scrollTop/itemHeight),
      end = start + Math.ceil(listHeight / itemHeight);
  
      setScrollTop(scrollTop)
      setStart(start)
      setEnd(end)
    }
  
    const init = () => {
      const list = generateData(),
            totalListHeight = list.length * itemHeight;
  
      setListHeight(totalListHeight)
      setData(list)
      scrollSet()
    }
  
    useEffect(() => {
      init()
      return () => {
        
      };
    }, []);
  
    // 根据起始索引、结束索引选择真实渲染的数据量，对于白屏的问题需要适当扩大数据量
    const listData = useMemo(() => {
      let visibleCount = Math.ceil((listContainer.current?.offsetHeight || 0) / itemHeight)
      let aboveCount = Math.min(start, bufferAbove * visibleCount)
      let bellowCount = Math.min(end, bufferBellow*visibleCount)
      let start_ = start - aboveCount
      let end_ = end + bellowCount
      
      return data.slice(start_, end_)
    }, [start, end, data])
  
    // 由于滚动后可视区域也发生移动，因此位置需要移动相应的位置
    const transForm = (): string => {
      return `translate(0, ${scrollTop - (scrollTop % itemHeight)}px)`
    }
  
    return (
      <div ref={container} onScroll={onScroll} className={'infinite-list-container'}>
        <div className={'infinite-list-phantom'} style={{height: listHeight + 'px'}}></div>
        <div className={'infinite-list'} ref={listContainer} style={{transform: transForm()}}>
          {
            listData.map((item, index) => {
              return <div className={'infinite-list-item'} key={item.id} style={{height: itemHeight + 'px', lineHeight: itemHeight+'px'}}>{item.id}{item.name}</div>
            })
          }
        </div>
      </div>
    )
  }
  
  ```

  - 问题
    - 列表项不固定高度的实现
    - 由于可视区域根据偏移量需要进行适当的移动，故在列表项样式不同的情况下，会感觉到明显的回滚现象。
