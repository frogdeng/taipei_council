var sort;

// function for changing list page
function overviewChangeContent(listType, pageNum, pageLimit, sort, dateRange) {
    $.post("/public/api/news/get-news-list", { listType: listType, pageNum: pageNum, pageLimit: pageLimit,sort: sort, dateRange: dateRange }, function(msg) {
        var data = JSON.parse(msg);

        if (data.success == true) {
            var payload = data.payload;
            var totalPages = Math.ceil(payload.searchCount / pageLimit);
            // var html = '<tr class="sortGroup"><th width="40px"></th><th name="title" class="sortRule">標題</i></th><th width="15%"  class="sortRule">日期</i></th><th width="15%" name="media" class="sortRule">媒體來源</th><th width="10%" name="version" class="sortRule">版次</th><th width="40px"></th></tr>';
            var html='';
            // Append news list
            for (var i = 0; i < payload.searchResult.length; i++) {
                var url = '';

                html += '<tr><td>' + '<label for="icon-checkbox"></label>' + '<input class="checkbox" type="checkbox">' + '</td>';
                html += '<td><a href="/public/news/detail?id=' + payload.searchResult[i]['id'] + '">' + payload.searchResult[i]['title'] + '</a></td>';
                html += '<td>' + payload.searchResult[i]['publishDate'] + '</td>';
                html += '<td>' + payload.searchResult[i]['newsMedia'] + '</td>';
                html += '<td>' + payload.searchResult[i]['edition'] + '</td>';
                html += '<td><div class="add-favorite"></div></td></tr>';
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
                onPageClick: function(evt, pageNum) {
                    overviewChangeContent(listType, pageNum, pageLimit, sort, dateRange);
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
                onPageClick: function(evt, pageNum) {
                    overviewChangeContent(listType, pageNum, pageLimit, sort, dateRange);
                }
            });
        }
        newslistCheckboxSelector();
        generalListAllSelected();
    });
}

// function for changing overview_rank list page
function overviewRankContent(listType, pageNum, pageLimit, sort, dateRange) {
    $.post("/public/api/news/get-news-list", { listType: listType, pageNum: pageNum, pageLimit: pageLimit, sort: sort, dateRange: dateRange }, function(msg) {
        var data = JSON.parse(msg);

        if (data.success == true) {
            var payload = data.payload;
            var totalPages = Math.ceil(payload.searchCount / pageLimit);
            // var html = '<tr><th width="40px"></th><th>標題</th><th width="15%">日期</th><th width="15%">媒體來源</th><th width="10%">版次</th><th width="15%">瀏覽次數</th><th width="40px"></th></tr>';
            var html = '';

            // Append news list
            for (var i = 0; i < payload.searchResult.length; i++) {
                var url = '';

                html += '<tr><td>' + '<label for="icon-checkbox"></label>' + '<input class="checkbox" type="checkbox">' + '</td>';
                html += '<td><a href="/public/news/detail?id=' + payload.searchResult[i]['id'] + '">' + payload.searchResult[i]['title'] + '</a></td>';
                html += '<td>' + payload.searchResult[i]['publishDate'] + '</td>';
                html += '<td>' + payload.searchResult[i]['newsMedia'] + '</td>';
                html += '<td>' + payload.searchResult[i]['edition'] + '</td>';
                html += '<td>' + payload.searchResult[i]['viewCount'] + '</td>';
                html += '<td><div class="add-favorite"></div></td></tr>';
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
                onPageClick: function(evt, pageNum) {
                    overviewRankContent(listType, pageNum, pageLimit, sort, dateRange);
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
                onPageClick: function(evt, pageNum) {
                    overviewRankContent(listType, pageNum, pageLimit, sort, dateRange);
                }
            });
        }
        newslistCheckboxSelector();
        generalListAllSelected();
    });
}

// function for changing overview_press list page
function overviewPressContent(govClass, pageNum, pageLimit, sort, dateRange) {
    $.post("/public/api/tpgovNews/get-news", { govClass: govClass, pageNum: pageNum, pageLimit: pageLimit, sort: sort, dateRange: dateRange }, function(msg) {
        var data = JSON.parse(msg);

        if (data.success == true) {
            var payload = data.payload;
            var totalPages = Math.ceil(payload.searchCount / pageLimit);
            var html = '<tr><th width="40px"></th><th>標題</th><th width="15%">日期</th><th width="15%">媒體來源</th><th width="10%">版次</th><th width="10%">局處</th><th width="40px"></th></tr>';

            // Append news list
            for (var i = 0; i < payload.searchResult.length; i++) {
                var url = '';

                html += '<tr><td>' + '<label for="icon-checkbox"></label>' + '<input class="checkbox" type="checkbox">' + '</td>';
                html += '<td><a href="/public/news/detail?id=' + payload.searchResult[i]['id'] + '">' + payload.searchResult[i]['title'] + '</a></td>';
                html += '<td>' + payload.searchResult[i]['publishDate'] + '</td>';
                html += '<td>' + payload.searchResult[i]['newsMedia'] + '</td>';
                html += '<td>' + payload.searchResult[i]['edition'] + '</td>';
                html += '<td>' + payload.searchResult[i]['govClass'] + '</td>';
                html += '<td><div class="add-favorite"></div></td>';
            }

            $(".newslist tbody").html(html);

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
                onPageClick: function(evt, pageNum) {
                    overviewPressContent(govClass, pageNum, pageLimit, sort, dateRange);
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
                onPageClick: function(evt, pageNum) {
                    overviewPressContent(govClass, pageNum, pageLimit, sort, dateRange);
                }
            });
        }
        newslistCheckboxSelector();
        generalListAllSelected();
    });
}



function setNewsTypeLogo(number) {
    var selector = '.newstype[data-val="' + number + '"] .logoImg';
    $(selector).addClass("active");
}

function filterCondition() {
    $("#pagepercount").change(function() {
        changeContent(1);
    });

    $("#page").change(function() {
        var page = $("#page option:selected").val();
        changeContent(page);
    });

    $("#date-filter, button.submitBtn").click(function() {
        changeContent(1);
    });
}