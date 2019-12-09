# Vue1.0 step_05

## router：路由数据在视图HTML

* `vue-router@0.7.13`

* 什么是路由：
  * 前端控制设计浏览器URL地址，形式为#!/nav_1；
  * 不进行页面转跳；
  * 不同的地址涉及不同的功能；
  * 就形成了单页面应用程序；
* 使用：
* 1.路由路径数据写在视图层HTML：注意v-link后面需要带引号（后面一大堆的都要带引号的还有：v-for）；

```html
<div class="app" id="app" v-cloak>

    <div class="box">
        <h1>router：路由数据在视图</h1>
        <h6>&nbsp;</h6>
        <h3>路由选项</h3>
        <div class="item">
            <a href="#" v-link="{path: '/nav_1'}">nav_1</a>
            <a href="#" v-link="{path: '/nav_2'}">nav_2</a>
            <a href="#" v-link="{path: '/nav_more'}">nav_more</a>
        </div>
    </div>

    <div class="box">
        <h3>具体路由展示</h3>
        <div class="item">
            <router-view></router-view>
        </div>
    </div>

</div>
```

* 2.初始化子路由组件:
  * 注意模板内可以直接使用  $route.params    $route.path   $route.query
  * $route.params : 需要关联时配置 '/nav_more/:id'
  * $route.path：访问路径
  * $route.query：?后面的查询参数；

```js
// -------------------------------路由子组件
var nav_1 = Vue.extend({
  template: `
    <h4>nav_1的内容</h4>
    <h4>$route.params.id：{{$route.params.id}}</h4> 
    <h4>$route.path：{{$route.path}}</h4> 
    <h4>$route.query：{{$route.query.name}}</h4>
   `,
});
var nav_2 = Vue.extend({
  template: `
    <h4>nav_2的内容</h4>
    <h4>$route.params.id：{{$route.params.id}}</h4> 
    <h4>$route.path：{{$route.path}}</h4> 
    <h4>$route.query：{{$route.query.name}}</h4>
   `
});
var nav_more = Vue.extend({
  template: `
    <h4> nav_more的内容 </h4>
    <h4>$route.params.id：{{$route.params.id}}</h4> 
    <h4>$route.path：{{$route.path}}</h4> 
    <h4>$route.query：{{$route.query.name}}</h4>
    `,
});
```

* 为什么子路由组件可以 $route这些？**因为路由组件实例化对象上已经有该属性（值为对象）**

```js
var nav_1 = Vue.extend({
  template: `
    <h4>nav_1的内容</h4>
    <h4>$route.params.id：{{$route.params.id}}</h4> 
    <h4>$route.path：{{$route.path}}</h4> 
    <h4>$route.query：{{$route.query.name}}</h4>
   `,
  created: function() {
    console.log(this.$route, this.$router);
  }
});
```

* 3.初始化路由、关联配置、默认指向；

```js
// ------------------------------路由配置
var router = new VueRouter();
// 关联
router.map({
  '/nav_1': {
    component: nav_1
  },
  '/nav_2': {
    component: nav_2
  },
  '/nav_more/:id': {
    component: nav_more
  },
});

// 默认指向
router.redirect({
  "/": '/nav_1',
  "/nav_more": '/nav_more/1',
});
```

* 4.启动路由：

```js
// ------------------------------------开启：
// 实例化一个对当前DOM视图的组件
var App = Vue.extend();
router.start(App, '#app'); // 只能开启在根节点
```

* 各项的作用：
  * iindex HTML模板：配置 名字--->link
  * 路由关联：link--->cpt
  * App：让HTML模板成为组件，和路由组件配合；

* 路由的好处：
  * 用户改路由，页面不刷新，直接到路由指向的组件功能；
  * 给用户提供极大的便利；



## router：路由数据在组件内，在HTML中遍历

* 路由数据：
  * 导航数据
  * 有时候涉及到用户的权限分配，例如：后台可以配置某些用户只有某些功能导航时，该数据由后台管理；
* 1.路由数据在组件内，由后台返回：

```js
var Bpp = Vue.extend({
  data: function() {
    return {
      nav: null
    }
  },
  created: function() {
    setTimeout(() => {
      // console.log(this);
      this.nav = [
        { path: '/nav_1', name: 'nav_1' },
        { path: '/nav_2', name: 'nav_2' },
        { path: '/nav_more', name: 'nav_more' },
      ];
    }, 1000);
  }
});
```

* 2.路由数据在HTML中进行遍历：

```html
<div class="app" id="bpp" v-cloak>

    <div class="box">
        <h1>router：路由数据在组件内，在HTML中遍历</h1>

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
```

* 2.准备路由组件：同上
* 3.初始化路由、关联配置、默认指向；同上；
* 4.开启：

```js
// -----------------------------------------路由配置
var router_B = new VueRouter();
// 关联
router_B.map({
  '/nav_1': {
    component: nav_1
  },
  '/nav_2': {
    component: nav_2
  },
  '/nav_more/:id': {
    component: nav_more
  },
});

// 默认指向
router_B.redirect({
  "/": '/nav_1',
  "/nav_more": '/nav_more/1',
});

// 用上面的
router_B.start(Bpp, '#bpp');
```





## router：路由数据在组件内，在组件模板中遍历

* 1.路由数据在 根组件内拿到，并渲染；
  * 这里的 `<div class="app" id="bpp">`和模板的标签一样，到时候会被完全替换为模板template；
  * 这个过程相当于：
    * 出现`<router-view>`，让路由组件有展示的地方；【核心】
    * 配置 名字--->link，且让HTML模板成为组件；【次要】

```js
var Cpp = Vue.extend({
  template: `
      <div class="app" id="cpp">

        <div class="box">
          <h1>router：抽象路由数据</h1>

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
  created: function() {
    // 异步
    setTimeout(() => {
      this.nav = [
        { path: '/nav_1', name: 'nav_1' },
        { path: '/nav_2', name: 'nav_2' },
        { path: '/nav_more', name: 'nav_more' },
      ];
    }, 1000);
  }
});
```

* 2.准备路由组件：同上
* 3.初始化路由、关联配置、默认指向；同上；
* 4.开启：

```js
// -----------------------------------------路由配置
var router_C = new VueRouter();
// 关联
router_C.map({
  '/nav_1': {
    component: nav_1
  },
  '/nav_2': {
    component: nav_2
  },
  '/nav_more/:id': {
    component: nav_more
  },
});

// 默认指向
router_C.redirect({
  "/": '/nav_1',
  "/nav_more": '/nav_more/1',
});

// 开启路由
router_C.start(Cpp, '#cpp');
```



## 特别注意

### 如何开发？

* 权限分配：不同的用户使用不同的功能；

* 涉及与否权限分配：路由数据最好都是放入组件内，HTML的东西也写在template内为最佳；
* 如何开发？选择【router：路由数据在组件内，在组件模板中遍历】



### 路由数据与配置

* 如果路由数据是由后台返回，表现形式如下：
  * 根据设置的默认指向，路由会发生变化，同时`<router-view>`会展示出默认好的路由组件；
  * 等待1s后，可以给用户点击的`a`标签，根据数据才被渲染出来；
* **由此可以得出：**
  * **只要JS内 配置好 link--->cpt，开启路由，其实路由功能就可以用了；**
  * **怎么用？直接在url地址栏改变路由，`<router-view>`就会变化；**
  * **为什么？修改的路由地址后，页面中所有的`<router-view>`内都会跟着变；因为这就是路由特性，给用户最大限度的操作页面；**
  * **用户：名字--->link 出现如否，其实无所谓，不会影响路由功能**

