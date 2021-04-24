var apiKey = "5ae2e3f221c38a28845f05b6f734f0898fda7d994da97dd93abd77db";

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
        $("#results").empty();
        var results = document.createElement("h3");
        if (data.length >= 30) {
          results.textContent = "Number of results: 30";
          $("#results").append(results);
        } else {
          if (data.length == 0) {
            var divalert = document.createElement("div");
            divalert.setAttribute("data-closable", "slide-out-right");
            divalert.setAttribute("class", "callout alert");
            divalert.innerText = "Ups! Looks like we had no luck with your search, please try a new key word or category.";
            var buttonAlert = document.createElement("button");
            buttonAlert.setAttribute("class", "close-button")
            buttonAlert.setAttribute("aria-label", "Dismiss alert");
            buttonAlert.setAttribute("type", "button");
            buttonAlert.setAttribute("data-close", "");
            var spanAlert = document.createElement("span");
            spanAlert.setAttribute("aria-hidden", "true");
            spanAlert.innerHTML = '&times;';

            $("#results").append(divalert);
            $(".callout").append(buttonAlert);
            $(".close-button").append(spanAlert);

          }
        }

        var i = 0;
        while (i < data.length || i == 30) {
          if (data[i].name != "") {
            var name = document.createElement("h3");
            name.textContent = "Name: " + data[i].name;
            var ranking = document.createElement("p");
            ranking.textContent = "Popularity ranking: " + data[i].rate;
            $("#results").append(name);
            $("#results").append(ranking);
          }
          i++;
        }
        console.log(data);
      });
  } else {
    /* alert('Please enter a city'); */
    var divalert = document.createElement("div");
    divalert.setAttribute("data-closable", "");
    divalert.setAttribute("class", "callout alert");
    divalert.innerText = "Please enter a place";
    var buttonAlert = document.createElement("button");
    buttonAlert.setAttribute("class", "close-button")
    buttonAlert.setAttribute("aria-label", "Dismiss alert");
    buttonAlert.setAttribute("type", "button");
    buttonAlert.setAttribute("data-close", "");
    var spanAlert = document.createElement("span");
    spanAlert.setAttribute("aria-hidden", "true");
    spanAlert.innerHTML = '&times;';

    $("#results").append(divalert);
    $(".callout").append(buttonAlert);
    $(".close-button").append(spanAlert);

  }
});
