// ------------------------------------------------------------路由
// --------------------路由视图组件
var router_box = {
  template: `
    <div id="router_box">
      <div class="box">
        <h1>router@3.0.1：路由数据在组件内，在组件模板内遍历</h1>

        <h6>&nbsp;</h6>
        <h3>异步获取路由选项</h3>
        <div class="item">
          <router-link v-for="(ele,index) in nav" :to=ele.path>{{ele.name}}</router-link>
        </div>
        <div class="item">
          <router-link v-for="ele in nav" :to=ele.path tag="li" active-class="active" >
            <a href="javascript:;">{{ele.name}}</a>
          </router-link>
        </div>
      </div>

      <div class="box">
        <h3>具体路由展示</h3>
        <div class="item routerView_box">
          
          <keep-alive include="nav_1">
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
    </div>
  `,
  data: function() {
    return {
      nav: null
    }
  },
  mounted: function() {
    setTimeout(() => {
      // console.log(this);
      this.nav = [
        { path: '/nav_1', name: 'nav_1' },
        { path: '/nav_2', name: 'nav_2' },
        { path: '/nav_more', name: 'nav_more' },
      ];
    }, 1000);
  }
};


// --------------------路由组件
var nav_1 = {
  name: "nav_1",
  template: `
    <div>
      <h3>nav_1的内容</h3>
      
      <h4>&nbsp;</h4>
      <h4>$route的属性:</h4>
      <h4>$route.params.id：{{$route.params.id}}</h4> 
      <h4>$route.path：{{$route.path}}</h4> 
      <h4>$route.query：{{$route.query.name}}</h4>

      <h4>&nbsp;</h4>
      <h4>router的方法:</h4>
      <button @click=go(1)>go(1) 下一路由</button>
      <button @click=go(-1)>go(-1) 上一路由</button>
      <button @click=push()>push 历史记录且转跳到/nav_2路由</button>
      <button @click=replace()>replace 当前历史记录且转跳到/nav_2路由</button>


      <h4>num:{{num}} 1s后异步变化</h4>
    </div>`,
  data: function() {
    return {
      num: 1
    }
  },
  methods: {
    go: function(num) {
      this.$router.go(num);
    },
    // 
    push: function() {
      this.$router.push({ path: "/nav_2" });
    },
    // 
    replace: function() {
      this.$router.replace({ path: "/nav_2" });
    }
  },
  mounted: function() {
    setTimeout(() => {
      this.num++;
    }, 1000);
  }
};


var nav_2 = {
  template: `
    <div>
      <h4>nav_2的内容</h4>
      <h4>$route.params.id：{{$route.params.id}}</h4> 
      <h4>$route.path：{{$route.path}}</h4> 
      <h4>$route.query：{{$route.query.name}}</h4>
    </div>`,
};


var nav_more = {
  template: `
    <div>
      <h4>nav_more的内容</h4>
      <h4>$route.params.id：{{$route.params.id}}</h4> 
      <h4>$route.path：{{$route.path}}</h4> 
      <h4>$route.query：{{$route.query.name}}</h4>
    </div>`,
  updated: function() {
    console.log(this);
  },
  watch: {
    $route: function(_new, _old) {
      console.log(_new, _old);
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   进入该路由之前
  //   console.log(to, from);
  //   next();
  // },
  //
  // beforeRouteUpdate(to, from, next) {
  //   路由更新前
  //   console.log(this, 1);
  //   next();
  // },
  // beforeRouteLeave(to, from, next) {
  //   路由离开前;
  //   console.log(to, from);
  //   next();
  // }
};

// -----------------配置：path-->组件 关联、默认指向
var routes = [
  // -----关联
  {
    path: '/nav_1',
    component: nav_1,
  },
  // 
  {
    path: '/nav_2',
    component: nav_2,
  },
  // 
  {
    path: '/nav_more/:id',
    component: nav_more,
  },
  // ------默认指向
  { path: '/', redirect: '/nav_1' },
  // 
  { path: '/nav_more', redirect: '/nav_more/1' }
];

// 路由对象
var router = new VueRouter({
  routes: routes,
  // mode: 'history',
  // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
  // scrollBehavior: () => ({ y: 0 }),
});


// -------------------------------------导航钩子
// router.beforeEach(function(to, from, next) {
//   alert("路由每次变化--前")
//   next();
// });
// router.afterEach(function(to, from) {
//   alert("路由每次变化--后")
// });


// 开启路由
new Vue({
  // 绑定组件
  el: '#router_box',
  render: h => h(router_box),

  // 设置路由
  router: router,
});