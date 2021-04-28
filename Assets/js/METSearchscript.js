var searchFormEl = document.querySelector('#search-form');
var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var mediaSection = document.querySelector('.media-object-section');
var list = document.querySelector("ul");
var image = document.querySelector(".thumbnail");
var searchLocation = document.querySelector("#location-search");

initialize();
function initialize(){
  mediaSection.style.opacity="0";
  list.style.opacity="0";
  image.style.opacity="0";
}

function handleSearch(event) {
  event.preventDefault();

  list.style.opacity="100";

  var searchInputVal = document.querySelector('#search-input').value;

  if (!searchInputVal) {
    console.error('Put a search input value!');
    return;
  }

  var queryString = './search-results.html?q=' + searchInputVal;
  getParams();
}


function getParams() {
  var query = document.querySelector('#search-input').value;
  searchApi(query);
}


var datainfo = [];


function searchApi(query) {
  datainfo = [];
  var locQueryUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/search'
  locQueryUrl = locQueryUrl + '?q=' + query;

  fetch(locQueryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data == null || data === NaN || data.total == 0) {
        console.log('No results found');
        var displayError = document.createElement('h3');
        displayError.textContent = 'No results found, please try a new search';
        $('#content-section').append(displayError);
      } else {
        var i = 0;
        while (i < 6) {

          getName(data.objectIDs[i], i, data.objectIDs.length);
          i++;
        }
      }
    })
  // .catch(function (error){
  //     console.error(error);
  // });
};


function getName(id, i, datalength) {
  var locQueryUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'
  locQueryUrl = locQueryUrl + id;

  fetch(locQueryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (data) {

      art = {
        title: data.title,
        name: data.artistDisplayName,
        endDate: data.artistEndDate,
        beginDate: data.artistBeginDate,
        dimensions: data.dimensions,
        image: data.primaryImage,
      }
      datainfo.push(art);
      if (datainfo.length == 6 || datainfo.length == datalength) {
        displayData()
      }
    })
    .catch(function (error) {
      console.error(error);
    });
};

function displayData() {


  for (var i = 1; i < datainfo.length; i++) {
    document.getElementById("item" + [i]).innerHTML = datainfo[i].title;
    document.getElementById("item" + [i]).style.fontSize = "large";
    artInfo(i);
  }

  // if(datainfo.length == 0){

  // } else {                
  // }
}

function artInfo(i) {
  $("#item"+[i]).on('click', function () {
    mediaSection.style.opacity="100";
    image.style.opacity="100";
    $('#content-section').empty();
    if (datainfo.length >= 1) {

      var title = datainfo[i].title;
      var name = datainfo[i].name;
      var beginDate = datainfo[i].beginDate;
      var endDate = datainfo[i].endDate;
      var dimension = datainfo[i].dimensions;
      var imageSrc = datainfo[i].image;

      document.getElementById("artwork_name").innerHTML = title;

      document.getElementById("artwork_info").innerHTML = 'Artist: ' + name + '<br>' + 'Date: ' + beginDate + '-' + endDate + "<br>" + 'Dimensions : ' + dimension;

      document.getElementById("artwork_img").src = imageSrc;
      document.getElementById("artwork_img").setAttribute('width', '200px');
    }
  });

}

var URLactual = location.pathname;

searchLocation.addEventListener("click", function () {
  location.assign('./place-reco-page.html');
  URLactual = location.pathname;
});
 

searchFormEl.addEventListener('submit', handleSearch);



