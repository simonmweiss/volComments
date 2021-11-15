document.getElementsByClassName("vodl-comment-section__comments-wrapper")[0].innerHTML=""
var post = window.location.href.split('/')[4];
var comments;
var htmlString = "";
var level = 0;
var test = '<img src="adfasdfasdfasdf" onerror=alert(1)>';
httpGetAsync("https://www.vol.at/api/nnp/get_forum?p="+post,(response) => {
    var resObj = JSON.parse(response);
    comments = resObj.comments;
})

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
window.addEventListener('load', function () {
    document.getElementsByClassName("vodl-comment-section__comments-wrapper")[0].innerHTML=renderer();
    console.log(comments.length)
  })
function renderer(){
    console.log("test");
    htmlString = "";
    comments.forEach(element => {
        let date = new Date( Date.parse(element.date));
        htmlString += `
            <div class="vodl-comment">
                <div class="vodl-comment__user-info">
                    <img src="`+element.author.author_avatar+`">
                    <span class="vodl-comment__username">`+element.author.author_name.replace(/</g,"&lt;").replace(/>/g, "&gt;")+`</span>
                    <span class="vodl-comment__report-comment" id="vodl-comment__report-comment-`+element.id+`" data-comment-id="`+element.id+`">melden</span>
                </div>
                <div class="vodl-comment__comment-wrapper">
                    <span class="vodl-comment__comment-timestamp">`+date.getDay()+"."+date.getMonth()+"."+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+`</span>
                    <span class="vodl-comment__comment">
                        `+element.content.replace(/</g,"&lt;").replace(/>/g, "&gt;").replace(/&lt;br \/&gt;/g,"<br/>")+`
                    </span>
                </div>
                <div class="vodl-comment__interaction-bar">
                    <span class="vodl-comment__answer-comment" id="vodl-comment__answer-comment-`+element.id+`" data-comment-id="`+element.id+`">Antwort verfassen</span>`
                    if(element.meta.comment_deleted === 0){
                        htmlString += 
                        `
                        <div class="vodl-comment__rating">
                            <div class="vodl-comment__wrapper">
                                <img class="vodl-comment__rating-up-icon" src="/wp-content/themes/vodl/assets/comments/icon-thumbs-up.png" data-comment-id="`+element.id+`">
                                <span class="vodl-comment__rating-up" id="vodl-comment__rating-up-`+element.id+`">`+element.meta.rating.positive+`</span>
                            </div>
                            <div class="vodl-comment__wrapper">
                                <img class="vodl-comment__rating-down-icon" src="/wp-content/themes/vodl/assets/comments/icon-thumbs-down.png" data-comment-id="`+element.id+`">
                                <span class="vodl-comment__rating-down" id="vodl-comment__rating-down-`+element.id+`">`+element.meta.rating.negative+`</span>
                            </div>
                        </div>
                        `
                    }else{
                        htmlString += 
                        `
                        <div class="vodl-comment__rating">
                            <div class="vodl-comment__wrapper">
                                <img class="vodl-comment__rating-up-icon" src="/wp-content/themes/vodl/assets/comments/icon-thumbs-up.png" data-comment-id="`+element.id+`">
                                <span class="vodl-comment__rating-up" id="vodl-comment__rating-up-`+element.id+`">0</span>
                            </div>
                            <div class="vodl-comment__wrapper">
                                <img class="vodl-comment__rating-down-icon" src="/wp-content/themes/vodl/assets/comments/icon-thumbs-down.png" data-comment-id="`+element.id+`">
                                <span class="vodl-comment__rating-down" id="vodl-comment__rating-down-`+element.id+`">0</span>
                            </div>
                        </div>
                        `
                    }
                    htmlString +=
                    `
                        </div>
                    </div>
                    `
        level = 0;
        renderAntworten(element,1)
        for (let index = 0; index < level; index++) {
            htmlString += `</div>`
        }

    });
    return htmlString;
}

function renderAntworten(kommentar, ebene){
    level++;
    if(ebene > 1){
        let date = new Date( Date.parse(kommentar.date));
        htmlString += 
        `
        <div class="vodl-comment__child">
            <div class="vodl-comment">
                <div class="vodl-comment__user-info">
                    <img src="`+kommentar.author.author_avatar+`">
                    <span class="vodl-comment__username">`+kommentar.author.author_name.replace(/</g,"&lt;").replace(/>/g, "&gt;")+`</span>
                    <span class="vodl-comment__report-comment" id="vodl-comment__report-comment-`+kommentar.id+`" data-comment-id="`+kommentar.id+`">melden</span>
                </div>
                <div class="vodl-comment__comment-wrapper">
                    <span class="vodl-comment__comment-timestamp">`+date.getDay()+"."+date.getMonth()+"."+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+`</span>
                    <span class="vodl-comment__comment"> `+kommentar.content.replace(/</g,"&lt;").replace(/>/g, "&gt;").replace(/&lt;br \/&gt;/g,"<br/>")+`</span>
                </div>
                <div class="vodl-comment__interaction-bar">
                    <span class="vodl-comment__answer-comment" id="vodl-comment__answer-comment-`+kommentar.id+`" data-comment-id="`+kommentar.id+`">Antwort verfassen</span>`
                    if(kommentar.meta.comment_deleted === 0){
                        htmlString += 
                        `
                        <div class="vodl-comment__rating">
                            <div class="vodl-comment__wrapper">
                                <img class="vodl-comment__rating-up-icon" src="/wp-content/themes/vodl/assets/comments/icon-thumbs-up.png" data-comment-id="`+kommentar.id+`">
                                <span class="vodl-comment__rating-up" id="vodl-comment__rating-up-`+kommentar.id+`">`+kommentar.meta.rating.positive+`</span>
                            </div>
                            <div class="vodl-comment__wrapper">
                                <img class="vodl-comment__rating-down-icon" src="/wp-content/themes/vodl/assets/comments/icon-thumbs-down.png" data-comment-id="`+kommentar.id+`">
                                <span class="vodl-comment__rating-down" id="vodl-comment__rating-down-`+kommentar.id+`">`+kommentar.meta.rating.negative+`</span>
                            </div>
                        </div>
                        `
                    }else{
                        htmlString += 
                        `
                        <div class="vodl-comment__rating">
                            <div class="vodl-comment__wrapper">
                                <img class="vodl-comment__rating-up-icon" src="/wp-content/themes/vodl/assets/comments/icon-thumbs-up.png" data-comment-id="`+kommentar.id+`">
                                <span class="vodl-comment__rating-up" id="vodl-comment__rating-up-`+kommentar.id+`">0</span>
                            </div>
                            <div class="vodl-comment__wrapper">
                                <img class="vodl-comment__rating-down-icon" src="/wp-content/themes/vodl/assets/comments/icon-thumbs-down.png" data-comment-id="`+kommentar.id+`">
                                <span class="vodl-comment__rating-down" id="vodl-comment__rating-down-`+kommentar.id+`">0</span>
                            </div>
                        </div>
                        `
                    }
                    htmlString +=
                    `
                        </div>
                    </div>
                    `     
    }
    for(var antwort in kommentar.elements){
        var child = kommentar.elements[antwort];
        renderAntworten(child, 2)
    }
}
