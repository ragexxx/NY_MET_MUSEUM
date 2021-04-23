var apiKey = "5ae2e3f221c38a28845f05b6f734f0898fda7d994da97dd93abd77db";

/* $('#formSelect').change(function() {
    var kind = $('option:selected').attr('id');
    console.log(kind);
    fetch("https://api.opentripmap.com/0.1/en/places/radius?radius=70000&lon=-73.9385&lat=40.6643&kinds="+kind+"&format=json&apikey="+apiKey, {
      method: 'GET', //GET is the default.
      credentials: 'same-origin', // include, *same-origin, omit
      redirect: 'follow', // manual, *follow, error
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
}); */

$("#submitBtn").click(function () {
  var kind = $("option:selected").attr("id");
  var keyWord = $("#keyWordInput").val();

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
        results.textContent = "Number of results: " + data.length;
        $("#results").append(results);
        if(data.length==0){
          var alert=document.createElement("h5");
          alert.textContent="Ups! Looks like we had no luck with your search, please try a new key word or category";
          $("#results").append(alert);
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
});
