var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');

function getParams(){
    var searchParamsArr = document.location.search.split('&');

    var query = searchParamsArr[0].split('=').pop();
    console.log(query);

    searchApi(query);

}

// function printResults(resultObj){
//     console.log(resultObj);

//     var resultCard = document.createElement('div');
//     resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');
    
//     var resultBody = document.createElement('div');
//     resultBody.classList.add('card-body');
//     resultCard.append(resultBody);
  
//     var titleEl = document.createElement('h3');
//     titleEl.textContent = resultObj.title;

//     var bodyContentEl = document.createElement('p');
//     bodyContentEl.innerHTML =
//       '<strong>Date:</strong> ' + resultObj.date + '<br/>';
  
//     if (resultObj.subject) {
//       bodyContentEl.innerHTML +=
//         '<strong>Subjects:</strong> ' + resultObj.subject.join(', ') + '<br/>';
//     } else {
//       bodyContentEl.innerHTML +=
//         '<strong>Subjects:</strong> No subject for this entry.';
//     }
  
//     if (resultObj.description) {
//       bodyContentEl.innerHTML +=
//         '<strong>Description:</strong> ' + resultObj.description[0];
//     } else {
//       bodyContentEl.innerHTML +=
//         '<strong>Description:</strong>  No description for this entry.';
//     }
  
//     var linkButtonEl = document.createElement('a');
//     linkButtonEl.textContent = 'Read More';
//     linkButtonEl.setAttribute('href', resultObj.url);
//     linkButtonEl.classList.add('btn', 'btn-dark');
  
//     resultBody.append(titleEl, bodyContentEl, linkButtonEl);
  
//     resultContentEl.append(resultCard);
// }

function searchApi(query){
    var locQueryUrl = "https://collectionapi.metmuseum.org/public/collection/v1/search"
    locQueryUrl = locQueryUrl + '?q=' + query;
    console.log(locQueryUrl);

    fetch(locQueryUrl)
        .then(function(response){
            if (!response.ok){
                throw response.json();
            }

            return response.json();
        })
        .then(function (locateRes){

            resultTextEl.textContent = locateRes.search.query;

            console.log(locateRes);
            if (!locateRes.results.length){
                console.log("No results found");
            }else{
                for (var i = 0; i< locateRes.results.length; i++){
                    console.log(locateRes.results[i]);
                }
            }
        } )
        .catch(function (error){
            console.error(error);
        });
      }

getParams();

