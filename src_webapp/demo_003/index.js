// 自定义指令
Vue.directive("myfilter", function(data) {
  // console.log(this.el);
  // console.log(data);
  // console.log(this.vm);
  if (data.info.indexOf(this.vm.filter_str_2) != -1) {
    this.el.style.backgroundColor = "blue"
  }
});



var vm = new Vue({
  // 可以为class dom 
  el: '#app',
  // 数据
  data: {
    // 生命周期
    date: {
      created: "",
      beforeCompile: "",
      compiled: "",
      ready: "",
    },
    // 配合计算数据
    a: 10,
    b: 10,

    // 自定义属性的获取
    obj: null,


    // 属性监听
    watch_a: "",
    watch_a_str: "",
    // 
    watch_obj: { info: 1 },
    watch_obj_str: "",

    // 简单成员 数组过滤
    filter_str_1: "",
    infos: [
      "你好，你在哪里？",
      "他是谁，他又在上面地方",
      "你和他的关系怎么样",
      "现在的时间是什么时候",
      "我也是这个时间",
    ],


    // 
    filter_str_2: "你",
    arr: [
      { info: "你好，你在哪里？" },
      { info: "他是谁，他又在上面地方" },
      { info: "你和他的关系怎么样" },
      { info: "现在的时间是什么时候" },
      { info: "我也是这个时间" },
    ]
  },
  // 计算属性
  computed: {
    c: function() {
      // 1. v-model拿到的数据类型是字符串!!!
      // 2. 只要是函数内部的属性名后的属性值发生改变，变化的属性值a和计算属性全部能被监听到!!!只能是单个的属性名有变化时
      this.a++;
      var num = this.b;
      console.log(num);

      return num;
    },


    new_arr: function() {
      var _arr = [];
      _arr = this.arr.filter(function(item) {
        return item.info.indexOf(this.filter_str_2) != -1;
      }.bind(this));
      // console.log(_arr);
      return _arr;
    }
  },
  // 自定义属性
  obj: {
    name: "c",
  },
  // 方法
  methods: {

  },

  // // 生命周期
  // created: function() {
  //   alert('vm实力创建完成,初始化data methods。模板没有编译；');
  //   this.date.created = "vm实力创建完成,初始化data methods。模板没有编译；";
  // },
  // beforeCompile: function() {
  //   alert('编译之前,寻找模板和指令;');
  //   this.date.beforeCompile = "编译之前,寻找模板和指令;";
  // },
  // compiled: function() {
  //   alert('编译之后 替换为我们的数据')
  //   this.date.compiled = "编译之后 替换为我们的数据";
  // },
  ready: function() {
    // alert('真实的把数据插入DOM节点中');
    this.date.ready = "真实的把数据插入DOM节点中";

    this.obj = JSON.stringify(this.$options.obj);

    // 内部的自定义属性获取
    this.$watch("watch_a", function() {
      this.watch_a_str = this.watch_a + "_" + Math.random();
    }.bind(this));

    this.$watch("watch_obj", function() {
      // vm
      // console.log(this);
      this.watch_obj_str = "watch_obj在变化_" + Math.random();

    }.bind(this), { deep: true });
  },

  // // 销毁之前
  // beforeDestroy: function() {},
  // // 销毁之后
  // destroyed: function() {},
});








// // 监听
// vm.$watch("filter_str_2", function () {
//   // vm
//   // console.log(this);

// });