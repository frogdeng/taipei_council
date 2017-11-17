
$(window).bind( 'load', function() {
    newslistCheckboxSelector();

    headerCollapseSwitch();

    regionSelector();

    regionSelectedBtn();

    generalCheckboxSelector();

    generalListAllSelected();

});

function headerCollapseSwitch() {
    var collapseBtn = $('.selector_container .header_selector .header_collapse_select');
    var collaspseCover = $('.selector_container .header_selector .header_collapse_container');

    collapseBtn.off().click( function() {
        if( $(this).hasClass('active') ) {
            $(this).removeClass('active');
            collaspseCover.removeClass('active');
        } else {
            $(this).addClass('active');
            collaspseCover.addClass('active');
        }
    });
}

// 地圖初始化
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map_canvas'), {
        center: { lat: 25.037736, lng: 121.561923},
        zoom: 16
    });
}

function regionSelector() {
    var regionCardBtn = $('.map_selector .region_selector .region_list .list .region');
    var regionCardSelectedList = $('.map_selector_container .region_selected_container .regioncard .list');
    var regionCardSelectedBtn = regionCardSelectedList.children('li');

    regionCardBtn.off().click( function() {
        var text = $(this).children('.value').html();

        if( $(this).hasClass('active') ) {
            $(this).removeClass('active');
            regionCardSelectedList.children('.region[data-val="'+ text +'"]').replaceWith('');
        } else {
            $(this).addClass('active');
            regionCardSelectedList.append('<li class="region" data-val="'+ text +'"><div class="card">'+ text +'</div></li>');
            regionSelectedBtn();
        }
    });
}

function regionSelectedBtn() {
    var regionCards = $('.map_selector .region_selector .region_list .list');
    var regionCardSelectedList = $('.map_selector_container .region_selected_container .regioncard .list');
    var regionCardSelectedBtn = regionCardSelectedList.children('.region');

    regionCardSelectedBtn.off().click( function() {
        var text = $(this).children('.card').html(); 
        regionCards.children('.region[data-val="'+ text +'"]').removeClass('active');
        $(this).replaceWith('');
        regionSelectedBtn();
    });
}
