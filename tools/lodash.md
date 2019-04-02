---
title: `lodash`常用方法介绍
tags: lodash, 去重
notebook: other
---
#### lodash 介绍
    lodash是js集Array/Object/String/Function的Util于一身。

    lodash打包了Array/Object/String/Function里一些Api，好处是连ES6的也打包了，所以让你想在ES5环境下使用诸如Array#reduce#includes#some#every等时可以借lodash来帮忙

##### lodash可以让代码更简短，以下列几个最频繁使用的方法：

- `_.range(10) `
    生成元素为0到9的数组

- `_.times(10, (i)=>console.log(i))`
    循环10次

- `_.uniqueId()`
    生成不同的id，用于元素中的id值再好不过

- `_.startWith` 
    判断字符串是否以xx开头

- `_.endWith` 
    判断字符串是否以xx结尾

- `_.truncat` 
    截取指定长度后加… 用于处理标题过长再好不过

- `_.template` 
    es6有字符串模板的语法，而lodash是es5的替代方案

- `_.assign`
    合并，es6有Object.assign，类似于jQuery.extend

- `_.assignIn` 
    lodash里很多方法带In的都是可枚举原型链上的属性

- `_.defaults` 
    安全合并，即忽略undefined/null的重写

- `_.findKey` 
    根据value的属性值找key

- `_.mapKeys`
    遍历重写key, 相当于.forIn

- `_.mapValues` 
    遍历重写value , 相当于.forIn

- `_.invert` 
    反转映射，快速通过value值找key

- `_.omit` 
    返回移除部分属性的副本，比如提交表单时有些字段不要提交

- `_.pick` 
    与omit相反，提取部分属性的副本，比如只提交某些字段

- `_. clamp`
    确认所给值只在min,max之间

- `_.max` 
    最大

- `_.min`
    最小

- `_.sum`
    求和

- `_.random`
    生成随机数

- `_.round` 
    四舍五入，允许指定精确位数

- `_.isNumber`

- `_.isInterger`

- `_.isFunction`

- `_.isPlainObject`

- `_.isArray`

- `_.isDate`

- `_.isElement`

- `_.isNil` 
    null or undefined

- `_.isEmpty` 
    {} or 空数组

- `_.isEqual` 
    支持对象和数组

- `_.isMatch`
    匹配对象属性值

- `_.cloneDeep` 
    深度复制

- `_.clone` 
    浅复制

- `_.once` 
    只执行一次

- `_.before` 
    最多n-1次

- `_.after` 
    n次后执行

- `_.debounce` 
    忽略频繁执行

- `_.union`
    合并两数组，去重

- `_.uniq`
    去重

- `_.pull(array,element1,element2)` 
    直接在array中移除元素，

- `_.without(array,element1,element2)` 
    得到新array中移除元素

- `_.remove(array, function)` 
    直接在array移除在function返回true的元素

- `_.sameple(array)` 
    随机取1

- `_.samepleSize(array, int)`
    随机取n

- `_.shuffle(array)`
    乱序, jQuery.shuffle

- `_.find(array, function | object)`
    根据function返回值和对象查找1个结果

- `_.filter(array, function | object)` 
    根据function返回值和对象查找多个结果

- `_.groupBy(array, string)` 
    分组，与多合一相反

- `_.keyBy(array, string)`
    分组，类似groupBy, 但只有唯一值

- `_.countBy(array, string)` 
    分组统计

- `_.orderBy(array, array, array)`

- `_.sortBy(array, array)`

- `_.difference(array1,array2)`
    找不同于array2，元素是Object用differenceBy

- `_.xor(array1,array2)` 
    得到非交集，元素是Object用xorBy

- `_.intersection(array1,array2)` 
    得到交集，元素是Object用intersectionBy