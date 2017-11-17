
$(window).bind( 'load', function() {
    newslistCheckboxSelector();

    generalCheckboxSelector();

    generalRadioSelector();

    generalListAllSelected();

    editSubscriptionBtn();

    deleteSubscriptionBtn();

    susbainIfTimelineChecked();

    // personalManagementModalBtn();

});

function editSubscriptionBtn() {
    var editBtn = $('.newslist_container .newslist tr td .button.edit');
    var titleInput = $('#subscriptionTitle');
    var contentInput = $('#subscriptionContent');

    editBtn.off().click(function() {
        var title = $(this).parent().parent().children('td:first-child').html();
        var content = $(this).parent().parent().children('td:nth-child(2)').html();

        titleInput.val( title );
        contentInput.val( content );

        $('html, body').animate({
            scrollTop: $("#editSubscription").offset().top
        }, 500);
    });
}

function deleteSubscriptionBtn() {
    var deleteBtn = $('.newslist_container .newslist tr td .button.delete');
    deleteBtn.off().click(function() {
        if(confirm('確定要刪除嗎？')) {
            $(this).parent().parent().replaceWith();
        }
    });
}

// 訂閱條件Modal彈出，暫時沒有用到而用editSubscriptionBtn
function personalManagementModalBtn() {
    var modalBtn = $('.newslist_container .newslist tr td .button.edit');
    var personalManagementModal = $('.personal_management_modal_container');
    var target = $('.personal_management_modal_container .lightbox');
    var submit = $('.personal_management_modal_container .lightbox .content .setting_content button');

    modalBtn.off().click( function() {
        $('body').css('overflow', 'hidden');
        personalManagementModal.fadeIn(200);
    });

    personalManagementModal.off().click( function(e) {
        if( !target.is(e.target) && target.has(e.target).length === 0 ) {
            $('body').css('overflow', 'auto');
            personalManagementModal.fadeOut(200);
        }
    });

    submit.off().click( function() {
        $('body').css('overflow', 'auto');
        personalManagementModal.fadeOut(200);
    });
}

// 選了焦點話題就不能輸入下方的訂閱條件
function susbainIfTimelineChecked() {
    var timelineBtn = $('.checkbox_list .list .checkbox label[data-val="timeline"]');
    //var timelineBtn = $('#subscriptionClass input[data-val="timeline"]');
    var timelineSusbainBlock = $('.subscription_setting .setting_content:nth-of-type(4), .subscription_setting .setting_content:nth-of-type(5), .subscription_setting .setting_content:nth-of-type(6), .subscription_setting .setting_content:nth-of-type(7), .subscription_setting .setting_content:nth-of-type(8)');
    timelineBtn.off().click( function() {
        var timelineCheckbox = $(this).next();
        if( !timelineCheckbox.prop('checked') ) {
            timelineSusbainBlock.fadeOut(0);
            $('select.timeline_title').fadeIn(0);
        } else {
            timelineSusbainBlock.fadeIn(0);
            $('select.timeline_title').fadeOut(0);
        }
    });
}

