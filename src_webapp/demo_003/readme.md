# Vue step 3

### 生命周期

```
created: vm实力创建完成
beforeCompile: 编译之前 寻找模板 指令 
compiled: 编译之后 替换为我们的数据

ready:真实的把数据插入DOM节点中,可加载自己的初始化函数

beforeDestroy: 销毁之前,自己写的实时数据，用于停止定时器
destroyed:销毁之后
```

### 计算属性

```
data:{
  a:1,
}
computed:{
  b:function(){  场景：一个变量依赖多个变量而变化，和vm.$watch有点相对的感觉
    return this.a+1;
  }
}
```

### vue实例属性和方法

```
vm.$el  DOM元素
vm.$data  data
vm.$options  获取自定义属性

vm.$mount('#box') 手动挂载vue对象
vm.$destroy()   销毁vm实例
vm.$watch(name,fnCb,{deep:true});  深度监听，但是只能监听一个变量
```


### Vue.directive

```
Vue.directive('red',function(参数){
  this.el -> 要知道是当前指令所在DOM的原生DOM元素
});

<div v-red='a'></div>  使用(接收数据)
场景：就是某些DOM都有一些共同的特性，可以加这个指令，比如拖拽，动画....
```

### 总结

* 计算属性是一个变量由很多变量引起变化而变化的。vm.$watch就是监听某个变量变化而响应一个函数。
* Vue.directive自定义指令，其实用在DOM树中的指令都是包装了DOM操作。可以想到官方的v-指令。