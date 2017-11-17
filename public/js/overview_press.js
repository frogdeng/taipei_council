
$(document).ready(function() {
    changeContent(1);
    setNewsTypeLogo(10);
    filterCondition();


});



$('.dropdown .dropdown-menu').on('click', function(event){ // dropdown選單展開後click不會收縮
    event.stopPropagation();
});


/********************************************/
// 進階搜尋 : 資料來源(origin) 全選
/********************************************/
// $(".checkAllOrigin").click(function() {
//     if($(this).prop("checked")) {
//       $(this).parents(".dropdown-menu").find(":checkbox").prop('checked', true);
//     }  else {
//       $(this).parents(".dropdown-menu").find(":checkbox").prop('checked', false);
//     }
// });

// 下拉選單全部都沒選的時候，取消全選selected
$(".dropdown").find(":checkbox:not(.checkAllBox)").change(function(){
      set_checkAllBox($(this).parents(".dropdown"));
});

/********************************************/
// 進階搜尋 : 資料來源及類型
/********************************************/
$(".checkAllMedia").click(function() {
    if($(this).prop("checked")) { //全選
      $(this).parents(".dropdown-menu").find(":checkbox").prop('checked', true);
    } else {
      $(this).parents(".dropdown-menu").find(":checkbox").prop('checked', false);
    }
});

$(".input_origin").change(function(e) {
    var origin      = $(this).attr("value");
    var className   = "checkbox_"+origin; // ex: checkbox_newspaper

    if($(this).is(":checked")) { // 全選某origin ex:newspaper
        $(this).parents(".dropdown-menu").find(":checkbox").filter('.'+className).prop("checked", true);
    } else{ // 取消全選
        $(this).parents(".dropdown-menu").find(":checkbox").filter('.'+className).prop("checked", false);
    }

    // input_origin 改變的時候也check 取消全選selected
    var this_check_list = $(this).parents(".dropdown_media");
    set_checkAllBox(this_check_list);
});

// media 若有不選: 上層 origin全選 取消
$('input[name="med[]"]').change(function(e) { 
    var className = $(this).attr('class');
    var origin = className.substr(9);
    console.log(origin);

    if($(this).not(":checked")) {
        $(".input_origin").filter('[value='+origin+']').prop("checked", false);
    }
});


// 下拉選單全部都沒選的時候，取消全選selected
function set_checkAllBox(this_check_list)
{ 
    var notChecked = 0;
    $(this_check_list).find(":checkbox:not(.checkAllBox)").each(function(){
        if($(this).prop("checked")==false) //  && !$(this).hasClass("noLimit")
        {
            notChecked += 1;
        }
    });
    console.log("notChecked:"+notChecked);

    if(notChecked>0){ // 只要有一個沒選 => 取消全選
        $(this_check_list).find(".checkAllBox").prop("checked", false);
        $(this_check_list).find(".selectTitle").text("已選取篩選條件");

        $(this_check_list).find("button").css("background-color","#008080");
        $(this_check_list).find("button").css("color","white");
    }
}



function changeContent(pageNum)
{
    var pageLimit = $("#pagepercount option:selected").val();
    var sort = $("#sort option:selected").val();
    var dateRange = [];
    var govClass =[];

    //console.log(.attr('data-val'));
    $.each($('li.checkbox').children('label.icon.active'),function(key,value){
        console.log($(value).attr('data-val'));
        
        switch($(value).attr('data-val')){
            case "0":
                govClass.push('民政');
                break;
            case "1":
                govClass.push('財政建設');
                break;
            case "2":
                govClass.push('教育');
                break;
            case "3":
                govClass.push('交通');
                break;
            case "4":
                govClass.push('警政衛生');
                break;
            case "5":
                govClass.push('工務');
                break;
        } 
    });
    console.log(govClass);

    if ($("#start-date").val() != null) {
        dateRange[0] = $("#start-date").val();
    }
    if ($("#end-date").val() != null) {
        dateRange[1] = $("#end-date").val();
    }
    //govClass = ['民政'];
    

    overviewPressContent(govClass, pageNum, pageLimit, sort, dateRange);
}