/**
 * Created by MaxWell on 2016/4/22.
 */

/*
 * 暴露交互接口在Calendar对象上，方便处理,
 * 类似组件
 *
 * */



function Calendar(config){
  this.config = config;
}


var body = document.getElementsByTagName("body")[0];


Calendar.prototype = {




  init : function(){

    //获取时间跨度，给select添加option

    function getYearLength(startDate,endDate){
      var startDate = new Date(this.config.startDate);

      var endDate = new Date(this.config.endDate);

      //暂时搁置，
      startYear = startDate.getFullYear();  //用于判断年可用日期

      yearLength = endDate.getFullYear() - startYear + 1;  //作差长度加1

      return yearLength;
    }

    var yearLength = getYearLength.call(this,this.config.startDate,this.config.endDate);

    var selectContainer = document.createElement('div');
    selectContainer.className = 'selectContainer';
    body.appendChild(selectContainer);







    //生成左右跳转
    function createCalendarTitle(container,yearLength){
      //生成prev按钮
      var prev = document.createElement('span');
      prev.innerText = '<';
      prev.className = 'prev';
      container.appendChild(prev);

      //生成年份下拉菜单
      var yearSelect = document.createElement("select");
      yearSelect.className = 'yearSelect';
      for(var i = 0 ; i < yearLength ; i++){
        var yearOpt = document.createElement("option");
        yearOpt.innerText =   startYear + i ;
        yearSelect.appendChild(yearOpt);
      }

      //生成 月份 下拉菜单
      var usermonthSelect = document.createElement("select");
      usermonthSelect.className = 'usermonthSelect';
      for(i = 1 ; i < 13; i++){
        var usermonthOpt = document.createElement("option");
        usermonthOpt.innerText = i ;
        usermonthSelect.appendChild(usermonthOpt);
      }

      container.appendChild(yearSelect);
      container.appendChild(usermonthSelect);

      //將用於交互的下拉菜單暴露出
      this.yearSelect = yearSelect;
      this.usermonthSelect = usermonthSelect;

      //生成next按钮
      var next = document.createElement('span');
      next.className = 'next';
      next.innerText = '>';
      container.appendChild(next);
    }

    createCalendarTitle.call(this,selectContainer,yearLength);









    //动态修改输入框日期
    var target = document.getElementById(this.config.targetID);
    //input对象添加到Calendar对象中
    this.dateInput = target;

    function modifyTargetValue(target,dateString){

      target.value = dateString;
    }

    modifyTargetValue.call(this,target,this.config.defaultDate); //设置目标(日期输入框)值



    //生成日历面板

    var CalendarTable = document.createElement("table");
    CalendarTable.className = 'CalendarTable';

    //@param {Number} 获取getDay返回的星期几对应的文字
    //@param {String} 返回对应文字
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


    //表头为静态，只生成一次
    function createCalendarPanel(CalendarTable){
      //生成日历thead

      var thead = document.createElement("thead");
      var firstTr = document.createElement("tr");

      for(var h = 0 ; h < 7 ; h++){
        var td = document.createElement("td");
        td.innerText = getSlogan(h);
        firstTr.appendChild(td);
      }

      thead.appendChild(firstTr);
      CalendarTable.appendChild(thead);

      this.CalendarTable = CalendarTable;
      this.CalendarTable.thead = thead;
    }

    createCalendarPanel.call(this,CalendarTable);

    /*    body.appendChild(table);*/


    //处理时间
    var defaultDate = new Date(this.config.defaultDate);
    var year = defaultDate.getFullYear();

    // month  + 1 表示实际月份
    var userMonth = defaultDate.getMonth() + 1;


    //修改select,耦合程度高
    modifySelect.call(this,year,userMonth);

    function modifySelect(year,userMonth){
      this.yearSelect.value = year;
      this.usermonthSelect.value = userMonth;
    }

    /*
     * param year Number;
     * param userMonth Number;
     * return Object  生成用于渲染日历的数据
     * */

    function getRenderData(year,userMonth){
      /*
       * 判断闰年
       * @param {Number} getFullyear方法得出的数字
       * @return {Bool} 返回判断结果，真闰
       * */
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
       * @return {Number} 当月天数
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
          default:
            alert("getMonthDays failed");
        }
      }

      //简单的上月处理逻辑封装
      function getLastMonthDayNum(year,userMonth) {
        //处理逻辑决定,select获取到的month需要减一，使得1月为0
        if(userMonth == "1"){
          var lastYear = parseInt(year) - 1;
          var lastMonth = 12;
          var lastMonthSumDay = getMonthDays ( lastYear , lastMonth);

        }else{
          lastMonth = parseInt(userMonth) - 1;
          lastMonthSumDay = getMonthDays( parseInt(year), lastMonth);
        }
        return lastMonthSumDay;
      }


      //从当月第一天开始设置
      var firstDay = year + "-" + userMonth + "-" + "01";

      var firstDate = new Date( Date.parse(firstDay) );//Date.parse返回日期毫秒数

      //col 为实际在第几列
      //星期日为第一列
      var col = firstDate.getDay() + 1;

      var date = - ( col - 1 ) + 1; //date从第一列开始递增到1时，即跳转到当月

      var dateSum = getMonthDays(parseInt(year),parseInt(userMonth)); //当月天数

      //上月显示天数
      var lastMonthDaysDisplayed = col - 1;

      //上月天数
      var lastMonthSumDay = getLastMonthDayNum.call(this,year,userMonth);

      /*     console.log(lastMonthSumDay);*/


      //上月展示起点
      var lastMonthDisplayOrigin = ( lastMonthSumDay - lastMonthDaysDisplayed ) + 1;

      /*      console.log(lastMonthDisplayOrigin);*/



      var nextMonthOrigin = 1;


      return {
        date : date,
        dateSum : dateSum,
        lastMonthDisplayOrigin : lastMonthDisplayOrigin,
        nextMonthOrigin : nextMonthOrigin
      }

    }


    var renderData = getRenderData(year,userMonth);



    function renderCalendar(CalendarTable,renderData){


      var tbody = document.createElement("tbody");

      for(var i = 0 ; i < 6 ; i++){
        var tr = document.createElement("tr");
        for(var j = 0 ; j < 7 ; j++){
          var td = document.createElement("td");
          tr.appendChild(td);  //不添加内容时需要先渲染
          if(renderData.date <= 0){
            renderData.date++;
            td.innerHTML = renderData.lastMonthDisplayOrigin++;
            td.style.color='#ccc';
            td.className = 'prevMonth';
            continue;
          }
          if(renderData.date <= renderData.dateSum) {
            td.innerHTML = renderData.date++;
          }else{
            td.innerHTML = renderData.nextMonthOrigin++;
            td.style.color='#ccc';
            td.className = 'nextMonth';
          }
        }
        tbody.appendChild(tr);
      }
      CalendarTable.appendChild(tbody);
      CalendarTable.style.textAlign = "center";

      body.appendChild(CalendarTable);


    }


    renderCalendar(CalendarTable,renderData);

    /*
     * 添加事件监听
     * @param {Object} HTMLelement类型,添加事件监听的对象
     * @param {String} 事件类型，字符串
     * @param {Function} 事件响应回调函数
     * */

    function addEvent(ele,type,func){

      if(ele.addEventListener){
        ele.addEventListener(type,func,false);
      }else if(ele.attachEvent){
        ele.attachEvent("on" + type , func);
      }else{
        ele["on" + type] = func;
      }
    }



    var yearSelect = document.getElementsByClassName("yearSelect")[0];

    addEvent(yearSelect,"change",modifyCalendar);

    var usermonthSelect = document.getElementsByClassName("usermonthSelect")[0];

    addEvent(usermonthSelect,'change',modifyCalendar);

    function modifyCalendar(){

      var yearSelect = document.getElementsByClassName("yearSelect")[0];
      var usermonthSelect = document.getElementsByClassName("usermonthSelect")[0];
      var year = yearSelect.value;
      var userMonth = usermonthSelect.value;


      var renderData = getRenderData(year,userMonth);

      //移除tbody
      var tbody = CalendarTable.getElementsByTagName("tbody")[0];
      CalendarTable.removeChild(tbody);

      renderCalendar(CalendarTable,renderData);

    }



    CalendarTable= document.getElementsByClassName('CalendarTable')[0];

    addEvent(CalendarTable,"click",function(event){



      var yearSelect = document.getElementsByClassName("yearSelect")[0];
      var usermonthSelect = document.getElementsByClassName("usermonthSelect")[0];

      var dateString;

      if(parseInt(event.target.innerText) <= 31)  //防止点到两td的间隙出现BUG
      {

        if(event.target.className == 'prevMonth') {
          if(usermonthSelect.value == 1){
            dateString = (parseInt(yearSelect.value ) - 1 ) + '-' + 12  + '-' + event.target.innerText;
          }else{
            dateString = yearSelect.value + '-' + ( parseInt(usermonthSelect.value) - 1 )  + '-' + event.target.innerText;
          }
        }else if(event.target.className == 'nextMonth'){
          if(usermonthSelect.value == 12){
            dateString = (parseInt(yearSelect.value ) + 1 ) + '-' + 1  + '-' + event.target.innerText;
          }else{
            dateString = yearSelect.value + '-' + ( parseInt(usermonthSelect.value) + 1 )  + '-' + event.target.innerText;
          }
        }else {
          dateString = yearSelect.value + '-' + usermonthSelect.value  + '-' + event.target.innerText ;
        }
        modifyTargetValue(target,dateString);
      }
    });





    var prev = selectContainer.getElementsByClassName('prev')[0];

    addEvent(prev,'click',function(){
      var yearSelect = selectContainer.getElementsByTagName('select')[0];
      var monthSelect = selectContainer.getElementsByTagName('select')[1];
      var nowYearOpt = yearSelect.selectedIndex;   //获取选中的opt的下标
      var nowMonthOpt = monthSelect.selectedIndex;


      //判断跳转逻辑
      if(nowMonthOpt+1 == 1){
        yearSelect.getElementsByTagName('option')[nowYearOpt-1].selected = 'selected';//实现修改select选中的option
        monthSelect.getElementsByTagName('option')[11].selected = 'selected';
      }else{
        monthSelect.getElementsByTagName('option')[nowMonthOpt-1].selected = 'selected';
      }





      modifyCalendar();
    });


    /*
    * selectContainer下使用事件代理,将除点击日期事件组织起来
    * */












    var next = selectContainer.getElementsByClassName('next')[0];

    addEvent(next,'click',function(){
      var yearSelect = selectContainer.getElementsByTagName('select')[0];
      var monthSelect = selectContainer.getElementsByTagName('select')[1];
      var nowYearOpt = yearSelect.selectedIndex;   //获取选中的opt的下标
      var nowMonthOpt = monthSelect.selectedIndex;


      //判断跳转逻辑
      if(nowMonthOpt+1 == 12){
        yearSelect.getElementsByTagName('option')[nowYearOpt+1].selected = 'selected';//实现修改select选中的option
        monthSelect.getElementsByTagName('option')[0].selected = 'selected';
      }else{
        monthSelect.getElementsByTagName('option')[nowMonthOpt+1].selected = 'selected';
      }

      modifyCalendar();
    });





  }


};