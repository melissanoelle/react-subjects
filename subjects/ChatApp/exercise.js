////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Create a chat application using the utility methods we give you
//
// Need some ideas?
//
// - Cause the message list to automatically scroll as new
//   messages come in
// - Highlight messages from you to make them easy to find
// - Highlight messages that mention you by your GitHub username
// - Group subsequent messages from the same sender
// - Create a filter that lets you filter messages in the chat by
//   sender and/or content
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'
import { login, sendMessage, subscribeToMessages } from './utils/ChatUtils'
import './styles'

class MessageGroup extends React.Component {
  render () {
    return (
      <li className="message-group">
        <div className="message-group-avatar">
        <a href={`https://github.com/${this.props.author}`}>
          <img src={this.props.avatarURL} />
        </a>
        </div>
        <ol className="messages">
          {this.props.messages.map((message) => {
            return <Message message={message} />
          })}
        </ol>
      </li>
    )
  }
}
MessageGroup.PropTypes = {
  avatarURL: React.PropTypes.string.isRequired,
  messages: React.PropTypes.array.isRequired
}

class Message extends React.Component {
  render () {
    return (
      <li className="message">{this.props.message}</li>
    )
  }
}
Message.PropTypes = { message: React.PropTypes.string.isRequired }

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: null,
      message: '',
      messages: []
    }
    this.handleSendMessage = this.handleSendMessage.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentDidMount () {
    login((error, auth) => {
      if (error) return
      this.setState({ auth })
      subscribeToMessages(messages => {
        this.setState({ messages: this.transformMessages(messages) })
      })
    })
  }

  componentDidUpdate () {
    this.messagePane.scrollTop = this.messagePane.scrollHeight
  }

  handleSendMessage (e) {
    e.preventDefault()
    let auth = this.state.auth
    sendMessage(
      auth.uid,
      auth.github.username,
      auth.github.profileImageURL,
      this.state.message
    )
    this.setState({ message: '' })
  }

  handleInputChange (e) {
    this.setState({ message: e.target.value })
  }

  transformMessages (incoming) {
    window.incoming = incoming
    let messages = []

    let message = { 
      author: incoming[0].username,
      avatarURL: incoming[0].avatarURL,
      texts: []
    }

    for (let i = 0; i < incoming.length; i++) {
      if (incoming[i].username === message.author) {
        message.texts.push(incoming[i].text)
      } else {
        messages.push(Object.assign({}, message))
        message.author = incoming[i].username
        message.avatarURL = incoming[i].avatarURL
        message.texts = [incoming[i].text]
      }
    }

    messages.push(message)

    return messages
  }

  render() {
    let messages = this.state.messages.map((message) => {
      return (<MessageGroup avatarURL={message.avatarURL} author={message.author} messages={message.texts} />)
    })

    return (
      <div className="chat">
        <header className="chat-header">
          <h1 className="chat-title">HipReact</h1>
          <p className="chat-message-count"># messages: {this.state.messages.length}</p>
        </header>
        <div className="messages" ref={(messagePane) => this.messagePane = messagePane}>
          <ol className="message-groups">
            {messages}
          </ol>
        </div>
        <form className="new-message-form" onSubmit={this.handleSendMessage}>
          <div className="new-message">
            <input type="text" placeholder="say something..." value={this.state.message} onChange={this.handleInputChange} />
          </div>
          <button type="submit" style={{display: 'none'}}></button>
        </form>
      </div>
    )
  }
}

render(<Chat/>, document.getElementById('app'))

