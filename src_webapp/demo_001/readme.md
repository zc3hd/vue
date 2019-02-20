# Vue step 1

* 总的来说：vue的思想就是非DOM操，直接面对是数据和DOM树，那么这两者之间靠什么连接？
* 就是v-指令，和vm数据模型。其实背后就是数据监听和发布订阅者者模式；
* 所以【DOM树】+【数据】+【vm数据模型】共同构成组件cpt，也就是功能强大的模板引擎。
* 后面的学习Vue自定义指令的时候，内部其实更多的操作的还是DOM，所以v-指令是什么？是DOM操作。

### 指令

```
{{key}} 任何变量都可注入
<input type="text" value="{{info}}">
{{*key}}  只绑定一次数据
{{{}}} 识别HTML结构

v-model = "key" 

v-text 大段text注入
v-html html注入

[v-cloak]{ 在编译完成之前
  display:none;
}

 v-show='a';a:true
 v-show='arr.length==0';

<div class="item" v-for = 'ele in list'>   track-by='索引' 提高循环性能
  {{ele}}  自带参数 $index
</div>

<div class="item" v-for = 'val in obj' >  v-for = '(k,v) in obj'
  {{val}} -每项的val  自带参数$index/$key
</div>

v-on:click="btn_1()"   v-on:click="a=false"
方法内部的this，是实例，可拿到所有的方法和数据

v-on:click="_layer_del(ele.id)" 可在循环的事件绑定中插入数据
```

### 总结

* 1.新增弹窗业务：新出现的DOM树，DOM树内写v-指令是没有用的，只能是DOM树一开始要全部存在。所以对该业务，可以通过数据控制一片DOM的显示和隐藏。
* 2.因为是DOM+数据，表现为视图的HTML内会有类似JS的代码，其实这就是模板引擎。
* 3.查看某个包的版本信息：`bower info vue 或者npm info package`