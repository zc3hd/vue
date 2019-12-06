// --------------------------------------------------------------------------路由数据在后台返回时
// ----------------------------------------视图组件
var App = Vue.extend({
  template: `
      <div class="app" id="bpp">

        <div class="box">
          <h1>router：成员开发配合</h1>

          <h6>&nbsp;</h6>
          <h3>路由选项</h3>
          <div class="item">

            <a href="#" v-for="ele in nav" v-link="{path: ele.path}">{{ele.name}}</a>

          </div>
        </div>


        <div class="box">
          <h3>具体路由展示</h3>
          <div class="item">
            <router-view></router-view>
          </div>
        </div>

      </div>
      `,
  data: function() {
    return {
      nav: null
    }
  },
  // 
  created: function() {
    setTimeout(() => {
      this.nav = [
        { path: '/a', name: 'a' },
        { path: '/b', name: 'b' },
      ];
    }, 1000);
  }
});

// -----------------------------------------路由配置
var router = new VueRouter();
// 关联
router.map(map);

// 默认指向
router.redirect(redirect);

// 用上面的
router.start(App, '#app');