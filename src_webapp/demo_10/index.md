
# Vue2.0的变化

### vue-router@2.0.1

* 视图在HTML版

```
HTML: name-->path
  <router-link to='/nav_1'>nav_1</router-link>
  <router-link to='/nav_2'>nav_2</router-link>
  <router-view></router-view> 

JS:
var nav_1 = {
  template: `nav_1_info-xxxxxxxxxxxxxx`,
};
var nav_2 = {
  template: `nav_2_info-xxxxxxxxxxxxxx`,
};

var routes = [
  // 
  {
    path: '/nav_1',
    component: nav_1,
  },
  // 
  {
    path: '/nav_2',
    component: nav_2,
  },
];

//配置 path-->component
var router = new VueRouter({
  routes: routes,
});


//开启路由 start
new Vue({
  el:'#app',
  router:router,
});


```

* 视图在组件里，这样就是可以把后台回来的数据先在组件里进行循环。

```
JS:
var view_cpt = {
  template:`
  <router-link to='/nav_1'>nav_1</router-link>
  <router-link to='/nav_2'>nav_2</router-link>
  <router-view></router-view> 
  `,
};
new Vue({
  el:'#app',
  router:router,
  components:{
    view_cpt
  },
});

HTML:
<view_cpt></view_cpt>
```

* 参数 方法

```
/nav_1/:id

template: `
  <div class="item">
    {{msg}} 
    {{$route.path}}
    {{$route.params}}
    {{$route.query}}
  </div>`,

//直接添加一个路由,表现切换路由，本质往历史记录里面添加一个
router.push({path:'home'});  

//替换当前的路由，不会往历史记录里面添加
router.replace({path:'news'})
```

* 特别的地方，下面这个是看完webpack版vue-router2.0.1版的后，突然想到可以试着加在HTML版这里发现的。

```
new Vue({
  el:'#app',
  router:router,
  // 这个是把 #app 这个容器DOM 完全替换为-->view_cpt
  render:h=>h(view_cpt),

  // 这个就是在作为组件在内部使用
  components:{
    view_cpt
  },
});

render:h=>h(view_cpt), 直接把指定的#app这个DOM全部替换为 我们的视图组件。
让我想起 webpack上 vue-router1.0的router.start(App, '#app');就是这个意思。
```

* 接下来就是webpack vue-router@2.0.1 见 demo-11
