import React from "react";
import { Dropdown } from "semantic-ui-react";
import SearchBox from "./searchBar";
import Slider from "./slider";
import { Query } from "react-apollo";
import { Search, Grid } from "semantic-ui-react";
import gql from "graphql-tag";
import _ from "lodash";

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
var testsoucre = [];

const DropdownType = () => (
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
        if (loading) return <Dropdown text="Loading" loading />;
        if (error) return <p>Error </p>;
        var i;
        for (i = 0; i < data.shop.length; i++) {
          data.shop[i].key = i;
          data.shop[i].value = i;
          data.shop[i].text = data.shop[i]["shoptype"];
          delete data.shop[i].shoptype;
        }

        testsoucre = data.shop.slice();

        var buffer = {};
        for (var i = 0, len = data.shop.length; i < len; i++)
          buffer[data.shop[i]["text"]] = data.shop[i];
        data.shop = new Array();
        for (var key in buffer) data.shop.push(buffer[key]);

        var buffer = [];
        buffer = data.shop.slice();

        return (
          <div>
            <Dropdown
              placeholder="Select a Point of Interest"
              fluid
              search
              selection
              options={buffer}
            />
          </div>
        );
      }}
    </Query>
  </div>
);

var sourceTest = [];

var firsttime = 0;

class Filter extends React.Component {
  state = {
    name: "",
    shoptype: "",
    city: "",
    postcode: "",
    street: "",
    housenumber: "",
    lon: "",
    lat: "",
    website: "",
    email: "",
    phone: ""
  };

  changeArray = () => {
    var sourceTest = [];
    sourceTest = testsoucre.slice();
    var i;
    for (i = 0; i < sourceTest.length; i++) {
      sourceTest[i].title = sourceTest[i]["name"];
      sourceTest[i].price = sourceTest[i]["phone"];
      sourceTest[i].description =
        sourceTest[i]["city"] +
        " " +
        sourceTest[i]["postcode"] +
        ": " +
        sourceTest[i]["street"] +
        " " +
        sourceTest[i]["housenumber"];

      delete sourceTest[i].name;
      delete sourceTest[i].city;
      delete sourceTest[i].postcode;
      delete sourceTest[i].street;
      delete sourceTest[i].housenumber;
      delete sourceTest[i].text;
    }
    return sourceTest;
  };
  resetComponent = () =>
    this.setState({ loading: false, results: [], value: "" });

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  componentWillMount() {
    this.resetComponent();
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ loading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.title);

      if (firsttime === 0) {
        firsttime = 1;
        sourceTest = this.changeArray();
      }

      this.setState({
        loading: false,
        results: _.filter(sourceTest, isMatch)
      });
    }, 400);
  };

  render() {
    const { loading, value, results } = this.state;
    return (
      <div>
        <div />
        <h2>Categorie</h2>
        <DropdownType />
        <h2>Point of Interest</h2>
        <DropdownPoi />
        <Slider />
        <h1>Search</h1>
        <br />
        <div class="ui container">
          <Grid>
            <Grid.Column width={5}>
              <Search
                loading={loading}
                size="big"
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 400, {
                  leading: true
                })}
                results={results}
                value={value}
                {...this.props}
              />
            </Grid.Column>
          </Grid>
        </div>
        <div />
        <br />
        <br />
      </div>
    );
  }
}
export default Filter;
