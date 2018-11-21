import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';


const withSubscription = WrappedComponent => class WithSubscription extends React.Component {
  constructor(props) {
    super(props);
    this.chatRef = React.createRef();
    this.state = {
      chatHistory: [],
      sendMessage: () => {},
      ws: null,
      isDataReady: false,
    };
  }

  componentDidMount() {
    const ws = new WebSocket('ws://localhost:4000');
    this.setState({ ws });

    ws.addEventListener('open', () => {
      this.setState({ sendMessage: ws.send.bind(ws) });
    });

    ws.addEventListener('message', (e) => {
      const data = JSON.parse(e.data);
      if (data.type === 'CHAT_HISTORY') {
        this.setState({
          chatHistory: data.payload,
          isDataReady: true,
        }, () => {
          this.chatRef.current.scrollToBottomOfChat();
        });
      }
    });
  }

  render() {
    const { chatHistory, sendMessage, isDataReady } = this.state;

    return (
      isDataReady ?
          <WrappedComponent
            chatHistory={chatHistory}
            sendMessage={sendMessage}
            ref={this.chatRef}
          /> : null
    );
  }
};


class Chat extends React.Component {
  static propTypes = {
    sendMessage: PropTypes.func.isRequired,
    chatHistory: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.any.isRequired,
      message: PropTypes.any.isRequired,
      User: PropTypes.any.isRequired,
    })).isRequired,
  }

  constructor(props) {
    super(props);
    this.chatHistoryRef = React.createRef();
    this.state = {
      newMessageText: '',
    };
  }

  scrollToBottomOfChat = () => {
    const chatHistoryEl = this.chatHistoryRef.current;
    chatHistoryEl.scrollTop = chatHistoryEl.scrollHeight;
  }

  onMessageChange = (e) => {
    const { value } = e.target;
    this.setState({ newMessageText: value });
  }

  onMessageSend = (e) => {
    if (e.key !== 'Enter') return;

    const { sendMessage } = this.props;
    sendMessage(this.state.newMessageText);
    this.setState({ newMessageText: '' });
  }

  render() {
    const { newMessageText } = this.state;
    const { chatHistory } = this.props;

    return (
      <div className="chat">
        <h1 className="mb-25">Chat Client</h1>

        <div className="chat__history mb-20" ref={this.chatHistoryRef}>
          {chatHistory.map(el => (
            <div className="chat__message-wrap" key={el.id}>
              <img src="/img/heavy-rain.png" className="chat__user-avatar"/>
              <div className="chat__message-right-block">
                <div className="chat__user-name">
                  {el.User.firstName} {el.User.lastName}
                </div>
                <div className="chat__user-message">{el.message}</div>
              </div>
            </div>
          ))}
        </div>

        <input
          type="text"
          className="chat__input form-control"
          onChange={this.onMessageChange}
          onKeyDown={this.onMessageSend}
          value={newMessageText}
        />
      </div>
    );
  }
}


const ChatContainer = withSubscription(Chat);

render(<ChatContainer/>, document.querySelector('#chat'));
