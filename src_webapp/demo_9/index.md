
# Vue2.0的变化

# template

* 不支持片段代码，必须有根组件

```
<template id="aaa">
  <div>
    <h3>我是组件</h3>
    <strong>我是加粗标签</strong>
  </div>
</template>
```

# component

```
2.0组件直接用对象标识

var Home={
  template:''
};



全局组件 
Vue.component(组件名称,{  
  data(){}
  methods:{}
  template:
});



局部组件
components:{
  'Home':Home
}
```

# 生命周期

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

# 循环

* 2.0完全可以循环重复的数据，去掉了隐式一些变量 $index $key
```
之前:
  v-for="(index,val) in array"
  track-by="id"
现在:
  v-for="(val,index) in array"
  <li v-for="(val,index) in list" :key="index">
```

# computed

* 变化的数据，可以在这，这个很有意思。
```
computed:{
    lists:function(){
        var arr=[];
        this.list.forEach(function(val){
            if(val.indexOf(this.show)!=-1){
                arr.push(val);
            }
        }.bind(this));
        return arr;
    }
}
```


# 自定义过滤器

```
之前: {{msg | toDou '12' '5'}}
v-for="ele in infos | filterBy '在'

现在:
Vue.filter('toDou',function(n,a,b){
    alert(a+','+b);
    //alert(input);
    return n<10?'0'+n:''+n;
});
{{msg | toDou('12','5')}} 只能在单个变量后用，循环中不能用

```


# 父子之间的通信

* vue1.0 

```
1. f--->s 父亲变，儿子也变。
2. :msg.sync='f_msg' 儿子变--》父亲变。

var son_cpt = Vue.extend({
  template:`{{msg}}`,
  props:{
    msg:String,
  }
});

  new Vue({
    el:"#app",
    data:{
      f_msg:"info-xxxxxxxx",
    },
    compontents:{
      son_cpt:son_cpt,
    }
  })

  #app
  <son_cpt :msg.sync='f_msg'></son_cpt>
```

* vue2.0 取消了sync。父亲给儿子传递个Object，儿子改变属性就会父亲也改变了。
原因就是：对象是引用类型，传递的地址，改变属性都会变。


# $emit(); $on();

* 单一事件管理组件通信

```
var Ev = new Vue();

var son_1 = {
  data:{
    msg:"xxxx1",
  },
  methods:{
    send(){
      var me = this;
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
      var me = this;
      Ev.$emit('son_2_send',me.msg)
    }
  }
};

var son_3 = {
  mounted(){
    var me = this;
    Ev.$on('son_1_send',function(info_1){
      me.info_1 = info_1;
    });
    Ev.$on('son_2_send',function(info_2){
      me.info_2 = info_2;
    });
  }
};


```
