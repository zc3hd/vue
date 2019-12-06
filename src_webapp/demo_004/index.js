// ------------------------------------------全局组件
var new_span_1 = Vue.extend({
  template: `<span>我是组件1</span>`,
});

// 全局注册方式
Vue.component('new_span_1', new_span_1);
// 第二种方式
// Vue.component('new_span', {
//   template: `<span>new 组件</span>`
// });


// ------------------------------------------局部组件
var new_span_2 = Vue.extend({
  template: `<span>我是组件2</span>`,
});



// ------------------------------------------tab
var tab_1 = Vue.extend({
  template: `<span>tab-1 info</span>`,
  destroyed: function() {
    // 被其他组件代替的时，该组件销毁，这个函数执行
    alert(1);
  }
});
var tab_2 = Vue.extend({
  template: `<span>tab-2 info</span>`,
});
var tab_3 = Vue.extend({
  template: `<span>tab-3 info</span>`,
});


// ------------------------------------------Vue.extend
var A = Vue.extend({
  template: `<span>我是Vue.extend继承的类，被实例化的组件</span>`,
});

// A：类
(new A()).$mount("#one");

// 为什么？测试组件可以这样用啊！！





// --------------------------------------------传递数据
// 接受数据
var son_1 = Vue.extend({
  template: `
   <span>
      子级组件，接受到父级的数据： </br>
      str：{{s_str}} </br>
      obj：{{s_obj.info}} </br>
   </span>
  `,
  // 用于要接收父亲数据的属性名，使用在本组件标签上；
  props: {
    s_str: String,
    s_obj: Object,
  },
});


// 发射数据
var son_2 = Vue.extend({
  template: `
   <span>
      子级组件： </br>
      str：{{s_str}} </br>
      obj：{{s_obj.info}} </br>
   </span>
  `,
  data: function() {
    return {
      s_str: "我是子级str上的val",
      s_obj: { info: "我是子级obj上val" }
    }
  },
  ready: function() {
    // 相当于是 给子组件自己 定义了 自己的事件名称，后面是触发事件时传入执行函数的参数
    this.$emit("str", this.s_str);

    // 注意这里发射的是对象，地址；
    this.$emit("obj", this.s_obj);


    // 直接JS混淆，对es6语法不支持；需要gulp开启babel
    setTimeout(function() {
      this.s_str = 10;
      this.$emit("str", this.s_str);
    }.bind(this), 1000);

    setTimeout((() => {
      this.s_str = 10;
      this.$emit("str", this.s_str);
    }).bind(this), 1000);


  }
});


// -------------------------------------------------------根组件
var vm = new Vue({
  // 可以为class dom 
  el: '#app',
  // 数据
  data: {
    // 动画
    key: 1,
    animate_name: 'bounce',

    // tab组件的名称
    ac: "tab_1",


    // 传递---->子组件的数据
    p_str: "我是父级str的val",
    p_obj: { info: "我是父级obj上val" },


    // 接受 来自 子组件的数据
    from_s_str: "",
    from_s_obj: null,
  },

  // 方法
  methods: {
    // 过渡
    animate: function() {
      // 我自己的--分级变化
      this.key++;
      if (this.key == 6) {
        this.key = 1;
      }

      switch (this.key) {

        case 1:
          this.animate_name = 'bounce';
          break;
        case 2:
          this.animate_name = 'flash';
          break;
        case 3:
          this.animate_name = 'pulse';
          break;
        case 4:
          this.animate_name = 'rubberBand';
          break;
        case 5:
          this.animate_name = 'shake';
          break;
      }

    },
    // 
    tab: function(info) {
      // console.log(info);
      this.ac = "tab_" + info;
    },
    // 子组件发射过来数据时，执行这些函数
    _str: function(data) {
      // console.log(data);
      this.from_s_str = data;
    },
    _obj: function(data) {
      // console.log(data);
      this.from_s_obj = data;
    }
  },
  // 
  components: {
    // 局部组件
    "new_span_2": new_span_2,
    // -----------------------------------------------tab
    "tab_1": tab_1,
    "tab_2": tab_2,
    "tab_3": tab_3,
    // -----------------------------------------------传递数据
    "son_1": son_1,
    "son_2": son_2,
  },


});