'use strict';


// 所有的计划
var plans_data = [
  // 
  // ======================================Vue1.0
  {
    name: "vue-1",
    date: '2018-09-11',
    info: `
    DMOE:demo1-3
    1、简单的指令
    2、事件对象$event、阻止冒泡 @click.stop = "_show()" 、:_key = 'key';
    3、生命周期 ready() 
       原型方法 VUE.directive()自定义指令就是DOM操作  
       vm.$mount('#app')  
       vm.$watch('a',function (argument) {})
    `,
  },
  // 
  {
    name: "vue-2",
    date: '2018-09-12',
    info: `
    DMOE:demo 4/1-1
    1、动画：不同的状态，就是该DOM样式名称的不同的值么。这个样式就是一个数据
    2、子组件的初始化，注册组件。
    3. 组件选项卡 <component :is='table_name'></component>  table_name变量为组件名称
    4. f-->s 初始化s组件，props接受属性字段。在子组件的使用中，作为属性进行绑定f的变量 【随动】
    5. f<--s 初始化s组件，在z的组件的交互中、或者ready() 中定义 发射事件，在子组件的使用中，相当于
       子组件 发生该事件，f组件用发生的事件进行数据。【不会动，只能在再次发射】
    `,
  },

  // 
  {
    name: "vue-3",
    date: '2018-09-13',
    info: `

    DMOE: demo-5 | demo-vue-webpack/demo-6

    1、slot 感觉没有什么用，就是一个槽位占位
    2、router初始化过程 
        HTML：v-link指定name-->path，router-view的窗口展  
        JS：path-->component  初始化一个组件容器 定义各个路由下的组件 组件和路由进行关联 定义路由的转跳 开启路由。
    3、个人感觉路由嵌套没有什么用，真实的场景中用到的多层级菜单都是一个层级的路由。

    4.webpack vue-loader .vue
        npm install 一定的版本号
        入口文件是main.js body作为根组件。APP.vue注入了，原因是要把所有的东西都写在 .vue的组件里。
        webpack 编译的也是JS文件。里面有.vue文件
        
        需要HTML模本 是我们已经设置好的index.html
    `,
  },


    // 
  {
    name: "vue-4",
    date: '2018-09-14',
    info: `

    DMOE: demo-5 | demo-vue-webpack/demo-7

    1、demo-5 基础版的改版 路由视图组件App 这样的写法
    2. webpack vue-router的用法 和上面一样。
      .vue 文件是vue-loader编译的。无需 import Vue from 'vue';

    `,
  },


  // ======================================En
  {
    name: "list-5",
    date: '2018-09-11',
    info: `
    `,
  },

  {
    name: "list-1",
    date: '2018-09-12',
    info: `
    `,
  },


];
