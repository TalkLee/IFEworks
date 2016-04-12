/**
 * Created by MaxWell on 2016/4/11.
 */


var config = {
    topnav:{
        content:"这是头部title,可以设置位置是居中还是正常显示",
        position:"left"
    },
    main:{
        content:"这是浮出层的主题内容,可以设置位置是居中还是正常显示",
        position:"center"
    },
    footer:{
        left_btn:"确定",
        right_btn:"取消",
        width:"200px",
        height:"50px",
    }
};


var float_layer_target = document.getElementById("float_layer");
var float_layer = new FloatLayer(config,float_layer_target);


//添加事件监听
addEvent(float_layer_target,"click",function(){
    float_layer.init(); //此时this指向float_layer而非事件对象
});
