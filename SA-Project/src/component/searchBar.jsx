import _ from "lodash";
import React, { Component } from "react";
import { Search, Grid } from "semantic-ui-react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

var source = [
  { title: "Billa", description: "Gasse 5" },
  { title: "Bipa", description: "Straße 6" },
  { title: "Spar", description: "Weg 7" },
  { title: "Humanic", description: "Berg 8" },
  { title: "Kastner", description: "Gasse 8" }
];

class SearchBox extends Component {
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

      this.setState({
        loading: false,
        results: _.filter(source, isMatch)
      });
    }, 400);
  };

  render() {
    const { loading, value, results } = this.state;

    return (
      <Grid>
        <Grid.Column width={5}>
          <Search
            loading={loading}
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
    );
  }
}

export default SearchBox;
