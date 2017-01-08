window.onresize = resizeStory

function resizeStory() {
    $('.pane').height(window.innerHeight);
}

var items = $('.pane')
var animating = false
var pad = window.innerHeight/2

$(window).scroll(function() {
    clearTimeout($.data(this, 'scrollTimer'))
    if (!animating) {
        $.data(this, 'scrollTimer', setTimeout(function() {
            items.each(function(key, value) {
                if ($(window).scrollTop() < $(value).offset().top+pad && $(window).scrollTop() > $(value).offset().top-pad ) {
                    animating = true
                    $('body').animate( { scrollTop: $(value).offset().top + 'px' }, 250);
                    setTimeout(function() { animating = false }, 300);
                    return false
                }
            })
        }, 200))
    }
})
