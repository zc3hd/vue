// --------------------------------------------------------------------------路由数据在后台返回时
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

// 开启路由
new Vue({
  // 绑定组件
  el: '#app',
  render: h => h(App),

  // 设置路由
  router: router,
});