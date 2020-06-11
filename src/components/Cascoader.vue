<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: mapleLeaves
 * @Date: 2020-03-07 13:50:52
 * @LastEditors: mapleleaves
 * @LastEditTime: 2020-03-14 23:45:56
 * @weChat: 893774884
 -->
<template>
  <div class='cascoader' v-click-outside>
    <div class="serch">
      <input type="text" v-model='str' readonly>
      <span class='down right' v-if='!close'></span>
      <span class="close" v-else @click='closeInfo'>x</span>
    </div>
    <div class="listInfo" v-if='list.length && isShow'>
      <ul>
        <li v-for='(item,index) in list' @click='changeClick(item,"nextList")' :key='item.value'
          :class='{right_s: item.child, ok: array[0] && array[0].value === item.value}'>{{item.label}}</li>
      </ul>
      <ul class='next' v-if='nextList.length'>
        <li v-for='(item,index) in nextList' :class='{right_s: item.child}' @click='changeClick(item,"lastList")'
          :key='item.value'>{{item.label}}
        </li>
      </ul>
      <ul class="last" v-if='lastList.length'>
        <li v-for='(item,index) in lastList' @click='changeClick(item)' :key='item.value'>{{item.label}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'cascoader',
    data() {
      return {
        nextList: [],
        lastList: [],
        array: [],
        isShow: false,
        str: '',
        close: false
      }
    },
    props: {
      options: {
        type: Array,
        default() {
          return []
        }
      },
      value: {
        type: Array,
        default() {
          return []
        }
      },
    },
    computed: {
      nowStr: function () {
        return this.value
      },
      list: function () {
        let arr = this.getValue(this.value, this.options, [])
        this.array = arr;
        this.str = this.getStr(arr)
        return this.options
      }
    },
    watch: {
      isShow(val) {
        if (!val) {
          this.nextList = [];
          this.lastList = [];
          this.$emit('change', this.array);
          let array = this.array.map((item) => {
            return item.value
          })

          this.$emit('input', array)
        }
      },
      value: {
        handler(val) {
          setTimeout(() => {
            let arr = this.getValue(val, this.options, [])
            this.array = arr;
            this.str = this.getStr(arr)
          }, 0)
        },
        deep: true,
        immediate: true
      }
    },
    directives: {
      clickOutside: {
        bind(el, binding, vnode) {
          let handler = e => {
            if (el.contains(e.target)) {
              if (!vnode.context.isShow) vnode.context.focus();
            } else {
              if (vnode.context.isShow) vnode.context.blur();
            }
          };
          el.handler = handler;
          document.addEventListener("click", handler);
        },
        unbind(el) {
          document.removeEventListener("click", el.handler);
        }
      }
    },
    methods: {
      getValue(arr, list, array) {
        function getarray(arr, list, array) {
          for (let index = 0; index < arr.length; index++) {
            let temp = {}
            temp = list.find(item => {
              return item.value === arr[index]
            })
            if (temp) {
              array.push(temp);
              temp.child ? getarray(arr, temp.child, array) : ''
            }
          }
          return array
        }
        return getarray(arr, list, array)
      },
      changeClick(value, name) {
        if (!value.num) {
          this.array = [];
          this.nextList = [];
          this.lastList = [];
        }
        if (name && value.child) {
          this[name] = value.child;
        } else {
          this.isShow = false
        }
        this.array[value.num] = {
          value: value.value,
          label: value.label
        }
        if (value.num === 2) {
          this.isShow = false
        }
        this.str = this.getStr(this.array)
      },
      getStr(array) {
        let str = ''
        array.forEach(item => {
          str += `${item.label} / `
        });
        return str.substr(0, str.length - 2);
      },
      focus() {
        this.isShow = true;
        if (this.str.length) {
          this.close = true
        }
      },
      blur() {
        this.close = false
        this.isShow = false;
      },
      closeInfo() {
        this.blur();
        this.str = '';
        this.array = []
        this.$emit('input', [])
      }
    },
    mounted() {
      
    }
  }
</script>
<style lang="scss">
  .cascoader {
    height: 30px;
    position: relative;
    border: 1px solid gray;
    .ok:before{
      position: absolute;
      left: 10px;
      top: calc(50% - 5px);
      content: '';
      width: 5px;
      height: 10px;
      border-color: rgba(117, 200, 43, 1);
      border-style: solid;
      border-width: 0 1px 1px 0;
      transform: rotate(45deg);
    }

    &:hover .right {
      transform: rotate(180deg);
      transition: 1s all;
    }

    .close {
      margin-left: 15px;
      font-size: 12px;
      background: gray;
      display: inline-block;
      color: white;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      text-align: center;
      line-height: 14px;

    }

    .down {
      position: relative;
      display: inline-block;
      width: 100%;
      vertical-align: middle;
    }

    .down:after {
      position: absolute;
      bottom: calc(50%);
      right: 2px;
      content: '';
      width: 5px;
      height: 5px;
      border-right: 1px solid gray;
      border-bottom: 1px solid gray;
      transform: rotate(45deg);
    }

    .right_s {
      position: relative;
      display: inline-block;
      width: 100%;
      vertical-align: middle;
    }

    .right_s:after {
      position: absolute;
      bottom: calc(50% - 5px);
      right: 10px;
      content: '';
      width: 5px;
      height: 5px;
      border-right: 1px solid gray;
      border-bottom: 1px solid gray;
      transform: rotate(-45deg);
    }

    >.serch {
      height: 100%;

      input {
        height: 100%;
        width: calc(100% - 40px);
        border: none;
        outline: none;
        vertical-align: middle;
        box-sizing: border-box;
        padding-left: 5px;
      }

      .right {
        width: 10px;
        height: 10px;
        margin-left: 15px;
        transition: .5s all;
        transform-origin: center center;
      }
    }

    >.listInfo {
      position: absolute;
      top: 30px;
      width: 100%;

      >ul {
        background: white;
        position: absolute;
        box-sizing: border-box;
        left: 0;
        height: 200px;
        width: 100%;
        border: 1px solid gray;
        border-radius: 5px;
        overflow-y: scroll;

        >li {
          padding: 10px 5px;
          padding-left: 30px;
          border-bottom: 1px solid gray;
          box-sizing: border-box;
          position: relative;
          /* width: calc(100% - 5px); */
          &:hover {
            background: #e6f7ff;
          }

          &:nth-last-child(1) {
            border: none;
          }
        }

        >.show {
          background: yellowgreen;
        }
      }

      >.next {
        left: 100%;

      }

      >.last {
        left: 200%;
      }
    }
  }
</style>