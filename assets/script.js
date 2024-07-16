const API = 'a6a275fb-0bc2-4bb2-a883-5da06a1d5a0f';
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const storedTeams = JSON.parse(localStorage.getItem('Teams')) || [];
const btnContainer = document.getElementById('buttons');
const container = document.getElementById('container');



// function to fetch api
function getData(teamName){
 
const apiUrl = 'https://api.balldontlie.io/v1/teams';

const teamInput = searchInput.value.trim();




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
const drilledData = data.data;
console.log("Pre loop")
console.log(drilledData) 
console.log("Mid loop")

    if (drilledData.length > 0) {
        for (let i = 0; i < drilledData.length; i++) {
            console.log(drilledData[i].full_name)
            const stringName = JSON.stringify(drilledData[i].full_name)
            // stringName = "atlantahawks"
            if (stringName.toLowerCase().includes( teamInput.toLowerCase())) { // Assuming teamInput is defined
                console.log("Post loop")
                renderTeams(drilledData[i]);
                storeTeamHistory(drilledData[i])
        
            }
        }
    } else {
        console.log('No data found.'); // Replace with appropriate message
    }
})
.catch(function (error) {
    console.error('Error fetching data:', error);
});



}

function renderTeams(teams) {
    container.innerHTML = ''; // Clear previous content
console.log("Team in render function")
console.log(teams)
    if (teams.length === 0) {
        container.textContent = 'No team found.';
        return;
    }
    
            const teamDiv = document.createElement('div');
            teamDiv.textContent = `${teams.full_name} (${teams.abbreviation})(${teams.conference})`;
            const confh1 = document.createElement("h1")
            confh1.textContent = `${teams.conference} `
            confh1.classList.add("panda")
            container.append(teamDiv, confh1);
        
          
    
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