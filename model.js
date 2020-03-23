var apiURL = 'https://games-world.herokuapp.com';

fetch(apiURL + '/games', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}).then(function(response){
    return response.json();
}).then(function(jsonResponse){
    console.log('The response   ', jsonResponse);
});

