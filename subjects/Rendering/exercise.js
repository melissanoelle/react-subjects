////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - render DATA.title in an <h1>
// - render a <ul> with each of DATA.items as an <li>
// - now only render an <li> for mexican food (hint: use DATA.items.filter(...))
// - sort the items in alphabetical order by name (hint: use sort-by https://github.com/staygrimm/sort-by#example)
//
// Got extra time?
// - add a select dropdown to make filtering on `type` dynamic
// - add a button to toggle the sort order
// - Hint: you'll need an `updateThePage` function that calls `render`,
//   and then you'll need to call it in the event handlers of the form controls
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'
import sortBy from 'sort-by'

const DATA = {
  title: 'Menu',
  items: [
    { id: 1, name: 'tacos', type: 'mexican' },
    { id: 2, name: 'burrito', type: 'mexican' },
    { id: 3, name: 'tostada', type: 'mexican' },
    { id: 4, name: 'mushy peas', type: 'english' },
    { id: 5, name: 'fish and chips', type: 'english' },
    { id: 6, name: 'black pudding', type: 'english' }
  ]
}

class Menu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filter: 'mexican',
      sort: 'name'
    }
    this.filterChange = this.filterChange.bind(this)
    this.buttonChange = this.buttonChange.bind(this)
  }

  filterChange (e) {
    this.setState({filter: e.target.value}) 
  }

  buttonChange (e) {
    let sorts = {
      'name': { filter: '-name', label: 'DESC' },
      '-name': { filter: 'name', label: 'ASC' }
    }
    let sort = sorts[this.state.sort]
    this.setState({sort: sort.filter})
    e.target.value = sort.label
    e.target.innerHTML = sort.label
  }

  render () {
   var foodStuffs = DATA.items.sort(sortBy(this.state.sort))
      .filter((thing) => { return thing.type === this.state.filter })
      .map((burrito) => { 
      return ( <li key={burrito.id}>{burrito.name}</li> )
    })

    return (
      <div>
        <h1>{DATA.title}</h1>
        <select value={this.props.filter} onChange={this.filterChange}>
          <option value="mexican">Mexican</option>
          <option value="english">English</option>
        </select>
        <button onClick={this.buttonChange} value="ASC">ASC</button>
        <ul>
          {foodStuffs}
        </ul>
      </div>
    )
  }
}

render(<Menu />, document.getElementById('app'))

