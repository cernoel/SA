import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './Header'
import PoiList from './PoiList'

class App extends Component {

// Router to different "actions"
render() {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={PoiList} />
        </Switch>
      </div>
    </div>
  )
}

}

export default App
