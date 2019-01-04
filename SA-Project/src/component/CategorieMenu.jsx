import React from "react";
import { Dropdown } from "semantic-ui-react";
import SearchBox from "./searchBar";
import Slider from "./slider";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const DropdownType = () => (
  <div>
    <Query
      query={gql`
        {
          shop {
            shoptype
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <Dropdown text="Loading" loading />;
        if (error) return <p>Error </p>;
        console.log(data.shop);
        var i;
        for (i = 0; i < data.shop.length; i++) {
          data.shop[i].key = i;
          data.shop[i].value = i;
          data.shop[i].text = data.shop[i]["shoptype"];
          delete data.shop[i].shoptype;
        }

        return (
          <Dropdown
            placeholder="Select a Point of Interest"
            fluid
            search
            selection
            options={data.shop}
          />
        );
      }}
    </Query>
  </div>
);
export default DropdownType;
