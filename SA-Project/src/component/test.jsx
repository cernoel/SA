import { Query } from "react-apollo";
import gql from "graphql-tag";
import React from "react";

const Test = () => (
  <Query
    query={gql`
      {
        poi {
          id
          name
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.poi.map(({ id, name }) => (
        <div key={id}>
          <p>
            {id}: {name}
          </p>
        </div>
      ));
    }}
  </Query>
);

export default Test;
