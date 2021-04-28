var searchFormEl = document.querySelector('#search-form');
var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var mediaSection = document.querySelector('.media-object-section');
var mediaObject = document.querySelector('.media-object')
var list = document.querySelector("ul");
var image = document.querySelector(".thumbnail");
var searchLocation = document.querySelector("#location-search");
var searched = [];

initialize();

function initialize() {
  mediaSection.style.opacity = "0";
  list.style.opacity = "0";
  image.style.opacity = "0";

  searched = JSON.parse(localStorage.getItem("searched")) || [];
  displaySearch();

}

//Rendering of todos written
function renderSearch() {
  $("#historyList").empty();
  displaySearch();
}

//Stores the new search after being pushed
function storeSearch() {
  localStorage.setItem("searched", JSON.stringify(searched));
}

//Function to loop through the array and siplay as buttons each element in it
function displaySearch() {
  var j = searched.length - 1;
  while (j >= 0 && j >= searched.length - 5) {
    var div = document.createElement("div");
    var searchName = document.createElement("p");
    searchName.textContent = searched[j];
    div.append(searchName);
    $("#historyList").append(div);
    j--;
  }
}

function handleSearch(event) {
  event.preventDefault();
  var searchInputVal = document.querySelector("#search-input").value;

  if (!searchInputVal) {
    list.style.opacity="0";
    var divalert = document.createElement("div");
    divalert.setAttribute("data-closable", "slide-out-right");
    divalert.setAttribute("class", "callout primary");
    divalert.innerText =
      "Ups! Looks like we had no luck with your search, please try a new key word or category..";
    var buttonAlert = document.createElement("button");
    buttonAlert.setAttribute("class", "close-button");
    buttonAlert.setAttribute("aria-label", "Dismiss alert");
    buttonAlert.setAttribute("type", "button");
    buttonAlert.setAttribute("data-close", "");
    var spanAlert = document.createElement("span");
    spanAlert.setAttribute("aria-hidden", "true");
    spanAlert.innerHTML = "&times;";

    $("#result-content").append(divalert);
    $(".callout").append(buttonAlert);
    $(".close-button").append(spanAlert);
    return;
  }
  
  list.style.opacity = "100";
  searched.push(searchInputVal);

  storeSearch();
  renderSearch();


  var queryString = "./search-results.html?q=" + searchInputVal;
  getParams();
}

function getParams() {
  var query = document.querySelector("#search-input").value;
  searchApi(query);
}

var datainfo = [];

function searchApi(query) {
  datainfo = [];
  var locQueryUrl =
    "https://collectionapi.metmuseum.org/public/collection/v1/search";
  locQueryUrl = locQueryUrl + "?q=" + query;

  fetch(locQueryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.objectIDs == null || data === NaN || data.length == 0) {
        list.style.opacity="0";
        var divalert = document.createElement("div");
        divalert.setAttribute("data-closable", "slide-out-right");
        divalert.setAttribute("class", "callout primary");
        divalert.innerText =
          "Ups! Looks like we had no luck with your search, please try a new key word or category..";
        var buttonAlert = document.createElement("button");
        buttonAlert.setAttribute("class", "close-button");
        buttonAlert.setAttribute("aria-label", "Dismiss alert");
        buttonAlert.setAttribute("type", "button");
        buttonAlert.setAttribute("data-close", "");
        var spanAlert = document.createElement("span");
        spanAlert.setAttribute("aria-hidden", "true");
        spanAlert.innerHTML = "&times;";
    
        $("#result-content").append(divalert);
        $(".callout").append(buttonAlert);
        $(".close-button").append(spanAlert);
        return;
      } else {
        var i = 0;
        while (i < 6) {
          getName(data.objectIDs[i], i, data.objectIDs.length);
          i++;
        }
      }
    });
  // .catch(function (error){
  //     console.error(error);
  // });
}

function getName(id, i, datalength) {
  var locQueryUrl =
    "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
  locQueryUrl = locQueryUrl + id;

  fetch(locQueryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (data) {
      let { title } = data;
      title = title.split(",")[0];
      art = {
        title: data.title,
        name: data.artistDisplayName,
        endDate: data.artistEndDate,
        beginDate: data.artistBeginDate,
        dimensions: data.dimensions,
        image: data.primaryImage,
      };
      datainfo.push(art);
      if (datainfo.length == 6 || datainfo.length == datalength) {
        displayData();
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

function displayData() {
  for (var i = 1; i < datainfo.length; i++) {
    document.getElementById("item" + [i]).innerHTML = datainfo[i].title;
    document.getElementById("item" + [i]).style.fontSize = "large";
    artInfo(i);
  }
}

function artInfo(i) {
  $("#item"+[i]).on('click', function () {
    mediaSection.style.opacity="100";
    image.style.opacity="100";
    mediaObject.style.opacity="100";
    $('#content-section').empty();

    if (datainfo.length >= 1) {
      var title = datainfo[i].title;
      var name = datainfo[i].name;
      var beginDate = datainfo[i].beginDate;
      var endDate = datainfo[i].endDate;
      var dimension = datainfo[i].dimensions;
      var imageSrc = datainfo[i].image;

      document.getElementById("artwork_name").innerHTML = title;

      document.getElementById("artwork_info").innerHTML =
        "Artist: " +
        name +
        "<br>" +
        "Date: " +
        beginDate +
        "-" +
        endDate +
        "<br>" +
        "Dimensions : " +
        dimension;

      document.getElementById("artwork_img").src = imageSrc;
      document.getElementById("artwork_img").setAttribute("width", "200px");
    }
  });
}

var URLactual = location.pathname;

searchLocation.addEventListener("click", function () {
  location.assign("./place-reco-page.html");
  URLactual = location.pathname;
});

searchFormEl.addEventListener("submit", handleSearch);
