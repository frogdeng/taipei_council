var markers = [];

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
    setNewsTypeLogo(9);
    changeContent(1);
    filterCondition();
});

function filterCondition()
{
    $(".select_btn, #date-filter").click(function () {
        changeContent(1);
    });

    $("#pagepercount, #sort").change(function () {
        changeContent(1);
    });

    $("#page").change(function () {
        var page = $("#page option:selected").val();
        changeContent(page);
    });
}


function changeContent(pageNum, sort)
{
    var regionName = selectRegionName();
    var keyword = $("input.keyword").val();
    var pageLimit = $("#pagepercount option:selected").val();
    var sort = sort || "";
    var dateRange = selectDateRange();

    $.post("/public/api/geo/get-region-news", { regionName: regionName, keyword: keyword, pageNum: pageNum, pageLimit: pageLimit, sort: sort, dateRange: dateRange }, function (msg) {
        var data = JSON.parse(msg);

        if (data.success == true) {
            var payload = data.payload;
            var totalPages = Math.ceil(payload.searchCount / pageLimit);
            // var html = '<tr><th width="40px"></th><th>標題</th><th width="15%">日期</th><th width="15%">媒體來源</th><th width="10%">版次</th><th width="40px"></th></tr>';
            var html='';

            deleteMarkers();

            // Set marker on Google map
            for (var j = 0; j < payload.searchGeolocation.length; j++) {
                setMarker(payload.searchGeolocation[j]['keyword'], payload.searchGeolocation[j]['lat'], payload.searchGeolocation[j]['lng']);
            }

            // Append news list
            for (var i = 0; i < payload.searchResult.length; i++) {
                var url = '';

                html += '<tr><td>' + '<label for="icon-checkbox"></label>' + '<input class="checkbox" type="checkbox">' + '</td>';
                html += '<td><a href="/public/news/detail?id=' + payload.searchResult[i]['id'] + '">' + payload.searchResult[i]['title'] + '</a></td>';
                html += '<td>' + payload.searchResult[i]['publishDate'] + '</td>';
                html += '<td>' + payload.searchResult[i]['newsMedia'] + '</td>';
                html += '<td>' + payload.searchResult[i]['edition'] + '</td>';
                html += '<td><div class="add-favorite"></div></td>';
            }

            $("#table_list").nextAll().remove();
            $("#table_list").after(html);

            var favorite = $('.newslist_container .newslist tr td .add-favorite');
            favorite.off().click(function() {
                if($(this).hasClass('active')){    
                    $(this).removeClass('active');
                    // console.log("取消勾選");
                }else{
                    $(this).addClass('active');
                    // console.log("勾選");
                }
            });

            // Append total search count number
            $(".summery .value").text('共計 ' + payload.searchCount + ' 筆');

            var pageHtml = '';
            for (var i = 1; i <= totalPages; i++) {
                pageHtml += "<option value=" + i + ">第 " + i + " 頁</option>";
            }
            $("#page").html(pageHtml);
            $('#page option[value=' + pageNum + ']').prop('selected', true);
        }

        $("#pagination-demo-top").twbsPagination('destroy');
        $("#pagination-demo").twbsPagination('destroy');

        if (payload.searchCount == 0) {
            return;
        } else {
            $("#pagination-demo-top").twbsPagination({
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

    function selectRegionName() {
        var regionSelector = $(".region_selected_container .regioncard .list .region");
        var region = [];

        regionSelector.map(function() {
            region.push($(this).attr("data-val"));
        });

        return region;
    }

    function setMarker(title, lat, lng) {
        var myLatlng = new google.maps.LatLng(lat, lng);
        
        var marker = new google.maps.Marker({
            position: myLatlng,
            title: title,
            map: map
        });

        markers.push(marker);
        // marker.setMap(map);
    }

    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    function clearMarkers() {
        setMapOnAll(null);
    }

    function deleteMarkers() {
        clearMarkers();
        markers = [];
    }
}