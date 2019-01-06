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

const getType = event => {
  console.log(event.target.value);
};

var firsttime = 0;

class Filter extends React.Component {
  state = {
    searchValue: "",
    selechtedCategorie: "",
    CategorieData: [],
    value: ""
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
              /*
              var buffer = {};
              for (var i = 0, len = data.shop.length; i < len; i++)
                buffer[data.shop[i]["text"]] = data.shop[i];
              data.shop = new Array();
              for (var key in buffer) data.shop.push(buffer[key]);*/
              this.setState({ CategorieData: data.shop });
              return null;
            }}
          </Query>
        </div>
      );
    }
  }
  InitQuery() {}

  onChange = e => {
    console.log(e.target.value);
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  fuckthat = e => {
    console.log(e.target);
    console.log(e.target.text);
    console.log(e.target.data);
  };

  componentWillMount() {
    this.resetComponent();
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
        results: _.filter(this.state.CategorieData, isMatch)
      });
    }, 300);
  };

  render() {
    const {
      searchValue,
      selechtedCategorie,
      isLoading,
      value,
      results
    } = this.state;

    return (
      <div>
        {this.GetData()}
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
        <div class="ui input">
          <input
            type="text"
            fluid
            name="selechtedCategorie"
            value={selechtedCategorie}
            placeholder="Search for Categorie"
            onChange={this.onChange}
          />
        </div>
        <h2>Point of Interest</h2>
        <DropdownPoi />
        <Slider />
        <div />
      </div>
    );
  }
}
export default Filter;
/*<Dropdown
          placeholder="Select a Point of Interest"
          fluid
          search
          name="selechtedCategorie"
          selection
          options={this.state.CategorieData}
          onSearchChange={this.onChange}
          onChange={this.fuckthat}
        />*/
