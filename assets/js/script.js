var searchFormEl = document.querySelector('#search-form');

function handleSearch(event){
    event.preventDefault();

    var searchInputVal = document.querySelector("#search-input").value;

    if(!searchInputVal){
        console.error("Put a search input value!");
        return;
    }

    var queryString = './search-results.html?q=' + searchInputVal;
    location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearch);