var React = require('react');
var queryString = require('query-string');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;
var PropTypes = require('prop-types');
var PlayerPreview = require('./PlayerPreview');
var Loading = require('./Loading');


function Profile(props) {
    const profile = props.profile;
    return (
        <PlayerPreview avatar={profile.avatar_url} username={profile.login}>
            <ul className='space-list-items'>
                {profile.name && <li>{profile.name}</li>}
                {profile.location && <li>{profile.location}</li>}
                {profile.company && <li>{profile.company}</li>}
                <li>Followers: {profile.followers}</li>
                <li>Following: {profile.following}</li>
                <li>Public Repos: {profile.public_repos}</li>
                {profile.blog && <li><a href={profile.blog}>{profile.blog}</a></li>}
            </ul>
        </PlayerPreview>
    )
}
Profile.propTypes = {
    profile: PropTypes.object.isRequired,
};


function Player(props) {
    return (
        <div>
            <h1 className="header">{props.label}</h1>
            <h3 style={{ textAlign: 'center' }}>Score: {props.score}</h3>
            <Profile profile={props.profile} />
        </div>
    )
}
Player.propTypes = {
    label: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    profile: PropTypes.object.isRequired,
};


class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true,
        };
    }
    componentDidMount () {
        var players = queryString.parse(this.props.location.search);
        api.battle([
            players.playerOneName,
            players.playerTwoName,
        ]).then(([winner, loser]) => {
            console.log(winner);
            console.log(loser);
            if (!winner) {
                this.setState(() => ({ error: 'there are some errors here', loading: false }));
            } else {
                this.setState(() => ({ winner, loser, loading: false }));
            }
        });
    }
    render() {
        const error = this.state.error;
        const winner = this.state.winner;
        const loser = this.state.loser;
        const loading = this.state.loading;
        if (error) {
            return (
                <div>
                    <p>{error}</p>
                    <Link to='/battle'>Reset</Link>
                </div>
            )
        }
        if (loading) {
            return <Loading/>
        }
        return (
            <div className="row">
                <Player
                    label="winner"
                    score={winner.score}
                    profile={winner.profile}
                />
                <Player
                    label="looser"
                    score={loser.score}
                    profile={loser.profile}
                />
            </div>
        )
    }
}


module.exports = Results;
