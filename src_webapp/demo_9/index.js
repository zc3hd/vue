// ===================================
var nav_1 = {
  template: `
    <div class="item">
      {{msg}}
    </div>`,
  data: function() {
    return {
      msg: 'nav_1_info-xxxxxxxxxxxxxx',
    }
  },
  methods: {},
};
var nav_2 = {
  template: `
    <div class="item">
      {{msg}}
    </div>`,
  data: function() {
    return {
      msg: 'nav_2_info-xxxxxxxxxxxxxx',
    }
  },
  methods: {},
};

Vue.filter("ele_a", function(ele_info) {
  // console.log(ele_info);
  return ele_info;
});



// ===================================
// 用于接收父亲给我的数据
var son_cp = {
  template: `
    <div class="item">
      {{obj.info}}
      <span @click='change'>change</span>
    </div>
  `,
  data: function() {
    return {}
  },
  props: {
    obj: Object,
  },
  methods: {
    change: function() {
      var me = this;
      me.obj.info = 'xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxx';
    },
  }
};




// ===================================
// 2.0兄弟组件之间的通信
var ev = new Vue();
var son_cp_1 = {
  template: `
    <div class="item">
      {{info}}
      <span @click='sned'>send 1_to_3</span>
    </div>
  `,
  data: function() {
    return {
      info: 'info----------------1',
    }
  },
  methods: {
    sned: function() {
      var me = this;
      // me.obj.info = 'xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxx';
      ev.$emit('ev_1', me.info);
    },
  }
};
var son_cp_2 = {
  template: `
    <div class="item">
      {{info}}
      <span @click='change'>send 2_to_3</span>
    </div>
  `,
  data: function() {
    return {
      info: 'info----------------2',
    }
  },
  methods: {
    change: function() {
      var me = this;
      // me.obj.info = 'xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxx';
      ev.$emit('ev_2', me.info);
    },
  }
};
var son_cp_3 = {
  template: `
    <div class="item">
      {{info}}
    </div>
  `,
  data: function() {
    return {
      info: '',
    }
  },
  mounted: function() {
    var me = this;
    ev.$on('ev_1', function(info) {
      me.info = info;
    });
    ev.$on('ev_2', function(info) {
      me.info = info;
    });
  },
};









// 实例化一个对当前DOM数组件
var vm = new Vue({
  // 可以为class dom 
  el: '#app',
  // 数据
  data: {
    key: 1,
    arr: [
      // 
      {
        name: 'a',
        age: 1,
      },
      // 
      {
        name: 'a1',
        age: 1,
      },
      // 
      {
        name: 'a2',
        age: 1,
      },
      // 
      {
        name: 'b',
        age: 1,
      },
    ],
    cpt_name: 'nav_1',


    // 用于父亲给子的数据
    f_obj: {
      info: "xxxxx",
    },


    // 动画
    anim_item_str: '',
  },

  // 方法
  methods: {
    change_cpt: function(key) {
      console.log(key);
      var me = this;
      me.cpt_name = 'nav_' + key;
    },
    anim_item_ev: function() {
      var me = this;

      switch (me.anim_item_str) {
        case "zoomInLeft":
          me.anim_item_str = 'zoomOutRight';
          break;
        case "zoomOutRight":
          me.anim_item_str = 'zoomInLeft';
          break;
      }

    },

    // 动画
  },

  // 局部组件
  components: {
    nav_1: nav_1,
    nav_2: nav_2,


    // 用于接收父亲给我的数据
    son_cp: son_cp,



    // 兄弟之间的单一事件管理组件通信
    son_cp_1: son_cp_1,
    son_cp_2: son_cp_2,
    son_cp_3: son_cp_3,
  },

  // 
  beforeCreate: function() {
    /* body... */
  },
  createed: function() {
    /* body... */
  },
  mounted:function () {
    var me = this;
    me.anim_item_str = 'zoomInLeft';
  },


});