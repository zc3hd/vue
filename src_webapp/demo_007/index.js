// ---------------------------------------自定义组件
var cpt_1 = {
  template: `<div class="item">全局 自定义组件</div>`,
};

// 注册为全局组件
Vue.component('cpt_1', cpt_1);

var cpt_2 = {
  template: `<div class="item">局部 自定义组件</div>`,
};


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
// ---------------------------------------------路由

// --------------------路由组件
var nav_1 = {
  template: `
    <div>
      <h4>nav_1的内容</h4>
      <h4>$route.params.id：{{$route.params.id}}</h4> 
      <h4>$route.path：{{$route.path}}</h4> 
      <h4>$route.query：{{$route.query.name}}</h4>
    </div>`,
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

// -----------------path-->组件 关联、
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


var router = new VueRouter({
  routes: routes,
});



// ---------------------------------------------入口组件
var vm = new Vue({
  // 可以为class dom 
  el: '#app',
  // 开启 路由
  router: router,
  data: {
    // 遍历
    obj: {
      a: 1,
      b: 2
    },
    arr: [1, 2, 3, 1],
  },
  components: {
    // 局部组件
    'cpt_2': cpt_2,
    // 通信
    "bro_1": bro_1,
    "bro_2": bro_2,
  },
  // 方法
  methods: {},
  beforeCreate: function() {},
  created: function() {},
  beforeMount: function() {},
  mounted: function() {},
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  destroyed: function() {}
});