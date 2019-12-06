var B = {
  template: `
    <div class="B">
      <h4> B的内容 新的内容</h4>
      <h4>$route.params.id：{{$route.params.id}}</h4> 
      <h4>$route.path：{{$route.path}}</h4> 
      <h4>$route.query： {{$route.query}}</h4>
    </div>
   `,
};


// **********************************************需要在提交前被注释；

// ------------------------------------组件内：路由无关，单独的组件；
// new Vue({
//   el: '.box',
//   render: h => h(B),
// });


// ------------------------------------组件内：路由相关，参数从地址栏进行配置；
// 设置 根路径/ 关联 测试组件，设置默认指向；
var router = new VueRouter({
  routes: [
    // ------关联
    {
      path: '/:id',
      component: B,
    },
    // ------默认指向
    { path: '/', redirect: '/test' },
  ],
});

// 设置 路由视图组件
var App = { template: `<router-view></router-view>` };


// 开启 路由
new Vue({
  el: '.box',
  render: h => h(App),
  router: router,
});