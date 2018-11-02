
# 事件

```
简写：
@click="show()";
```

## 事件对象(原生DOM操作)

```
@click="show($event)";

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
```

## 阻止冒泡

```
冒泡：最外层DOM和下层等DOM都绑定一类型事件，比如click,点最外层DOM，下层等DOM也会触发自己的事件
冒泡是往屏幕里面冒

原生：
var event = event || window.event;
if (event && event.stopPropagation) {
    event.stopPropagation();
}
else {
 event.cancelBubble = true;
}

vue:
@click.stop = "show()";

```

## 阻止默认

```
默认行为：比如contextmenu 右键事件，点击的时候，会出现的页面的右键默认行为

原生 @contextmenu($event)
event.preventDefault();        阻止默认行为

vue:
@contextmenu.prevent = "show()"
```

## 键盘事件

```
@keydown = show($event) @keyup = show($event) 

e.keyCode;[enter:13]

vue常用：
@keydown.enter = "show()";
@keydown.up = "show()";
@keydown.donw = "show()";
@keydown.left = "show()";
@keydown.right = "show()";
```


# vue的绑定属性

```
绑定自带属性或
v-bind:src = 'url';

或者新属性
v-bind:key = 'url';

简写：
:key = 'url';

!!!
:class = '[red,blue]' 
red blue是变量

:class = 'json'
json:{
    red:true,【red是真实类名，后面的true就是要】
    blue:true,
}

我自己感觉这样用更直接:）
sp_class:'red ccc',
:class='sp_class'

!!!
:style = '[c,d]'
c:{color:'red'},
d:{backgroundColor:'blue'},

:style = 'json'
json:{
    color:'red',
    backgroundColor:'blue'
}
```

# 模板

```
{{}}里面只是注入数据
{{*key}}只绑定一次数据，数据改变后不会发生改变

{{{}}} 会识别HTML结构
```

# 过滤器(数据处理)

```
{{key|lowercase|capitalize}} 小写，首字母大写
currency 钱的单位$
currency ￥ 传入参数
```

# 交互 vue-resouce

```
引入文件，在vm的原型上应该就挂了$http这个对象,promise语法
GET
me.$http
  .get('./index.js', {
    a: 1,
    b: 2,
  })
  .then(function(res) {
    console.log(res);
    me.ajax.get_msg = res.data;
  }, function() {
    /* body... */
  });


POST
me.$http
  .post('http://localhost:8080/cors-mot/station/findById.do', {
    id: 1,
  }, {
    emulateJSON: true,
  })
  .then(function(res) {
    res = res.data;
    console.log(res);
    me.ajax.post_msg = res.data.company;
  }, function() {
    /* body... */
  });


JSONP跨域取数据
me.$http
  .jsonp('http://localhost:8080/cors-mot/station/findById.do', {
    id: 1,
  }, {
    jsonp:"cb" 【callback改名】
  })
  .then(function(res) {
    res = res.data;
    console.log(res);
    me.ajax.post_msg = res.data.company;
  }, function() {
    /* body... */
  });



this.$http({
  url:地址
  data:给后台提交数据,
  method:'get'/post/jsonp
  jsonp:'cb' //cbName
})
```
