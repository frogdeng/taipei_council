$(document).ready(function() {

    pdfGalleryTurnBtn();

});

function pdfGalleryTurnBtn() {
    var container = $('.attachment_content_container .pdf_container embed');
    var attachmentLength = container.length;

    var prevBtn = $('.attachment_content_container ._btn.pdf_prevBtn_container');
    var nextBtn = $('.attachment_content_container ._btn.pdf_nextBtn_container');

    var currentNode = $('.attachment_content_container .pdf_container embed[data-index=0]');
    var indexOfNode = 0;
    currentNode.show();

    prevBtn.off().click(function () {
        indexOfNode--;
        indexOfNode = (indexOfNode + attachmentLength) % attachmentLength;
        currentNode.hide();
        currentNode = $('.attachment_content_container .pdf_container embed[data-index=' + indexOfNode + ']');
        currentNode.show();
    });

    nextBtn.off().click(function () {
        indexOfNode++;
        indexOfNode = indexOfNode % attachmentLength;
        currentNode.hide();
        currentNode = $('.attachment_content_container .pdf_container embed[data-index=' + indexOfNode + ']');
        currentNode.show();
    });

}