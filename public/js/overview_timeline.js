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

// timeline的資料
var timelineJson = {
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
};

$(window).bind('load', function() {

    var timeline = new TL.Timeline('timeline_0', timelineJson, options);
    window.onresize = function(event) {
        timeline.updateDisplay();
    }

    setHyperlinkActive();

});


function setHyperlinkActive() {
    var hyperlink = $('.hyperlink');
    hyperlink.off().click(function() {
        var link = $(this).attr('data-link');
        location.href = link;
    });
}