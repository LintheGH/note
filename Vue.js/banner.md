---
title: 基于vue的轮播组件
tags: framework
notebook: framework
---
```
/**
 * 轮播图组件说明
 * @author dengzl
 * @param [prop: String] [图片路径字段]
 * @param [autoplay：Boolean] [是否自动播放]
 * @param [interval: Number] [时间间隔]
 * @param [pagination: Boolean] [分页]
 * @param [imgs: Object] [对象数组]
 * @param [height: String] [轮播图高度]
 * @param [width: String] [轮播图宽度]
 * @param [imgWidth: String] [图片宽度]
 * @param [imgHeight: String] [图片高度]
 * @param [arrow: Boolean] [是否显示箭头]
 */
<template>
  <div class="carousel" v-if="!!imgs.length">
    <div class="carousel-wrap" :style="`height:${_height};width: ${_width}`">
      <div class="img-list" :style="`width:${_listWidth};height: ${_listHeight}`">
        <div
          class="img-wrap"
          v-for="(item, index) in showImg"
          :key="index"
          :style="`width: ${_imgWidth};height: ${_imgHeight};${item.position}`"
          @mouseenter="clearAutoplay" @mouseleave="resetAutoplay"
        > 
          <img :src="item[prop]" alt>
        </div>
        <div class="mask" style="position:absolute;left:0;top:0" @mouseenter="clearAutoplay" @mouseleave="resetAutoplay">
          <div class="arrow-left arrrow" @click="toRight"></div>
        </div>
        <div class="mask" style="position:absolute;right:0;top:0" @mouseenter="clearAutoplay" @mouseleave="resetAutoplay">
          <div class="arrow-right arrrow" @click="toLeft"></div>
        </div>
      </div>
    </div>
    <div class="pagination" v-if="arrow">
      <span
        v-for="(item, index) in paginations"
        :key="index" :class="{'current-pagination': currentIndex == item}"
        @click="paginationChange(item)"
        @mouseenter="clearAutoplay" @mouseleave="resetAutoplay"
      >
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "carousel",
  props: {
    prop: {
      type: String,
      require: true
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    },
    pagination: {
      type: Boolean,
      default: true
    },
    imgs: {
      type: Array,
      default: []
    },
    height: {
      type: String,
      default: "304"
    },
    width: {
      type: String,
      default: "100%"
    },
    imgWidth: {
      type: String,
      default: "542"
    },
    imgHeight: {
      type: String,
      default: "304px"
    },
    arrow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      IMG: [],
      showImg: [],
      _width: "",
      _height: "",
      _imgWidth: "",
      _imgHeight: "",
      _listWidth: "",
      _listHeight: "",
      changing: false,
      currentIndex: 0,
      paginations: [],
      timeout: 1,
      _time: 1,
      test: ''
    };
  },
  watch: {
    'imgs': {
      handler(val, oldVal) {
        if (!!val) {
          let scale = 0.83
          this.showImg = this.changePosition(val, scale)
          this.IMG = this.changePosition(val, scale).map((item, index) => {
            item._index = index
            return item
          })
          val.forEach((item, index) => {
            this.paginations.push(index)
          })
        }
      },
      deep: true,
      immediate: true
    },
    
    'IMG': {
      handler(val, oldVal) {
        if(!!val) {
          let scale = 0.83
          this.changePosition(val, scale)
        }
      },
      deep: true
    },

    height: {
      handler(val, oldVal) {
        if(!!val) {
          let h = val.replace(/[^\d]/g, "");
          if (h.indexOf("px") == -1) h = h + "px";
          this._height = h;
        }
      },
      deep: true,
      immediate: true
    },
    width: {
      handler(val, oldVal) {
        if(!!val) {
          let w = val;
          if (w.indexOf("%") != -1) {
            this._width = w;
          } else if (w.indexOf("px") == -1) {
            let w = w.replace(/[^\d]/g, "");
            this._width = w + "px";
          }
        }
      },
      deep: true,
      immediate: true
    },
    imgWidth: {
      handler(val, oldVal) {
        if(!!val) {
          let iw = val.replace(/[^\d]/g, "");
          this._listWidth = `${parseFloat(iw) * this.imgs.length}px`;
          if (iw.indexOf("px") == -1) this._imgWidth = `${iw}px`;
          else this._imgWidth = iw;
        }
      },
      deep: true,
      immediate: true
    },
    imgHeight: {
      handler(val, oldVal) {
        if(!!val) {
          let ih = val.replace(/[^\d]/g, "");
          this._listHeight = `${parseFloat(ih)}px`;
          if (ih.indexOf("px") == -1) this._imgHeight = `${ih}px`;
          else this._imgHeight = ih;
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    // console.log(this.IMG);
    this.test = this.showImg[0]
  },
  mounted() {
    if(this.autoplay) this._autoplay()
  },
  methods: {

    _autoplay() {
      let vm = this

      let time = () => {
        vm.toLeft()
        vm.timeout = setTimeout(time,vm.interval)
      }
      
      vm._time = setTimeout(() => {
        time()
        clearTimeout(vm._time)
        vm._time = null
      },vm.interval)
    },

    clearAutoplay() {
      clearTimeout(this.timeout)
      clearTimeout(this._time)
    },

    resetAutoplay() {
      this._autoplay()
    },

    changePosition(val,scale) {
      let position,target
      target = val.map((item, index) => {
        if(index == 0) {
          position = `left:50%;transform: translateX(-50%) scale(1);z-index: 3`
        } else if (index == 1) {
          position = `right: 0;transform: translateX(0) scale(${scale});z-index: 0`
        } else if (index == (val.length - 2)) {
          position = `left:-100%;transform: translateX(0) scale(${scale});z-index: 0`
        }else if (index == (val.length - 1)) {
          position = `left:0;transform: translateX(0) scale(${scale});z-index: 0`
        }  else {
          position = `left: 100%;transform: translateX(-50%) scale(${scale});z-index: -1`
        }
        item.position = position
        return item
      })
      return target
    },

    changeIndex(arr, left=true, idx=0, toIdx) {
      if(!!this.changing) return;
      this.changing = true
      if(toIdx != undefined) {
        let _arr = arr.slice(0,toIdx)
        arr.splice(0,toIdx)
        for(let i=0;i<_arr.length;i++) {
          arr.push(_arr[i])
        }
      } else if(left) {
        let copy = arr[idx]
        arr.splice(idx,1)
        arr.push(copy)
      } else {
        let copy = arr[arr.length-1]
        arr.pop()
        arr.unshift(copy)
      }
      setTimeout(()=> {
        this.changing = false
      }, 400)
      this.currentIndex = arr[0]._index
      return arr
    },

    paginationChange(index) {
      let list = this.IMG,_index
      for(let i=0;i<list.length;i++) {
        if(list[i]._index == index) {
          _index = i
          break
        }
      }
      this.changeIndex(this.IMG, true, 0, _index)
    },

    toLeft() {
      this.changeIndex(this.IMG)
    },

    toRight() {
      this.changeIndex(this.IMG, false)
    }
  }
};
</script>
<style lang="less">
.carousel {
  .carousel-wrap {
    overflow: hidden;
    position: relative;
    .img-list {
      width: 100%;
      height: 100%;
      .mask {
        background-color: rgba(255,255,255, .24);
        transition: all .2s;
        z-index: 1;
        width: 50%;height: 100%;
        .arrrow {
          transition: all .4s ease-in-out;
          cursor: pointer;
        }
        &:hover {
          background-color: rgba(255,255,255,0)
        }
        &:hover .arrrow {
          display: block;
          background: rgba(0,0,0,.24);
        }
        &:hover .arrow-left {
          left: 0;
        }
        &:hover .arrow-right {
          right: 0;
        }
        .arrow-left {
          display: none;
          background: rgba(0,0,0,0);
          width: 50px;height: 50px;
          border-radius:50%;
          position: absolute;
          left: 50px;
          top: 50%;
          transform: translateY(-50%);
          &:before {
            content: '';
            display: inline-block;
            border: 5px solid transparent;
            border-right-color: rgba(255,255,255,1);
            border-bottom-color: rgba(255,255,255,1);
            transform: rotateZ(135deg) translate(-50%, -50%);
            position: absolute;
            left: 33%;top:42%;
          }
          // &:after {
          //   content: '';
          //   display: inline-block;
          //   border: 5px solid transparent;
          //   border-right-color: rgba(0,0,0,.24);
          //   border-bottom-color: rgba(0,0,0,.24);
          //   transform: rotateZ(135deg) translate(-50%, -50%);
          //   position: absolute;
          //   left: 36%;top:42%;
          //   margin-right: -2px;
          // }
        }
        .arrow-right {
          display: none;
          background: rgba(0,0,0,0);
          width: 50px;height: 50px;
          border-radius:50%;
          position: absolute;
          right: 50px;
          top: 50%;
          transform: translateY(-50%);
          &:before {
            content: '';
            display: inline-block;
            border: 5px solid transparent;
            border-right-color: rgba(255,255,255,1);
            border-bottom-color: rgba(255,255,255,1);
            transform: rotateZ(-45deg) translate(-50%, -50%);
            position: absolute;
            right: 33%;top:42%;
          }
          &:after {
            // content: '';
            // display: inline-block;
            // border: 5px solid transparent;
            // border-right-color: #ddd;
            // border-bottom-color: #ddd;
            // transform: rotateZ(-45deg) translate(-50%, -50%);
            // position: absolute;
            // left: 36%;top:42%;
            // margin-left: -2px;
          }
        }
      }
      .img-wrap {
        position: absolute;
        top:0;
        left: 50%;
        z-index: 0;
        transform-origin: 0 50%;
        transition: all .4s ease-in-out,-webkit-transform .4s ease-in-out;
        &.front {
          z-index: 2;
        }
        img {
          width: 100%;
          height: 100%;
          position: absolute;
          left:0;top:0;
          transition: all .4s ease-in-out,-webkit-transform .4s ease-in-out;
        }
      }
      .arrow {
        z-index: 3;
        span {
          display: inline-block;
          width: 50px;
          border-radius: 50%;
        }
      }
    }
  }
  .pagination {
    text-align: center;
    padding: 10px 0;
    span {
      display: inline-block;
      width: 5px;
      height: 5px;
      border: 1px solid #d2d2d2;
      border-radius: 50%;
      margin-right: 5px;
      cursor: pointer;
      transition: all 0.2s;
      vertical-align: middle;
      transform-origin: 50% 50%;
      &.current-pagination {
        width: 14px;
        height: 3px;
        background: rgba(255, 215, 0, 1);
        border-color:rgba(255, 215, 0, 1) ;
        border-radius: 3px;
      }
    }
  }
}
</style>

```