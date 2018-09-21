// ===================================HTML 
// var nav_1 = {
//   template: `
//     <div class="item">
//       {{msg}}
//     </div>`,
//   data: function() {
//     return {
//       msg: 'nav_1_info-xxxxxxxxxxxxxx',
//     }
//   },
//   methods: {},
// };
// var nav_2 = {
//   template: `
//     <div class="item">
//       {{msg}}
//     </div>`,
//   data: function() {
//     return {
//       msg: 'nav_2_info-xxxxxxxxxxxxxx',
//     }
//   },
//   methods: {},
// };

// var routes = [
//   // 
//   {
//     path: '/nav_1',
//     component: nav_1,
//   },
//   // 
//   {
//     path: '/nav_2',
//     component: nav_2,
//   },
// ];


// var router = new VueRouter({
//   routes: routes,
// });

// new Vue({
//   el:'#app',
//   router:router,
// });



// ===================================组件 
var view_cpt = {
  template:`
  <div class="item">
    <div>
        <span><router-link to='/nav_1'>nav_1</router-link></span>
        <span><router-link to='/nav_2'>nav_2</router-link></span>
    </div>
    <div class="item">
      <router-view></router-view>
    </div>
  </div> 
  `,
};

var nav_1 = {
  template: `
    <div class="item">
      {{msg}} 
      {{$route.path}}
      {{$route.params}}
      {{$route.query}}
    </div>`,
  data: function() {
    return {
      msg: 'nav_1_info-xxxxxxxxxxxxxx',
    }
  },
  methods: {},
};
var nav_2 = {
  template: `
    <div class="item">
      {{msg}}
    </div>`,
  data: function() {
    return {
      msg: 'nav_2_info-xxxxxxxxxxxxxx',
    }
  },
  methods: {},
};

var routes = [
// 
  {
    path: '/nav_1',
    component: nav_1,
  },
  // 
  {
    path: '/nav_1/:id',
    component: nav_1,
  },
  // 
  {
    path: '/nav_2',
    component: nav_2,
  },
  // 
  // {path:'*', redirect:'/home'}
];


var router = new VueRouter({
  routes: routes,
});



new Vue({
  el:'#app',
  router:router,
  // 这个是把 #app 这个容器DOM 完全替换为-->view_cpt
  render:h=>h(view_cpt),

  // 这个就是在作为组件在内部使用
  // components:{
  //   view_cpt
  // },
});


// var index = 1;
// setInterval(function () {
//   index++;
//   router.replace({path:`/nav_1/${index}?a=${index}`});
// },2000);
