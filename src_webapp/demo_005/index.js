// -------------------------------路由子组件
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



// ------------------------------------路由配置
var router_A = new VueRouter();
// 关联
router_A.map({
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
router_A.redirect({
  "/": '/nav_1',
  "/nav_more": '/nav_more/1',
});

// ----开启：只能开启在根节点
// App就是为了让HTML #app 成为组件；
var App = Vue.extend();
router_A.start(App, '#app');



// --------------------------------------路由数据在组件内，在HTML中遍历
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








//-------------------------------- --------路由数据在组件内，在组件模板中遍历
// ----------------------------------------路由视图组件
var Cpp = Vue.extend({
  template: `
      <div class="app" id="cpp">

        <div class="box">
          <h1>router：路由数据在组件内，在组件模板中遍历</h1>

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

// -----------------------------------------路由组件
// 用上面的

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

// 用上面的
router_C.start(Cpp, '#cpp');