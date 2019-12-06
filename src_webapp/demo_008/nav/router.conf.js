// 关联 默认指向
var routes = [
  // -----关联
  {
    path: '/a',
    component: A,
  },
  // 
  {
    path: '/b/:id',
    component: B,
  },
  // ------默认指向
  { path: '/', redirect: '/a' },
  // 
  { path: '/b', redirect: '/b/1' }
];