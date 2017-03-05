(function(){
    var statusBars = $('.campaign-item__status-bar');

    statusBars.each(function(index, el) {
        var  statusIcons = $('i', el),
            activeIconCount = el.getAttribute('data-count'),
            i;
        for (i = 0; i < activeIconCount; i++) {
            statusIcons[i].classList.add('active');
        }
    });
}())