/**
 * Created by MaxWell on 2016/4/22.
 */


/*
 * 切换日期的方式：
 * 1.点击日历上可选日期
 * 2.输入框中输入对应日期(尝试)
 * */



var config = {
  startDate: "2000-3-24",
  endDate:"2050-10-31",
  targetID:"dateInput",
  defaultDate:"2016-4-21",
  canPrevNext:true,

  //未使用
  canSelectDate:true  //日历面板点选日期

};

var myCalendar = new Calendar(config);

myCalendar.init();

//需要设置自动调用初始化方法