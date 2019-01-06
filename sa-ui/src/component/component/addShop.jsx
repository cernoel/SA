import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import React from "react";
import { Input } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { ADD_SHOP } from "./query";

class AddShop extends React.Component {
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
  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      name,
      shoptype,
      city,
      postcode,
      street,
      housenumber,
      lon,
      lat,
      website,
      email,
      phone
    } = this.state;
    return (
      <Mutation mutation={ADD_SHOP}>
        {addShopQuery => (
          <div class="ui container">
            <h1>Add a shop</h1>
            Name
            <Input
              fluid
              placeholder="Enter Name of Shop"
              name="name"
              value={name}
              onChange={this.onChange}
            />
            Type
            <Input
              name="shoptype"
              fluid
              placeholder="Enter Shop Type"
              value={shoptype}
              onChange={this.onChange}
            />
            <h2>Address</h2>
            City
            <Input
              name="city"
              fluid
              placeholder="Enter City"
              value={city}
              onChange={this.onChange}
            />
            Postcode
            <Input
              name="postcode"
              fluid
              placeholder="Enter postcode"
              onChange={this.onChange}
              value={postcode}
            />
            Street
            <Input
              name="street"
              fluid
              placeholder="Enter Street"
              onChange={this.onChange}
              value={street}
            />
            Housenumber
            <Input
              name="lon"
              fluid
              placeholder="Enter LON "
              onChange={this.onChange}
              value={lon}
            />
            <Input
              name="lat"
              fluid
              placeholder="Enter LAT "
              onChange={this.onChange}
              value={lat}
            />
            <Input
              name="housenumber"
              fluid
              placeholder="Enter Housenumber "
              onChange={this.onChange}
              value={housenumber}
            />
            <h2>Additional information</h2>
            <Input
              name="website"
              fluid
              placeholder="Enter website"
              onChange={this.onChange}
              value={website}
            />
            <Input
              name="email"
              fluid
              placeholder="Enter email"
              onChange={this.onChange}
              value={email}
            />
            <Input
              name="phone"
              fluid
              placeholder="Enter phonenummber"
              onChange={this.onChange}
              value={phone}
            />
            <h3>Submit</h3>
            <Button
              size="big"
              onClick={e => {
                e.preventDefault();
                console.log(name);
                addShopQuery({
                  variables: {
                    name: this.state.name,
                    lon: this.state.lon,
                    lat: this.state.lat,
                    shoptype: this.state.shoptype,
                    city: this.state.city,
                    postcode: this.state.postcode,
                    street: this.state.street,
                    housenumber: this.state.housenumber,
                    website: this.state.website,
                    email: this.state.email,
                    phone: this.state.phone
                  }
                });
              }}
            >
              Add Shop
            </Button>
          </div>
        )}
      </Mutation>
    );
  }
}

export default AddShop;
