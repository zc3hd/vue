# Vue step 10

* Vue2.0的变化

### vue-router@2.0.1

```
【视图在HTML】
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

【配置path-->cpt】配置和指定
var routes = [
  {
    path: '/nav_1',
    component: nav_1,
  },
  {
    path: '/nav_2',
    component: nav_2,
  },
];
var router = new VueRouter({
  routes: routes,
});

new Vue({  开启路由
  el:'#app',
  router:router,
});

```

* 视图在组件里，这样就是可以把后台回来的nav数据，在视图组件里进行循环。

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
  render:h=>h(view_cpt), 【这个是把 #app 这个容器DOM 完全替换为视图组件】
  router:router,
});
```

* 路由对象router的新方法：

```
直接添加一个路由,表现切换路由，本质往历史记录里面添加一个
router.push({path:'home'});  

替换当前的路由，不会往历史记录里面添加
router.replace({path:'news'})
```

### 渲染组件：

* 这个是vue1.0没有的。
```
new Vue({
  el:'#app',
  render:h=>h(some_cpt), 
});
```

### axios

* 说是用最新的ajax写的，可以用get的方式访问类似跨域的东西
```
axios
  .get('https://api.github.com/users/itstrive')
  .then(function(res){
    this.myMessage=res.data;
  }.bind(this))
  .catch(function(err){
      console.log(err);
  })
```

--------------------------------

* 到这vue2.0的变化就基本就说完了，其实也可以按照demo_005_nav的方式写个类型的小测试项目，也就是router的用法不同。就不写了。
* 但是还是会像demo_005_nav那样，dev组件后需要手动进行写入router.conf.js内部。