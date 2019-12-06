// 路由组件：继承了一个类；
var A = Vue.extend({
  template: `
    <div class="A">
      <h4> A 的内容 new</h4>
      <h4>$route.params.id：{{$route.params.id}}</h4> 
      <h4>$route.path：{{$route.path}}</h4> 
      <h4>$route.query：{{$route.query.name}}</h4>
    </div>
   `,
});


// ------需要在提交前被注释；
// 本地测试：
// (new A()).$mount("body");


// 本地测试
// new Vue({
//   el: 'body',
//   components: {
//     "cpt_a": A
//   },
// });