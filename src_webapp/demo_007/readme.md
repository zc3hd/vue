# Vue2.0 step_01

## v-for:arr
```js
// vue 1.0
v-for="(index,val) in array" track-by="id"

// vue 2.0
v-for="(val,index) in array" :key="index"
```

* 和arr.forEach()内部参数位置一致；



## component

* 组件：{}
* 模板：必须有根节点；

```js
var cpt_1 = {
  template: `<div class="item">全局 自定义组件</div>`,
};

// 注册为全局组件
Vue.component('cpt_1', cpt_1);

// 局部组件
components:{ 
  'cpt_2':cpt_1
}
```



## 生命周期

```js
// vue1.0: 
//   created               --创建实例
//   beforeCompile         --编译之前，树是空的
//   compiled              --编译之后，树是渲染上数据
//   ready                 --插入DOM树中
//   beforeDestroy         --销毁之前
//   destroyed             --销毁之后，组件完全失效


// vue2.0:
//   beforeCreate          --组件实例刚刚被创建,属性都没有
//   created               --实例已经创建完成，属性已经绑定

//   beforeMount           --模板编译之前，树是空的，没有插入DOM树
//   mounted               --模板编译之后，代替之前ready，

//   beforeUpdate          --组件更新之前 
//   updated               --组件更新完毕：组件内任何属性值发生改变都会执行该函数；
  
//   beforeDestroy         --组件销毁前
//   destroyed             --组件销毁后
```



## 通信

* vue2.0：
  * 取消了sync：其目的就是为了子组件收到父级组件后，子组件改变简单数据类型的值，父级也会跟着变；
  * 使用：单一事件管理 ：通信组件；
    * 传递 简单数据 的 值；
    * 传递 简单数据 的 地址；传递的是地址；

```js
// ----------------------------------新建通信组件
var ev = new Vue();

var bro_1 = {
  template: `<span>{{info}}，1s后emit给组件2</span>`,
  data: function() {
    return {
      info: "我是组件1的数据"
    }
  },
  mounted: function() {
    // 在绑定后1s 触发
    setTimeout(() => {
      // 注册事件名称，触发
      ev.$emit("ev_bro_1", this.info);
    }, 1000);
  },
};
var bro_2 = {
  template: `<span>{{info}}</span>`,
  data: function() {
    return {
      info: "我是组件2的数据"
    }
  },
  mounted: function() {
    // 响应
    ev.$on("ev_bro_1", function(data) {
      this.info = data;
    }.bind(this));
  },
};
```





## vue-router@2.0.1

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

- 视图在组件里，这样就是可以把后台回来的nav数据，在视图组件里进行循环。

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

- 路由对象router的新方法：

```
直接添加一个路由,表现切换路由，本质往历史记录里面添加一个
router.push({path:'home'});  

替换当前的路由，不会往历史记录里面添加
router.replace({path:'news'})
```

## 绑定组件

- 这个是vue1.0没有的。

```
new Vue({
  el:'#app',
  render:h=>h(some_cpt), 
});
```

## axios

- 说是用最新的ajax写的，可以用get的方式访问类似跨域的东西

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

------

- 到这vue2.0的变化就基本就说完了，其实也可以按照demo_005_nav的方式写个类型的小测试项目，也就是router的用法不同。就不写了。
- 但是还是会像demo_005_nav那样，dev组件后需要手动进行写入router.conf.js内部。