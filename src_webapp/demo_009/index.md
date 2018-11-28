# Vue step 9

* Vue2.0 变化

### 指令
```
<div> 【模板有DOM根节点】
  <h3>我是组件</h3>
  <strong>我是加粗标签</strong>
</div>


v-for="(index,val) in array" 之前:
track-by="id"

v-for="(val,index) in array" 2.0
<li v-for="(val,index) in list" :key="index">
```

### 自定义component

```
var Home={
  template:'xx'
};
components:{ 【局部组件】
  'Home':Home
}
Vue.component('Home',Home); 【全局组件 】
```

### 生命周期

```
之前:
  init  
  created               --创建实例
  beforeCompile         --编译之前，树是空的
  compiled              --编译之后，树是渲染上数据
  ready   √ ->mounted   --插入DOM树中
  beforeDestroy         --销毁之前
  destroyed             --销毁之后，组件完全失效
现在:
  beforeCreate          --组件实例刚刚被创建,属性都没有
  created               --实例已经创建完成，属性已经绑定

  beforeMount           --模板编译之前，树是空的，没有插入DOM树
  mounted               --模板编译之后，代替之前ready，

  beforeUpdate          --组件更新之前 
  updated               --组件更新完毕  （监听组件更新的一些动作可以写这）*
  
  beforeDestroy         --组件销毁前
  destroyed             --组件销毁后
```

### 通信

```
子【接收】父组件
vue2.0 取消了sync。父亲给儿子传递个Object，儿子改变属性就会父亲也改变了。原因:对象是引用类型，传递的地址，改变属性都会变。

【单一事件管理组件通信】$emit(); $on();

var Ev = new Vue();
var son_1 = {
  data:{
    msg:"xxxx1",
  },
  methods:{
    send(){
      Ev.$emit('son_1_send',me.msg)
    }
  }
};

var son_2 = {
  data:{
    msg:"xxxx2",
  },
  methods:{
    send(){
      Ev.$emit('son_2_send',me.msg)
    }
  }
};

var son_3 = {
  mounted(){
    Ev.$on('son_1_send',function(info_1){
      me.info_1 = info_1;
    });
    Ev.$on('son_2_send',function(info_2){
      me.info_2 = info_2;
    });
  }
};
```
