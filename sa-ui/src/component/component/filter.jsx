import React from "react";
import { Dropdown } from "semantic-ui-react";
import Slider from "./slider";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Input } from "semantic-ui-react";
import { Search } from "semantic-ui-react";
import _ from "lodash";
import { map } from "async";

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
        if (loading) return <Dropdown text="Loading" loading />;
        if (error) return <p>Error </p>;

        var counter;
        for (counter = 0; counter < data.poi.length; counter++) {
          data.poi[counter].key = data.poi[counter]["id"];
          data.poi[counter].value = data.poi[counter]["id"];
          data.poi[counter].text = data.poi[counter]["name"];
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

var firsttime = 0;
var secondtime = 0;

class Filter extends React.Component {
  state = {
    searchValue: "",
    selechtedCategorie: "",
    CategorieData: [],
    bufferData: [],
    value: "",

    favorites: [
      {
        value: "",
        key: "1",
        text: "",
        category: "",
        poid: ""
      }
    ]
  };

  GetData() {
    if (firsttime == 0) {
      firsttime = firsttime + 1;
      return (
        <div>
          <Query
            query={gql`
              {
                shop {
                  id
                  name
                  city
                  street
                  housenumber
                  shoptype
                  postcode
                  website
                  email
                  phone
                  lon
                  lat
                }
              }
            `}
          >
            {({ loading, error, data }) => {
              if (loading) return <p>Loading</p>;
              if (error) return <p>Error </p>;
              firsttime = 1;
              var i;
              for (i = 0; i < data.shop.length; i++) {
                data.shop[i].key = i;
                data.shop[i].value = i;
                data.shop[i].shoptype1 = data.shop[i]["shoptype"];
                data.shop[i].text = data.shop[i]["shoptype"];
                data.shop[i].title = data.shop[i]["name"];
                data.shop[i].description =
                  data.shop[i]["city"] +
                  " " +
                  data.shop[i]["postcode"] +
                  ": " +
                  data.shop[i]["street"] +
                  " " +
                  data.shop[i]["housenumber"];
                delete data.shop[i].shoptype;
                data.shop[i].price = data.shop[i]["phone"];
              }
              this.setState({ bufferData: data.shop });
              this.setState({ CategorieData: data.shop });
              return null;
            }}
          </Query>
        </div>
      );
    }
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  componentWillMount() {
    this.resetComponent();
    if (typeof localStorage.getItem("favorites") != "undefined") {
      this.state.favorites = JSON.parse(localStorage.getItem("favorites"));
    }
    console.log("fave", this.state.favorites);
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" });

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(this.state.bufferData, isMatch)
      });
    }, 300);
  };

  changeData() {
    if (secondtime < 3) {
      secondtime = secondtime + 1;
      var buffer = {};
      for (var i = 0, len = this.state.CategorieData.length; i < len; i++) {
        buffer[this.state.CategorieData[i]["text"]] = this.state.CategorieData[
          i
        ];
      }
      this.state.CategorieData = new Array();
      for (var key in buffer) {
        this.state.CategorieData.push(buffer[key]);
      }
      for (var i = 0, len = this.state.CategorieData.length; i < len; i++) {
        this.state.CategorieData[i].description = null;
      }
    }
  }

  render() {
    const {
      searchValue,
      selechtedCategorie,
      isLoading,
      value,
      results
    } = this.state;
    {
      console.log("favorite in render", this.state.favorites);
    }
    return (
      <div>
        {this.GetData()}
        {this.changeData()}
        <div />
        <h2>Search</h2>
        <div>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true
            })}
            results={results}
            value={value}
            {...this.props}
          />
        </div>
        <h2>Categorie</h2>
        <Dropdown
          placeholder="Select a Point of Interest"
          fluid
          search
          name="selechtedCategorie"
          selection
          options={this.state.CategorieData}
        />
        <h2>Point of Interest</h2>
        <DropdownPoi />
        <Slider />
        <div />
        <h2>Favorites</h2>
        <div>
          <Dropdown
            placeholder="chose Favorite"
            options={this.state.favorites}
          />
        </div>
      </div>
    );
  }
}
export default Filter;
