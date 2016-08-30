////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Render a tab for each country with its name in the tab
// - Make it so that you can click on a tab and it will appear active
//   while the others appear inactive
// - Make it so the panel renders the correct content for the selected tab
//
// Got extra time?
//
// - Make <Tabs> generic so that it doesn't know anything about
//   country data (Hint: good propTypes help)
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'

const styles = {}

const DATA = [
  { id: 1, name: 'USA', description: 'Land of the Free, Home of the brave' },
  { id: 2, name: 'Brazil', description: 'Sunshine, beaches, and Carnival' },
  { id: 3, name: 'Russia', description: 'World Cup 2018!' }
]

styles.tab = {
  display: 'inline-block',
  padding: 10,
  margin: 10,
  borderBottom: '4px solid',
  borderBottomColor: '#ccc',
  cursor: 'pointer'
}

styles.activeTab = {
  ...styles.tab,
  borderBottomColor: '#000'
}

styles.panel = {
  padding: 10
}

class Tab extends React.Component {
  render () {
    let tabStyle
    this.props.name === this.props.active ? tabStyle = styles.activeTab : tabStyle = styles.tab
    return (
      <div className="Tab" data-index={this.props.index} style={tabStyle} onClick={this.props.onClick}>
        {this.props.name}
      </div>
    )
  }
}

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeId: 0
    }
    this.handleTabClick = this.handleTabClick.bind(this)
    this.getDescription = this.getDescription.bind(this)
  }

  handleTabClick (e) {
    this.setState({activeId: e.target.dataset.index})
  }

  getDescription (id = this.state.activeId) {
    return DATA[id].description
  }

  getName (id = this.state.activeId) {
    return DATA[id].name
  }

  render () {
    let tabs = this.props.countries.map((country, index) => {
      return ( <Tab 
        key={index} 
        index={index}
        name={this.getName(index)} 
        active={this.getName()} 
        onClick={this.handleTabClick} /> 
      )
    })
    return (
      <div>
        <h1>Countries</h1>
        <div className="Tabs">
          {tabs}
        </div>
        <div className="TabPanel" style={styles.panel}>
          {this.getDescription()}
        </div>
      </div>
    )
  }
}

render(<App countries={DATA}/>, document.getElementById('app'), function () {
  require('./tests').run(this)
})
