
# 生命周期

```
// 生命周期
// vm实力创建完成--初始化data methods
created:function () {
  console.log(1);
},
// 编译之前 寻找模板 指令 
beforeCompile:function () {
  /* body... */
  console.log(2);
},
// 编译之后 替换为我们的数据
compiled:function () {
  /* body... */
  console.log(3);
},
// 真实的把数据插入DOM节点中
ready:function () {
  console.log(4);
},

// 销毁之前
beforeDestroy:function () {
  /* body... */
},
// 销毁之后
destroyed:function () {
  /* body... */
},


使用场景：
ready：真实的把初始化数据插入DOM节点中后可以加载加载自己的函数
beforeDestroy：自己写的实时数据，用于停止定时器。
```

# 计算属性

```
data:{
  a:1,
}
computed:{
  b:function(){
    return this.a+1;
  }
}

computed:{
    b:{
      get:
      set:
    }
  }
* computed里面可以放置一些业务逻辑代码，一定记得return


【这样不行么？】
// 数据
data: {
  a: 1,
  b: 0,
},
// 方法
methods: {
  add: function() {
    vm.a++;
    vm.b = vm.a + 1;
  },
},
```

# VUE的实例方法

```
vm.$el  ->  就是DOM元素
vm.$data  ->  就是data

vm.$mount('#box') ->  手动挂载vue程序
【这个就是可以用在一个页面中，出现一个新的html,比如我经常使用的layer,给新的layer一个自己的vm_layer】

vm.$options ->   获取自定义属性
vm.$destroy() ->   销毁vm自己这个实力

监听数据变化
vm.$watch(name,fnCb);  //浅度
vm.$watch(name,fnCb,{deep:true});  //深度监视 

在实例下面使用
vm.$watch('a',function(){...}); 
```

# filter过滤器

```
v-for="ele in infos | filterBy '在'
用于全站的信息搜索还有点用


```

# Vue.directive 自定义指令[DOM操作]

```
定义
Vue.directive('red',function(参数){
  this.el -> 要知道是当前指令所在DOM的原生DOM元素
});

使用(可以接收数据)
<div v-red='a'></div>

使用场景：就是某些DOM都有一些共同的特性，可以加这个指令
比如拖拽，动画....
```











# 问题

### 1.计算属性，官方用法么？
* 我感觉直接在方法内部改变所有的变量不是一样么？!

### 2.vm.$mount 用在新出现的htmls手动绑定vm,问题就是这个组件怎么接收调用它的组件的数据？
* 组件之间如何传递数据

### 3.注意Vue方法和vm方法的使用
* Vue.directive自定义指令用在前，用于原生DOM的一些操作，就是DOM使用。
* vm.$mount('#box'),就是第二个问题
* vm.$watch('a'),监听变量，我觉得完全取代computed属性。

### 4.[!!!]v-指令
* 想下，官方的所有的指令或者自定义是不是都是些DOM操作的封装，通过this.el拿到DOM，比如:

```
:key = 'key' （class style）属性绑定
@click='add()';  事件绑定
v-show = false; 
```
