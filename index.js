const display = {
    posts: res => {
        const cardImg = document.querySelector(".card > img")
        const cardList = document.getElementById("cardList")
        const limitedData = res.slice(0, 20)
    
        limitedData.forEach(data => {
            const title = data.title.slice(0, 15)
            const cutTitle = data.title.length > 15 ? `${title}...` : title
    
            const content = data.title.slice(0, 60)
            const cutContent = data.title.length > 60 ? `${content}...` : content
            cardList.innerHTML += `
            <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                <div class="card" style="width: 100%;">
                    <img src="${data.url}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${cutTitle}</h5>
                        <p class="card-text">${cutContent}</p>
                        <a href="#" class="btn btn-primary" 
                        data-bs-toggle="modal"
                        data-bs-target="#detailModal"
                        onclick="onClickDetail(${data.id})"
                        />
                        Go detail
                        </a>
                    </div>
                </div>
            </div>
            `
        })
    },
    modal: res => {
        const modal = document.querySelector(".modal-body")
    
        modal.innerHTML = `
        <h3>${res.title}</h3>
        <div>
            <img src="${res.url}" width="466px" height="466px" />
        </div>
        `
    },
    reply: res => {
        const replyList = document.querySelector(".modal-comment > details")
        const replyCount = document.querySelector(".modal-comment > details > summary")
        replyCount.innerHTML = `댓글(${res.length})`
        
        for (data of res) {
            replyList.innerHTML += `
            <div>
                <h4>${data.name}</h4>
                <p>작성자: ${data.email}</p>
                <p>${data.body}</p>
            </div>
            `
        }
    }
}
getData()
/** 
* req json placeholder
*/
function getData() {
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/photos",
        method: "get",
        success: display.posts
    })
}

/**
 * 상세보기 클릭 함수
 * --
 */
function onClickDetail(photoId) {
    $.ajax({
        url: `https://jsonplaceholder.typicode.com/photos/${photoId}`,
        method: "get",
        success: display.modal
    })
    
    $.ajax({
        url: `https://jsonplaceholder.typicode.com/comments?postId=${photoId}`,
        method: "get",
        success: display.reply
    })
}