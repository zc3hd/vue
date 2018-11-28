var cpt_b = Vue.extend({
  template: `
    <div class="cpt_b" id="cpt_b">
      组件B的业务
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
      cpt_b: cpt_b
    },
  });
}
