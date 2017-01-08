document.addEventListener("DOMContentLoaded", function(event) {
    // Get the uniqueSlug of the latest post
    var request = new XMLHttpRequest()
    request.open('GET', 'https://medium.com/@vanschneider/latest?format=json')
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText.substring(16))
            var obj = data['payload']['references']['Post']
            var uniqueSlug = obj[(Object.keys(obj)[0])]['uniqueSlug']

            getPost(uniqueSlug)

        } else { console.log('error') }
    }

    request.send();
    request.onError = function() { console.log('Error!') }
})

window.onscroll = function (e) {
    var video = document.getElementById('video')
    var card = document.getElementById('card')

    if (window.pageYOffset > 50) {
        if (card.className = "active") {
            card.className = ""
            card.style.visibility = "visible";
            card.style.transform = "translateY(0)"
        }
    } else if (video.className =="active") {
        card.style.transform = "translateY(40vh)";
        card.style.visibility = "collapse";
    }
}


function getPost(post_id) {
    var request = new XMLHttpRequest()
    var url = 'http://medium.com/@bryantaxs/' + post_id
    var url_json = url + '?format=json'

    console.log(url_json)

    request.open('GET', url_json)
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText.substring(16))
            var title = data['payload']['value']['title']
            var tags = getTags(data['payload']['value']['virtuals']['tags'])
            var published = data['payload']['value']['virtuals']['createdAtEnglish']
            var content = data['payload']['value']['content']['bodyModel']['paragraphs']
                var excerpt = content[(Object.keys(content)[12 ])]['text']
            var img = 'https://cdn-images-1.medium.com/max/2000/' +
                data['payload']['value']['virtuals']['previewImage']['imageId']

            fillPost(title, tags, published, excerpt, url, img)
        } else {
            console.log('error')
        }
    }

    request.send();

    request.onError = function() {
        console.log('Error!')
    };
}


function getTags(tags) {
    var tagList = []
    var max = 2

    for (i=0; i<max; i++) {
        tagList.push(tags[(Object.keys(tags)[i])]['name'])
    }

    return tagList
}


function fillPost(title, tags, published, excerpt, url, img) {
    document.getElementById('post_title').innerHTML = title
    document.getElementById('post_published').innerHTML = published
    document.getElementById('post_excerpt').innerHTML = excerpt
    document.getElementById('post_tag_1').innerHTML = tags[0]
    document.getElementById('post_tag_2').innerHTML = tags[1]
    document.getElementById('post_url').setAttribute('href', url)
    document.getElementById('img_url').setAttribute('href', url)
    document.getElementById('post_img')
        .setAttribute('style', 'background-image: url(' + img + ')')
}

// Moves elements to show video
function startvideo() {
    var hero_content = document.getElementById('hero_content')
    var nav = document.getElementsByTagName('nav')
    var video = document.getElementById('video')

    video.className = "active"

    Velocity( hero_content,
        { opacity: ["0", "1"] },
        { duration: 400, easing: "ease-in-out" }
    )
    Velocity( nav,
        { marginTop: ["-10vh", "0"] },
        { duration: 500, easing: "easeInOut" }
    )
    Velocity( video,
        { opacity: ["1", "0.2"] },
        { duration: 300, easing: "easeInOut", delay: 300, complete: toggleHero() }
    )
}

// Moves elements to hide video
function endvideo() {
    var hero_content = document.getElementById('hero_content')
    var nav = document.getElementsByTagName('nav')
    var video = document.getElementById('video')

    video.className = ""

    Velocity( hero_content,
        { opacity: ["1", "0"] },
        { duration: 500, easing: "easeInOut", delay: 200 }
    )
    Velocity( nav,
        { marginTop: ["0", "-10vh"] },
        { duration: 500, easing: "easeInOut", delay: 200, complete: toggleHero() }
    )
    Velocity( video,
        { opacity: ["0.2", "1"] },
        { duration: 300 }
    )
}

function toggleHero() {
    var card = document.getElementById('card')
    var video = document.getElementById('video')

    card.className = (video.className == "") ? "" : "active"

    if (card.className == "active") {
        card.style.transform = "translateY(40vh)";
    }

    setTimeout(function() {
        if (card.className == "active") {
            card.style.visibility = "collapse";
        } else {
            card.style.visibility = "visible";
            card.style.transform = "translateY(0)";
        }
    }, 500)
}
