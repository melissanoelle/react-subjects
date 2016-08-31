////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// - When the checkbox is checked:
//   - Fill in the shipping fields with the values from billing
//   - Disable the shipping fields so they are not directly editable
//   - Keep the shipping fields up to date as billing fields change
//   - Hint: you can get the checkbox value from `event.target.checked`
// - When the form submits, console.log the values
//
// Got extra time?
//
// - If there are more than two characters in the "state" field, let the user
//   know they should use the two-character abbreviation
// - If the user types something into shipping, then checks the checkbox, then
//   unchecks the checkbox, ensure the field has the information from
//   before clicking the checkbox the first time

import React from 'react'
import { render } from 'react-dom'
import serializeForm from 'form-serialize'

class CheckoutForm extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      isSameAsBilling: false,
      billingName: '',
      billingState: '',
      shippingName: '',
      shippingState: '',
      billingStateError: false,
      shippingStateError: false
    }
    this.handleSameAsBilling = this.handleSameAsBilling.bind(this)
  }

  handleSameAsBilling () {
    this.setState({ isSameAsBilling: !this.state.isSameAsBilling })
  }

  handleFormChange (field, e) {
    let newState = {}

    if (field.indexOf('shipping') >= 0) {
      newState.isSameAsBilling = false
      newState.shippingState = this.billingState
      newState.shippingName = this.billingName
    }

    newState[field] = e.target.value

    if (field.indexOf('State') >= 0) {
      newState[field + 'Error'] = e.target.value.length > 2
    }

    this.setState(newState)
  }

  getShippingName () {
    return this.state.isSameAsBilling ? this.state.billingName : this.state.shippingName
  }
  
  getShippingState () {
    return this.state.isSameAsBilling ? this.state.billingState : this.state.shippingState
  }

  render() {
    return (
      <div>
        <h1>Checkout</h1>
        <form>
          <fieldset>
            <legend>Billing Address</legend>
            <p>
              <label>Billing Name: <input 
                type="text" 
                value={this.state.billingName} 
                onChange={this.handleFormChange.bind(this, 'billingName')} /></label>
            </p>
            <p>
              <label>Billing State: <input 
                type="text" 
                size="2"
                value={this.state.billingState} 
                onChange={this.handleFormChange.bind(this, 'billingState')} /></label>
            </p>
            <div className="error" style={{display: `${this.state.billingStateError ? 'block' : 'none'}`}}>State must be a two-letter abbreviation.</div>
          </fieldset>

          <br/>

          <fieldset>
            <label><input type="checkbox" checked={this.state.isSameAsBilling} onChange={this.handleSameAsBilling}/> Same as billing</label>
            <legend>Shipping Address</legend>
            <p>
              <label>Shipping Name: <input 
                type="text" 
                value={this.getShippingName()} 
                onChange={this.handleFormChange.bind(this, 'shippingName')} /></label>
            </p>
            <p>
              <label>Shipping State: <input 
                type="text" 
                size="2" 
                value={this.getShippingState()} 
                onChange={this.handleFormChange.bind(this, 'shippingState')} /></label>
            </p>
            <div className="error" style={{display: `${this.state.shippingStateError ? 'block' : 'none'}`}}>State must be a two-letter abbreviation.</div>
          </fieldset>
        </form>
      </div>
    )
  }
}

render(<CheckoutForm/>, document.getElementById('app'))
