var vm = new Vue({
  // 可以为class dom 
  el: '#app',
  // 数据
  data: {
    // 属性
    attr: "",
    // 
    className: "",
    // 
    css: null,

    // 异步
    ajax: {
      get: "",
      post: "",
    },
  },
  // 方法
  methods: {
    // 点击
    _btn: function(e) {
      alert(e.target.nodeName);
    },
    _down: function(e) {
      alert(e.target.value);
    },
    _btn_css: function() {
      this.css = {
        color: "#" + Math.floor(Math.random() * 1000000)
      };
      // console.log(this.css);

    },



    // --------------------------异步
    _ajax_get: function() {
      this.$http
        .get('./test_data.js', {
          a: 1,
          b: 2,
        })
        .then(function(res) {
          this.ajax.get = res.data;
        }.bind(this), function() {});
    },
    // 
    _ajax_post: function() {
      this.$http
        .post('/api/js_demo/font.do', {
          id: 1,
        }, {
          emulateJSON: true,
        })
        .then(function(res) {
          // console.log(res);

          this.ajax.post = JSON.stringify(res.data);
        }.bind(this), function() {
          this.ajax.post = "aa";
        }.bind(this));
    },
  }
});