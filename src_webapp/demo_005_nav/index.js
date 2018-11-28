// 实例化一个对当前DOM数组件

// 视图组件
var App = Vue.extend({
  template: `
    <div class="app" id="app">
      <div class="nav">
        <div class="item" v-for='ele in nav'>
          <a href="#" v-link="{path:ele.path}">{{ele.name}}</a>
        </div>
      </div>

      <div class="box">
        <router-view></router-view>
      </div>
    </div>
  `,
  data() {
    return {
      msg: 'xx',
      nav: [
        { path: '/a', name: 'A' },
        { path: '/b', name: 'B' },
      ]
    }
  },
});

var router = new VueRouter();
// 关联
router.map(nav_conf);

// 配置
router.redirect(nav_redirect);

// 开启
router.start(App, '#app');