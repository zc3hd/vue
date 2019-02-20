# Vue step 4

### 动画

* 本质还是给DOM做类名绑定，折射出vue的数据基本不是配置,就是DOM的属性数据。
```
1.引入
<link rel="stylesheet" href="../script/lib/Animate_css/animate.css">

2.把要显示动画的DOM的类名进行绑定 :class='box_2_class'
 >.demo_animated_box {
  transition: 1s all ease;
}
<div class="demo_animated_box animated" :class='box_2_class'></div>

3.单个变化
  animate: function() {
    var me = this;
     me.box_2_class = 'pulse';
     setTimeout(function () {
       me.box_2_class = '';
     },1100)
  },

4.多种变化
animate: function() {
  var me = this;

  me.box_2_level++;
  if (me.box_2_level > 5) {
    me.box_2_level = 1;
  }
  switch (me.box_2_level) {
    case 1:
      me.box_2_class = 'bounce';
      break;
    case 2:
      me.box_2_class = 'flash';
      break;
    case 3:
      me.box_2_class = 'pulse';
      break;
    case 4:
      me.box_2_class = 'rubberBand';
      break;
    case 5:
      me.box_2_class = 'shake';
      break;
  }
},
```

### component

* 什么是component？就是前面说的【DOM树】+【数据】+【vue实例（指令）】

##### 1.自定义component
```
var new_span = Vue.extend({ 
  template:`<span @click = 'ck()'>{{msg}}</span>`,
  data:function () {
    return {
      msg:'new_span_msg',
    }
  },
  methods:{
    ck:function () {
      var me = this;
      console.log(me.msg);
    },
  },
});

new Vew({ 【局部组件】
  components: {new_span: new_span,},
});
前面的new_span在DOM树中是val,后面的new_span在实例中是变量。


Vue.component('new_span',new_span); 【全局】
Vue.component('new_span', {
  template: `<span>new 组件</span>`
});

<new_span></new_span>【使用】
```

##### 2.component-table选项卡
```
data: {
  table_name:'span_1',
},
// 局部组件
components: {
  span_1: cp_span_1,
  span_2: cp_span_2,
  span_3: cp_span_3,
},

<div class="item">
   <span class="blue" @click='table_name="span_1"'>cp-1</span>
   <span class="blue" @click='table_name="span_2"'>cp-2</span>
   <span class="blue" @click='table_name="span_3"'>cp-3</span>
</div>
<div class="item">
   <component :is='table_name'></component>
</div>
```

##### 3.子组件【接收】父组件的数据：子组件设置个【接收】的变量
```
1.定义要【接收】的变量
var cp_son = Vue.extend({
  template: `
    <span class='info'>{{c_data}}</span>
    <span class='info'>{{c_obj.a}}</span>
  `,
  data: function() {
    return {
    }
  },
  props:{ 【指定要接收父亲数据的属性】
    c_data:String,
    c_obj:Object,
  },
});

2.挂载
components: {
  span_son: cp_son,
},

3.使用：类似属性绑定
<div class="item">
   <span_son :c_data = 'c_data' :c_obj = 'c_obj'></span_son>
</div>

4. :c_data.sync='c_data' 儿子变--》父亲变。
```

##### 4.子组件【发射】给父组件的数据：子组件设置【发射】的事件

```
1.定义子组件要【发射】的事件
var cp_send_to_f = Vue.extend({
  template: `<span class='info' @click='send_to_f'>{{msg}}</span>`,
  data: function() {
    return {msg: `i am a son data`,}
  },
  methods:{
    send_to_f:function () {
      var me = this;
      定义【发射】事件通道
      me.$emit('ev_send_to_f',me.msg);
    },
  }
});

2.使用：注意get_from_s后面没有参数
<cp_send_to_f @ev_send_to_f = 'get_from_s'></cp_send_to_f>

3.父组件方法内拿到数据：
get_from_s: function(msg) {
  var me = this;
  me.f_son_msg = msg;
},
```

### 总结

* 设计到组件，就会有【DOM树】+【数据】+【vue实例（指令）】，这里的DOM一定是已经存在页面的，新出现的不能被绑定一个实例。
* 有了组件，就可以重新修改 增删改查，demo_004_1
