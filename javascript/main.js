document.addEventListener('click', function(e) {
    var el = e.target
    while (el && !el.href) { el = el.parentNode }
})

// Change style of navigation bar
window.onscroll = function (e) {
    if (window.pageYOffset > 400) {
        document.getElementsByTagName('nav')[0].className = "minified"
    } else {
        document.getElementsByTagName('nav')[0].className = ""
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    // Smooth scroll internal links
    var internal_links = document.querySelectorAll('a[href^="#"]')

    for (var i = internal_links.length-1; i >= 0; i--) {
        internal_links[i].addEventListener("click", function(e) {
            e.preventDefault()
            e.stopPropagation()
            var target = document.getElementById(this.getAttribute('href').substring(1))
            Velocity(target, 'scroll', { duration: 500, easing: 'ease-in-out' })
        }, false)
    }
})
