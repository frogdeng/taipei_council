var listType = 'all';

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
    var nextDay = new Date(date.getYear()+1900, date.getMonth(),date.getDate()+1);

    var today_year = today.getYear()+1900;
    var today_month = today.getMonth() <9 ? "0"+ today.getMonth()+1 : today.getMonth()+1; 
    var today_date = today.getDate() <10 ? "0"+today.getDate() : today.getDate();

    var nextDay_year = nextDay.getYear()+1900;
    var nextDay_month = nextDay.getMonth() <9 ? "0"+ nextDay.getMonth()+1 : nextDay.getMonth()+1; 
    var nextDay_date = nextDay.getDate() <10 ? "0"+nextDay.getDate() : nextDay.getDate();
   
    var today_format = today_year +'-'+ today_month +'-'+ today_date;
    var nextDay_format = nextDay_year +'-'+ nextDay_month +'-'+ nextDay_date;


    if ($("#start-date").val() != null) {
        dateRange[0] = $("#start-date").val() == "" ? today_format : $("#start-date").val();
    }
    if ($("#end-date").val() != null) {
        dateRange[1] = $("#end-date").val() == "" ? nextDay_format : $("#end-date").val();
    }

    //dateRange[0] = today_format;
    //dateRange[1] = nextDay_format;
    //console.log(dateRange);

    overviewChangeContent(listType, pageNum, pageLimit, sort, dateRange);
}