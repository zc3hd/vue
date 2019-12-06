// -----------------------------------------路由组件
var A = {
  template: `
    <div>
      <h4> A的内容 </h4>
      <h4>$route.params.id：{{$route.params.id}}</h4> 
      <h4>$route.path：{{$route.path}}</h4> 
      <h4>$route.query：{{$route.query.name}}</h4>
    </div>
   `,
};

var B = {
  template: `
    <div>
      <h4> B的内容 </h4>
      <h4>$route.params.id：{{$route.params.id}}</h4> 
      <h4>$route.path：{{$route.path}}</h4> 
      <h4>$route.query：{{$route.query.name}}</h4>
    </div>
   `,
};