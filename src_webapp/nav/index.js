(function($, window) {
  function Nav(opts) {
    var me = this;

    // api
    me.api = {
      out: {
        url: '/logout.do'
      },
    };
  };
  Nav.prototype = {
    init: function() {
      var me = this;

      // 
      me._bind();
      // 折叠
      me._fold();
      // 系统的切换
      me._system();
      // 退出登录
      me._out();


    },
    _bind: function() {
      var me = this;
      var fn = {
        // 折叠
        _fold: function() {
          $('#zedie_btn').on('click', function() {
            // kai--->guan
            if ($('#zedie_btn').attr('key') == 1) {
              $('#zedie_btn').attr('key', 0).html('>>');
              $('#app').css('padding-left', 0);
              $('#left').css('left', '-220px');
            }
            // guan---kai
            else {
              $('#zedie_btn').attr('key', 1).html('<<');
              $('#app').css('padding-left', "220px");
              $('#left').css('left', 0);
            }
          });
        },
        _es6_test: function() {

          // 默认传值
          function Point(x = 0, y = 0) {
            this.x = x;
            this.y = y;
          }


          // 参数：对象  固定属性默认赋值
          function foo({ x, y = 1 }) {
            console.log(x, y);
          }

          foo({});


          console.log('===============')

          // var person = {
          //   name: 'abc',
          //   age: 16,
          //   showName: () => {
          //     console.log(person.name);
          //   },
          //   showAge: () => {
          //     console.log(person.age);
          //   }
          // };
          // person.showName();
          window.conf = {
            moudlus: {},
          };
          (function($, window) {
            class Person { //类
              constructor(name = 'zs', age = 12) {
                this.name = name;
                this.age = age;
              }
              init() {
                var me = this;
                // me.showName()
                //   .showAge()
                me.get_data();
              }
              showName() {
                var me = this;
                console.log(me.name)
                return me;
              }
              showAge() {
                var me = this;
                console.log(me.age);
                return me;
              }
              get_data() {
                var me = this;

                var p1 = new Promise(function(resolve, reject) {
                  setTimeout(function() {
                    resolve(1);
                  }, 1000);
                });
                var p2 = new Promise(function(resolve, reject) {
                  setTimeout(function() {
                    resolve(2);
                  }, 5000);
                });

                // promise 可以继续往下传递
                // p1
                //   .then(function(data) {
                //     console.log(data);
                //     return data + 1;
                //   })
                //   // 可以往下传递
                //   .then(function(data) {
                //     console.log(data);
                //     return data + 1;
                //   });


                // 用于所有的请求一起进行，不通过代码上阻塞
                // 但只有数组里有一个被拒绝，就会走 下面第二个函数
                Promise.all([p1, p2])
                  .then(function(value) {
                    console.log('成功了,' + value); //成功了,true,3
                  }, function(value) {
                    console.log('错误了,' + value);
                  });


                return me;
              }
            }
            conf.moudlus.Person = Person;
          })(jQuery, window);
        },
        // --------------------------------------------------系统切换
        _system: function() {
          var key = '';
          var nav_arr = null;
          $('#system_sel').on('click', '.one', function(e) {
            // 样式
            $('#system_sel>.one')
              .removeClass('one_active');
            $(e.currentTarget)
              .addClass('one_active');

            key = $(e.currentTarget).attr('key');


            // 服务
            if (key == 'fuwu') {
              nav_arr = nav_fuwu_data;
            }
            // 运营
            else if (key == 'yuny') {
              nav_arr = nav_yuny_data;
            }
            // 测试
            else if (key == 'ceshi') {
              nav_arr = nav_ceshi_data;
            }



            // 默认选择第一个系统
            me._nav_load(nav_arr);

          });


          // 默认选择第一个系统
          me._nav_load(nav_fuwu_data);

        },
        // --------------------------------------------------默认加载第一项
        _nav_first: function() {
          // $('#list>div').first()[0]
          // console.log($('#list>div').first()[0])
          var url = $('#list>div').first().attr('_url');

          // 只有一级菜单
          if (url != undefined) {
            me._nav_e_parent($('#list>div').first()[0]);
          }
          // 有二级菜单的一级菜单
          else {
            me._nav_e_parent($('#list>div').first()[0]);
            me._nav_e_son($('#list>.s_item').first()[0]);
          }
          // console.log();
        },
        // --------------------------------------------------加载数据
        _nav_load: function(arr) {
          var str = '';
          arr.forEach(function(ele, index) {
            // 只有一级
            if (ele.url) {
              str += `
                <div class="p_item" _url=${ele.url}>
                  <div class="box">
                    <div class="img">
                      <img src="${ele.img}" alt="">
                    </div>
                    <div class="info">${ele.name}</div>
                    <div class="jiant"></div>
                  </div>
                </div>
              `;
            }
            // 有二级菜单
            else {
              str += `
                <div class="p_item one_item" _sons='${JSON.stringify(ele.sons)}''>
                  <div class="box">
                    <div class="img">
                      <img src="${ele.img}" alt="">
                    </div>
                    <div class="info">${ele.name}</div>
                    <div class="jiant iconfont icon-jiantou"></div>
                  </div>
                </div>
              `;
            }
          });

          $('#list')
            .html(str)
            .off()
            // 一级菜单绑定事件
            .on('click', '.p_item', function(e) {
              // console.log(e);
              me._nav_e_parent(e.currentTarget);
            })
            // 二级菜单的点击事件
            .on('click', '.s_item', function(e) {
              // console.log(e)
              me._nav_e_son(e.currentTarget);
            });

          // 默认加载第一项
          me._nav_first();
        },
        // --------------------------------------------------点击事件
        // 一级菜单的点击事件
        _nav_e_parent: function(dom) {
          if ($(dom).hasClass('p_active')) {
            return;
          }
          // 一级菜单样式的变化
          $('#list>.p_item').removeClass('p_active');
          $(dom).addClass('p_active');
          // 其他一级样式的复原
          $('#list>.one_item')
            .find('.jiant')
            .removeClass('icon-iconfontjiantou')
            .addClass('icon-jiantou');
          // 删除二级菜单
          $('#list>.s_item').remove();

          // 一级菜单
          if ($(dom).attr('_url')) {
            // 直接渲染
            $('#optionView').attr('src', $(dom).attr('_url'));
          }
          // 有二级菜单
          else {

            // 一级菜单样式的改变
            $(dom)
              .find('.jiant')
              .removeClass('icon-jiantou')
              .addClass('icon-iconfontjiantou');

            // 添加二级菜单
            var sons = JSON.parse($(dom).attr('_sons'));
            var str = '';
            sons.forEach(function(ele, index) {
              str += `
              <div class="s_item" _url = ${ele.url}>
                <div class="box">
                  <div class="one"></div>
                  <div class="info">${ele.name}</div>
                </div>
              </div>
              `;
            });
            $(dom).after(str);
          }
        },
        // 二级菜单的点击事件
        _nav_e_son: function(dom) {
          if ($(dom).hasClass('s_active')) {
            return;
          }
          $('#list>.s_item').removeClass('s_active');
          $(dom).addClass('s_active');
          $('#optionView').attr('src', $(dom).attr('_url'));
        },
        _out: function() {
          $('#out').click(function() {
            layer.open({
              type: 1,
              title: false,
              area: ['300px', '112px'],
              skin: 'cc_layer',
              anim: 1,
              shade: 0.6,
              content: `
              <div class="del_box">确认退出么？</div>
              `,
              btn: ['确认'],
              success: function() {
                $('.del_box').css({
                  width: "100%",
                  height: "60px",
                  lineHeight: "60px",
                  fontSize: "20px",
                  textAlign: "center",
                  color: "#fff",
                  backgroundColor: "#234",
                });
              },
              yes: function(index, layero) {
                var Load_index = FN.load();


                // me.api.del({
                //     id: $(e.currentTarget).attr('key')
                //   })
                FN.ajax(me.api.out)
                  .done(function(data) {
                    /* body... */
                    if (data.ret == 0) {
                      layer.close(index);
                      layer.close(Load_index);

                      window.location.href = "../index.html";
                    }
                  });

              },
            });
          });
        },
      };
      for (var k in fn) {
        me[k] = fn[k];
      };
    },
  };
  conf.module["Nav"] = Nav;
})(jQuery, window);
