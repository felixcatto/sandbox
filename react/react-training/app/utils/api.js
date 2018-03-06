var axios = require('axios');

var id = 'acf71a32b6ca0610bf44';
var secret = '5dafe640465801dff9a56d639b6506c99760cdb5';
var params = `?client_id=${id}&client_secret=${secret}`;

function getProfile(username) {
    return axios.get(`https://api.github.com/users/${username}${params}`)
        .then((user) => {
            return user.data;
        });
}

function getRepos(username) {
    return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`);
}

function getStarCount(repos) {
    const reducer = (acc, el) => acc + el.stargazers_count;
    return repos.data.reduce(reducer, 0);
}

function calculateScore(profile, repos) {
    var followers = profile.followers;
    var totalStars = getStarCount(repos);
    return (followers * 3) + totalStars;
}

function handleError(error) {
    console.warn(error);
    return [];
}

function getUserData(username) {
    return axios.all([
        getProfile(username),
        getRepos(username)
    ]).then(([profile, repos]) => ({
        profile: profile,
        score: calculateScore(profile, repos),
    }));
}

function sortPlayers (players) {
    return  players.sort((a, b) => b.score - a.score);
}

module.exports = {
    battle: players => axios.all(players.map(getUserData))
        .then(sortPlayers)
        .catch(handleError),
    fetchPopularRepos: (language) => {
        var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');
        return axios.get(encodedURI)
            .then((response) => {
                return response.data.items;
            });
    },
};