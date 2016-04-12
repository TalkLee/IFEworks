/**
 * Created by MaxWell on 2016/4/11.
 */


/*
class= "float_layer" 作为触发浮出层出现的DOM元素
*/

/*
* 重要问题：三栏等宽，宽度未知，如何居中
*
* */


function FloatLayer(config,target){
        this.config = config;  //保存配置对象为浮出层的config属性
        this.target = target ;  //保存触发弹出浮出层的事件对象
    }



    function addEvent(ele,type,func){
    	if(ele.addEventListener){
            ele.addEventListener(type,func,false); //同步
        }else if(ele.attachEvent){
        	ele.attachEvent("on" + type,func)
        }else{
        	ele["on" + type] = func;
        }
    }







    FloatLayer.prototype = {

        //初始化浮出层
        init : function(){
            //设置遮罩层
            var body = document.getElementsByTagName("body")[0];
            var mask = document.createElement("div");
            //样式设置
            mask.style.position = "absolute";
            mask.style.filter = "alpha(opacity= 60)";
            mask.style.top = 0;
            mask.style.left = 0;
            mask.style.backgroundColor = "#555";
            mask.style.opacity = 0.6;
            //遮罩层宽高 == body宽高
            mask.style.width  = body.clientWidth + "px";
            mask.style.height  = body.clientHeight + "px";
            body.appendChild(mask);


            //添加浮出层到表面
            var float_layer = document.createElement("div");
            float_layer.style.position = "fixed";
            //设置浮出层样式，除了宽高
            float_layer.style.backgroundColor ="#FFF";
            //添加topnav
            var topnav = document.createElement("div");
            topnav.innerText = this.config.topnav.content;
            topnav.style.padding = "10px 40px";
            float_layer.appendChild(topnav);

/*
            设置遮罩层位置，暂定
            if(this.config.topnav.position){
                switch(this.config.topnav.position){
                    case "center":{
                        topnav.style.textAlign = "center";
                        break;
                    }
                }
            }*/


            //设置main
            var  main = document.createElement("div");
            main.innerText = this.config.main.content;
            main.style.margin = " 10px 20px";
            main.style.padding = '10px';
            main.style.borderTop = "1px solid #CCC";
            float_layer.appendChild(main);

            //设置footer


            var footer = document.createElement("div");
            footer.style.height = this.config.footer.height;
            footer.style.width = this.config.footer.width;

            footer.style.float="right";

            var yes_btn = document.createElement("input");
            yes_btn.type="button";
            yes_btn.value = "确定";
            var no_btn = document.createElement("input");
            no_btn.type="button";
            no_btn.value = "取消";
            footer.appendChild(yes_btn);
            footer.appendChild(no_btn);

            addEvent(yes_btn,"click",close_float_layer);
            addEvent(no_btn,"click",close_float_layer);




            float_layer.appendChild(footer);




            //最后设置位置
/*
            //定死，用于测试
            float_layer.style.height = "500px";
            float_layer.style.width = "500px";
            float_layer.style.top = "100px";
            float_layer.style.left = "100px";
            float_layer.style.background = "red";*/
            float_layer.style.top = "100px";
            float_layer.style.left = "100px";

            body.appendChild(float_layer);
            //点击遮罩层外，关闭遮罩层和浮出层
            addEvent(mask,"click",close_float_layer);

            function close_float_layer(){
                body.removeChild(float_layer);
                body.removeChild(mask);
            }
        }
    };






