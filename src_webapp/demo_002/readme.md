# Vue step 2

### 指令

```
@click="show()"; 简写

@click="show($event)"; 事件对象(原生DOM操作)
  // 直接设置样式
  e.target.style

  // 属性
  e.target.getAttribute('key');
  e.target.setAttribute('key', 2);

  // 类名的获取和设置
  e.target.className
  e.target.className = 'cc asd';

  // 子节点的获取的设置
  e.target.innerHTML
  e.target.innerHTML = `<i>cc</i>`;


  // DOM定位
  e.target.parentNode;
  // 下一个兄弟DOM
  e.target.nextElementSibling || e.target.nextSibling;
  // 上一个兄弟DOM
  e.target.previousElementSibling || e.target.previousSibling;
  // 第一个子DOM
  e.target.firstElementChild || e.target.firstChild;
  // 最后一个子DOM
  e.target.lastElementChild || e.target.lastChild;
  // 所有的子DOM数组
  e.target.children;


  // DOM操作
  var d = document.createElement("div");
  // 复制
  var newBox = box.cloneNode(true);
  // 从后添加DOM
  b.appendChild(d);
  // 从前面添加一个 
  b.insertBefore(d2, null);
  // 删除
  var box = document.getElementById("box");
  var box2 = document.getElementById("box2");
  // 删除父节点下指定的DOM
  box.removeChild(box2);
  // 删除自己
  box.parentNode.removeChild(box);
---------------------------------------------

@click.stop = "show()"; 阻止冒泡（冒泡是往屏幕里面冒）

@contextmenu.prevent = "show()" 阻止默认

@keydown = show($event) 键盘事件 e.keyCode;
@keyup = show($event) 
@keydown.enter = "show()";
@keydown.up = "show()";
@keydown.donw = "show()";
@keydown.left = "show()";
@keydown.right = "show()";
---------------------------------------------

v-bind:key = 'url'; 绑定属性
:key = 'url'; 简写

:class='sp_class';  sp_class:'red ccc', red ccc代表数据的变量

:style = 'json';
json:{
  color:'red',
  backgroundColor:'blue'
}

```


### vue-resouce

```
引入文件，在vm的原型上应该就挂了$http这个对象,promise语法

me.$http.get('./index.js', {a: 1,b: 2,})
me.$http.post('xx.do', {id: 1,}, {emulateJSON: true,})
me.$http.jsonp('xx.do', {id: 1,}, {jsonp:"cb" }) 跨域
```
