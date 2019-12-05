# Vue1.0 step_02

## 事件

```js
@click="show()"; //简写
@click="show($event)"; // 事件对象(原生DOM操作)
@click.stop = "show()"; // 阻止冒泡
@contextmenu.prevent = "show()" //阻止默认


// 键盘事件 e.keyCode;
@keydown = show($event);  @keyup = show($event);
@keydown.enter = "show()";
@keydown.up = "show()";
@keydown.donw = "show()";
@keydown.left = "show()";
@keydown.right = "show()";
```

## 属性

```html
// 绑定属性（标准和自定义） v-bind:key = 'url';   简写 :key = 'url'; 
<div class="item">
    自定义属性：<input type="text" v-model=attr>(右键查看)
    <button :key=attr> DOM-1</button>
    <button key={{attr}}> DOM-2</button>
</div>


// 设置类名属性 没有{{}}
:class='sp_class';  
// sp_class:'red ccc', 
//    sp_class为属性
//    'red ccc':属性值
<div class="item">
    类名：<input type="text" v-model=className> （预设置类名：red blue）
</div>
<div class="item" :class=className>
    类名演示区域1 :class="className"
</div>
<div class={{className}}>  // 这样写也行，但是前面不能出现class
    类名演示区域2 class={{className}}
</div>




// 设置样式
:style = 'json';
// json:{
//   color:'red',
//   backgroundColor:'blue'
// }
<div class="item">
    style背景色：<button @click=_btn_css()>背景色</button>
</div>
<div class="item" :style=css> 
    style背景色演示区域-1
</div>
<div class="item" style={{css}}>  // 这个就不行，因为css是对象，{{里面只能放入简单数据类型}}
    style背景色演示区域-2
</div>

```



## 注意!!!

* **所有的属性名和方法名**在模板内都不要加引号！！！
  * 属性值最终展示在视图上都是简单数据类型，所以不用加引号；
  * 方法也不需要加引号，没有道理；



## 请求

* `vue-resource v0.7.0`

* 引入vue-resouce.js文件，在vm的原型上就挂了$http属性名，其值为对象，具有promise语法特点；

```js
this.$http.get('./index.js', {a: 1,b: 2,})
this.$http.post('/xx.do', {id: 1,}, {emulateJSON: true,})

this.$http.jsonp('xx.do', {id: 1,}, {jsonp:"cb" }) // 跨域
```
