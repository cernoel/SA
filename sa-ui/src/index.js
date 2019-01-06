import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./component/navBar";
import Map from "./component/map/map-ui";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:8080/v1alpha1/graphql"
});
/*
client
  .query({
    query: gql`
      {
        poi {
          name
          id
        }
      }
    `
  })
  .then(result => console.log(result));
*/
class Mainpage extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <body>
          <div>
            <div class="ui internally celled grid">
              <div class="row">
<<<<<<< HEAD
                <div class="four wide column">
                  <Navbar />
                </div>
                <div class="two wide column" />
                <div class="eight wide column">
=======
                <div class="five wide column">
                  <Navbar />
                </div>
                <div class="ten wide column">
>>>>>>> 87d6811761daa49d88f14deed84b3b8b77a0e586
                  <h1>Loaction </h1>
                  <Map />
                </div>
                <div />
              </div>
            </div>
          </div>
<<<<<<< HEAD
          <body />
=======
>>>>>>> 87d6811761daa49d88f14deed84b3b8b77a0e586
        </body>
      </ApolloProvider>
    );
  }
}

export default Mainpage;
ReactDOM.render(<Mainpage />, document.getElementById("root"));
