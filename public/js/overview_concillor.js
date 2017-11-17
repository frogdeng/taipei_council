$(document).ready(function () {
    setNewsTypeLogo(8);
    filterCondition();
    getCouncilorNum();
    getElectionRegion();
    getCouncilor();
    // changeContent(1);
});

function changeContent(pageNum)
{
    var pageLimit = $("#pagepercount option:selected").val();
    var sort = $("#sort option:selected").val();
    var dateRange = selectDateRange();
    var councilorName = $(".councilor option:selected").val();

    $.post("/public/api/councilor/get-news-list", { pageNum: pageNum, pageLimit: pageLimit, sort: sort, dateRange: dateRange, councilorName: councilorName}, function (msg) {
        var data = JSON.parse(msg);

        if (data.success == true) {
            var payload = data.payload;
            var totalPages = Math.ceil(payload.searchCount / pageLimit);
            var html = '<tr><th width="40px"></th><th>標題</th><th width="15%">日期</th><th width="15%">媒體來源</th><th width="10%">版次</th></tr>';

            // Append news list
            for (var i = 0; i < payload.searchResult.length; i++) {
                var url = '';

                html += '<tr><td>' + '<label for="icon-checkbox"></label>' + '<input class="checkbox" type="checkbox">' + '</td>';
                html += '<td><a href="/public/news/detail?id=' + payload.searchResult[i]['id'] + '">' + payload.searchResult[i]['title'] + '</a></td>';
                html += '<td>' + payload.searchResult[i]['publishDate'] + '</td>';
                html += '<td>' + payload.searchResult[i]['newsMedia'] + '</td>';
                html += '<td>' + payload.searchResult[i]['edition'] + '</td>';
            }

            $(".newslist tbody").html(html);

            // Append total search count number
            $(".summery .value").text('共計 ' + payload.searchCount + ' 筆');

            var pageHtml = '';
            for (var i = 1; i <= totalPages; i++) {
                pageHtml += "<option value=" + i + ">第 " + i + " 頁</option>";
            }
            $("#page").html(pageHtml);
            $('#page option[value=' + pageNum + ']').prop('selected', true);
        }

        $("#pagination-demo").twbsPagination('destroy');

        if (payload.searchCount == 0) {
            return;
        } else {
            $("#pagination-demo").twbsPagination({
                initiateStartPageClick: false,
                totalPages: totalPages,
                visiblePages: 5,
                startPage: parseInt(pageNum),
                paginationClass: "tcc-pagination",
                pageClass: '',
                first: '',
                prev: '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                next: '<i class="fa fa-angle-right" aria-hidden="true"></i>',
                last: '',
                onPageClick: function (evt, pageNum) {
                    changeContent(pageNum);
                }
            });
        }

        newslistCheckboxSelector();
        generalListAllSelected();
    });

    function selectDateRange() {
        var dateRange = [];
        if ($("#start-date").val() != null) {
            dateRange[0] = $("#start-date").val();
        }
        if ($("#end-date").val() != null) {
            dateRange[1] = $("#end-date").val();
        }

        return dateRange;
    }
}

function changeCouncillor()
{
    var session = $(".session option:selected").val();
    var constituency = $(".constituency option:selected").val();

    $.post("/public/api/news/search-news-for-councillor", {  }, function (msg) {
        
    });



    $(".session .constituency").off().change(function () {
        changeCouncillor();
    });

}

function getCouncilorNum()
{
    $.post("/public/api/councilor/get-councilor-num-list", {}, function (msg) {
        var data = JSON.parse(msg);
        var html = '';

        if (data.success == true) {
            var payload = data.payload;
            
            for (var i = payload.length-1; i >= 0; i--) {
                html += '<option value="' + payload[i]['councilorNum'] + '">' + payload[i]['councilorNumTitle'] + '</option>';
            }
        }
        $("select.session").append(html);
    });
}

function getElectionRegion()
{
    $.post("/public/api/councilor/get-election-region-list", {}, function (msg) {
        var data = JSON.parse(msg);
        var html = '';

        if (data.success == true) {
            var payload = data.payload;

            for (var i = 0; i < payload.length; i++) {
                html += '<option value="' + payload[i]['electionRegionName'] + '">' + payload[i]['electionRegionName'] + '</option>';
            }
        }
        $("select.constituency").append(html);
    });
}

function getCouncilor()
{
    var councilorNum = $("select.session option:selected").val();
    var electionRegion = $("select.constituency option:selected").val();
    electionRegion = null;

    $.post("/public/api/councilor/get-councilor-list", {councilorNum: councilorNum, electionRegion: electionRegion}, function (msg) {
        var data = JSON.parse(msg);
        var html = '';

        if (data.success == true) {
            var payload = data.payload;

            for (var i = 0; i < payload.length; i++) {
                html += '<option value="' + payload[i]['councilorName'] + '">' + payload[i]['councilorName'] + '</option>';
            }
        }
        $("select.councilor").html(html);
    });

    $("select.constituency, select.session").off().change(function() {
        getCouncilor();
    });
}
