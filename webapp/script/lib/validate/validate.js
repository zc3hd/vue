/*
 * 验证
 */
(function($, window) {
  function Validate() {
    var me = this;
    me.isPhone = /^1\d{10}$/;
    //用户名
    me.isName = /^[\u4e00-\u9fa5a-zA-Z0-9_]{1,32}$/;
    //密码
    me.isPassword = /^(\w){6,20}$/;
  };
  Validate.prototype = {
    constructor: Validate,
    phone:function (str){
    	var me = this;
    	return me.isPhone.test(str);
    },
    // email:function (obj){
    // 	var me = this;
    // 	var str = obj.val();
    // 	return me.isEmail.test(str);
    // },
    // name: function(obj) {
    //   var me = this;
    //   var str = obj.val();
    //   return (me.stringLength(str) > 0 && me.stringLength(str) <= 32) && me.isName.test(str);
    // },
    password: function(str) {
      var me = this;
      // var str = obj.val();
      return me.isPassword.test(str);
    },
    //计算用户名长度
    stringLength: function(str) {
      var len = 0;
      for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) >= 19968 && str.charCodeAt(i) <= 40869) {
          len += 3;
        } else {
          len++;
        }
      }
      return len;
    }
  };
  conf.module["validate"] = Validate; //验证
})(jQuery, window);
