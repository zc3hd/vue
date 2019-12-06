# Vue2.0 step_01

## v-for:arr
```js
// vue 1.0
v-for="(index,val) in array" track-by="id"

// vue 2.0
v-for="(val,index) in array" :key="index"
```

* 和arr.forEach()内部参数位置一致；



## component：基本使用

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



## component：测试组件

- 为什么会有这个方法：因为vue2.0 的自定义组件变为对象。
- vue1.0：绑定测试组件

```js
var A = Vue.extend({
  template: `<span>我是Vue.extend继承的类，被实例化的组件</span>`,
});

// A：类
(new A()).$mount("#one");
```

- vue2.0：绑定测试组件;

```html
<div class="box">
    <h1>component：测试使用</h1>
    <div class="item">
        Vue render：<span id="one"></span>
    </div>
</div>
```

```js
// ----------------------------------------component：测试使用
var one = {
  template: `<span id="one">自定义组件，通过render方法被绑定测试</span>`,
};
new Vue({
  el: "#one",
  render: h => h(one),
})
// 被指定的dom 完全被替换；
```

- 组员自己测试组件时，vue2.0的使用方式；







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



## axios

- github:https://github.com/axios/axios
- 基本用法：

```js
// ---------------------------------------------axios
// 这样的方式还是参考与vue 1.0 的方式，挂载到原型对象上，每个实例都可以使用；
Vue.prototype.$http = axios;

var methods = {
    _get: function() {
        this.$http.get('./test_data.js', {
            params: {
                id: 12345
            }
        })
        // 
            .then(function(res) {
            // console.log(res.data);
            this.ajax.get = res.data;
        }.bind(this))
            .catch(function(error) {
            console.log(error, 1);
        });
    },
    _post: function() {
        this.$http
            .post('/api/js_demo/font.do', {
            firstName: 'Fred',
            lastName: 'Flintstone'
        })
            .then(function(res) {
            this.ajax.post = JSON.stringify(res.data);
        }.bind(this))
            .catch(function(error) {
            console.log(error, 1);
        });
    },
}
```









## vue-router@2.0.1

* 和vue-router@1.x.x一样，有三种写代码的方式，可以参加demo_005
* 最后我们确认选择第三种方式配置我们的路由：**路由数据在组件内，在组件模板内遍历；**

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





