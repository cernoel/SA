import { Query } from "react-apollo";
import gql from "graphql-tag";
import React from "react";
import { Input } from "semantic-ui-react";
import { Button } from "semantic-ui-react";

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
  sumbitShop = () => {
    console.log("lets submit this shit");
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
          name="housenumber"
          fluid
          placeholder="Enter Housenumber "
          onChange={this.onChange}
          value={housenumber}
        />
        Longitudinal
        <Input
          name="lon"
          fluid
          placeholder="Enter lon"
          onChange={this.onChange}
          value={lon}
        />
        Latitude
        <Input
          name="lat"
          fluid
          placeholder="Enter lat"
          onChange={this.onChange}
          value={lat}
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
        <Button size="big" onClick={this.sumbitShop}>
          Add Shop
        </Button>
      </div>
    );
  }
}

export default AddShop;
