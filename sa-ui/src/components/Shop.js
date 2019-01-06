import React, { Component } from 'react'

class Shop extends Component {
  render() {
    return (
      <div>
        <div class="shopid">
          {this.props.shop.id}
        </div>
        <div class="shopname">
          {this.props.shop.name}
        </div>
        <div class="lon">
          {this.props.shop.lon}
        </div>
        <div class="lat">
          {this.props.shop.lat}
        </div>
      </div>
    )
  }
}

export default Shop

