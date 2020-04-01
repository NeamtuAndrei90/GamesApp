getGamesList(function(arrayOfGames){
    for(var i = 0; i < arrayOfGames.length; i++) {
        const gameElement = document.createElement("div");
        createDomElement(i)

        document.getElementById(`${arrayOfGames[i]._id}`).addEventListener("click", function(event){
            deleteGame(event.target.getAttribute("id"), function(apiresponse){
                removeDeletedElementFromDOM(event.target.parentElement);
            })
    });
    }
});

function createDomElement(gameOcj){
    var container1 = document.querySelector('.container');
    const gameElement = document.createElement("div");
        gameElement.innerHTML = `<h1>${gameOcj.title}</h1> 
                                <img src="${gameOcj.imageUrl}" />
                                <p>${gameOcj.description}</p> 
                                <button class="delete-btn" id="${gameOcj._id}">Delete</button>`;

        container1.appendChild(gameElement);
}

function removeDeletedElementFromDOM(domElement) {
    domElement.remove();
}


function validateFormElement(inputElement, errorMessage){
    if(inputElement.value === "") {
        if(!document.querySelector('[rel="' + inputElement.id + '"]')){
            buildErrorMessage(inputElement, errorMessage);
        }
    } else {
        if(document.querySelector('[rel="' + inputElement.id + '"]')){
            console.log("the error is erased!");
            document.querySelector('[rel="' + inputElement.id + '"]').remove();
            inputElement.classList.remove("inputError");
        }
    }
}

function validateReleaseTimestampElement(inputElement, errorMessage){
    if(isNaN(inputElement.value) && inputElement.value !== "") {
        buildErrorMessage(inputElement, errorMessage);
    }
}

function buildErrorMessage(inputEl, errosMsg){
    inputEl.classList.add("inputError");
    const errorMsgElement = document.createElement("span");
    errorMsgElement.setAttribute("rel", inputEl.id);
    errorMsgElement.classList.add("errorMsg");
    errorMsgElement.innerHTML = errosMsg;
    inputEl.after(errorMsgElement);
}


document.querySelector(".submitBtn").addEventListener("click", function(event){
    event.preventDefault();

    const gameTitle = document.getElementById("gameTitle");
    const gameDescription = document.getElementById("gameDescription");
    const gameGenre = document.getElementById("gameGenre");
    const gamePublisher = document.getElementById("gamePublisher");
    const gameImageUrl = document.getElementById("gameImageUrl");
    const gameRelease = document.getElementById("gameRelease");

    validateFormElement(gameTitle, "The title is required!");
    validateFormElement(gameGenre, "The genre is required!");
    validateFormElement(gameImageUrl, "The image URL is required!");
    validateFormElement(gameRelease, "The release date is required!");

    validateReleaseTimestampElement(gameRelease, "The release date you provided is not a valid timestamp!");


    if(gameTitle.value !== "" && gameGenre.value !== "" && gameImageUrl.value !== "" && gameRelease.value !== "") {
     

        var urlencoded = new URLSearchParams();
        urlencoded.append("title", gameTitle.value);
        urlencoded.append("releaseDate", gameRelease.value);
        urlencoded.append("genre", gameGenre.value);
        urlencoded.append("publisher", gamePublisher.value);
        urlencoded.append("imageUrl", gameImageUrl.value);
        urlencoded.append("description", gameDescription.value);

        createGameRequest(urlencoded, function(newlyCreatedGame){

        });
    }
})