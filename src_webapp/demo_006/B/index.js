// 路由组件：继承了一个类；
var B = Vue.extend({
  template: `
    <div class="B">
      <h4> B 的内容 new</h4>
      <h4>$route.params.id：{{$route.params.id}}</h4> 
      <h4>$route.path：{{$route.path}}</h4> 
      <h4>$route.query：{{$route.query.name}}</h4>
    </div>
   `,
  created: function() {
    console.log(this.$route);
  }
});


// -------------------------------------需要在提交前被注释；

// ------------------------------------组件内：路由无关，单独的组件；
// (new B()).$mount(".box");
// 

// ------------------------------------组件内：路由相关，参数从地址栏进行配置；
var router_test = new VueRouter();

// 设置根路径/ 关联 测试组件
router_test.map({
  '/:id': { component: B },
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