
const repos = document.querySelector('.repos')
const phrase_input = document.querySelector('.input')
const form_submit = document.querySelector('.form__submit')


let out = '', res, phrase


phrase_input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {  
        submit()
    }
});


phrase_input.oninput = function() {
    phrase = phrase_input.value
}

form_submit.onclick = function(){
    submit()
}


function submit () {
    try{
        repos.innerHTML = out = ''
        getResponse()
    } catch(e){
        console.log(e)
    }
}


async function getResponse() {
    repos.innerHTML = `<p>Loading...</p>`

    res = await fetch(
        `https://api.github.com/search/repositories?q=${phrase}&per_page=10`
        )
        .then(res => res.json())
        .then(res => res.items)


    res.map((item, i) => {
        out +=
        `<div class='repo'>\
        <p class='repo__info'></p>\
            <a href="https://github.com/${item.full_name}" target="_blank" class="repo__comment link">\
            <p style="margin-bottom: 20px;">${i+1}. ${item.full_name}</p>\
            </a>\
            <div class='repo__infos'>\
                <p class='repo__info'>forks: ${item.forks}</p>\
                <p class='repo__info'>open issues: ${item.open_issues}</p>\
                <p class='repo__info'>watchers:${item.watchers}</p>\
            </div>\
        </div>`
    })

    if(!res.length){
        console.log('asd')
        out = `<p>Nothing like "${phrase.toUpperCase()}" was found</p>`
    }
    console.log(res)
    console.log(phrase)

    repos.innerHTML = out   
}