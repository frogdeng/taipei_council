$(document).ready(function() {
    getAdvSearch();
});

function getAdvSearch(){  
    
    
    $('div.submit_container').children('button.submit').click(function() {
        //選擇新聞種類
        var newsClass_code =[];
        $.each($('li.checkbox').children('label.icon.active'),function(key,value){
            //console.log($(value).attr('data-val'));
            
            switch($(value).attr('data-val')){
                case "2":
                    newsClass_code.push('2'); //平面新聞
                    break;
                case "5":
                    newsClass_code.push('5'); //雜誌新聞
                    break;
                case "3":
                    newsClass_code.push('3'); //影音新聞
                    break;
                case "1":
                    newsClass_code.push('1'); //網路新聞
                    break;
            } 
        });


        //查詢值 和 布林 欄位
        //var singleCondition = [];
        var custom_code = [];
        $.each($('li.searchbar'),function(li_index,li_content){

            var singleCondition = [];

            if($(this).children('input').val() !== null && $(this).children('input').val() != ""){

                if($(this).children('div').children('select.boolean').val()!==undefined){ //第一行
                    // console.log($(this).children('div').children('select.boolean').val());
                    var boolean_val = $(this).children('div').children('select.boolean').val();
                    singleCondition.push(boolean_val);
                }

                var input_val = $(this).children('input').val();
                // console.log($(this).children('input').val());
                singleCondition.push(input_val);
    
                var column_val = $(this).children('div').children('select.advColumn').val();
                // console.log($(this).children('div').children('select.advColumn').val()); //push adv['custom']
                singleCondition.push(column_val);
            }
            
            custom_code.push(singleCondition);

        });
        
        //出版日期
        var dateRange_code =[];
        $.each($('input.datepicker'),function(date_index,date_content){

            if ($("#start-date").val() != null && $("#start-date").val() != "") {
                dateRange_code[0] = $("#start-date").val();
            }
            if ($("#end-date").val() != null && $("#end-date").val() != "" ){
                dateRange_code[1] = $("#end-date").val();
            }
        });


        //新聞條碼
        var codeRange_code =[];
        $.each($('input.newscode'),function(codeRange_index,codeRange_content){

            if ($("#start-value").val() != null && $("#start-value").val() != "") {
                codeRange_code[0] = $("#start-value").val();
            }
            if ($("#end-value").val() != null && $("#end-value").val() != "") {
                codeRange_code[1] = $("#end-value").val();
            }
        });
        

        var advFilter={
            newsClass : newsClass_code,
            custom : custom_code,
            dateRange : dateRange_code,
            codeRange : codeRange_code,
        };
        // console.log(advFilter);

        var jsonStr = JSON.stringify(advFilter);
        var paramEncode = encodeURIComponent(jsonStr);
        // console.log(paramEncode);
        window.location.href='/public/search-result?param='+ paramEncode;

    });
     
}