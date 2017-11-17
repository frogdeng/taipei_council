$(window).bind( 'load', function() {

    resultListgeneralCheckboxSelector();

    resultListAllSelected();

    filterDropdownActive();

    analysisGraphContainerActive();
    
    clusterContainerActive();
    
    filterShowmore();

    //$('.attachment_modal_container').css('display', 'none');

    attachmentGelleryTurnBtn();

    attachmentDetailGalleryTurnBtn();

    postClassificationFilterCheckboxBtn();

    rendPostClassificationFilterLength();
});

// checkbox 選取
function resultListgeneralCheckboxSelector() {
    var checkboxLabel = $('.result_list_container .search_result .checkbox');

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

function resultListAllSelected() {
    var allSelectedBtn = $('.selector .icon-selector_container');
    var checkboxLabel = $('.result_list_container .search_result .checkbox');

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

function filterDropdownActive() {
    var filterBtn = $('.left_container .post_classification_container .list .datalist .title .value');
    filterBtn.off().click( function(e) {
        var dropdwonMenu = $(this).parent().children('.dropdown_menu');
        if( dropdwonMenu.css('display') == 'block' ) {
            dropdwonMenu.slideUp(200);
            $(this).children('.title').removeClass('active');
            
        } else {
            dropdwonMenu.slideDown(200);
            $(this).children('.title').addClass('active');
        }
    });
}

function analysisGraphContainerActive() {
    var analysisBtn = $('.analysisBtn_container .analysisBtn');
    var eachAnalysisGraphContainer = $('.analysis_graph_container');

    analysisBtn.off().click( function() {
        var dataVal = $(this).attr('data-val');  
        var analysisGraphContainer = $(this).parent().parent().children('.analysis_graph_container[data-val='+ dataVal +']');
        if( analysisGraphContainer.css('display') == 'block' ) {           
            analysisGraphContainer.fadeOut(200);      
        } else {
            eachAnalysisGraphContainer.each( function() {
                $('.analysis_graph_container').css('display', 'none');
            });
            analysisGraphContainer.fadeIn(200);
        }
        analysisBtn.removeClass('unactive');
        /** @todo */

    });
}

function clusterContainerActive() {
    var clusterBtn = $('.bottom_element_container div.cluster');
    clusterBtn.off().click( function() {
        var clusterContainer = $(this).parent().parent().children('.cluster_container');
        if( clusterContainer.css('display') == 'block' ) {
            clusterContainer.slideUp(200);
            $(this).children('.title').removeClass('active');
        } else {
            clusterContainer.slideDown(200);
            $(this).children('.title').addClass('active');
        }
    });
}

function filterShowmore() {
    var showmore = $('.post_classification_container .list .datalist .title .dropdown_menu .list .more');
    showmore.off().click( function() {
        var hiddenData = $(this).parent();
        if( $(this).hasClass('hidemore') ) {
            hiddenData.children('._hide').slideUp(200);
            $(this).removeClass('hidemore');
            $(this).html('<i class="fa fa-plus"></i><div class="name">顯示更多</div>');
        } else {
            hiddenData.children('._hide').slideDown(200);
            $(this).addClass('hidemore');
            $(this).html('<i class="fa fa-minus"></i><div class="name">顯示更少</div>');
        }
    });
}

function attachmentGelleryTurnBtn() {
    var lightboxBtn = $('.attachment_list .list .attachment');
    var closeBtn = $('.attachment_modal_container .lightbox .btn.closeBtn_container');
    var lightbox = $('.attachment_modal_container');
    //var lightboxPhotoImg = $('.attachment_list .list .attachment');
    var imgLength = lightboxBtn.length;

    var lightboxPhotoImgReplace = $('.lightbox_container .lightbox .content .image_container a');

    var prevBtn = $('.attachment_modal_container .lightbox .btn.prevBtn_container');
    var nextBtn = $('.attachment_modal_container .lightbox .btn.nextBtn_container');

    lightboxBtn.off().click( function() {
        var currentPhotoImgPath = $(this).html();
        var link = $(this).attr('data-link');
        lightboxPhotoImgReplace.attr('href', link ).html( currentPhotoImgPath );
        $('body').css('overflow', 'hidden');
        lightbox.fadeIn(200);

        var currentCover = $(this);
        var indexOfNode = $(this).index();


        nextBtn.off().click( function() {
            indexOfNode++;
            indexOfNode = indexOfNode % imgLength;
            var currentPhotoImgPath = currentCover.parent().children().eq(indexOfNode).html();
            var link = currentCover.attr('data-link');
            lightboxPhotoImgReplace.attr('href', link ).html( currentPhotoImgPath );
        });

        prevBtn.off().click( function() {
            indexOfNode--;
            indexOfNode = indexOfNode % imgLength;
            var currentPhotoImgPath = currentCover.parent().children().eq(indexOfNode).html();
            var link = currentCover.attr('data-link');
            lightboxPhotoImgReplace.attr('href', link ).html( currentPhotoImgPath );
        });
        

    });

    closeBtn.off();
    closeBtn.click( function() {
        $('body').css('overflow', 'auto');
        lightbox.fadeOut(200);
    });
}

function attachmentDetailGalleryTurnBtn() {
    var container = $('.attachment_content_container .main_image');

    var prevBtn = $('.attachment_content_container ._btn.prevBtn_container');
    var nextBtn = $('.attachment_content_container ._btn.nextBtn_container');
    var attachmentBtn = $('.attachment_content_container .other_attchments .list .attchment');
    var attachmentLength = attachmentBtn.length;
    
    attachmentBtn.off().click( function() {
        attachmentBtn.removeClass('active');
        $(this).addClass('active');
        var attachmentHtml = $(this).html();
        container.html( attachmentHtml );
    });

    prevBtn.off().click( function() {
        var currentCover = $('.attachment_content_container .other_attchments .list .attchment.active')
        var indexOfNode = currentCover.index();
        indexOfNode--;
        indexOfNode = indexOfNode % attachmentLength;
        var currentAttachmentPath = currentCover.parent().children().eq(indexOfNode);
        attachmentBtn.removeClass('active');
        currentAttachmentPath.addClass('active');
        container.html( currentAttachmentPath.html() );
    });

    nextBtn.off().click( function() {
        var currentCover = $('.attachment_content_container .other_attchments .list .attchment.active')
        var indexOfNode = currentCover.index();
        indexOfNode++;
        indexOfNode = indexOfNode % attachmentLength;
        var currentAttachmentPath = currentCover.parent().children().eq(indexOfNode);
        attachmentBtn.removeClass('active');
        currentAttachmentPath.addClass('active');
        container.html( currentAttachmentPath.html() );
    });

}

function postClassificationFilterCheckboxBtn() {
    var filterBtn = $('.post_classification_container .list .dropdown_menu .list .data > .checkbox label');

    filterBtn.off().click( function() {
        var checkbox = $(this).next();
        if( checkbox.prop('checked') == true ) {
            $(this).removeClass('active');
            checkbox.attr('checked', false);
        } else {
            $(this).addClass('active');
            checkbox.attr('checked', true);
        }
    });
}

function rendPostClassificationFilterLength() {
    var type = $('.post_classification_container .list .dropdown_menu .list');

    type.each( function() {

        var length = $(this).find('.data').children('.length');
        var max = 0;
        length.each( function() {
            if( parseInt($(this).attr('data-val')) > max ) {
                max = parseInt($(this).attr('data-val'));
            }
        });
        length.each( function() {
            $(this).children('.length-graph').css('width',  ( $(this).attr('data-val') / max )*100 +'%' );
        });

    });

}
