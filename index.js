"use strict";

console.log("hello");


function handleSubmit() {
  $("#js-form").submit(function(event) {
    event.preventDefault();
    let handle = $(event.currentTarget).find("#js-search-term").val();
    getRepos(handle);

    $("#js-search-term").val("");

  });
}

function getRepos(searchTerm) {
  let url = (`http://api.github.com/users/${searchTerm}/repos`);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $(".js-error-message").text(`Something went wrong: ${err.message}`);
    });


}

function displayResults(responseJson) {
    console.log(responseJson);

    $("#results-list").empty();

    let results = responseJson.map(result =>{
        let name = result.name;
        let url = result.html_url;
        console.log(url)

        return `
        <li>
            <h2>${name}</h2>
            <a href="${url}">${url}</a>
        </li>`
    })
    

    $("#results-list").append(`${results}`);
    
    $("#results").removeClass('hidden');

}

$(handleSubmit);
