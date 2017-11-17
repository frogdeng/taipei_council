var keyword;
var html_keyword;

$(document).ready(function() {
    var getUrlString = location.href; // url
    var url = new URL(getUrlString); //url obj
    keyword = decodeURIComponent(url.searchParams.get('param'));

    changeContent(1);    
    saveKeyword();
    filterCondition();    
});


function getContent(searchString, pageNum, pageLimit, sort, needGroupNews, advFilter, postFilter) {
    $('#loading').block({ message: '<h1> 查詢中 </h1>',css: { 
        margin: 'auto',
        border: 'none', 
        padding: '15px', 
        backgroundColor: '#000', 
        '-webkit-border-radius': '10px', 
        '-moz-border-radius': '10px', 
        opacity: .5, 
        color: '#fff' 
    }}); 

    $.post("/public/api/news/search-news", { searchString: searchString, pageNum: pageNum, pageLimit: pageLimit, sort: sort, needGroupNews: needGroupNews,advFilter : advFilter, postFilter: postFilter }, function(msg) {
        var data = JSON.parse(msg); 
        
        if (data.success == true) {
            
            var payload = data.payload;
            var totalPages = Math.ceil(payload.searchCount / pageLimit);


            var html = '';
            var newsContent = '';

            for (var i = 0; i < payload.searchResult.length; i++) {
                html += '<div class="search_result"><div class="checkbox"><label class="checkbox" for=""></label><input class="checkbox" type="checkbox"></div><div class="newscontent"><div class="newstitle">';
                html += '<p class="newstitle"><a target="_blank" class="showmore" href="/public/news/detail?id=' + payload.searchResult[i]['id'] + '">' + payload.searchResult[i]['title'] + '</a></p>';
                html += '<div class="hover_full_content_container"><div class="hover_full_content"><p class="title">' + payload.searchResult[i]['title'] + '</p>';
                html += '<p class="date">' + payload.searchResult[i]['publishDate'] + '</p>';
                
                newsContent = payload.searchResult[i]['content'];
                wordCount_abstr = 100;

                html += '<p class="content">' + getAbstract(newsContent,wordCount_abstr) + '...</p></div></div></div><div class="eclipsecontent">';

                wordCount_abstr = 60;

                html += '<p class="content">' + getAbstract(newsContent,wordCount_abstr) + '...<a target="_blank" class="showmore" href="/public/news/detail?id=' + payload.searchResult[i]['id'] + '">(繼續閱讀)</a></p>';
                html += '</div><div class="bottom_element_container"><div class="media"><i class="icon icon-media"></i><span class="value">' + payload.searchResult[i]['newsMedia'] + '</span></div>';
                
                //處理日期格式
                var pubDate = new Date(payload.searchResult[i]['publishDate']);
                var pubDate_year = pubDate.getFullYear();
                var pubDate_month = pubDate.getMonth() <9 ? "0"+ (pubDate.getMonth()+1): (pubDate.getMonth()+1);            
                var pubDate_day = pubDate.getDate() <9 ? "0"+ pubDate.getDate(): pubDate.getDate();
                var pubDate_all = pubDate_year + '-' + pubDate_month + '-' + pubDate_day;
        
                html += '<div class="date"><span class="date">' + pubDate_all + '</span></div>';
                html += '<div class="type"><span class="type">' + payload.searchResult[i]['edition'] + '</span></div>';
                html += '<div class="add-favorite"></div>';
                /*
                html += '<div class="cluster"><span class="cluster">聚類新聞'+'</span></div></div><div class="cluster_container"><ul class="list">';
                if (payload.searchResult[i]['groupNews']) {
                    html += '<li class="clustertitle"><a href="/public/news/detail?id=' + payload.searchResult[i]['groupNews']['id'] + '"><span class="title">' + payload.searchResult[i]['groupNews']['title'] + '</span></a><span class="source">' + payload.searchResult[i]['groupNews']['media'] + '</span><span class="date">' + payload.searchResult[i]['groupNews']['publishDate'] + '</span><span class="number">' + payload.searchResult[i]['groupNews']['edition'] + '</span></li>';
                }
                */
                html += '</div></div></div>';

            }
            $(".result_list_container").html(html);

            $(".summery .value").text('共計 ' + payload.searchCount + ' 筆');

            var pageHtml = '';
            for (var i = 1; i <= totalPages; i++) {
                pageHtml += "<option value=" + i + ">第 " + i + " 頁</option>";
            }

            $('#loading').unblock(); //stop loading

            $("#page").html(pageHtml);
            $('#page option[value=' + pageNum + ']').prop('selected', true);

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
                    onPageClick: function(evt, pageNum) {
                        getContent(searchString, pageNum, pageLimit, sort, needGroupNews, advFilter, postFilter);
                    }
                });
            }

        }
        resultListgeneralCheckboxSelector();
        resultListAllSelected();
    });

}

function getPostFilter(searchString, advFilter) {
    $('#post_loading').block({ message: '<h1> 查詢中 </h1>' ,css: { 
        margin: 'auto',
        border: 'none', 
        padding: '15px', 
        backgroundColor: '#000', 
        '-webkit-border-radius': '10px', 
        '-moz-border-radius': '10px', 
        opacity: .5, 
        color: '#fff' 
    }}); 
    $.post("/public/api/news/get-post-filter-by-search", { searchString: searchString , advFilter : advFilter}, function(msg) {
        var data = JSON.parse(msg);

        if (data.success == true) {

            var payload = data.payload;


            html = '';
            html += '<div class="title"><span class="value">時間篩選</span>';
            html += '<div class="dropdown_menu"><ul class="list" id="time_filter">';
            var count = 0;

            for (var d in payload.publishDate) {
                var key = d;
                var value = payload.publishDate[d];
                count++;
                if (count <= 7) {
                    html += '<li class="data _show">';
                    html += '<div class="name">' + key + '</div>';
                    html += '<div class="count">' + value.count + '</div>';
                    html += '<div class="length" data-val="' + value.count + '">';
                    html += '<div class="length-graph"></div></div><div class="checkbox"><label class="checkbox" for=""></label><input class="checkbox" type="checkbox" name="" id=""> </div></li>';
                } else if (count == 8) {
                    html += '<div class="_hide">';
                } else {
                    html += '<li class="data" style="display:table">';
                    html += '<div class="name">' + key + '</div>';
                    html += '<div class="count">' + value.count + '</div>';
                    html += '<div class="length" data-val="' + value.count + '">';
                    html += '<div class="length-graph"></div></div><div class="checkbox"><label class="checkbox" for=""></label><input class="checkbox" type="checkbox" name="" id=""> </div></li>';
                }
                if (count == Object.keys(payload.publishDate).length && count > 7) {
                    html += '</div>';
                    html += '<li class="more hidemore"><i class="fa fa-plus"></i><div class="name">顯示更多</div></li>';
                }
            }

            $("#post_date").html(html);

            html_type = '';
            html_type += '<div class="title"><span class="value">資料類型</span>';
            html_type += '<div class="dropdown_menu"><ul class="list" id="type_filter">';


            for (var newsType in payload.newsClass) {
                var key = newsType;
                var value = payload.newsClass[key];

                html_type += '<li class="data _show">';
                html_type += '<div class="name" id="' + value.key + '">' + value.title + '</div>';
                html_type += '<div class="count">' + value.count + '</div>';
                html_type += '<div class="length" data-val="' + value.count + '">';
                html_type += '<div class="length-graph"></div></div><div class="checkbox"><label class="checkbox" for=""></label><input class="checkbox" type="checkbox" name="" id=""> </div></li>';

            }

            $("#post_type").html(html_type);

            html_media = '';
            html_media += '<div class="title"><span class="value">媒體來源</span>';
            html_media += '<div class="dropdown_menu"><ul class="list" id="media_filter">';
            count = 0;
            for (var newsMedia in payload.newsMedia) {
                var key = newsMedia;
                var value = payload.newsMedia[key];

                count++;
                if (count <= 7) {
                    html_media += '<li class="data _show">';
                    html_media += '<div class="name">' + key + '</div>';
                    html_media += '<div class="count">' + value.count + '</div>';
                    html_media += '<div class="length" data-val="' + value.count + '">';
                    html_media += '<div class="length-graph"></div></div><div class="checkbox"><label class="checkbox" for=""></label><input class="checkbox" type="checkbox" name="" id=""> </div></li>';
                } else if (count == 8) {
                    html_media += '<div class="_hide">';
                } else {
                    html_media += '<li class="data" style="display:table">';
                    html_media += '<div class="name">' + key + '</div>';
                    html_media += '<div class="count">' + value.count + '</div>';
                    html_media += '<div class="length" data-val="' + value.count + '">';
                    html_media += '<div class="length-graph"></div></div><div class="checkbox"><label class="checkbox" for=""></label><input class="checkbox" type="checkbox" name="" id=""> </div></li>';
                }
                if (count == Object.keys(payload.newsMedia).length && count > 7) {
                    html_media += '</div>';
                    html_media += '<li class="more hidemore"><i class="fa fa-plus"></i><div class="name">顯示更多</div></li>';
                }

            }

            $("#post_media").html(html_media);

            html_people = '';
            html_people += '<div class="title"><span class="value">人名</span>';
            html_people += '<div class="dropdown_menu"><ul class="list" id="people_filter">';
            count = 0;
            for (var newspeople in payload.people) {
                var key = newspeople;
                var value = payload.people[key];

                count++;
                if (count <= 7) {
                    html_people += '<li class="data _show">';
                    html_people += '<div class="name">' + key + '</div>';
                    html_people += '<div class="count">' + value.count + '</div>';
                    html_people += '<div class="length" data-val="' + value.count + '">';
                    html_people += '<div class="length-graph"></div></div><div class="checkbox"><label class="checkbox" for=""></label><input class="checkbox" type="checkbox" name="" id=""> </div></li>';
                } else if (count == 8) {
                    html_people += '<div class="_hide">';
                } else {
                    html_people += '<li class="data" style="display:table">';
                    html_people += '<div class="name">' + key + '</div>';
                    html_people += '<div class="count">' + value.count + '</div>';
                    html_people += '<div class="length" data-val="' + value.count + '">';
                    html_people += '<div class="length-graph"></div></div><div class="checkbox"><label class="checkbox" for=""></label><input class="checkbox" type="checkbox" name="" id=""> </div></li>';
                }
                if (count == Object.keys(payload.people).length && count > 7) {
                    html_people += '</div>';
                    html_people += '<li class="more hidemore"><i class="fa fa-plus"></i><div class="name">顯示更多</div></li>';
                }

            }

            $("#post_people").html(html_people);

            postListDown();
            postListMore();
            $('#post_loading').unblock(); //stop loading

            $("#commit_btn").click(function() {
                
                var postFilter = {};
                postFilter['publishDate'] = [];
                postFilter['newsClass'] = [];
                postFilter['newsMedia'] = [];
                postFilter['people'] = [];
                postFilter['region'] = [];

                $.each($('label.checkbox.active'), function(key, $label) {
                    switch ($(this).parents("li.datalist").attr("name")) {
                        case 'publishDate':
                            postFilter['publishDate'].push($(this).parent().parent().children('.name').text());
                            break;
                        case 'newsClass':
                            postFilter['newsClass'].push($(this).parent().parent().children('.name').attr('id'));
                            break;
                        case 'newsMedia':
                            postFilter['newsMedia'].push($(this).parent().parent().children('.name').text());
                            break;
                        case 'people':
                            postFilter['people'].push($(this).parent().parent().children('.name').text());
                            break;
                    }
                });
           
                //return postFilter;
                var pageLimit = $("#pagepercount option:selected").val();
                var sort = $("#sort option:selected").val();
                var needGroupNews = 'N';
                var pageNum = 1;
                getContent(searchString, pageNum, pageLimit, sort, needGroupNews, advFilter, postFilter);

            });

            $('.regionSearch').click(function() {
                var postFilter = {};
                postFilter['publishDate'] = [];
                postFilter['newsClass'] = [];
                postFilter['newsMedia'] = [];
                postFilter['people'] = [];
                postFilter['region'] = [];
                var region = $(this).attr('name');
                console.log(region);
                postFilter['region'].push(region);

                var pageLimit = $("#pagepercount option:selected").val();
                var sort = $("#sort option:selected").val();
                var needGroupNews = 'N';
                var pageNum = 1;
                getContent(searchString, pageNum, pageLimit, sort, needGroupNews, advFilter, postFilter);
            });

        }
        postClassificationFilterCheckboxBtn();
        rendPostClassificationFilterLength();
    });
}

function getAbstract(content,word_count) {
    //payload.searchResult[i]['content']
    if (content != "") {
        return content.substr(0, word_count);
    } else {
        return "";
    }
}


function changeContent(pageNum) {
    var searchString = keyword;
    // console.log(searchString);
    var pageLimit = $("#pagepercount option:selected").val();
    var sort = $("#sort option:selected").val();
    var needGroupNews = 'N';
    var advFilter = {};
    var postFilter = {};

    if(searchString.search('{')!= -1 && searchString.search('\"')!= -1){
        //進階檢索 json 轉回 Obj
        searchString ='';
        var jsonObj = JSON.parse(keyword);
        advFilter = jsonObj;
        // console.log(advFilter);
    }


    getContent(searchString, pageNum, pageLimit, sort, needGroupNews, advFilter, postFilter);
    getPostFilter(searchString, advFilter);
}

function saveKeyword() {
    // var input_bar = keyword;  //原始字串 進階需再做處理
    var selector = $('div.inputbar').children('input[placeholder]');  //放置位置
    var advInput_bar ='';
    if(keyword.search('{')== -1 && keyword.search('\"')== -1){
        $(selector).val(keyword);
    }else{ //進階索檢字串處理
        var jsonObj = JSON.parse(keyword);
        for (var index in jsonObj.custom) {
            var custom_index = index;
            var custom_content = jsonObj.custom[custom_index];
            if(index == 0 && custom_content.length != 0){  //第一個條件
                advInput_bar += custom_content[index] + " ";
            }else{
                advInput_bar += custom_content[0] == null ? " " : custom_content[0] + " ";
                advInput_bar += custom_content[1] == null ? " " : custom_content[1] + " ";
            }
        }
        $(selector).val(advInput_bar);
    }

    var searchText = keyword; //原始字串 進階需再做處理
    var selector_text = $('li.crumb').children('#keyword_text'); //放置位置
    var advText = '';
    if(searchText.search('{')== -1 && searchText.search('\"')== -1){
        $(selector_text).text(searchText);
    }else{ //進階索檢字串處理
        var jsonObj = JSON.parse(searchText);
        for (var index in jsonObj.custom) {
            var customText_index = index;
            var customText_content = jsonObj.custom[customText_index];
            if(index == 0 && customText_content.length != 0){  //第一個條件
                advText += customText_content[index] + " ";
            }else{
                advText += customText_content[0] == null ? " " : customText_content[0] + " ";
                advText += customText_content[1] == null ? " " : customText_content[1] + " ";
            }
        }
        $(selector_text).text(advText);
    }

    // localStorage.setItem("search_word","search_url");
    if(keyword.search('{')== -1 && keyword.search('\"')== -1){
        //簡易 
        var simpleInfo={
            title: keyword,
            url:location.href
        }
        putsearchhistory(simpleInfo);

    }else{
        //進階
        // console.log(keyword);
        var advObj = JSON.parse(keyword);
        var title_col="";
        var newsType='新聞類型：';
        var searchValue = '查詢值：';
        var searchDate ='出版日期：';
        var searchCate ='新聞條碼：';

        $.each(advObj,function(key,value){
            if(key=='newsClass'){
                
                for(var i=0;i<value.length;i++){
                    switch(value[i]){
                        case "2":
                            newsType += '平面新聞';
                            break;
                        case "5":
                            newsType += '雜誌報導';
                            break;
                        case "3":
                            newsType += '影音新聞';
                            break;
                        case "1":
                            newsType += '網路新聞';
                            break;
                    }
                    if(i != value.length-1){
                        newsType+=',';
                    }
                }
                // console.log(newsType);
            }
            
            if(key=='custom'){
                
                for(var i=0;i<value.length;i++){
                    if(i == 0 && value[i].length != 0){  //第一個條件
                        searchValue += value[i][0]; //條件一 第一個值
                        switch(value[i][1]){ //條件一 第二個值
                            case "all":
                                searchValue += ' 不限欄位';
                                break;
                            case "newsCode":
                                searchValue += ' 新聞條碼';
                                break;
                            case "title":
                                searchValue += ' 標題';
                                break;
                            case "newsMedia":
                                searchValue += ' 報刊名稱';
                                break;
                            case "edition":
                                searchValue += ' 版次';
                                break;
                            case "author":
                                searchValue += ' 作者';
                                break;
                            case "person":
                                searchValue += ' 人名';
                                break;
                        } 
                        if(i != value.length-1){
                            searchValue+=', ';
                        }
                        // console.log(searchValue);
                        
                    }else if(value[i].length != 0){
                        searchValue += value[i][0];  //第i條件 第一個值
                        searchValue += value[i][1]; //第i條件 第二個值
                        switch(value[i][2]){ //第i條件 第三個值
                            case "all":
                                searchValue += ' 不限欄位';
                                break;
                            case "newsCode":
                                searchValue += ' 新聞條碼';
                                break;
                            case "title":
                                searchValue += ' 標題';
                                break;
                            case "newsMedia":
                                searchValue += ' 報刊名稱';
                                break;
                            case "edition":
                                searchValue += ' 版次';
                                break;
                            case "author":
                                searchValue += ' 作者';
                                break;
                            case "person":
                                searchValue += ' 人名';
                                break;
                        } 
                        if(i != value.length-1){
                            searchValue+=', ';
                        }
                        // console.log(searchValue);
                    }
                }
            }
            if(key=='dateRange'){
                
                for(var i=0;i<value.length;i++){
                           
                    // console.log(value[i][0]);
                    searchDate += value[i];  //第i條件 第一個值
                    if(i != value.length-1){
                        searchDate+=' 至 ';
                    }
                    // console.log(searchDate);
                }
            }
            if(key=='codeRange'){
                
                for(var i=0;i<value.length;i++){
                           
                    // console.log(value[i][0]);
                    searchCate += value[i];  //第i條件 第一個值
                    if(i != value.length-1){
                        searchCate+=' 至 ';
                    }
                    // console.log(searchCate);
                }
            }
            
        });
        title_col = newsType +"\n"+ searchValue + "\n"+ searchDate + "\n" +searchCate;

        
        var advInfo ={
            url : location.href,
            title : title_col
        };

        putsearchhistory(advInfo);

    }

    obj = JSON.parse(window.localStorage.getItem("searchHistory"));
    console.log(obj);

    html_keyword = '';
    var cookie_len = obj.length;
    for(var i = 0 ; i < cookie_len ; i++){
        console.log(obj[i]);

        html_keyword += '<span class="value">';
        html_keyword += '<a target="_blank" href ="' + obj[i].url;
        html_keyword += '">' +escapeHtml(obj[i].title) +'</a>';
        html_keyword += '</span></br><hr>';  
    }
    
    $("#search_key").html(html_keyword);

}

function putsearchhistory(word){
    var history = [];
    if(localStorage["searchHistory"] == undefined){
        history[0] = word;
    } 
    else {
        var obj = JSON.parse(window.localStorage.getItem("searchHistory")); // string to obj
        history = Object.keys(obj).map(function(k) { return obj[k] }); // obj to array
        history.unshift(word); // array push to head
    }
    history = history.slice(0, 5); // 只取前 5 筆;
    localStorage["searchHistory"] = JSON.stringify(history); // obj/array to string
    // console.log("localStorage:"+localStorage["searchHistory"]);
}

function escapeHtml (string) {
    var entityMap = {
     '&': '&',
     '<': '&lt;',
     '>': '&gt;',
     '"': '&quot;',
     "'": '&#39;',
     '/': '&#x2F;',
     '`': '&#x60;',
     '=': '&#x3D;'
    };
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
        return entityMap[s];
    });
}

$('#clearBtn').click(function() {
    localStorage.clear();
    window.location.reload();
    html_keyword = '';
    
});

function filterCondition() {
    $("#pagepercount, #sort").change(function() {
        changeContent(1);
    });

    $("#page").change(function() {
        var page = $("#page option:selected").val();
        changeContent(page);
    });
}

function postListDown() {
    var filterBtn = $('.left_container .post_classification_container .list .datalist .title .value');
    filterBtn.off().click(function(e) {
        var dropdwonMenu = $(this).parent().children('.dropdown_menu');
        if (dropdwonMenu.css('display') == 'block') {
            dropdwonMenu.slideUp(200);
            $(this).children('.title').removeClass('active');

        } else {
            dropdwonMenu.slideDown(200);
            $(this).children('.title').addClass('active');
        }
    });
}

function postListMore() {
    var showmore = $('.post_classification_container .list .datalist .title .dropdown_menu .list .more');

    showmore.off().click(function() {
        var hiddenData = $(this).parent();
        if ($(this).hasClass('hidemore')) {
            hiddenData.children('._hide').slideUp(200);
            $(this).removeClass('hidemore');
            $(this).html('<i class="fa fa-plus"></i><div class="name">顯示更多</div>');
        } else {
            hiddenData.children('._hide').slideDown(200);
            $(this).addClass('hidemore');
            $(this).html('<i class="fa fa-minus"></i><div class="name">顯示更少</div>');
        }
    });

    showmore.trigger("click");
}