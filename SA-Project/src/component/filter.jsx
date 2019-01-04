import React from "react";
import { Dropdown } from "semantic-ui-react";
import SearchBox from "./searchBar";
import Slider from "./slider";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import DropdownType from "./CategorieMenu";

const DropdownPoi = () => (
  <div>
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
        if (error) return <p>Error </p>;

        var i;
        for (i = 0; i < data.poi.length; i++) {
          data.poi[i].key = i + 10000;
          data.poi[i].value = data.poi[i]["id"];
          delete data.poi[i].id;
          data.poi[i].text = data.poi[i]["name"];
          delete data.poi[i].name;
        }

        return (
          <Dropdown
            placeholder="Select a Point of Interest"
            fluid
            search
            selection
            options={data.poi}
          />
        );
      }}
    </Query>
  </div>
);

class Filter extends React.Component {
  render() {
    return (
      <div>
        <div />
        <h2>Categorie</h2>
        <h2>Point of Interest</h2>
        <DropdownPoi />
        <Slider />
        <h1>Search</h1>
        <SearchBox />
        <br />
        <div />
        <br />
        <br />
      </div>
    );
  }
}
export default Filter;
