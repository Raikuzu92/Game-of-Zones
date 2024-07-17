// Basketball Live Match Scores
const url = 'https://sports-live-scores.p.rapidapi.com/basketball/live';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '13d4228cebmsh85118a2a7eb709dp1434c4jsnf958a7721b88',
        'x-rapidapi-host': 'sports-live-scores.p.rapidapi.com'
    }
};

const games = document.getElementById('matches-container');

// Error Code
async function fetchMatches() {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();

        // Check if matches array exists and is not empty
        if (!result.matches || result.matches.length === 0) {
            throw new Error('No live Basketball matches available');
        }

        displayMatches(result.matches); // Assuming 'matches' is the array of matches in the API response
    } catch (error) {
        console.error('Error fetching live matches:', error);
        displayError(error.message); // Display error message from the catch block
    }
}

// Display Match Live Scores for the day
function displayMatches(matches) {
    games.innerHTML = ''; // Clear previous content

    if (matches.length === 0) {
        displayError('No live Basketball matches available');
        return;
    }

    matches.forEach(match => {
        const matchItem = document.createElement('div');
        matchItem.classList.add('match-item');

        const homeTeam = document.createElement('div');
        homeTeam.classList.add('team-name');
        homeTeam.textContent = match['Home Team'];

        const awayTeam = document.createElement('div');
        awayTeam.classList.add('team-name');
        awayTeam.textContent = match['Away Team'];

        const scoreText = document.createElement('div');
        scoreText.classList.add('score');
        scoreText.textContent = `${match['Home Score']} - ${match['Away Score']}`;

        matchItem.appendChild(homeTeam);
        matchItem.appendChild(awayTeam);
        matchItem.appendChild(scoreText);
        games.appendChild(matchItem);
    });
}

function displayError(message) {
    games.innerHTML = `<div class="error-message">${message}</div>`;
}

// Fetch matches initially when the page loads
fetchMatches();
// Optionally, you can set up a timer to refresh the matches periodically
// setInterval(fetchMatches, 60000); // Refresh every minute (60000 ms)

