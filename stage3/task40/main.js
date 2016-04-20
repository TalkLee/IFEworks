/**
 * Created by MaxWell on 2016/4/18.
 */

//添加事件监听

function addEvent(ele,type,func){
  if(ele.addEventListener){
    ele.addEventListener(type,func,false);
  }else if(ele.attachEvent){
    ele.attachEvent("on" + type , func);
  }else{
    ele["on" + type] = func;
  }
}


function judgeLeapYear(year){
  if( ( year % 1000 == 0 ) )
  {
    if( year % 400 == 0)
    {
      return true;
    }
    return false;
  }else if( ( year % 4  == 0 ) && ( year % 100 != 100 ) ){
    return true;
  }else{
    return false;
  }
}


/*
* @param year 哪一年
* @param month 哪一月
* */
function getMonthDays(year,month){
  switch(month)
  {
    case 1  :
    case 3  :
    case 5  :
    case 7  :
    case 8  :
    case 10 :
    case 12 :
      return 31;
    case 4  :
    case 6  :
    case 9  :
    case 11 :
      return 30;
    case 2  :
      var isLeap = judgeLeapYear(year);
      if(isLeap){
        return 29;
      }
      else{
        return 28;
      }
  }
}


function Calendar(config){
  this.config = config;
}


var body = document.getElementsByTagName("body")[0];


Calendar.prototype = {

  init : function(){

    var that = this;

    var startDate = new Date(this.config.startDate);
    var endDate = new Date(this.config.endDate);

    var startYear = startDate.getFullYear();  //用于判断年可用日期
    var yearLenght = endDate.getFullYear() - startYear + 1;  //作差长度加1

    //设置输入框内容为defaultDate
    this.config.target.value = this.config.defaultDate;


    //生成 年份 下拉菜单
    var yearSelect = document.createElement("select");

    for(var i = 0 ; i < yearLenght ; i++){
      var yearOpt = document.createElement("option");
      yearOpt.innerText =   startYear + i ;
      yearSelect.appendChild(yearOpt);
    }

    body.appendChild(yearSelect);


    //生成 月份 下拉菜单
    var monthSelect = document.createElement("select");
    for(i = 1 ; i < 13; i++){
      var monthOpt = document.createElement("option");
      monthOpt.innerText = i ;
      monthSelect.appendChild(monthOpt);
    }
    body.appendChild(monthSelect);



    //生成日历面板
    var table = document.createElement("table");
    var tbody = document.createElement("tbody");


    function getSlogan(num){
      switch(num){
        case 0 : return "日";
        case 1 : return "一";
        case 2 : return "二";
        case 3 : return "三";
        case 4 : return "四";
        case 5 : return "五";
        case 6 : return "六";
      }
    }

    var firstTr = document.createElement("tr");

    for(var h = 0 ; h < 7 ; h++){
      var td = document.createElement("td");
      td.innerText = getSlogan(h);
      firstTr.appendChild(td);
    }
    tbody.appendChild(firstTr);



    //处理defaultDate
    //获取日期所在行列

    var defaultDate = new Date(this.config.defaultDate);
    var year = defaultDate.getFullYear();
    //month  + 1 表示实际月份
    var month = defaultDate.getMonth() + 1;

    //修改select
    modifySelect(year,month);

    function modifySelect(year,month){
      yearSelect.value = year;
      monthSelect.value = month;
    }


    //从当月第一天开始设置
    var first = year + "-" + month + "-" + "01";
    var firstDate = new Date( Date.parse(first) );//Date.parse返回日期毫秒数



    //col 为实际在第几列
    var col = firstDate.getDay() + 1; //逻辑问题

    var date = -col + 2;

    var dateMax = getMonthDays(year,month);



    for(var i = 0 ; i < 6 ; i++){
      var tr = document.createElement("tr");
      for(var j = 0 ; j < 7 ; j++){
        var td = document.createElement("td");
        tr.appendChild(td);  //不添加内容时需要先渲染
          if(date <= 0){
            date++;
            continue;
          }
          if(date <= dateMax) {
            td.innerHTML = date++;
          }else{
            break;
          }
      }
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    table.style.textAlign = "center";
    body.appendChild(table);


    addEvent(yearSelect,"change",function(){
      var year = yearSelect.value;

      var month = monthSelect.value;
      console.log(year + " " + month);
      var first = year + "-" + month + "-" + "01";
      var firstDate = new Date( Date.parse(first) );//Date.parse返回日期毫秒数

      console.log(firstDate);

      //col 为实际在第几列
      var col = firstDate.getDay() + 1; //逻辑问题

      var date = -col + 2;

      var dateMax = getMonthDays(parseInt(year),parseInt(month));
      console.log(dateMax);
      //移除table
      var table = document.getElementsByTagName("table")[0];
      table.innerHTML = "";
      //重新render

      var tbody = document.createElement("tbody");


      for(var i = 0 ; i < 6 ; i++){
        var tr = document.createElement("tr");
        for(var j = 0 ; j < 7 ; j++){
          var td = document.createElement("td");
          tr.appendChild(td);  //不添加内容时需要先渲染
          if(date <= 0){
            date++;
            continue;
          }
          if(date <= dateMax) {
            td.innerHTML = date++;
          }else{
            break;
          }
        }
        tbody.appendChild(tr);
      }

      table.appendChild(tbody);
      table.style.textAlign = "center";






    });
    addEvent(monthSelect,"change",function() {
      var year = yearSelect.value;

      var month = monthSelect.value;
      console.log(year + " " + month);
      var first = year + "-" + month + "-" + "01";
      var firstDate = new Date(Date.parse(first));//Date.parse返回日期毫秒数

      console.log(firstDate);

      //col 为实际在第几列
      
      var col = firstDate.getDay() + 1; //逻辑问题

      var lastMonthDay = col - 1;  //上月几天需要显示

      var lastMonthMaxDay = getMonthDays(parseInt(year),parseInt(month ) - 1);

      var lastMonthDisplayOrigin = lastMonthMaxDay - lastMonthDay + 1;


      var date = -col + 2;

      var dateMax = getMonthDays(parseInt(year), parseInt(month));
      console.log(dateMax);
      //移除table
      var table = document.getElementsByTagName("table")[0];
      table.innerHTML = "";
      //重新render

      var tbody = document.createElement("tbody");

      var nextMonth = 1;
      for (var i = 0; i < 6; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < 7; j++) {
          var td = document.createElement("td");
          tr.appendChild(td);  //不添加内容时需要先渲染
          if (date <= 0) {
            if(lastMonthDisplayOrigin <= lastMonthMaxDay){
            td.innerHTML = lastMonthDisplayOrigin++;
            date++;
            continue;
            }
          }
          if (date <= dateMax) {
            td.innerHTML = date++;
          } else {
            td.innerHTML = nextMonth++;
            continue;
          }
        }
        tbody.appendChild(tr);
      }

      table.appendChild(tbody);
      table.style.textAlign = "center";


    });








    },





};


function Render(dateString){
   var date =  new Date( Date.parse(dateString) );

}