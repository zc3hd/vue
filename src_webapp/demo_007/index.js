// ---------------------------------------遍历的组件
// 被遍历的组件，作为标签使用，自定义属性会加在根标签上；
var cpt = {
  template: `<div class="item">遍历的组件</div>`,
};



// ---------------------------------------定义组件
var cpt_1 = {
  template: `<div class="item">全局 自定义组件</div>`,
};

// 注册为全局组件
Vue.component('cpt_1', cpt_1);

var cpt_2 = {
  template: `<div class="item">局部 自定义组件</div>`,
};


// ----------------------------------------绑定组件
var one = {
  template: `<span id="one">自定义组件，通过render方法被绑定测试</span>`,
};
new Vue({
  el: "#one",
  render: h => h(one),
});



// ----------------------------------------table 缓存组件
var tab_1 = {
  name: "tab_1",
  template: `<div class="item">
    <div>tab_1</div>
    <div>num：{{num}}</div>
    <button @click=add()>num++</button>
  </div>`,
  data: function() {
    return {
      num: 0,
    }
  },
  methods: {
    add: function() {
      this.num++;
    },
  }
};
var tab_2 = {
  name: "tab_2",
  template: `<div class="item">
    <div>tab_2</div>
    <div>num：{{num}}</div>
    <button @click=add()>num++</button>
  </div>`,
  data: function() {
    return {
      num: 0,
    }
  },
  methods: {
    add: function() {
      this.num++;
    },
  }
};


// ----------------------------------------组件 自定义属性和事件
var cpt_prop = {
  name: "cpt_prop",
  template: `
  <div class="item">
    <div>{{prop_a}}</div>
    <div>{{prop_b}}</div>
    <div>{{prop_c}}</div>
    <div>{{prop_e}}</div>
    <div>prop_f:{{prop_f}}</div>
  </div>`,
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    prop_a: {
      type: String,
      default: "100"
    },
    // 多个可能的类型
    prop_b: [String, Number],
    // 必填的字符串
    prop_c: {
      type: String,
      required: true
    },
    // 带有默认值的对象
    prop_e: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function() {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    prop_f: {
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个 当 prop 验证失败的时候，(开发环境构建版本的) Vue 将会产生一个控制台的警告。
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  },
  mounted: function() {
    // 注册并响应
    this.$emit('cpt_ev', this.prop_a);
  }
};





// ----------------------------------------通信组件
var ev = new Vue();
var bro_1 = {
  template: `<span>{{obj}}，1s后emit给组件2</span>`,
  data: function() {
    return {
      info: "我是组件1的数据",
      obj: { a: 1 },
    }
  },
  mounted: function() {
    setTimeout(() => {
      // 又是注册，又是发射
      // ev.$emit("ev_bro_1", this.info);
      ev.$emit("ev_bro_1", this.obj);
    }, 1000);
  },
};
var bro_2 = {
  template: `<span>{{info}}</span>`,
  data: function() {
    return {
      info: "我是组件2的数据"
    }
  },
  mounted: function() {
    ev.$on("ev_bro_1", function(data) {
      this.info = data;

      this.info.a = 10;
    }.bind(this));
  },
};





// ---------------------------------------------axios
Vue.prototype.$http = axios;


// 拦截器
axios.interceptors.request
  .use(function(request) {
    // 发送请求时的执行函数
    console.log(request);

    // 没有返回就拦截了；
    return request;
  }, function(error) {
    return Promise.reject(error);
  });


axios.interceptors.response
  .use(function(response) {
    // 收到响应时的执行函数；
    console.log(response);

    return response;
  }, function(error) {
    return Promise.reject(error);
  });



// ------------------------------------------------------vuex
console.log(Vuex);


// ---------------------------------------------入口组件
var vm = new Vue({
  // 可以为class dom 
  el: '#app',

  data: {
    // v-for测试数据
    obj: {
      a: 1,
      b: 2
    },
    arr: [1, 2, 3, 1],


    // ----------遍历
    obj_1: {
      a: 1,
      b: 2
    },


    // -----------------------------watch:
    a: "old",



    // ------------------------------table
    tab_name: "tab_1",


    // -----------axios异步
    ajax: {
      get: "",
      post: "",
    },


  },
  components: {
    // 局部组件
    "cpt": cpt,
    'cpt_2': cpt_2,

    // 通信的兄弟组件
    "bro_1": bro_1,
    "bro_2": bro_2,


    // tab组件
    'tab_1': tab_1,
    'tab_2': tab_2,


    // 组件的属性
    "cpt_prop": cpt_prop,
  },
  // 方法
  methods: {
    _get: function() {
      this.$http.get('./test_data.js', {
          params: {
            id: 12345
          }
        })
        // 
        .then(function(res) {
          // console.log(res.data);
          this.ajax.get = res.data;
        }.bind(this))
        .catch(function(error) {
          console.log(error, 1);
        });
    },
    _post: function() {
      this.$http
        .post('/api/js_demo/font.do', {
          firstName: 'Fred',
          lastName: 'Flintstone'
        })
        .then(function(res) {
          this.ajax.post = JSON.stringify(res.data);
        }.bind(this))
        .catch(function(error) {
          console.log(error, 1);
        });
    },
    tab: function(info) {
      this.tab_name = `tab_${info}`;
    },
    _do: function(info) {
      // alert(info)
    }
  },
  // -----------------------------watch:
  watch: {
    // 指定监听
    a: function(_new, _old) {
      // console.log(_new, _old);
    },
    'ajax.get': function(_new, _old) {
      // console.log(_new, _old);
    },
    // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
    ajax: {
      // 处理函数
      handler: function(_new, _old) {
        // console.log(_new, _old);
      },
      deep: true
    },
  },
  // ------------------------------------------------声明周期
  beforeCreate: function() {},
  created: function() {},
  beforeMount: function() {},
  mounted: function() {
    setTimeout(() => {
      this.a = "new";
    }, 1000);
  },
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  destroyed: function() {}
});