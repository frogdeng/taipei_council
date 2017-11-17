var listType = 'magazine';

$(document).ready(function() {
    $('tr.sortGroup>th.sortRule').click(function(){
        console.log($(this).attr('name'));
        console.log($(this).text());

        //標題排序
        if($(this).attr('name') =='title'){
            sort = $(this).attr('name');
        }

        //日期排序
        if($(this).attr('name') =='publish_descend'){  //預設 時間由新至舊
            $(this).attr('name','publish_ascend'); //按下 時間由舊至新
            sort = $(this).attr('name');
        }else if($(this).attr('name') == 'publish_ascend') { //改回 時間由新至舊
            $(this).attr('name','publish_descend');
            sort = $(this).attr('name');      
        }

        //媒體來源排序
        if($(this).attr('name') =='media'){
            sort = $(this).attr('name');
        }

        //版次排序
        if($(this).attr('name') =='version'){
            sort = $(this).attr('name')
        }
        changeContent($('#page').val(),sort);
    });

    changeContent(1);
    setNewsTypeLogo(3);
    filterCondition();

});

function changeContent(pageNum, sort)
{
    var pageLimit = $("#pagepercount option:selected").val();
    var sort = sort || "";
    var dateRange = [];
    if ($("#start-date").val() != null) {
        dateRange[0] = $("#start-date").val();
    }
    if ($("#end-date").val() != null) {
        dateRange[1] = $("#end-date").val();
    }

    overviewChangeContent(listType, pageNum, pageLimit, sort, dateRange);
}