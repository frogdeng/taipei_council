$(document).ready(function() {
    getSearchList();
});

function getSearchList(){  

    $('div.submit_btn').children('button#submit').click(function() {
        var keyword =  $('div.inputbar').children('input[placeholder]').val();
        window.location.href='/public/search-result?param='+keyword;
     });
     
     $("div.inputbar").children('input#keyword').keypress(function(e){
        code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13)
        {
            var keyword =  $('div.inputbar').children('input[placeholder]').val();
            window.location.href='/public/search-result?param='+keyword;
        }
      });
}