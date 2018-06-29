
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

### 2.生成使用component

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

* 局部组件
```
new Vew({
  components: {
    new_span: new_span,
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

* 3.其实哪种写法对我来说是一样的。我好像更愿意第一种写法。


### 4.组件选项卡







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
