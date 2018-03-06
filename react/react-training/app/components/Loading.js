var React = require('react');
var PropTypes = require('prop-types');


var styles = {
    content: {
        textAlign: 'center',
        fontSize: '35px',
    },
};


class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text,
        };
    }
    componentDidMount() {
        var stopper = `${this.state.text}...`;
        this.intervalID = window.setInterval(() => {
            const text = this.state.text;
            if (text === stopper) {
                this.setState(() => ({ text: this.props.text }))
            } else {
                this.setState(() => ({ text: `${text}.` }));
            }
        }, this.props.speed);
    }
    componentWillUnmount() {
        window.clearInterval(this.intervalID);
    }
    render() {
        return (
            <p style={styles.content}>
                {this.state.text}
            </p>
        )
    }
}
Loading.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired,
};
Loading.defaultProps = {
    text: 'Loading',
    speed: 300,
};

module.exports = Loading;
