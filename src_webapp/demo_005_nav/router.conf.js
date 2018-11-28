'use strict';


// var cpt_a = Vue.extend({
//   template: `{{msg}}`,
//   data: function() {
//     return {
//       msg: 'demo-a'
//     }
//   },
// });
// var cpt_b = Vue.extend({
//   template: `{{msg}}`,
//   data: function() {
//     return {
//       msg: 'demo-b'
//     }
//   },
// });

var nav_conf = {
  '/a': {
    component: cpt_a
  },
  '/b': {
    component: cpt_b
  },
};

// 转跳
var nav_redirect = {
  "/": '/a',
};

// 关闭开发模式
conf.dev = false;
