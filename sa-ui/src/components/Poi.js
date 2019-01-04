import React, { Component } from 'react'

class Poi extends Component {
  render() {
    return (
      <div>
        <div class="poiname">
          {this.props.poi.name}
        </div>
        <div class="poiid">
          {this.props.poi.id}
        </div>
      </div>
    )
  }
}

export default Poi

