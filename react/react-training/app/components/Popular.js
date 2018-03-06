var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var Loading = require('./Loading');


function SelectedLanguage(props) {
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
        <ul className="languages">
            {languages.map((lang) => {
                return (
                    <li 
                        style={lang === props.selectedLanguage ? { color: '#d0021b' } : null }
                        onClick={props.onSelect.bind(null, lang)} 
                        key={lang}
                    >
                        {lang}
                    </li>
                )
            })}
        </ul>
    )
}
SelectedLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
}


function RepoGrid({ repos }) {
    return (
        <ul className="popular-list">
            {repos.map((repo, index) => {
                return (
                    <li className="popular-item" key={repo.id}>
                        <div className="popular-rank">#{index + 1}</div>
                        <ul className="space-list-items">
                            <li>
                                <img 
                                    className="avatar" 
                                    src={repo.owner.avatar_url}
                                    alt={`avatar for ${repo.owner.login}`}
                                />
                            </li>
                            <li><a href={repo.html_url}>{repo.name}</a></li>                        
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}
RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired,
}


class Popular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: null,
        };
        this.updateLanguage = this.updateLanguage.bind(this);
    }
    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage);
    }
    updateLanguage(lang) {
        this.setState(() =>({
            selectedLanguage: lang,
            repos: null,
        }));
        api.fetchPopularRepos(lang)
            .then((items) => {
                this.setState(() => ({ repos: items }));
            });
    }
    render() {
        return (
            <div>
                <SelectedLanguage 
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage}
                />
                {this.state.repos
                    ? <RepoGrid repos={this.state.repos} />
                    : <Loading text="Waiting" />
                }                
            </div>
        )
    }
}


module.exports = Popular;
