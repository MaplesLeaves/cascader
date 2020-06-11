<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: mapleLeaves
 * @Date: 2020-03-07 13:50:22
 * @LastEditors: mapleleaves
 * @LastEditTime: 2020-03-14 23:54:03
 * @weChat: 893774884
 -->
<template>
  <div id="app">
    <button @click='change(iscn = !iscn)'>{{iscn ? 'cn':'us'}} </button>
    <Cascoader :options='list' class="cascoader_all" v-model='value' @change='changeInfo' />
  </div>
</template>
<script>
  import Cascoader from './components/Cascoader.vue'
  import cn from './components/CN.js'
  import us from './components/US.js'
  export default {
    name: 'App',
    data() {
      return {
        list: [],
        value: [],
        CN: [],
        US: [],
        iscn: true
      }
    },
    components: {
      Cascoader
    },
    mounted() {
      this.CN = this.getMessage(cn);
      this.US = this.getMessage(us)
      this.list = this.CN
    },
    methods: {
      getMessage(arrayInfo) {
        let array = arrayInfo.map(item => {
          let value = item.split('|');
          var n = (value[0].split('_')).length - 1;
          return {
            value: value[0],
            num: n,
            label: value[1]
          }
        }, {})
        function getNext(dd, num, list) {
          let data = [];
          for (let index = 0; index < dd.length; index++) {
            if (dd[index].value.indexOf(list.value) !== -1 && num === dd[index].num) {
              let obj = dd[index];
              let temp = getNext(dd, num + 1, dd[index])
              if (temp.length > 0) {
                obj.child = temp
              }
              data.push(obj)
            }
          }
          return data
        }
        function getTree(array, num) {
          let data = [];
          for (let index = 0; index < array.length; index++) {
            if (!array[index].num) {
              let obj = array[index];
              let temp = getNext(array, num + 1, array[index])
              if (temp.length > 0) {
                obj.child = temp
              }
              data.push(obj)
            }
          }
          return data
        }
        return getTree(array, 0)
      },
      change(val) {
        this.list = [];
        this.list = val ? this.CN : this.US;
      },
      changeInfo(val) {
      }
    }
  }
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  ::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  ::-webkit-scrollbar-button,
  scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track,
  scrollbar-track {
    width: 15px;
  }

  ::-webkit-scrollbar-corner,
  scrollbar-corner {
    background-color: transparent;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb,
  scrollbar-thumb {
    width: 7px;
    background-color: #b4babf;
    border-radius: 7px;
  }

  #app {
    button {
      margin-top: 20px;
      padding: 5px 8px;
      margin-left: 100px;
    }

    .cascoader_all {
      margin-left: 100px;

      margin-top: 20px;
      width: 300px;

    }
  }
</style>