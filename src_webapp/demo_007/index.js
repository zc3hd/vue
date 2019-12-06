// ---------------------------------------自定义组件
var cpt_1 = {
  template: `<div class="item">全局 自定义组件</div>`,
};

// 注册为全局组件
Vue.component('cpt_1', cpt_1);

var cpt_2 = {
  template: `<div class="item">局部 自定义组件</div>`,
};


// ----------------------------------------component：测试使用
var one = {
  template: `<span id="one">自定义组件，通过render方法被绑定测试</span>`,
};
new Vue({
  el: "#one",
  render: h => h(one),
})


// ----------------------------------------通信组件
var ev = new Vue();
var bro_1 = {
  template: `<span>{{obj}}，1s后emit给组件2</span>`,
  data: function() {
    return {
      info: "我是组件1的数据",
      obj: { a: 1 },
    }
  },
  mounted: function() {
    setTimeout(() => {
      // 又是注册，又是发射
      // ev.$emit("ev_bro_1", this.info);
      ev.$emit("ev_bro_1", this.obj);
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
    ev.$on("ev_bro_1", function(data) {
      this.info = data;

      this.info.a = 10;
    }.bind(this));
  },
};

// ---------------------------------------------axios
Vue.prototype.$http = axios;

// ---------------------------------------------入口组件
var vm = new Vue({
  // 可以为class dom 
  el: '#app',

  data: {
    // 遍历
    obj: {
      a: 1,
      b: 2
    },
    arr: [1, 2, 3, 1],

    // 异步
    ajax: {
      get: "",
      post: "",
    },
  },
  components: {
    // 局部组件
    'cpt_2': cpt_2,
    // 通信
    "bro_1": bro_1,
    "bro_2": bro_2,
  },
  // 方法
  methods: {
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
  },
  beforeCreate: function() {},
  created: function() {},
  beforeMount: function() {},
  mounted: function() {},
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  destroyed: function() {}
});







// ------------------------------------------------路由
// --------------------路由视图组件
var router_box = {
  template: `
    <div id="router_box">
      <div class="box">
        <h1>router：路由数据在组件内，在组件模板内遍历</h1>

        <h6>&nbsp;</h6>
        <h3>路由选项</h3>
        <div class="item">
          <router-link to='/nav_1'>nav_1</router-link>
          <router-link to='/nav_2'>nav_2</router-link>
          <router-link to='/nav_more'>nav_more</router-link>
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
  template: `
    <div>
      <h4>nav_1的内容</h4>
      <h4>$route.params.id：{{$route.params.id}}</h4> 
      <h4>$route.path：{{$route.path}}</h4> 
      <h4>$route.query：{{$route.query.name}}</h4>

      <button @click=go(1)>go(1) 下一路由</button>
      <button @click=go(-1)>go(-1) 上一路由</button>
      <button @click=push()>push 历史记录且转跳到/nav_2路由</button>
      <button @click=replace()>replace 当前历史记录且转跳到/nav_2路由</button>
    </div>`,
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

// 
var router = new VueRouter({
  routes: routes,
});



// 开启路由
new Vue({
  // 绑定组件
  el: '#router_box',
  render: h => h(router_box),

  // 设置路由
  router: router,
});