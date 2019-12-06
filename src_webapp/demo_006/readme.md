# Vue1.0 step_06

## 实际开发

* 如果没有cli，现在只有gulp的架子，或者没有gulp的架子。**我们能用vue开发么？当前可以!!!**
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
var App = Vue.extend({
  template: `
      <div class="app" id="bpp">

        <div class="box">
          <h1>router：成员开发配合</h1>

          <h6>&nbsp;</h6>
          <h3>路由选项</h3>
          <div class="item">

            <a href="#" v-for="ele in nav" v-link="{path: ele.path}">{{ele.name}}</a>

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
});

// -----------------------------------------路由配置
var router = new VueRouter();
// 关联
router.map(map);

// 默认指向
router.redirect(redirect);

// 用上面的
router.start(App, '#app');
```

* router.test.js：测试路由组件

```js
// -----------------------------------------路由组件
var A = Vue.extend({
  template: `
    <h4> A的内容 </h4>
    <h4>$route.params.id：{{$route.params.id}}</h4> 
    <h4>$route.path：{{$route.path}}</h4> 
    <h4>$route.query：{{$route.query.name}}</h4>
   `,
});
var B = Vue.extend({
  template: `
    <h4> B的内容 </h4>
    <h4>$route.params.id：{{$route.params.id}}</h4> 
    <h4>$route.path：{{$route.path}}</h4> 
    <h4>$route.query：{{$route.query.name}}</h4>
   `
});
var C = Vue.extend({
  template: `
    <h4> C的内容 </h4>
    <h4>$route.params.id：{{$route.params.id}}</h4> 
    <h4>$route.path：{{$route.path}}</h4> 
    <h4>$route.query：{{$route.query.name}}</h4>
    `,
});
```

* router.conf.js：
  * **配置文件，为了方便组员以后改变这个文件；**
  * 这里可以先把功能名称进行约定，组员按照约定进行书写；或者后期组员修改；

```js
// 关联
var map = {
  '/a': {
    component: A
  },
  '/b/:id': {
    component: B
  },
};

// 默认
var redirect = {
  "/": '/a',
  "/b": '/b/1',
};
```

* 给组员的预留位置 HTML：

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Vue1.0 step_06</title>
  <link rel="stylesheet" href="./index.css">
  <!-- --------------------------------------------------------路由组件CSS 开始-->
  
    
    
    
  <!-- --------------------------------------------------------路由组件CSS 结束-->
</head>

<body>
  <div class="app" id="app" v-cloak>
  </div>
</body>
    
<!-- vue -->
<script src="../../script/lib/vue/vue.min.js" type="text/javascript"></script>
<!-- vue-router -->
<script src="../../script/lib/vue/vue-router/dist/vue-router.min.js" type="text/javascript"></script>

<!-- --------------------------------------------------------路由组件JS 开始 -->
<script src="./router.test.js" type="text/javascript"></script>





<!-- --------------------------------------------------------路由组件JS 结束-->
<!-- 配置文件 -->
<script src="./router.conf.js" type="text/javascript"></script>
<!-- main -->
<script src="./index.js" type="text/javascript"></script>
</html>
```

* 代码可以上传版本管理服务器，其他组员可以下载；



## A 组件

### 初始化

* 文件夹 A/
  * index.css
  * index.html
  * index.js
* index.html：
  * 引入vue.min.js文件，因为要测试组件，先得有组件；
  * 引入vue-router.min.js文件；

```html
<body>
  <div class="box"></div>
</body>

<script src="../../script/lib/vue/vue.min.js" type="text/javascript"></script>
<!-- vue-router -->
<script src="../../script/lib/vue/vue-router/dist/vue-router.min.js" type="text/javascript"></script>
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

### index.js

```js
// 路由组件：继承了一个类；
var A = Vue.extend({
  template: `
    <div class="A">
      <h4> A 的内容 new</h4>
      
      <h4>$route.params.id：{{$route.params.id}}</h4> 
      <h4>$route.path：{{$route.path}}</h4> 
      <h4>$route.query：{{$route.query.name}}</h4>
    </div>
   `,
  created: function() {
    console.log(this.$route);
  }
});


// *******************************************需要在提交前被注释；

// -----------------------组件内：路由无关，单独的组件；
// (new A()).$mount(".box");



// -----------------------组件内：路由相关，参数从地址栏进行配置；
var router_test = new VueRouter();

// 设置根路径/ 关联 测试组件
router_test.map({
  '/:id': { component: A },
});

// 设置默认指向
router_test.redirect({
  "/": '/test',
});

// 设置 路由视图组件
var App = Vue.extend({
  template: `<router-view></router-view>`,
});

// 开启 路由
router_test.start(App, '.box');
```

### 合并到nav

* **1.组件的index.js内的测试代码一定要注释掉；**
* **2.把css 文件和 JS引入相应的位置。若改名字，需要到router.conf.js 配置进行修改；**

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Vue1.0 step_06</title>
  <link rel="stylesheet" href="./index.css">
  <!-- --------------------------------------------------------路由组件CSS 开始-->
  <!-- A -->
  <link rel="stylesheet" href="../A/index.css">
  <!-- B -->
  <link rel="stylesheet" href="../B/index.css">
  <!-- --------------------------------------------------------路由组件CSS 结束-->
  <style>

  </style>
</head>

<body>

  <div class="app" id="app" v-cloak>

  </div>
</body>
<!-- vue -->
<script src="../../script/lib/vue/vue.min.js" type="text/javascript"></script>
<!-- vue-router -->
<script src="../../script/lib/vue/vue-router/dist/vue-router.min.js" type="text/javascript"></script>

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



## 思考

* 上面可以完成没有cli的配合和编程，**但是需要一定的构建和约定**；

* 先得知道这个方式的不易，才能感觉webpack带给我们处理xx.vue这种方式的合理和好处；