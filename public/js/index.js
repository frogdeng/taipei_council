// timelineJS的設定
var options = {
    hash_bookmark: false,
    marker_width_min: 200,
    initial_zoom: 0.5,
    scale_factor: 0.5,
    language: "zh-tw",
    zoom_sequence: [0.5, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
    timenav_height: 300,
    timenav_height_percentage: 10,
    track_event: ['back_to_start', 'nav_next', 'nav_previous', 'zoom_in', 'zoom_out']

}

// 以array區分timeline的資料
var timelineJson = [{
        "events": [{
                "headline": "",
                "start_date": {
                    "year": 2017,
                    "month": 01,
                    "day": 21,
                    "format": ""
                },
                "media": {
                    "caption": "",
                    "credit": "",
                    "url": "",
                    "thumb": ""
                },
                "text": {
                    "headline": "",
                    "text": "2017-01-21 T台主播蘇宗怡會車王　膝蓋直發抖<div class='hyperlink' data-link='./timeline_news.html'>(連結)</div>"
                },
                "unique_id": "test"
            },
            {
                "headline": "",
                "start_date": {
                    "year": 2017,
                    "month": 01,
                    "day": 23,
                    "format": ""
                },
                "media": {
                    "caption": "",
                    "credit": "",
                    "url": "",
                    "thumb": ""
                },
                "text": {
                    "headline": "",
                    "text": "2017-01-21 T台主播蘇宗怡會車王　膝蓋直發抖<div class='hyperlink' data-link='./timeline_news.html'>(連結)</div>"
                },
                "unique_id": "test"
            },
            {
                "headline": "",
                "start_date": {
                    "year": 2016,
                    "month": 01,
                    "day": 23,
                    "format": ""
                },
                "media": {
                    "caption": "",
                    "credit": "",
                    "url": "",
                    "thumb": ""
                },
                "text": {
                    "headline": "",
                    "text": "2017-01-21 T台主播蘇宗怡會車王　膝蓋直發抖<div class='hyperlink' data-link='./timeline_news.html'>(連結)</div>"
                },
                "unique_id": "test"
            },
            {
                "headline": "",
                "start_date": {
                    "year": 2017,
                    "month": 04,
                    "day": 23,
                    "format": ""
                },
                "media": {
                    "caption": "",
                    "credit": "",
                    "url": "",
                    "thumb": ""
                },
                "text": {
                    "headline": "",
                    "text": "2017-01-21 T台主播蘇宗怡會車王　膝蓋直發抖<div class='hyperlink' data-link='./timeline_news.html'>(連結)</div>"
                },
                "unique_id": "test"
            }
        ]
    },
    {
        "events": [{
                "headline": "",
                "start_date": {
                    "year": 2017,
                    "month": 01,
                    "day": 21,
                    "format": ""
                },
                "media": {
                    "caption": "",
                    "credit": "",
                    "url": "",
                    "thumb": ""
                },
                "text": {
                    "headline": "",
                    "text": "T台主播蘇宗怡會車王　膝蓋直發抖"
                },
                "unique_id": "test"
            },
            {
                "headline": "",
                "start_date": {
                    "year": 2017,
                    "month": 01,
                    "day": 23,
                    "format": ""
                },
                "media": {
                    "caption": "",
                    "credit": "",
                    "url": "",
                    "thumb": ""
                },
                "text": {
                    "headline": "",
                    "text": "T台主播蘇宗怡會車王　膝蓋直發抖"
                },
                "unique_id": "test"
            },
            {
                "headline": "",
                "start_date": {
                    "year": 2016,
                    "month": 01,
                    "day": 23,
                    "format": ""
                },
                "media": {
                    "caption": "",
                    "credit": "",
                    "url": "",
                    "thumb": ""
                },
                "text": {
                    "headline": "",
                    "text": "T台主播蘇宗怡會車王　膝蓋直發抖"
                },
                "unique_id": "test"
            },
            {
                "headline": "",
                "start_date": {
                    "year": 2017,
                    "month": 04,
                    "day": 23,
                    "format": ""
                },
                "media": {
                    "caption": "",
                    "credit": "",
                    "url": "",
                    "thumb": ""
                },
                "text": {
                    "headline": "",
                    "text": "T台主播蘇宗怡會車王　膝蓋直發抖"
                },
                "unique_id": "test"
            }
        ]
    },
    {
        "events": [{
                "headline": "",
                "start_date": {
                    "year": 2017,
                    "month": 01,
                    "day": 21,
                    "format": ""
                },
                "media": {
                    "caption": "",
                    "credit": "",
                    "url": "",
                    "thumb": ""
                },
                "text": {
                    "headline": "",
                    "text": "T台主播蘇宗怡會車王　膝蓋直發抖"
                },
                "unique_id": "test"
            },
            {
                "headline": "",
                "start_date": {
                    "year": 2017,
                    "month": 01,
                    "day": 23,
                    "format": ""
                },
                "media": {
                    "caption": "",
                    "credit": "",
                    "url": "",
                    "thumb": ""
                },
                "text": {
                    "headline": "",
                    "text": "T台主播蘇宗怡會車王　膝蓋直發抖"
                },
                "unique_id": "test"
            },
            {
                "headline": "",
                "start_date": {
                    "year": 2016,
                    "month": 01,
                    "day": 23,
                    "format": ""
                },
                "media": {
                    "caption": "",
                    "credit": "",
                    "url": "",
                    "thumb": ""
                },
                "text": {
                    "headline": "",
                    "text": "T台主播蘇宗怡會車王　膝蓋直發抖"
                },
                "unique_id": "test"
            },
            {
                "headline": "",
                "start_date": {
                    "year": 2017,
                    "month": 04,
                    "day": 23,
                    "format": ""
                },
                "media": {
                    "caption": "",
                    "credit": "",
                    "url": "",
                    "thumb": ""
                },
                "text": {
                    "headline": "",
                    "text": "T台主播蘇宗怡會車王　膝蓋直發抖"
                },
                "unique_id": "test"
            }
        ]
    },
    {
        "events": [{
                "headline": "",
                "start_date": {
                    "year": 2017,
                    "month": 01,
                    "day": 21,
                    "format": ""
                },
                "media": {
                    "caption": "",
                    "credit": "",
                    "url": "",
                    "thumb": ""
                },
                "text": {
                    "headline": "",
                    "text": "T台主播蘇宗怡會車王　膝蓋直發抖"
                },
                "unique_id": "test"
            },
            {
                "headline": "",
                "start_date": {
                    "year": 2017,
                    "month": 01,
                    "day": 23,
                    "format": ""
                },
                "media": {
                    "caption": "",
                    "credit": "",
                    "url": "",
                    "thumb": ""
                },
                "text": {
                    "headline": "",
                    "text": "T台主播蘇宗怡會車王　膝蓋直發抖"
                },
                "unique_id": "test"
            },
            {
                "headline": "",
                "start_date": {
                    "year": 2016,
                    "month": 01,
                    "day": 23,
                    "format": ""
                },
                "media": {
                    "caption": "",
                    "credit": "",
                    "url": "",
                    "thumb": ""
                },
                "text": {
                    "headline": "",
                    "text": "T台主播蘇宗怡會車王　膝蓋直發抖"
                },
                "unique_id": "test"
            },
            {
                "headline": "",
                "start_date": {
                    "year": 2017,
                    "month": 04,
                    "day": 23,
                    "format": ""
                },
                "media": {
                    "caption": "",
                    "credit": "",
                    "url": "",
                    "thumb": ""
                },
                "text": {
                    "headline": "",
                    "text": "T台主播蘇宗怡會車王　膝蓋直發抖"
                },
                "unique_id": "test"
            }
        ]
    }
];

$(window).bind('load', function() {
    var eventId = $('.timeline_container .timeline_header_container .timeline_tabmenu_container .list .value.active').attr('data-val');
    console.log('eventId:' + eventId);
    timelineNewsList(eventId, 1, 50, '');
    timelineTabMenuSwitch();
    graphTabMenuSwitch();

    // 
    var concilorRightCard = $('.content_container .concilor_cards_container .tab_container:last-child');

    var concilorLeftCardHeight = $('.content_container .concilor_cards_container .tab_container:first-child').height();
    concilorRightCard.css('height', concilorLeftCardHeight + 29 + 'px');

    $('.login_container').css('display', 'block');

    var timeline = new TL.Timeline('timeline_0', timelineJson[0], options);
    window.onresize = function(event) {
        timeline.updateDisplay();
    }

    setHyperlinkActive();

});


// 首頁新聞列表內容更換
function indexTabMenuSwitch() {
    var tabBtn = $('.tab_container .tabmenu_list .list li');

    tabBtn.off().click(function() {
        var tableContent = $(this).parent().parent().next().children('.content').children('.tab_content');
        $(this).parent().children('li').each(function() {
            $(this).removeClass('active');
        });
        tableContent.each(function() {
            $(this).fadeOut(0);
        });

        $(this).addClass('active');
        tableContent.parent().children('.tab_content[data-val="' + $(this).attr('data-val') + '"]').fadeIn(0);
    });

}

// 時間軸Tab資料更換
function timelineTabMenuSwitch() {
    var timelineTabBtn = $('.timeline_container .timeline_header_container .timeline_tabmenu_container .list li');
    var timelineContent = $('.timeline_container .timeline .content');

    timelineTabBtn.off();
    timelineTabBtn.click(function() {

        timelineTabBtn.each(function() {
            $(this).removeClass('active');
        });
        timelineContent.each(function() {
            $(this).fadeOut(0);
        });

        $(this).addClass('active');
        timelineContent.parent().children('.content[data-val="' + $(this).attr('data-val') + '"]').fadeIn(0);
        var eventId = $('.timeline_container .timeline_header_container .timeline_tabmenu_container .list .value.active').attr('data-val');
        console.log('eventId:' + eventId);
        timelineNewsList(eventId, 1, 50, '');
        var json = timelineJson[0];
        //var json = timelineJson[$(this).attr('data-val')];

        var timeline = new TL.Timeline('timeline_' + $(this).attr('data-val'), json, options);
        window.onresize = function(event) {
            timeline.updateDisplay();
        }

        setHyperlinkActive();

    });
}

function graphTabMenuSwitch() {
    var graphTabBtn = $('.graph_container .graph_tabmenu .list li');
    var graphContent = $('.graph_container .graph_content .content');

    graphTabBtn.off();
    graphTabBtn.click(function() {

        graphTabBtn.each(function() {
            $(this).removeClass('active');
        });
        graphContent.each(function() {
            $(this).fadeOut(0);
        });

        $(this).addClass('active');
        graphContent.parent().children('.content[data-val="' + $(this).attr('data-val') + '"]').fadeIn(0);

    });
}

function setHyperlinkActive() {
    var hyperlink = $('.hyperlink');
    hyperlink.off().click(function() {
        var link = $(this).attr('data-link');
        location.href = link;
    });
}

function timelineNewsList(eventId, pageNum, pageLimit, sort) {
    $.ajax({
            url: "/public/api/event/get-news-list",
            method: "POST",
            async: false,
            cache: true,
            data: {
                eventId: eventId,
                pageNum: pageNum,
                pageLimit: pageLimit,
                sort: sort
            }
        })
        .done(function(msg) {
            var data = JSON.parse(msg);
            if (data.success == true) {
                var payload = data.payload;
                refreshTimelineData(payload.searchResult);
            }
        });
    /*
    $.post("/public/api/event/get-news-list", { eventId: eventId, pageNum: pageNum, pageLimit: pageLimit, sort: sort }, function(msg) {
        var data = JSON.parse(msg);
        if (data.success == true) {
            var payload = data.payload;
            refreshTimelineData(payload.searchResult);
        }
    });
    */
}

function refreshTimelineData(newsList) {
    timelineJson = [{
        "events": []
    }];
    for (var i = 0; i < newsList.length; i++) {
        timelineItem = {
            "headline": "",
            "start_date": {
                "year": newsList[i]['publishYear'],
                "month": newsList[i]['publishMonth'],
                "day": newsList[i]['publishDay'],
                "format": ""
            },
            "media": {
                "caption": "",
                "credit": "",
                "url": "",
                "thumb": ""
            },
            "text": {
                "headline": "",
                "text": "<div class='hyperlink' data-link='/public/news/detail?id=" + newsList[i]['id'] + "'>"+ newsList[i]['title'] +"</div>"
            },
            "unique_id": newsList[i]['id']
        }
        timelineJson[0].events.push(timelineItem);
    }
    console.log(timelineJson);
}