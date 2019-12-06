# Vue2.0 step_02

## 实际开发

* vue2.0没有cli的开发；
* 需求：
  * A同学，负责A组件，自己测试；
  * B同学，负责B组件和nav组件，自己测试；
  * 那么B同学与A同学怎么配合？

* 初始化：
  * 每个组件下有自己的CSS，JS，HTML；
  * HTML只是针对自己组件的测试，真实不需要；



## nav 组件

* nav目录：
  * index.html
  * index.css
  * index.js
  * router.test.js
  * router.conf.js
* index.html

```html
<div class="app" id="app" v-cloak>
</div>
```
* index.js

```js
// ----------------------------------------视图组件
var App = {
  template: `
      <div class="app" id="app">

        <div class="box">
          <h1>router：成员开发配合</h1>

          <h6>&nbsp;</h6>
          <h3>路由选项</h3>
          <div class="item">

            <router-link v-for="item in nav" :to=item.path >{{item.name}}</router-link>

          </div>
        </div>


        <div class="box">
          <h3>具体路由展示</h3>
          <div class="item">
            <router-view></router-view>
          </div>
        </div>

      </div>
      `,

  data: function() {
    return {
      nav: null
    }
  },
  // 
  created: function() {
    setTimeout(() => {
      this.nav = [
        { path: '/a', name: 'a' },
        { path: '/b', name: 'b' },
      ];
    }, 1000);
  }
};


// -----------------------------------------路由配置
var router = new VueRouter({
  routes: routes,
});

// -----------------------------------------开启路由
new Vue({
  // 绑定组件
  el: '#app',
  render: h => h(App),

  // 设置路由
  router: router,
});
```

* router.test.js：测试路由组件

```js
// -----------------------------------------路由组件
var A = {
  template: `
    <div>
      <h4> A的内容 </h4>
      <h4>$route.params.id：{{$route.params.id}}</h4> 
      <h4>$route.path：{{$route.path}}</h4> 
      <h4>$route.query：{{$route.query.name}}</h4>
    </div>
   `,
};

var B = {
  template: `
    <div>
      <h4> B的内容 </h4>
      <h4>$route.params.id：{{$route.params.id}}</h4> 
      <h4>$route.path：{{$route.path}}</h4> 
      <h4>$route.query：{{$route.query.name}}</h4>
    </div>
   `,
};
```

* router.conf.js：
  * **配置文件，为了方便组员以后改变这个文件；**
  * 这里可以先把功能名称进行约定，组员按照约定进行书写；或者后期组员修改；

```js
// 关联 默认指向
var routes = [
  // -----关联
  {
    path: '/a',
    component: A,
  },
  // 
  {
    path: '/b/:id',
    component: B,
  },
  // ------默认指向
  { path: '/', redirect: '/a' },
  // 
  { path: '/b', redirect: '/b/1' }
];
```

* 给组员的预留位置 HTML：

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Vue2.0 step_02</title>
  <link rel="stylesheet" href="./index.css">
  <!-- --------------------------------------------------------路由组件CSS 开始-->
  <!-- A -->


  <!-- --------------------------------------------------------路由组件CSS 结束-->
  <style>

  </style>
</head>

<body>

  <div class="app" id="app" v-cloak>

  </div>



</body>
<!-- vue2.0 -->
<script src="../../script/lib/vue/vue2.js" type="text/javascript"></script>
<!-- vue-router@2.0.1 -->
<script src="../../script/lib/vue/vue-router2.0/dist/vue-router.min.js" type="text/javascript"></script>

<!-- --------------------------------------------------------路由组件JS 开始 -->
<script src="./router.test.js" type="text/javascript"></script>
<!-- A -->



<!-- --------------------------------------------------------路由组件JS 结束-->
<!-- 配置文件 -->
<script src="./router.conf.js" type="text/javascript"></script>
<!-- main -->
<script src="./index.js" type="text/javascript"></script>

</html>
```

* 代码可以上传版本管理服务器，其他组员可以下载；





## A 组件

* 问题：**直接本地测试，组件内不能出现$route属性；**

* A目录：
  * index.css
  * index.html
  * index.js
* index.html：只引入vue.min.js文件，因为只是测试组件；

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Vue2.0 step_02 A</title>
  <link rel="stylesheet" href="./index.css">
</head>

<body>
    
  <div id="box"></div>
    
</body>
<!-- vue -->
<script src="../../script/lib/vue/vue2.js" type="text/javascript"></script>
<!-- main -->
<script src="./index.js" type="text/javascript"></script>

</html>
```

* index.css：与组员的约定：组件尽量用一个根标签，类名内也是只写根标签嵌套的样式，不要写样式清除；

```less
.A {
  background-color: pink;
  h4 {
    color: #222;
    font-size: 30px;
  }
}
```

* index.js：**组件测试**

```js
// 
var A = {
  template: `
    <div class="A">
      <h4> A的内容 新的内容</h4>
      <h4>$route.params.id：{{}}</h4> 
      <h4>$route.path：{{}}</h4> 
      <h4>$route.query {{}}</h4>
    </div>
   `,
};

// ------需要在提交前被注释；
// 本地测试
// new Vue({
//   el: '#box',
//   render: h => h(A),
// });
```

* 合并测试：
  * 1.注释JS内的测试注释；
  * 2.把css 文件和 JS引入相应的位置。若改名字，需要到router.conf.js 配置进行修改；

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Vue2.0 step_02</title>
  <link rel="stylesheet" href="./index.css">
  <!-- --------------------------------------------------------路由组件CSS 开始-->
  <!-- A -->
  <link rel="stylesheet" href="../A/index.css">
  <link rel="stylesheet" href="../B/index.css">


  <!-- --------------------------------------------------------路由组件CSS 结束-->
  <style>

  </style>
</head>

<body>
  <div class="app" id="app" v-cloak></div>
</body>
<!-- vue2.0 -->
<script src="../../script/lib/vue/vue2.js" type="text/javascript"></script>
<!-- vue-router@2.0.1 -->
<script src="../../script/lib/vue/vue-router2.0/dist/vue-router.min.js" type="text/javascript"></script>

<!-- --------------------------------------------------------路由组件JS 开始 -->
<script src="./router.test.js" type="text/javascript"></script>
<!-- A -->
<script src="../A/index.js" type="text/javascript"></script>
<script src="../B/index.js" type="text/javascript"></script>


<!-- --------------------------------------------------------路由组件JS 结束-->
<!-- 配置文件 -->
<script src="./router.conf.js" type="text/javascript"></script>
<!-- main -->
<script src="./index.js" type="text/javascript"></script>

</html>
```
