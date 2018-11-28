// ===================================router-1
// // 实例化一个对当前DOM数组件
// var App = Vue.extend();


// var Nav_1_a = Vue.extend({
//   template: `{{msg}}`,
//   data: function() {
//     return {
//       msg: 'nav-1-a-aaaaaaaaaaaaaaaaaa'
//     }
//   },
// });
// var Nav_1_b = Vue.extend({
//   template: `{{msg}}`,
//   data: function() {
//     return {
//       msg: 'nav-1-b-bbbbbbbbbbbbbbbbbbbbbb'
//     }
//   },
// });


// var Nav_2_son = Vue.extend({
//   template: `{{$route.params.id}} {{$route.query.name}} {{$route.query.age}}`,
//   data: function() {
//     return {
//       // msg: 'nav-2-info'
//     }
//   },
// });

// var router = new VueRouter();
// router.map({
//   '/nav_1/a': {
//     component: Nav_1_a
//   },
//   '/nav_1/b': {
//     component: Nav_1_b
//   },
//   '/nav_2/:id': {
//     component: Nav_2_son
//   },
// });

// // 配置
// router.redirect({
//   "/": '/nav_1/a',
//   "/nav_1": '/nav_1/a',
//   "/nav_2": '/nav_2/1',
// });

// // 开启
// router.start(App, '#app_2');




// ===================================router-2
// // 实例化一个对当前DOM数组件
// 
// 
// var App = Vue.extend({
//   template: `
//     <div class="app_box" id="app_3">
//       <div class="item title">
//         router-2 {{msg}}
//       </div>
//       <ul slot='f_ul'>
//         <li v-for='ele in nav'>
//           <a href="#" v-link="{path:ele.path}">{{ele.name}} {{msg}}</a>
//         </li>
//       </ul>
//       <div class="item">
//         <router-view></router-view>
//       </div>
//     </div>
//   `,
//   data() {
//     return {
//       msg: 'xx',
//       nav: [
//         { path: '/nav_1', name: 'nav_1' },
//         { path: '/nav_1/a', name: 'nav_1_a' },
//         { path: '/nav_1/b', name: 'nav_1_b' },

//         { path: '/nav_2', name: 'nav_2' },
//         { path: '/nav_2/zhangsan', name: 'nav_2_zhangsan' },
//       ]
//     }
//   },
// });


// var Nav_1_a = Vue.extend({
//   template: `{{msg}}`,
//   data: function() {
//     return {
//       msg: 'nav-1-a-aaaaaaaaaaaaaaaaaa'
//     }
//   },
// });
// var Nav_1_b = Vue.extend({
//   template: `{{msg}}`,
//   data: function() {
//     return {
//       msg: 'nav-1-b-bbbbbbbbbbbbbbbbbbbbbb'
//     }
//   },
// });
// var Nav_2_son = Vue.extend({
//   template: `{{$route.params.id}} {{$route.query.name}} {{$route.query.age}}`,
//   data: function() {
//     return {
//       // msg: 'nav-2-info'
//     }
//   },
// });

// var router = new VueRouter();
// router.map({
//   '/nav_1/a': {
//     component: Nav_1_a
//   },
//   '/nav_1/b': {
//     component: Nav_1_b
//   },
//   '/nav_2/:id': {
//     component: Nav_2_son
//   },
// });

// // 配置
// router.redirect({
//   "/": '/nav_1/a',
//   "/nav_1": '/nav_1/a',
//   "/nav_2": '/nav_2/1',
// });

// // 开启
// router.start(App, '#app_3');




// var APP = Vue.extend({
//   template: `{{msg}}`,
//   data: function() {
//     return {
//       msg: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
//     }
//   },
// });

// new Vue({
//   el: '#app_3',
//   // 这样的模式可以先测试为单个模块
//   // render: h => h(Nav_1_a),
//   components: {
//     // Nav_1_a: Nav_1_a,
//   }
//   // router: router,
//   // =====================vuex
//   // store:store,
// });

