# Vue1.0 step_01

## 理解

* 总的来说，vue的思想就是非DOM操，直接面对是数据和DOM树，那么这两者之间靠什么连接？
  * v-指令
  * vm数据模型
  * 背后：数据监听和发布订阅者者模式；
* 【DOM树】+【数据】+【vm数据模型】共同构成组件cpt，也就是功能强大的模板引擎。
* 后面的学习Vue自定义指令的时候，内部其实更多的操作的还是DOM。

## 初始化

```js
var vm = new Vue({
  // 可以为class dom 
  el: '#app',
  // 数据
  data: {},
  // 方法
  methods: {}
});
```

## 语法

* {{key}} 与 v-model

```html
<div class="box">
    <h1>v-model</h1>
    <div class="item">
        输入：<input type="text" v-model="obj.a">
    </div>
    <div class="item">
        显示：{{obj.a}}
    </div>
    <div class="item">
        一次绑定：{{*obj.a}}
    </div>
    <div class="item">
        识别HTML：{{{obj.a}}}
    </div>

</div>

<script>
    // {{key}} 任何属性名都可注入 <input type="text" value="{{info}}">
    // {{*key}} 只绑定一次数据
    // {{{}}}   识别HTML结构
    // {{obj.a=="admin"}}  也可以注入简单的表达式

    // v-model = "key" 指令是直接注入变量
    // v-text 大段text注入
    // v-html html注入
</script>


 v-show='a';a:true
 v-show='arr.length==0';



```

* v-for

```html
<div class="item" v-for = 'ele in list'>   track-by='索引' 提高循环性能
  {{ele}}  自带参数 $index
</div>

<div class="item" v-for = 'val in obj' >   v-for = '(k,v) in obj'
  {{val}} -每项的val  自带参数$index/$key
</div>
```

* v-show  v-on:click

```html
<div class="box">
    <h1>v-show</h1>
    <div class="item">
        <button v-on:click="key = !key">btn</button>
    </div>
    <div class="item">
        <button v-on:click="btn_ck()">btn</button>
    </div>

    <div class="item" v-show=key>
        显示的信息
    </div>
</div>

<script>
    // v-on:click="btn_ck()";  
    // 方法内部的this是实例对象，上面可以拿到所有的方法和属性；
    btn_ck: function() {
      // console.log(this);
      this.key = !this.key;
    },
    
    // v-on:click="key = !key" 可以直接进行属性操作；
</script>
```

* v-cloak：遮丑

```css
// v-cloak在vue编译之前存在，存在的时候我们作为自定义属性存在，设置存在时隐藏
[v-cloak]{ 
  display:none;
}
// 编译完成后，消失；
```

* 查看某个包的版本信息：`bower info vue 或者npm info package`

## 案例

* 需求：

  * 初始化：列表显示；
    * 有数据：列表展示；
    * 没有数据：列表隐藏，且显示没有数据；
  * 点击新增：弹窗显示，
    * 确认：弹窗隐藏，内容新增一条，列表显示；
    * 取消：弹窗隐藏

  * 点击列表修改：弹窗显示
    * 确认：弹窗隐藏，内容被修改一条，列表显示；
    * 取消：弹窗隐藏
  * 点击列表删除：直接删除

* 分析：
  * 初始化：列表显示；通过数组的长度控制
  * 点击新增：弹窗显示，标识为从点击add后出现弹窗
  * 点击列表修改：弹窗显示，标识为从点击upd后出现弹窗，记录id
  * 点击列表删除：传入id，删除数据；

### 列表初始化

* v-show="list.length!=0"

```html
<div class="item" v-for="ele in list" v-show="list.length!=0">
    {{$index+1}} {{ele.info}} <button v-on:click="_layer_upd(ele.id)">upd</button> <button v-on:click="_layer_del(ele.id)">del</button>
</div>
<div class="item" v-show="list.length==0">
    当前列表没有数据
</div>
```

### add_sure

```html
<button v-on:click="_layer_show()">add</button>
<script>
    var obj = {
        data:{
            // 
            one: {
                // 整体弹窗的现实
                key: false,

                // 弹窗显示内容
                info: "",

                // 标识从哪里发起的弹窗
                str: "",

                // 修改的数据ID
                id: "",
            },
        }
        methods:{
            // add
            _layer_show: function() {
                // 显示
                this.one.key = true;
                // 
                this.one.info = '';

                // 从新增出点击进入
                this.one.str = "add";
            },
            // 保存数据
            _layer_sure: function() {

                // 新增
                if (this.one.str == "add") {
                    var id = this.list.length + "_" + Math.random();
                    this.list.unshift({
                        id: id,
                        info: this.one.info,
                    });
                }
                // upd
                else if (this.one.str == "upd") {
                    // 找到信息
                    ...
                }

                    this._layer_close();
                }, 
            }
    	}
    };
</script>
```

### upd_sure

```html
<div class="item" v-for="ele in list" v-show="list.length!=0">
    {{$index+1}} {{ele.info}} 
    <button v-on:click="_layer_upd(ele.id)">upd</button> 
    <button v-on:click="_layer_del(ele.id)">del</button>
</div>
<script>
    var obj = {
        methods:{
            _layer_upd: function(id) {

                // 显示弹出
                this.one.key = true;
                // 
                this.one.id = id;

                // 找到信息
                this.list.some(function(ele) {
                    if (ele.id == id) {
                        this.one.info = ele.info;
                        return true;
                    }
                }.bind(this));
                // 标识
                this.one.str = "upd";
            },
            // 保存数据
            _layer_sure: function() {

                // 新增
                if (this.one.str == "add") {
                    ...
                }
                // upd
                else if (this.one.str == "upd") {
                    // 找到信息
                    this.list.some(function(ele) {
                        if (ele.id == this.one.id) {
                            ele.info = this.one.info;
                            return true;
                        }
                    }.bind(this));
                }

                this._layer_close();
            },
        }
    };
</script>
```

### del

```js
// 删除
_layer_del: function(id) {
    this.list.some(function(ele, index) {
        if (ele.id == id) {
            this.list.splice(index, 1);
            return true;
        }
    }.bind(this));
},
```





