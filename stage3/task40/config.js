/**
 * Created by MaxWell on 2016/4/18.
 */

/*
* 切换日期的方式：
* 1.点击日历上可选日期
* 2.输入框中输入对应日期(尝试)
* */

//calendar作为主函数，调用以生成日历

/*
* config 设计
*
* startDate String 2000-1-1
* endDate String 2050-12-31
* 设置开始和结束日期，中间的为可选时间
* target HTMLObject
* defaultDate String 2016-4-19
* addStyleID String
* canSelectDate Bool
* 日历上的日期是否可点选
*
* */


var target = document.getElementById("target");

  var config = {
    startDate: "2000-3-24",
    endDate:"2050-10-31",
    target:target,
    defaultDate:"2014-1-20",
    addStyleID:"userStyle",
    canSelectDate:false //日历面板点选日期
  };




  var myCalendar = new Calendar(config);


  myCalendar.init();





