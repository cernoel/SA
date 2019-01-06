import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Shop from './Shop'

const SHOP_LIST = gql`
{
  shop {
    id
    name
    lon
    lat
  }
}
`

class ShopList extends Component {
  render() {
    return (
      <Query query={SHOP_LIST}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>
    
          return data.shop.map(({id, name}) => (
            <div key={id}>
              <p>{name} {lon} {lat}</p>
            </div>
          ));
        }}
      </Query>
    )
  }
}


export default ShopList

