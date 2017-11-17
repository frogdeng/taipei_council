var listType = 'hot_news';

$(document).ready(function() {
    changeContent(1);
    filterCondition();

});

function changeContent(pageNum)
{
    var pageLimit = $("#pagepercount option:selected").val();
    var sort = $("#sort option:selected").val();
    var dateRange = [];

    var date = new Date();
    var today = new Date(date.getYear()+1900, date.getMonth(),date.getDate());
    var lastWeekDay = new Date(date.getYear()+1900, date.getMonth(),date.getDate()-7);

    var today_year = today.getYear()+1900;
    var today_month = today.getMonth() <9 ? "0"+ today.getMonth()+1 : today.getMonth()+1; 
    var today_date = today.getDate() <10 ? "0"+today.getDate() : today.getDate();

    var lastWeekDay_year = lastWeekDay.getYear()+1900;
    var lastWeekDay_month = lastWeekDay.getMonth() <9 ? "0"+ lastWeekDay.getMonth()+1 : lastWeekDay.getMonth()+1; 
    var lastWeekDay_date = lastWeekDay.getDate() <10 ? "0"+lastWeekDay.getDate() : lastWeekDay.getDate();
   
    var today_format = today_year +'-'+ today_month +'-'+ today_date;
    var lastWeekDay_format = lastWeekDay_year +'-'+ lastWeekDay_month +'-'+ lastWeekDay_date;

    // if ($("#start-date").val() != null) {
    //     dateRange[0] = $("#start-date").val();
    // }
    // if ($("#end-date").val() != null) {
    //     dateRange[1] = $("#end-date").val();
    // }

    dateRange[0] = lastWeekDay_format;
    dateRange[1] = today_format;
    //console.log(dateRange);


    overviewChangeContent(listType, pageNum, pageLimit, sort, dateRange);
}