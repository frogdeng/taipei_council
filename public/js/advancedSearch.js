$(window).bind('load', function() {
    generalCheckboxSelector();

    searchBarInsert();
});

function searchBarInsert() {
    var insertBtn = $('.searchbar_list .list .searchbar div i');

    insertBtn.off().click(function() {
        if ($(this).parent().hasClass('add_colunm')) {
            var liHtml = '<li class="searchbar">' +
                '<span class="label">請輸入查詢值</span>' +
                '<div class="selector_container boolean">' +
                '<select name="boolean" id="" class="selector boolean">' +
                '<option value="AND">AND</option>' +
                '<option value="OR">OR</option>' +
                '<option value="NOT">NOT</option>' +
                '</select>' +
                '</div>' +
                '<input type="text" name="keyword" id="" value="">' +
                '<div class="selector_container">' +
                '<select name="boolean" id="" class="selector advColumn">' +
                '<option value="all">不限欄位</option>' +
                '<option value="newsCode">新聞條碼</option>' +
                '<option value="title">標題</option>' +
                '<option value="newsMedia">報刊名稱</option>' +
                '<option value="edition">版次</option>' +
                '<option value="author">作者</option>' +
                '<option value="person">人名</option>' +
                '</select>' +
                '</div>' +
                '<div class="delete_colunm">' +
                '<i class="fa fa-times-circle"></i>' +
                '</div>';
            $(this).parent().parent().parent().append(liHtml);
            searchBarInsert();
        } else {
            $(this).parent().parent().replaceWith('');
        }
    });

}