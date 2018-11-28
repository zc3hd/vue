var cpt_a = Vue.extend({
  template: `
    <div class="cpt_a" id="cpt_a">
      组件A的业务
    </div>
  `,
  data() {
    return {}
  },
});



if (conf.dev) {
  new Vue({
    // 可以为class dom 
    el: 'body',
    components: {
      cpt_a: cpt_a
    },
  });
}
