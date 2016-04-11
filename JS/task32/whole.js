/**
 * Created by MaxWell on 2016/4/9.
 */

function FormFactory(config,container){
    this.config = config ;
    this.container = container;
}


FormFactory.prototype = {
    constructor: FormFactory,

    validator : function(){

        if(this.config.validatorItems){
            this.flag = 0;
            //正则和长度不互斥
            for(var key in this.config.validatorItems){
                switch(key){
                    //如果该项为必填项，应该在配置文件中第一个填写
                    case "necessary":{
                        if(this.value.length == 0) {
                            this.nextElementSibling.innerText = this.config.label + "不能为空";
                        }
                        else{
                            this.flag++;
                        }
                        break;
                    }
                    case "minlength":{
                        //传入event事件对象
                        if(this.config.validatorItems.minlength > this.value.length )
                        {
                            this.nextElementSibling.innerText = this.config.message.short;
                        }
                        else{
                            this.flag++;
                        }
                        break;
                    }
                    case "maxlength":
                    {
                        if(this.config.validatorItems.maxlength <  this.value.length )
                        {
                            this.nextElementSibling.innerText = this.config.message.long;
                        }
                        else{
                            this.flag++;
                        }
                        break;
                    }
                    case "username":{
                        //判断用户是否传入正则表达式用于自定义检测
                        var usernameReg = (this.config.validatorItems.username) ? this.config.validatorItems.username : /^[a-zA-z_][a-zA-z_0-9]*[a-zA-z_0-9]$/;

                        if(!usernameReg.test(this.value)){
                            this.nextElementSibling.innerText = this.config.message.rule;
                        }
                        else{
                            this.flag++;
                        }
                        break;
                    }
                    case "password":{
                        var passwordReg = this.config.validatorItems.username ? this.config.validatorItems.username : /^[a-zA-z_][a-zA-z_0-9]*[a-zA-z_0-9]$/;
                        if(!passwordReg.test(this.value)){
                            this.nextElementSibling.innerText = this.config.message.rule;
                        }
                        else{
                            //保存输入的密码到inpuyPassword
                            //全剧变量
                            inputPassword = this.value;
                            this.flag++;
                        }
                        break;
                    }
                    //验证密码是否一致未做好
                    case "passwordAgain":{
                        //判断是否等于用户第一次输入的
                        console.log(inputPassword);
                        if(this.value != inputPassword){
                            this.nextElementSibling.innerText = this.config.message.rule;
                        }
                        else{
                            this.flag++;
                        }
                        break;
                    }
                    case "QQ":{
                        var qqReg = /^[1-9][0-9]{4,9}/;
                        if(!qqReg.test(this.value)){
                            this.nextElementSibling.innerText = this.config.message.rule;
                        }
                        else{
                            this.flag++;
                        }
                        break;
                    }

                    case "tele":{
                        var teleReg = /^[1][3-9][0-9]{9}$/;;
                        if(!teleReg.test(this.value)){
                            this.nextElementSibling.innerText = this.config.message.rule;
                        }
                        else{
                            this.flag++;
                        }
                        break;
                    }
                    case "email":{
                        var emailReg = /^[a-zA-z0-9][a-zA-z0-9_]+@[(a-zA-z0-9_)+\.]*((com)|(cn))$/;

                        if(!emailReg.test(this.value)){
                            this.nextElementSibling.innerText = this.config.message.rule;
                        }
                        else{
                            this.flag++;
                        }
                        break;
                    }
                }

            }

            if(this.flag === getLengthOfObject(this.config.validatorItems) ){
                this.nextElementSibling.innerText = "success";
            }

            }

        },



    /*
     * 初始化，生成表单
     * */
    init: function () {
        //表单元素对象中包含了对应config属性和容器元素

        //表单容器
        var formItemContainer = document.createElement("div");
        formItemContainer.className = "formContainer-" + this.config["label"];
        this.container.appendChild(formItemContainer);

        if (this.config.element == "select") {

        }
        //生成单选复选框

        else if (this.config.element == "input" && ( this.config.type == "checkbox" || this.config.type == "radio")) {

        }
        //生成文本框等输入类型框
        else {
            //插入label,label未设置name属性
            var formLabel = document.createElement("label");

            setInnerText(formLabel, this.config.label);
            formItemContainer.appendChild(formLabel);
            //插入对应表单输入元素
            this.formInput = document.createElement("input");
            this.formInput.type = this.config.type;
            //对应input元素传入config
            this.formInput.config = this.config;
            this.formInput.validator = this.validator;
            if (this.config.placeholder) {
                this.formInput.placeholder = this.config.placeholder;
            }
            this.formInput.className = "form-" + this.config.label;
            formItemContainer.appendChild(this.formInput);
            //插入提示元素
            this.prompt = document.createElement("span");
            formItemContainer.appendChild(this.prompt);


            //添加事件处理程序
            //由于事件处理程序只能传入事件对象和this对象包含属性
            //传入数组下标比较困难，需要提前加入每个元素的config属性
            addEvent(this.formInput, "focus", function (event) {
                //囧，需要判断是否是必填项，不是必填，需要判断validatorItems和necessary是否存在，然后才能调用validator方法
                if (this.config.validatorItems.necessary) {
                    this.nextElementSibling.innerText = "必填";
                }
            });


            //保存配置信息，触发事件的表单元素下标以及事件对象
            addEvent(this.formInput, "blur", function (event) {
                this.validator(this.config,event);
            });
        }

    }

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












































//获取触发事件的对象
function getTarget (event){
    return event.target || event.srcElement;
}


//设置标签内容的兼容性写法
function setInnerText(ele,text){
    if(typeof ele.textContent == "string"){

        ele.textContent = text;

    }else{
        ele.innerText = text;
    }
}
//获取对象属性长度
function getLengthOfObject(obj){
    var length = 0;
    for(var key in obj){
        length++;
    }
    return length;
}

//事件绑定
function addEvent(ele,type,func){
    if(ele.addEventListener){
        ele.addEventListener(type,func,false); //同步
    }else if(ele.attachEvent){
        ele.attachEvent("on" + type,func)
    }else{
        ele["on" + type] = func;
    }
}