$( function() {
    $(window).resize( function() {
        phoneMenuBtn();
    });
});

$(window).bind('load', function() {
    $('.login_container').css('display', 'none');

    $('.datepicker').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        todayHighlight: true,
        language: 'zh-TW',
        endDate: 'd'
    });

    loginBoxBtn();

    phoneMenuBtn();

    phoneMenuToggleBtn();

    indexTabMenuSwitch();

    footerMenuSwitch();

    getHeaderTime();
});

function loginBoxBtn() {
    var loginBoxBtn = $('a.loginbox');
    var loginbox = $('.login_container');
    var target = $('.login_container .lightbox');
    var guestBtn = $('.lightbox_container .lightbox .guest_box button.guest');

    loginBoxBtn.off().click( function() {
        $('body').css('overflow', 'hidden');
        loginbox.fadeIn(200);
    });

    loginbox.off().click( function(e) {
        if( !target.is(e.target) && target.has(e.target).length === 0 ) {
            $('body').css('overflow', 'auto');
            loginbox.fadeOut(200);
        }
    });

    guestBtn.off().click( function() {
        $('body').css('overflow', 'auto');
        loginbox.fadeOut(200);
    });
}

// 判斷選單在RWD的顯示方式
function phoneMenuBtn() {

    var menuBtn = $('.header .menubar_container .menubar .list li');
    if( $(window).width() <= '767' ) {
        
        //menuBtn.children('.dropdown_menu').css('display', 'none');

        menuBtn.off().click( function(e) {
            if( $(this).children('.dropdown_menu').children('ul').css('display') == 'none' ) {
                menuBtn.children('.dropdown_menu').addClass('no-before');
                $(this).children('.dropdown_menu').children('ul').css('display', 'block');
            } else {
                menuBtn.children('.dropdown_menu').removeClass('no-before');
                $(this).children('.dropdown_menu').children('ul').css('display', 'none');
            }      
        });
    } else {
        menuBtn.off().children('.dropdown_menu').removeAttr('style');
    }
    
}

// RWD手機板網頁選單開合
function phoneMenuToggleBtn() {
    var showMenuBtn = $('.header .upper_header .icon-bars')
    var returnBtn = $('.header .menubar_container .menubar .list .icon-return');

    showMenuBtn.off().click( function() {
        $('.header .menubar_container').fadeIn(200);
    });

    returnBtn.off().click( function() {
         $('.header .menubar_container').fadeOut(200);
    });
}

// 首頁新聞列表內容更換
function indexTabMenuSwitch() {
    var tabBtn = $('.tab_container .tabmenu_list .list li');
    //var tabType = tabBtn.attr('data-val');
    var tableContent = $('.tab_container .tab_content_container .content .tab_content');

    tabBtn.off().click( function() {
        tabBtn.each( function() {
            $(this).removeClass('active');
        });
        tableContent.each( function() {
            $(this).fadeOut(0);
        });

        $(this).addClass('active');
        tableContent.parent().children('.tab_content[data-val="'+ $(this).attr('data-val') +'"]').fadeIn(0);
    });

}

// 新聞列表checkbox選取
function newslistCheckboxSelector() {
    var checkboxLabel = $('.newslist_container .newslist tr td label');

    checkboxLabel.off().click( function() {
        var checkbox = $(this).parent().children('input');
        if( checkbox.prop('checked') == true ) {
            $(this).removeClass('active');
            checkbox.attr('checked', false);
        } else {
            $(this).addClass('active');
            checkbox.attr('checked', true);
        }
    });

}

// checkbox 選取
function generalCheckboxSelector() {
    var checkboxLabel = $('.checkbox_list .list .checkbox');

    checkboxLabel.off().click( function() {
        var checkbox = $(this).children('input');
        if( checkbox.prop('checked') == true ) {
            $(this).children('label').removeClass('active');
            checkbox.attr('checked', false);
        } else {
            $(this).children('label').addClass('active');
            checkbox.attr('checked', true);
        }
    });
}

// radio 選取
function generalRadioSelector() {
    var radioLabel = $('.radio_list .list .radio');

    radioLabel.off().click( function() {
        $(this).parent().children('li').each( function() {
            $(this).children('label').removeClass('active');
            $(this).children('input').attr('checked', false);
        });
        var radio = $(this).children('input');
        if( radio.prop('checked') == true ) {
            $(this).children('label').removeClass('active');
            radio.attr('checked', false);
        } else {
            $(this).children('label').addClass('active');
            radio.attr('checked', true);
        }
    });
}

// 網站架構收合
function footerMenuSwitch() {
    var footerMenuBtn = $('.footer_container .upper_footer .title');
    var footerMenuIcon = footerMenuBtn.children('i');
    var footerMenuContainer = $('.footer_container .upper_footer .menu_table, .footer_container .upper_footer .logo_list_container');
    footerMenuBtn.off().click( function(e) {
        if( footerMenuContainer.css('display') == 'none' ) {
            footerMenuContainer.slideDown(200);
            footerMenuIcon.removeClass('fa-chevron-circle-down').addClass('fa-chevron-circle-up');
        } else {
            footerMenuIcon.removeClass('fa-chevron-circle-up').addClass('fa-chevron-circle-down');
            footerMenuContainer.slideUp(200);
        }      
    });

}

function generalListAllSelected() {
    var allSelectedBtn = $('.selector .icon-selector_container');
    var checkboxLabel = $('.newslist_container .newslist tr td');

    allSelectedBtn.off().click( function() {
        checkboxLabel.each( function() {
            var checkbox = $(this).children('input');
            if( allSelectedBtn.hasClass('active') ) {
                $(this).children('label').removeClass('active');
                checkbox.attr('checked', false);
            } else {
                $(this).children('label').addClass('active');
                checkbox.attr('checked', true);
            }
        });
        if( $(this).hasClass('active') ) {
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
        }
    });
}

/*
Blueplanet code
*/

// header 左上角時間
function getHeaderTime()
{
    var d = new Date();
    var year = d.getFullYear() - 1911;
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var day = d.getDay();

    var dayArray = [ '日', '一', '二', '三', '四', '五', '六'];
    day = dayArray[day];

    var timeString = "中華民國 " + year + " 年 " + month + " 月 " + date + " 日 星期" + day;
    $(".upper_date").text(timeString);
}