var apiKey='5ae2e3f221c38a28845f05b6f734f0898fda7d994da97dd93abd77db';



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

$('#submitBtn').click(function() {
    var kind = $('option:selected').attr('id');
    var keyWord = $('#keyWordInput').val();
    
    fetch("https://api.opentripmap.com/0.1/en/places/autosuggest?name="+keyWord+"&radius=700000&lon=-73.75623&lat=42.65258&kinds="+kind+"&format=json&props=address&apikey="+apiKey, {
      method: 'GET', //GET is the default.
      credentials: 'same-origin', // include, *same-origin, omit
      redirect: 'follow', // manual, *follow, error
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
            $('#results').empty();
          var results=document.createElement("h3");
          if(data>=30){
            results.textContent="Number of results: 30";
            $('#results').append(results);
          }
          else{
              results.textContent="Number of results: "+data.length;
              $('#results').append(results);
          }

          var i=0;

          while(i<data.length || i==30){
              if(data[i].name!=""){
                  var name=document.createElement("h5");
                  name.textContent="Name: "+data[i].name;
                  var adress=document.createElement("p");
                  adress.textContent="Adress: "+data[i].adress;
                  $('#results').append(name);
                  $('#results').append(adress);
                  

              }
              i++;
          }
        console.log(data);
      });
});
