# mv--vm 

* vm可以拿到内部的所有的数据和方法


# 变量的注入

##  html{{}} 

*  任何变量直接在模板注入数据 
`{{key}} <input type="text" value="{{info}}">`


##  v-指令注入

* v-model = "key" 传说中的数据双向绑定 自由选择一个变量 
* 任何变量，数组或对象中变量名

-----------
* v-cloak vm编译完成后会消失。
```
在编译完成之前
[v-cloak]{
  display:none;
}
```


-------------
* v-text 大段text注入
* v-html html注入


---------------
* arr 循环数组  
* v-for = 'ele in list'  注意是for in 【JQ中可没有这个方法】
```
   <div class="item" v-for = 'ele in list'>
     {{ele}} 
   </div>
   自带参数 $index

  v-for="value in data"
  track-by='索引' 提高循环性能
  track-by='$index/uid'
```


---------------
* obj 遍历
* v-for = 'val in obj' 
```
 <div class="item" v-for = 'val in obj' >
    {{val}} --是真的每项项的val 
  </div>
  自带参数 $index  $key 就是那个key
```
* v-for = '(k,v) in obj'


---------------
* v-show DOM的显示和消失
```
 v-show='a';
 a:true

 v-show='arr.length==0'; 里面也可以写判断式
```


---------------
* 事件
```
v-on:click="btn_1()" -- methods:{}
+ 方法内部的this，就是我们实例化的那个东西vm，可以拿到所有 的方法和数据
+ 写了个简单的数据添加
+ 感悟：所有的都是以数据为核心的，
+ 所有的变量可以都看做为原来的全局变量

简单进行赋值
v-on:click="a=false"
```



# 问题

### 1.对于新渲染的HTML里，再次注入数据是没有用的，必须是已经出现的DOM
* A:直接把要写的dom写在里面，通过控制v-show的数据进行显示和相应的改变数据

### 2.如何获取事件对象的里面的属性值？
```
循环中可以在函数中注入ele，函数内部可以拿到数据,这种做法是绕过去上面的问题了。
v-on:click="_layer_del(ele.id)"

_layer_del: function(id) {
    var me = this;
    // 记录ID
    me.user_obj.ac_id = id;

    me.user_obj.show = true;

    // add
    me.user_obj.show_add = false;
    // del
    me.user_obj.show_del = true;
    // upd
    me.user_obj.show_upd = false;
},

真是的拿到DOM的属性，还的是传入事件对象，在事件对象上进行原生JS的属性操作。
```

