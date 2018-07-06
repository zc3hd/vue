
# bower

```
bower info vue
看所有版本

下载某个版本
bower install vue#1.0.28
```

## 过度(动画)

```
本质就是给DOM做标记，控制DOM的Css3，你看又是在控制DOM
```

* 1.首先先写出一个点击消失隐藏
```
<div class="item">
  <span @click = 'transition()'>
    transition
  </span>
</div>
<div class="demo_box" v-show='key'>
</div>
```

* 2.给要做动画的DOM加动画标记和名称
```
<div class="demo_box" v-show='key' transition = 'demo_box'>
</div>
```

* 3.就是CSS里的写了
```
>.demo_box {
  width: 200px;
  height: 200px;
  transform: translate(100%,0);
  background-color: #ccc;
}
// ===============================
>.demo_box-transition {
  transition: 1s all ease;
}
// 进入之前的状态
>.demo_box-enter{
  transform: translate(0,0);
  border-radius: 100px;
  background-color: red;
}

//中间状态这个动画，其实就是.demo_box

// 离开之后的状态
>.demo_box-leave{
  transform: translate(200%,0);
  border-radius: 100px;
  background-color: blue;
}
```

* 4.然这样vue自己写动画，你写不出花。

### 》老师的过度动画，感觉非常不好用

```
1.引入
<link rel="stylesheet" href="../script/lib/Animate_css/animate.css">

2.DOM设置，animated挂载库，给DOM写动画名字 transition='bounce'
<div class="item">
  <span @click.prevent='animate()'>
    animate
  </span>
</div>
<div class="demo_animated_box animated" transition='bounce' v-show='animate_key'>

3.vue里设置
  animate: function() {
    var me = this;
    me.animate_key = !me.animate_key;
  },

transitions: {
  bounce: {
    enterClass: 'zoomInLeft',
    leaveClass: 'zoomOutRight'
  }
},

4.注意：这里首先一个dom点击的去控制另外一个dom,就是v-show:去控制的显示隐藏
如果我写，这样，我点击下btn，让这个box抖一下，怎么弄？
```

### 》我自己想的

```
1.引入

2.挂载库 分水岭：我把要显示动画的DOM的类名进行属性绑定
 >.demo_animated_box {
  width: 200px;
  height: 200px;
  background-color: #000;
  transition: 1s all ease;
}
<div class="demo_animated_box animated" :class='box_2_class'></div>

3.设置：点击的时候加类名，1s后类名清除；【单个变化】
  animate: function() {
    var me = this;
    
     me.box_2_class = 'pulse';

     setTimeout(function () {
       me.box_2_class = '';
     },1100)
  },

3.1.多种变化
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

4.这样无论是让元素怎么变化，都会哪怕是分等级变化，都是可以的。  
```




# 组件

### 1.什么是组件 component;

```
简单来说，写的这个vm实例，绑定$mount在#app上，整体上有DOM树和自己的数据以及逻辑，这个整体就是组件。
```

### 2.使用component

* 注册组件的自己的数据的返回
```
JS:
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
全局组件
Vue.component('new_span',new_span);

// Vue.component('new_span', {
//   template: `<span>new 组件</span>`
// });

HTML:
<new_span></new_span>
```

* 局部组件使用
```
new Vew({
  components: {
    new_span: new_span,
    
    [span_1  组件的在变量内或者DOM内的直接使用名]：
    【cp_span_1 在JS内部的变量名】
    span_1: cp_span_1,
    span_2: cp_span_2,
    span_3: cp_span_3,
  },
});
```

### 3.组件模板放的位置

* 1.就放在自己的位置
```
var new_span = Vue.extend({
  template:`<span @click = 'ck()'>{{msg}}</span>`,
});
```

* 2.放在template的DOM中，标有ID，在组件中放入ID，这个的写法好处就是写在模板DOM中，sublime可以快捷的去写。

```
【标识ID】
<template id="cp_1">
  <span @click = 'ck()'>{{msg}}</span>
</template>
【放入ID】
var new_span = Vue.extend({
    template: `#cp_1`,
  });
```

* 3.其实哪种写法对我来说是一样的。我更愿意第一种写法。


### 4.组件选项卡


```
// 数据
data: {
  // ===================
  table_name:'span_1',
},
// 局部组件
components: {
  // ======================
  span_1: cp_span_1,
  span_2: cp_span_2,
  span_3: cp_span_3,
},
[span_1  组件的在变量内或者模板内的直接使用名]：
【cp_span_1 在JS内部的变量名】

<div class="item">
   <span class="blue" @click='table_name="span_1"'>cp-1</span>
   <span class="blue" @click='table_name="span_2"'>cp-2</span>
   <span class="blue" @click='table_name="span_3"'>cp-3</span>
</div>
<div class="item">
   <component :is='table_name'></component>
</div>
```


### 5.父组件 传数据 子组件

* 就是子组件在渲染的时候，把自生绑定的（父级给他绑定的）属性会拿下来，进行接受数据；
```
1.定义子组件，挂载到父组件上
components: {
  // ======================
  span_son: cp_son,
},

2.在父组件中模板中使用子组件
<div class="item">
   <span_son></span_son>
</div>
3.!!!把子组件当做DOM ，进行属性绑定
<div class="item">
   <span_son :c_data = 'c_data' :c_obj = 'c_obj'></span_son>
</div>
4.在子组件props中获取绑定属性
var cp_son = Vue.extend({
  template: `
    <span class='info'>{{msg}}{{c_data}}</span>
    <span class='info'>{{c_obj.a}}</span>
  `,
  data: function() {
    return {
      msg: `
      i am a son component of father,
      i recive a data from my father:
      `,
    }
  },
  // props:['c_data'],
  【指定要接受数据的类型】
  props:{
    c_data:String,
    c_obj:Object,
  },
});
```

* 【异想天开】：我想的是全局挂个对象，在父组件ready的时候，把数据绑到全局上，然后子组件在ready的时候拿到，单项传递是没有问题的。但是父组件变化数据的时候，子组件就不会跟着变化。所以这个方式不行，但是看到了父子组件加载的顺序。
* 【父子组件的加载顺序】：父组件加载：f1 f2，遇见子组件：s1 s2 s3 s4,然后是父组件加载 f3 f4.
* 【组件传递数据背后的原理】试着理解：
```
1.f1 初始化数据和方法，
2.f2解析指令模板，遇见子组件，
3.s1 就拿到父组件的数据 s2 s3 s4,
4.f3 f4.

```

* 数据的桥梁就是在要传递的组件上进行属性绑定。

### 6.父组件 收数据 子组件

```
1.定义s组件
var cp_send_to_f = Vue.extend({
  template: `
    <span class='info' @click='send_to_f'>{{msg}}</span>
  `,
  data: function() {
    return {
      msg: `i am a son data`,
    }
  },
  methods:{
    send_to_f:function () {
      var me = this;
      me.$emit('ev_send_to_f',me.msg);
    },
  }
});

2.在组件内部绑定事件或者周期函数中 写发送的代码，确实和聊天室那个一样，定义一个发射通道
var me = this;
me.$emit('ev_send_to_f',me.msg);

3.定义通道后，如何使用？在【s】组件上绑定这个向外的通道，后面绑定【f】组件用于接收数据的方法get_from_s
<cp_send_to_f @ev_send_to_f = 'get_from_s'></cp_send_to_f>

4.【f】组件方法内部拿到数据：
get_from_s: function(msg) {
  var me = this;
  me.f_son_msg = msg;
},
```


### 7.父组件 子组件 数据传递

* 创建，传递，接收。
* 【f-->s】:初始化数据，s_cp属性绑定，s_cp props:{}接收
* 【s-->f】:s_cp初始化数据自定义事件名称，s_cp绑定自定义事件和f_cp的方法，f_cp 方法接收











# 问题

### 1.!!! v-指令 感悟
* 所有的v指令都是DOM操作。DOM上的所有属性都作为数据。主要操作的就是当前的DOM操作

### 2.!!! component 感悟
* 简单来说，写的这个vm实例，绑定$mount在#app上，整体上有DOM树和自己的数据以及逻辑，这个整体就是组件。
* 新生成的组件就是内部有组件自己的模板DOM树，数据，逻辑。

### 综上1、2

* 指令就是对已有DOM的原生操作，而且DOM上的所有的属性都可以作为data
* 新组件就是新出现的DOM树，自己的data，自己的methods

### 3.解决前面个小的错误 和继续的问题

* 下面是以前的想法，站在现在的角度是错误的
```
vm.$mount('#box') ->  手动挂载vue程序
【用在:一个页面中，出现一个新的html,比如我经常使用的layer,给新的layer一个自己的vm_layer实例】
```
* 现在的角度：就是新出现的DOM树应该是一个新的组件，至于怎么接收数据和调用它的方法还是个问题。

### 4.解决问题3

* 父cp 给 子cp传数据解决了。尝试进行优化这个问题的demo;
* 见demo_1_1
