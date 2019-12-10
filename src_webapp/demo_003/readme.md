# Vue1.0 step_03

## 生命周期

```js
  // 生命周期
  created: function() {
    alert('vm实力创建完成,初始化data methods。模板没有编译；');
    this.date.created = "vm实力创建完成,初始化data methods。模板没有编译；";
  },
  beforeCompile: function() {
    alert('编译之前,寻找模板和指令;');
    this.date.beforeCompile = "编译之前,寻找模板和指令;";
  },
  compiled: function() {
    alert('编译之后 替换为我们的数据')
    this.date.compiled = "编译之后 替换为我们的数据";
  },
  ready: function() {
    alert('真实的把数据插入DOM节点中');
    this.date.ready = "真实的把数据插入DOM节点中";

    this.obj = JSON.stringify(this.$options.obj);
  },

  // 销毁之前
  beforeDestroy: function() {},
  // 销毁之后
  destroyed: function() {},
```



## 计算属性

```js
var vm = {
    data: {
        // 配合计算数据
        a: 10,
        b: 10,
    },
    // 计算属性
    computed: {
        c: function() {
            // 1. v-model拿到的数据类型是字符串!!!
            // 2. 只要是函数内部的属性名后的属性值发生改变，变化的属性值a和计算属性全部能被监听到!!!
            this.a++;
            var num = this.b;
            console.log(num);
			
            // 返回值；
            return num;
        },
    },
}
```

* 特点：
  * 有返回值；
  * 函数内部：只能是单个属性名有变化 this.a this.b；



## vm实例

* 拿到实例

```js
var vm = new Vue({...});
```

### 属性

```js
// vm.$el  DOM元素
// vm.$data  data
// vm.$options  获取自定义属性

  ready: function() {
    // alert('真实的把数据插入DOM节点中');
    this.date.ready = "真实的把数据插入DOM节点中";
	
    // 在初始化中获取自定义属性（保存一些私有属性？？）
    this.obj = JSON.stringify(this.$options.obj);
  },
```

### 方法

```js
// vm.$mount('#box') 手动挂载vue对象
// vm.$destroy();   销毁vm实例
// vm.$watch(name,fnCb,{deep:true});  深度监听，但是只能监听一个变量

ready: function() {
    // alert('真实的把数据插入DOM节点中');
    this.date.ready = "真实的把数据插入DOM节点中";

    this.obj = JSON.stringify(this.$options.obj);


    // 内部的自定义属性获取
    // con
    this.$watch("watch_a", function() {

        this.watch_a_str = this.watch_a + "_" + Math.random();
    }.bind(this));

    this.$watch("watch_obj", function() {
        // vm
        // console.log(this);
        this.watch_obj_str = "watch_obj在变化_" + Math.random();

    }.bind(this), { deep: true });
},
```

* vm.$watch使用位置：ready函数里面、外面都可以；
* 功能：
  * 监听简单值的属性名
  * 监听复杂值的属性名   { deep: true }
* **与计算属性computed的异同：**
  * 相同：都是监听属性名后面值的变化；
  * 不同：
    * computed：可以监听多个属性名后的值的变化，然后会导致一个属性名值（也是属性）的变化；
    * vm.$watch：监听一个属性名值的变化，导致多个属性名的值跟着变化；







## 数组过滤

### 简单成员

* filterBy filter_str_1：过滤每一项内容，包含filter_str_1的成员会被筛选出来；

```html
<div class="box">
    <h1>(简单成员)数组过滤</h1>
    <div class="item">
        输入过滤关键字：<input type="text" v-model="filter_str_1">
    </div>
    <div class="item" v-for="ele in infos | filterBy filter_str_1">
        <!-- v-for 比较特别，多个单词组成，加引号 -->
        {{ele}}
    </div>
</div>
<script>
    var data = {
        // 简单成员 数组过滤
        filter_str_1: "",
        infos: [
            "你好，你在哪里？",
            "他是谁，他又在上面地方",
            "你和他的关系怎么样",
            "现在的时间是什么时候",
            "我也是这个时间",
        ],
    }
</script>
```

### 复杂成员

```html
<div class="box">
    <h1>(复杂成员)数组过滤</h1>
    <div class="item">
        输入过滤关键字：<input type="text" v-model=filter_str_2>
    </div>
    <div class="item" v-for="ele in new_arr">
        {{ele.info}}
    </div>
</div>
<script>
    var vm = {
        data:{
            // 复杂成员：
            filter_str_2: "你",
            arr: [
                { info: "你好，你在哪里？" },
                { info: "他是谁，他又在上面地方" },
                { info: "你和他的关系怎么样" },
                { info: "现在的时间是什么时候" },
                { info: "我也是这个时间" },
            ]
        },
        computed: {
            // 把new_arr 属性 放在视图中进行遍历
            new_arr: function() {
                var _arr = [];
                _arr = this.arr.filter(function(item) {
                    return item.info.indexOf(this.filter_str_2) != -1;
                }.bind(this));
                // console.log(_arr);
                return _arr;
            }
        },
    }
</script>
```

* 为什么不使用 vm.$watch？按道理是可以的；
  * 使用vm.$watch ，监听 filter_str_2，
  * 内部也得 初始化一个新的数组，
  * 把新过滤出来的数组 赋值 data 上的属性 new_arr；
* 只不过computed 可以监听多个属性的变化，而引起某个computed的属性名后面值的变化；









## Vue.directive

* 创建：写在实例vm的前面；

```js
Vue.directive("myfilter", function(data) {
  // this.el -> 当前指令所在DOM的原生DOM元素
  // console.log(data);  参数
    
  // console.log(this.vm);
  if (data.info.indexOf(this.vm.filter_str_2) != -1) {
    this.el.style.backgroundColor = "blue"
  }
});
```

* 使用：

```html
<div class="item" v-for="ele in arr" v-myfilter=ele>
    {{ele.info}}
</div>
```

* 特点：
  * Vue.directive自定义指令，其实用在DOM树中的指令都是包装了DOM操作。
  * 场景：某些DOM都有一些共同的特性，可以加这个指令，比如拖拽，动画。
  * 一次性的！一次性的！DOM节点插入树内就不会发生改变；

