import gql from "graphql-tag";

export const ADD_SHOP = gql`
  mutation addShopQuery(
    $name: String
    $lon: String
    $lat: String
    $shoptype: String
    $city: String
    $postcode: String
    $street: String
    $housenumber: String
    $website: String
    $email: String
    $phone: String
  ) {
    insert_shop(
      objects: [
        {
          name: $name
          lon: $lon
          lat: $lat
          shoptype: $shoptype
          city: $city
          postcode: $postcode
          street: $street
          housenumber: $housenumber
          website: $website
          email: $email
          phone: $phone
        }
      ]
    ) {
      returning {
        id
        name
        shoptype
      }
    }
  }
`;
