////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// This Modal, even though its a React component, has an imperative API to
// open and close it. Can you convert it to a declarative API?
////////////////////////////////////////////////////////////////////////////////
import React, { PropTypes } from 'react'
import { render, findDOMNode } from 'react-dom'
import $ from 'jquery'
import 'bootstrap-webpack'

class Modal extends React.Component {
  render() {
    let className = this.props.display ? 'show-shit' : 'hide-shit'
    return (
      <div className={`modal fade ${className}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Modal.propTypes = {
  title: React.PropTypes.string.isRequired,
  children: React.PropTypes.node,
  display: React.PropTypes.bool.isRequired
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display: true
    }
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal() {
    this.setState({display: !this.state.display})
  }

  render() {
    return (
      <div className="container">
        <h1>Let’s make bootstrap modal declarative</h1>
        <button
          className="btn btn-primary"
          onClick={this.toggleModal}
        >open modal</button>

        <Modal ref="modal" title="Declarative is better" display={this.state.display}>
          <p>Calling methods on instances is a FLOW not a STOCK!</p>
          <p>It’s the dynamic process, not the static program in text space.</p>
          <p>You have to experience it over time, rather than in snapshots of state.</p>
          <button
            onClick={this.toggleModal}
            type="button"
            className="btn btn-default"
          >Close</button>
        </Modal>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'))
