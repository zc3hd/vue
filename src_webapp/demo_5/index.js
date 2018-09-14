// ===================================slot
var new_span = Vue.extend({
  template: `#cp_1`,
  data: function() {
    return {
      msg: 'xxxxxxxxxx',
      key: 1,
    }
  },
  methods: {},
});

// 实例化一个对当前DOM数组件
var vm = new Vue({
  // 可以为class dom 
  el: '#app',
  // 数据
  data: {
    key: 1,
  },

  // 方法
  methods: {

  },

  // 局部组件
  components: {
    new_span: new_span,

  },
});





// ===================================router-2
// // 实例化一个对当前DOM数组件
var App = Vue.extend();


var Nav_1_a = Vue.extend({
  template: `{{msg}}`,
  data: function() {
    return {
      msg: 'nav-1-a-aaaaaaaaaaaaaaaaaa'
    }
  },
});
var Nav_1_b = Vue.extend({
  template: `{{msg}}`,
  data: function() {
    return {
      msg: 'nav-1-b-bbbbbbbbbbbbbbbbbbbbbb'
    }
  },
});


var Nav_2_son = Vue.extend({
  template: `{{$route.params.id}} {{$route.query.name}} {{$route.query.age}}`,
  data: function() {
    return {
      // msg: 'nav-2-info'
    }
  },
});

var router = new VueRouter();
router.map({
  '/nav_1/a': {
    component: Nav_1_a
  },
  '/nav_1/b': {
    component: Nav_1_b
  },
  '/nav_2/:id': {
    component: Nav_2_son
  },
});

// 配置
router.redirect({
  "/": '/nav_1/a',
  "/nav_1": '/nav_1/a',
  "/nav_2": '/nav_2/1',
});

// 开启
router.start(App, '#app_2');




// ===================================router-2
// // 实例化一个对当前DOM数组件
var App = Vue.extend({
  template:`
    <div class="app_box" id="app_3">
      <div class="item title">
        router
      </div>
      <ul slot='f_ul'>
        <li>
          <a href="#" v-link="{path:'/nav_1'}">nav_1</a>
        </li>
        <li>
          <a href="#" v-link="{path:'/nav_1/a'}">nav_1-a</a>
        </li>
        <li>
          <a href="#" v-link="{path:'/nav_1/b'}">nav_1-b</a>
        </li>
        <li>
        </li>
        <li>
          <a href="#" v-link="{path:'/nav_2'}">nav_2</a>
        </li>
        <li>
          <a href="#" v-link="{path:'/nav_2/zhangsan'}">nav_2-zhangsan</a>
        </li>
      </ul>
      <div class="item">
      </div>
      <div class="item">
        <router-view></router-view>
      </div>
    </div>
  `,
});


var Nav_1_a = Vue.extend({
  template: `{{msg}}`,
  data: function() {
    return {
      msg: 'nav-1-a-aaaaaaaaaaaaaaaaaa'
    }
  },
});
var Nav_1_b = Vue.extend({
  template: `{{msg}}`,
  data: function() {
    return {
      msg: 'nav-1-b-bbbbbbbbbbbbbbbbbbbbbb'
    }
  },
});


var Nav_2_son = Vue.extend({
  template: `{{$route.params.id}} {{$route.query.name}} {{$route.query.age}}`,
  data: function() {
    return {
      // msg: 'nav-2-info'
    }
  },
});

var router = new VueRouter();
router.map({
  '/nav_1/a': {
    component: Nav_1_a
  },
  '/nav_1/b': {
    component: Nav_1_b
  },
  '/nav_2/:id': {
    component: Nav_2_son
  },
});

// 配置
router.redirect({
  "/": '/nav_1/a',
  "/nav_1": '/nav_1/a',
  "/nav_2": '/nav_2/1',
});

// 开启
router.start(App, '#app_3');