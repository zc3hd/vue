'use strict';


// 所有的计划
var plans_data = [
  // 
  // ======================================Vue1.0
  {
    name: "vue-1",
    date: '2018-09-12',
    info: `
    DMOE:demo 1-4/1-1
    1、简单的指令
    2、事件对象$event、阻止冒泡 @click.stop = "_show()" 、:_key = 'key';
    3、生命周期 ready() 
       原型方法 VUE.directive()自定义指令就是DOM操作  
       vm.$mount('#app')  
       vm.$watch('a',function (argument) {})


    4、动画：不同的状态，就是该DOM样式名称的不同的值么。这个样式本是个string，也是就是一个数据
    5、子组件的初始化，注册组件。Vue.extend();
    
    6. 组件选项卡 <component :is='table_name'></component>  table_name变量为组件名称
       


    7. f-->s 初始化s组件，props接受属性字段。在子组件的使用中，作为属性进行绑定f的变量 【随动】
    8. f<--s 初始化s组件，在z的组件的交互中、或者ready() 中定义 发射事件，在子组件的使用中，相当于
       子组件 发生该事件，f组件用自己定义的事件进行接受数据。【不会动，只能在再次发射】
    `,
  },

  // 
  {
    name: "vue-2",
    date: '2018-09-14',
    info: `
    ****************************************************
    DMOE: demo-5 | webpack/demo-6

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


    ****************************************************
    DMOE: demo-5 | webpack/demo-7

    1、demo-5 基础版的改版 路由视图组件App 这样的写法
    2. webpack vue-router的用法 和上面一样。
      .vue 文件是vue-loader编译的。无需 import Vue from 'vue';
    `,
  },


  // 
  {
    name: "vue-3",
    date: '2018-09-18',
    info: `
    ****************************************************
    DMOE: webpack/demo-8 | demo-9

    demo-8:
    1、vue-cli的webpack-simple 初始化,有export可以导入并被一起打包，
       没有export就直接 引入index里就可以了。
       vue init webpack#1.0 .
    

    demo-9:
    2、Vue2.0 

       1.template需要根DOM节点
       2.{...}直接对象形式初始化组件，代替1.0-->Vue.extend({...})
       
       3.生命周期 beforeCreate created beforeMount mounted ..
       
       4.v-for='(ele,index) in arr'

       5.Vue.filter('filter_name',function (a,b,c) {
           传入前面的值
         })
         {{msg | filter_name(1,2)}}

       6.父子之间的通信：废弃同步sync :msg.sync = 'msg'
         方案就是父给子传递Object ，传的是地址，改变属性就同步改变。

       7.组件之间的通信 单一事件管理组件通信
       var ev = new Vue();

       cp_1:
       send(){
        var me = this;
        ev.$emit('send_ev',me.msg);
       }

       cp_2:
       mounted(){
        var me = this;
        ev.$on('send_ev',function (msg) {
          me.msg = msg;
        })
       }
    `,
  },

  // 
  {
    name: "vue-4",
    date: '2018-09-21',
    info: `
    ****************************************************
    DMOE: demo-10 | webpack/demo-11 

    demo-10:
    1、vue2.0-router的在HTML中使用:
       视图：
       <router-link to ='/nav_1'>nav_1</router-link>
       <router-view></router-view>

       配置：
       var routes = [
        {path:"/nav_1",component:"nav_1"},
       ];
       var router = new VueRouter({
        routes:routes
       });

       开起
       new vue({
        el:"#app",
        router:router
       })
       ------------------------------------------------
       视图也可以放在组件内部，注意根节点

       开启
       new vue({
        el:"#app",
        router:router，
        render:h=>h(view_cpt);
       })

    webpack/demo-11：
    1、vue2.0-router的在webpack中使用:
      npm install vue-router@2.0.1 --save

      import VueRouter form 'vue-router';
      vue.use(VueRouter);

      var router = new VueRouter({
        routes:routes
      });

      new vue({
        el:"#app",
        render:h=>h(App),
        router,
      })
    `,
  },











  // ======================================En
  {
    name: "list-5",
    date: '2018-09-11',
    info: `
    `,
  },
  // 
  {
    name: "list-1",
    date: '2018-09-12',
    info: `
    `,
  },
  // 
  {
    name: "list-6",
    date: '2018-09-18',
    info: `
    `,
  },


];
