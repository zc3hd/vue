# Vue1.0 step_04

## animate.css

* 本质还是给DOM做类名绑定，背后还是把指令后面的属性名的值赋值给DOM节点上；
* 1.引入：
```html
<link rel="stylesheet" href="../script/lib/Animate_css/animate.css">
```

* 2.给添加动画的盒子 增加过渡类名

```css
.demo_animated_box {
  transition: 1s all ease;
}
```

* 3.盒子添加类名

```html
<div class="item demo_animated_box animated" :class=animate_name>
    演示区域
</div>
```

* 4.事件控制类名的变化

```js
animate: function() {
    // 我自己的--分级变化
    this.key++;
    if (this.key == 6) {
        this.key = 1;
    }

    switch (this.key) {
        case 1:
            this.animate_name = 'bounce';
            break;
        case 2:
            this.animate_name = 'flash';
            break;
        case 3:
            this.animate_name = 'pulse';
            break;
        case 4:
            this.animate_name = 'rubberBand';
            break;
        case 5:
            this.animate_name = 'shake';
            break;
    }
},
```



## component

* 什么是component？【DOM树】+【数据】+【vue实例（指令）】

```js
// ------------------------------------------全局组件
var new_span_1 = Vue.extend({
  template: `<span>我是组件1</span>`,
});

// 全局注册方式
Vue.component('new_span_1', new_span_1);
// 第二种方式
// Vue.component('new_span', {
//   template: `<span>new 组件</span>`
// });


// ------------------------------------------局部组件
var new_span_2 = Vue.extend({
  template: `<span>我是组件2</span>`,
});


// 局部组件 注册：
new Vew({ 
  // 注意这个单词
  components: {
      "new_span_2": new_span_2, // 前面的new_span在DOM树中是属性名,后面的new_span在实例中是变量。
  },
});
```

* 使用：

```html
<div class="item">
    全局组件：
    <new_span_1></new_span_1>
</div>
<div class="item">
    局部组件：
    <new_span_2></new_span_2>
</div>
```

* 模板：

```js
// 模板写在JS内
var new_span = Vue.extend({ 
  template:`<span @click=ck()>{{msg}}</span>`,
});

// HTML 中：
// <template id="cp_1">
//     <span @click=ck()>{{msg}}</span>
// </template>
var new_span = Vue.extend({ 
  template:"#tpl_1",
});
```





## tab选项卡

* 创建tab组件

```js
// ------------------------------------------tab
var tab_1 = Vue.extend({
  template: `<span>tab-1 info</span>`,
  destroyed: function() {
    // 被其他组件代替的时，该组件销毁，这个函数执行
    alert(1);
  }
});
var tab_2 = Vue.extend({
  template: `<span>tab-2 info</span>`,
});
var tab_3 = Vue.extend({
  template: `<span>tab-3 info</span>`,
});
```

* 注册组件

```js
  
  components: {
    // -----------------------------------------------
    "tab_1": tab_1,
    "tab_2": tab_2,
    "tab_3": tab_3,
  },
  data: {
    // tab组件的名称
    ac: "tab_1",
  },
  methods: {
    tab: function(info) {
      this.ac = "tab_" + info;
    }
  },
```

* HTML使用

```html
<div class="item">
    <button @click=tab(1)>tab-1</button>
    <button @click=tab(2)>tab-2</button>
    <button @click=tab(3)>tab-3</button>
</div>
<div class="item">
    <component :is=ac></component>
</div>
```

* @click = tab(1):
  * 事件后面能写函数就写函数，1是传入的参数；
  * 单独的JS需要加引号；

* **拓展：tab选项卡完全可以设计为隐藏的路由；**







## .子组件【接收】父组件的数据：子组件设置个【接收】的变量

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



## 父子传递

### 父级--->子级

* 1.定义子组件

```js
var son_1 = Vue.extend({
  template: `
   <span>
      子级组件，接受到父级的数据： </br>
      str：{{s_str}} </br>
      obj：{{s_obj.info}} </br>
   </span>
  `,
  // 用于要接收父亲数据的属性名，使用在本组件标签上；
  props: {
    s_str: String,
    s_obj: Object,
  },
});
```

* **props用于要接收父亲数据的属性名，使用在本组件标签上；**
* 2.注册组件及使用

```html
<div class="item">
    父级组件： </br>
    p_str :{{p_str}} <input type="text" v-model=p_str> </br>
    p_obj.info :{{p_obj.info}} <input type="text" v-model=p_obj.info></br>
</div>
<h6>&nbsp;</h6>
<div class="item">
    <son_1 :s_str=p_str :s_obj=p_obj></son_1>
</div>
```

* 3.**父亲数据变，子级也会跟着变**：因为父级的数据属性都被数据劫持设置了，只要发生变化，针对子组件的`:s_str=p_str :s_obj=p_obj`就相当于会重新赋值，重新传递；

### 子级--->父级

* 1.自定义子组件：
  * **this.$emit  相当于是 给子组件自己 定义了 自己的事件名称，后面是触发事件时传入执行函数的参数**
  * 也是触发该事件；

```js
// 发射数据
var son_2 = Vue.extend({
  template: `
   <span>
      子级组件： </br>
      str：{{s_str}} </br>
      obj：{{s_obj.info}} </br>
   </span>
  `,
  data: function() {
    return {
      s_str: "我是子级str上的val",
      s_obj: { info: "我是子级obj上val" }
    }
  },
  ready: function() {
    // 相当于是 给子组件自己 定义了 自己的事件名称，后面是触发事件时传入执行函数的参数
    this.$emit("str", this.s_str);

    // 注意这里发射的是对象，地址；
    this.$emit("obj", this.s_obj);

  }
});
```

* 2.使用：
  * 子组件可以使用时，就会触发自定义的事件。
  * 触发事件，就会执行后面的函数；

```html
<div class="item">
    <son_2 @str=_str @obj=_obj></son_2>
</div>
<div class="item">
    父级组件： </br>
    str :{{from_s_str}} </br>
    obj :{{from_s_obj.info}} </br>
</div>
```

* 3.被执行的父级的函数：

```js
    // 子组件发射过来数据时，执行这些函数
    _str: function(data) {
      // console.log(data);
      this.from_s_str = data;
    },
    _obj: function(data) {
      // console.log(data);
      this.from_s_obj = data;
    }
```

* 子级数据变化，父级数据如何变化？

  * 若传递的是对象，其实传递的是地址，修改同一个地址上的数据，都会跟着变化；
  * 若传递的是简单类型，父级数据不会发生改变，若要改变需要重新发送；

  ```js
  setTimeout(() => {
      this.s_str = 10;
      this.$emit("str", this.s_str);
  }.bind(this), 1000);
  ```