const API = 'a6a275fb-0bc2-4bb2-a883-5da06a1d5a0f';
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const storedTeams = JSON.parse(localStorage.getItem('Teams')) || [];
const btnContainer = document.getElementById('buttons');
const container = document.getElementById('container');



// function to fetch api
function getData(teamName){
 
const apiUrl = 'https://api.balldontlie.io/v1/teams';

Teams = searchInput.value.trim();
console.log(apiUrl);



fetch(apiUrl, { 
headers:{
    'Authorization': API
}
})
    .then(function(response) {
        console.log(response);
        return response.json()

})

.then(function(data) {
    //console.log(data.list[0].main.humidity)
    const teams = data.data
    if (teams.length > 0) {
        const firstTeam = teams[0];
        renderTeams(firstTeam);
        storeTeamHistory(firstTeam)
    }
    renderTeams(teams)
    storeTeamHistory(teamName);
})
.catch(function (error) {
    console.error(error);
})



}

function renderTeams(teams) {
    container.innerHTML = ''; // Clear previous content

    if (teams.length === 0) {
        container.textContent = 'No team found.';
        return;
    }

    let i = 0;
    const renderNextTeam = () => {
        if (i < teams.length) {
            const team = teams[i];
            const teamDiv = document.createElement('div');
            teamDiv.textContent = `${team.full_name} (${team.abbreviation})(${team.conference})`;
            container.appendChild(teamDiv);
            i++;
            setTimeout(renderNextTeam, 500); // Adjust the delay (in milliseconds) between rendering each team
        }
    };

    renderNextTeam();
}

function storeTeamHistory(team) {
    storedTeams.push(team);
    localStorage.setItem('Teams', JSON.stringify(storedTeams));
}

searchButton.addEventListener('click', getData);

searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        getData();
    }
});