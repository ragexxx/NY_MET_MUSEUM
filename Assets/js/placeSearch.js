var apiKey = "5ae2e3f221c38a28845f05b6f734f0898fda7d994da97dd93abd77db";
var searchLocation = document.querySelector("#location-search");

$("#submitBtn").click(function (event) {
  event.preventDefault();
  var kind = $("option:selected").attr("id");
  var keyWord = $("#keyWordInput").val();
  if (keyWord) {

    fetch(
      "https://api.opentripmap.com/0.1/en/places/autosuggest?name=" +
      keyWord +
      "&radius=700000&lon=-73.75623&lat=42.65258&kinds=" +
      kind +
      "&format=json&props=address&limit=50&apikey=" +
      apiKey,
      {
        method: "GET", //GET is the default.
        credentials: "same-origin", // include, *same-origin, omit
        redirect: "follow", // manual, *follow, error
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        $("#nresults").empty();
        $("#results").empty();
        $(".callout cell").empty();
        var results = document.createElement("h3");
        if (data.length >= 30) {
          results.textContent = "Number of results: 30";
          $("#nresults").append(results);
        } else {
          results.textContent = "Number of results: "+data.length;
          $("#nresults").append(results);
          if (data.length == 0) {
            results.textContent = "";
            var divalert = document.createElement("div");
            divalert.setAttribute("data-closable", "slide-out-right");
            divalert.setAttribute("class", "callout primary");
            divalert.innerText = "Ups! Looks like we had no luck with your search, please try a new key word or category..";
            var buttonAlert = document.createElement("button");
            buttonAlert.setAttribute("class", "close-button")
            buttonAlert.setAttribute("aria-label", "Dismiss alert");
            buttonAlert.setAttribute("type", "button");
            buttonAlert.setAttribute("data-close", "");
            var spanAlert = document.createElement("span");
            spanAlert.setAttribute("aria-hidden", "true");
            spanAlert.innerHTML = '&times;';

            $("#nresults").append(divalert);
            $(".callout").append(buttonAlert);
            $(".close-button").append(spanAlert);

          }
        }

        var i = 0;
        while (i < data.length && i < 30) {
          if (data[i].name != "") {
            var divCallout = document.createElement("div");
            divCallout.setAttribute("class", "callout cell");
            divCallout.setAttribute("id", "callout-"+i);
            var name = document.createElement("h3");
            name.textContent = data[i].name;
           /*  var ranking = document.createElement("div");
           ranking.textContent = "Popularity ranking: " + data[i].rate;  */
            $("#results").append(divCallout);
            $("#callout-"+i).append(name);
            /*  $("#callout-"+i).append(ranking);  */
            console.log("this is:--"+data[i].rate+"----"+i);
            rankingIcon(data[i].rate,i); 
            
          }
          i++;
        }
        console.log(data);
      });
  } else {
    /* alert('Please enter a city'); */
    var divalert = document.createElement("div");
    divalert.setAttribute("data-closable", "slide-out-right");
    divalert.setAttribute("class", "callout primary");
    divalert.innerText = "Please enter a place";
    var buttonAlert = document.createElement("button");
    buttonAlert.setAttribute("class", "close-button")
    buttonAlert.setAttribute("aria-label", "Dismiss alert");
    buttonAlert.setAttribute("type", "button");
    buttonAlert.setAttribute("data-close", "");
    var spanAlert = document.createElement("span");
    spanAlert.setAttribute("aria-hidden", "true");
    spanAlert.innerHTML = '&times;';

    $("#nresults").append(divalert);
    $(".callout").append(buttonAlert);
    $(".close-button").append(spanAlert);

  }
});

function rankingIcon(ranking,i) {
  var div = document.createElement("div");
  div.setAttribute("class", "glyph grid-x grid-margin-x");
  div.setAttribute("id", "glyph-"+i);
  var divNest = document.createElement("div");
  divNest.setAttribute("class", "preview-glyphs cell");
  divNest.setAttribute("id", "preview-glyphs-"+i);
  divNest.innerText ="Ranking:"
  $("#callout-"+i).append(div);
  $("#glyph-"+i).append(divNest);

  if(ranking>=1&&ranking<3){
    for (var j = 0; j < 5; j++) {
      star(i);
      
    }
  }else if(ranking>=3&&ranking<5){
    for (var j = 0; j < 4; j++) {
      star(i);
      
    }
  }else if(ranking>=5&&ranking<7){
    for (var j = 0; j < 3; j++) {
      star(i)
      
    }
  }else if(ranking>=7&&ranking<9){
    for (var j = 0; j < 2; j++) {
      star(i)
      
    }
  }else{
    for (var j = 0; j < 1; j++) {
      star(i)
      
    }
  }



}

function star(i) {
  
  var iEl = document.createElement("i");
  iEl.setAttribute("class", "step fi-star size-24");
  $("#preview-glyphs-"+i).append(iEl);


  
}

var URLactual = location.pathname;

$("#backBtn").click(function(){
  location.assign('./met-page.html');
  URLactual = location.pathname;
});