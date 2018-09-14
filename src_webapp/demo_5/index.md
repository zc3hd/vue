
# slot

```
HTML:
<new_span>
  <ul slot='f_ul'>
    <li>{{key}}</li>
    <li>{{key}}</li>
    <li>{{key}}</li>
    <li>{{key}}</li>
    <li>{{key}}</li>
    <li>{{key}}</li>
    <li>{{key}}</li>
  </ul>
</new_span>

<template id='cp_1'>
  <span v-show='key'>{{msg}}</span>
  <slot name='f_ul'></slot>
</template>


```

* 感觉没有什么用
* 就是在父级的DOM中直接一个slot的name='xxx'，在子组件模板中可以 指定在哪个地方出现， <slot name='xxx'>

# router

```
html:
<div id="box">
  <ul>
    <li>
      <a v-link="{path:'/home'}">主页</a>
    </li>
    <li>
      <a v-link="{path:'/news'}">新闻</a>
    </li>
  </ul>
  <div>
    <router-view></router-view>
  </div>  
</div>


JS:

//1. 准备一个根组件
var App=Vue.extend();

//2. Home News组件都准备
var Home=Vue.extend({
  template:'<h3>我是主页</h3>'
});

var News=Vue.extend({
  template:'<h3>我是新闻</h3>'
});

//3. 准备路由
var router=new VueRouter();

//4. 关联
router.map({
  'home':{
    component:Home
  },
  'news':{
    component:News
  }
});

//5. 启动路由
router.start(App,'#box');

//6. 跳转
router.redirect({
  '/':'/home'
});

子路由
router.map({
  'home':{
    component:Home,
    subRoutes:{
      'login':{
        component:{
          template:'<strong>我是登录信息</strong>'
        }
      },
      'reg':{
        component:{
          template:'<strong>我是注册信息</strong>'
        }
      }
    }
  },


  'news':{
    component:News,
    subRoutes:{
      '/detail/:id':{
        component:Detail
      }
    }
  }


});


var Detail=Vue.extend({
  template:`
  {{$route.params | json}}
  <br>
  {{$route.path}}
  <br>
  {{$route.query | json}}`
});

```

* subRoutes 这种在配置map的地方，只能是 路由里嵌套路由。
就是在父亲的模板中，又有新的v-link和<router-view>,感觉没有什么用。
* 像真实的场景，其实是分为二级菜单的，但是按照上面路由嵌套路由就不行，必须是所有的link都是在同一个级别上才可以。
* 1.0vue必须是先把视图上的v-link渲染好了，在进行路由配置和组件注入才可以。
* 渲染只能用JS渲染，因为v-link在接触vue组件之前，必须是渲染完成。不能在vue组件ready()的时候再进行渲染。
* `'/detail/:id'`这样就是在路由上传递参数 每个路由的指向的模块都可以拿到 $route.params.id $route.query 

