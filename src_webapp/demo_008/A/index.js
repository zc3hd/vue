// 路由组件：继承了一个类；
var A = {
  template: `
    <div class="A">
      <h4> A的内容 新的内容</h4>
      <h4>$route.params.id：{{$route.params.id}}</h4> 
      <h4>$route.path：{{$route.path}}</h4> 
      <h4>$route.query {{$route.query}}</h4>
    </div>
   `,
};


// ------需要在提交前被注释；
// 本地测试
// new Vue({
//   el: '#box',
//   render: h => h(A),
// });


// 本地测试时，不能出现$route.params.id属性；
// el: body  [Vue warn]: Do not mount Vue to < html > or < body > - mount to normal elements instead.