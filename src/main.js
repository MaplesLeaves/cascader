/*
 * @Description: 
 * @Version: 2.0
 * @Autor: mapleLeaves
 * @Date: 2020-06-11 12:57:52
 * @LastEditors: mapleleaves
 * @LastEditTime: 2020-06-11 13:03:18
 * @weChat: 893774884
 */
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
console.log(111)

new Vue({
  render: h => h(App),
}).$mount('#app')
