// 关联
var map = {
  '/a': {
    component: A
  },
  '/b/:id': {
    component: B
  },
};


// 默认
var redirect = {
  "/": '/a',
  "/b": '/b/1',
};