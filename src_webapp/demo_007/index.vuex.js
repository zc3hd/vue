var vuex_cpt_1 = {
  name: "cpt_1",
  template: `<div class="item">
    <div>cpt_1</div>
    <div>num：{{num}}</div>
    <div>other：{{other}}</div>
    <button @click=add>num++</button>
  </div>`,
  // 引用公共属性要放在这里啊。
  computed: {
    num: function() {
      return this.$store.state.num;
    },
    other: function() {
      return this.$store.state.other;
    },
  },
  methods: {
    add: function() {
      // this.$store.commit('add', 'xx');
      this.$store.commit('add', Math.random());
    },
  }
};
var vuex_cpt_2 = {
  name: "cpt_2",
  template: `<div class="item">
    <div>cpt_2</div>
    <div>num：{{num}}</div>
    <button @click=add>num++</button>
  </div>`,
  // 引用公共属性要放在这里
  computed: {
    num: function() {
      return this.$store.state.num;
    },
  },
  methods: {
    add: function() {
      this.$store.commit('add', 'xx');
    },
  }
};


// 根组件
var vuex_box = {
  template: `
    <div id="vuex_box">
      <div class="box">

        <h1>vuex@2.0.0</h1>

        <h6>&nbsp;</h6>
        <cpt_1></cpt_1>

        <h6>&nbsp;</h6>
        <cpt_2></cpt_2>
        
      </div>
    </div>
  `,
  data: function() {
    return {}
  },
  components: {
    // tab组件
    'cpt_1': vuex_cpt_1,
    'cpt_2': vuex_cpt_2,
  },
};


// 
new Vue({
  // 绑定组件
  el: '#vuex_box',
  // 
  render: h => h(vuex_box),

  store: store,
});