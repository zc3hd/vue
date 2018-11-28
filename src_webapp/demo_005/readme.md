# Vue step 5

### router路由   vue-router@0.7.13

* 什么是路由，就是设计浏览器URL地址，现在是#!/nav_1方式在前端通过vue设置。
```
视图在HTML（name-->path）
<div id="box">
  <a v-link="{path:'/home'}">主页</a>
  <a v-link="{path:'/news'}">新闻</a>
  <router-view></router-view>  
</div>
------------------------------------------
var App=Vue.extend(); 根组件

var Home=Vue.extend({template:'<h3>我是主页</h3>'}); 子组件
var News=Vue.extend({template:'<h3>我是新闻</h3>'});
var Detail=Vue.extend({
  template:`
  {{$route.params | json}}
  <br>
  {{$route.path}}
  <br>
  {{$route.query | json}}`
});

var router=new VueRouter(); 准备路由
router.map({ 关联
  'home':{component:Home},
  'news':{component:News},
  '/detail/:id':{component:Detail}
});

router.redirect({ 跳转
  '/':'/home'
});

router.start(App,'#box'); 启动路由
```

* 如果是后台回来的nav数据，那么上面的方式就不能实现遍历，需下面的方式实现：

```
视图在组件内，且进行数据遍历
var App = Vue.extend({
  template: `
    <div class="app_box" id="app_3">
      <ul slot='f_ul'>
        <li v-for='ele in nav'>
          <a href="#" v-link="{path:ele.path}">{{ele.name}}</a>
        </li>
      </ul>
      <div class="item">
        <router-view></router-view>
      </div>
    </div>
  `,
  data() {
    return {
      msg: 'xx',
      nav: [
        { path: '/nav_1', name: 'nav_1' },
        { path: '/nav_1/a', name: 'nav_1_a' },
        { path: '/nav_1/b', name: 'nav_1_b' },

        { path: '/nav_2', name: 'nav_2' },
        { path: '/nav_2/zhangsan', name: 'nav_2_zhangsan' },
      ]
    }
  },
});

...
router.start(App, '#app_3'); 这里组件直接替换指定的ID元素，通过router.start
```

* 写的组件直接替换ID元素，也可以这样：
```
new Vue({
  el: '#app_3',
  components: {  【render: h => h(Nav_1_a)  这个不行】
    Nav_1_a: Nav_1_a,
  }
});
```

* 截止到这基本可以写项目了。
* 到这的时候，突然想到问题，就是我想在JS文件内 import其他文件。但是不行，gulp只是打包，不会模块化处理。那做单页面的怎么配合？
* 见demo_005_a/b/nav。

```
【1】文件开启路由，先写几个demo组件。
nav 

【2】路由配置文件，
var nav_conf = {
  '/a': {
    component: cpt_a
  },
  '/b': {
    component: cpt_b
  },
};
var nav_redirect = {
  "/": '/a',
};
conf.dev = false;

【3】cpt_a组件dev：
var cpt_a = Vue.extend({
  template: `
    <div class="cpt_a" id="cpt_a">
      组件A的业务
    </div>
  `,
  data() {
    return {}
  },
});

【本地测试的时候开启测试】
if (conf.dev) {
  new Vue({
    【本地测试的时候以body为根元素】
    el: 'body',
    components: {
      cpt_a: cpt_a
    },
  });
}

css也是以.cpt_a为根节点写。

【4】cpt_a组件完成：
在nav的HTML进行挂载
<link rel="stylesheet" href="../demo_005_a/index.css">
<script type="text/javascript" src="../demo_005_a/index.js"></script>

同时注意router.conf.js中：conf.dev = false;这个是一开始设置好的。
```
* 反而感觉不如webpack处理xx.vue这种组件的方式来的舒服和合理。
