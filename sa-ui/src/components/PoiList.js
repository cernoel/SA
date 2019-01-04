import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Poi from './Poi'

const POI_LIST = gql`
{
  poi {
    id
    name
  }
}
`

class PoiList extends Component {
  render() {
    return (
      <Query query={POI_LIST}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>
    
          return data.poi.map(({id, name}) => (
            <div key={id}>
              <p>{name}</p>
            </div>
          ));
        }}
      </Query>
    )
  }
}


export default PoiList

