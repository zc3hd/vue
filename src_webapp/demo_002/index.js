var vm = new Vue({
  // 可以为class dom 
  el: '#app',
  // 数据
  data: {
    url: './img/1.png',
    sp_class: 'red ccc',

    ajax: {
      get_msg: "",
      post_msg: "",
    },
  },
  // 方法
  methods: {

    _change: function(e) {

    },
    _ajax_get: function() {
      var me = this;
      me.$http
        .get('./index.js', {
          a: 1,
          b: 2,
        })
        .then(function(res) {
          me.ajax.get_msg = res.data;
        }, function() {
          /* body... */
        });
    },
    // 
    _ajax_post: function() {
      var me = this;
      me.$http
        .post('http://localhost:8080/cors-mot/station/findById.do', {
          id: 1,
        }, {
          emulateJSON: true,
        })
        .then(function(res) {
          res = res.data;
          me.ajax.post_msg = JSON.stringify(res.data);
        }, function() {
          me.ajax.post_msg = "aa";
        });
    },
  }
});
