import React from "react";
import { Dropdown } from "semantic-ui-react";
import SearchBox from "./searchBar";
import Slider from "./slider";

var categories =  JSON.parse(localStorage.getItem("favorites"));

var pois = [
  { key: "1", value: "1", text: "Puchmuseum" },
  { key: "2", value: "2", text: "Lustbühel" },
  { key: "3", value: "3", text: "Bildföhre" },
  { key: "4", value: "4", text: "Hl. Johannes v. Nep." },
  { key: "5", value: "5", text: "Märchengrottenbahn" },
  { key: "6", value: "6", text: "Universalmuseum Joanneum - Lapidarium" },
  { key: "7", value: "7", text: "Universalmuseum Joanneum - Archäologie" },
  {
    key: "8",
    value: "8",
    text: "Universalmuseum Joanneum - Alte Galerie, Münzkabinett"
  },
  { key: "9", value: "9", text: "Kletterpark Hilmteich" },
  { key: "10", value: "10", text: "Alte Universität" },
  { key: "11", value: "12", text: "Kriminalmuseum" },
  { key: "12", value: "12", text: "Bürgerbastei" },
  { key: "13", value: "13", text: "Stallbastei" },
  { key: "14", value: "14", text: "Lichtschwert" },
  { key: "15", value: "15", text: "Admiral Wilhelm von Tegetthoff" },
  { key: "16", value: "16", text: "Türke" },
  { key: "17", value: "17", text: "Diözesanmuseum Graz" }
];


const DropdownCategorie = () => (
  <Dropdown
    placeholder="Select a Categorie"
    fluid
    search
    selection
    options={categories}
  />
);


const DropdownFavorites = () => (
  <Dropdown
    placeholder="Select a Categorie"
    fluid
    search
    selection
    options={categories}
  />
);

const DropdownPoi = () => (
  <Dropdown
    placeholder="Select a Point of Interest"
    fluid
    search
    selection
    options={pois}
  />
);

class Filter extends React.Component {
  render() {
    return (
      <div>
        <div />
        <h2>Categorie</h2>
        
        <DropdownCategorie />
        <h2>Point of Interest</h2>
        <DropdownPoi />
        <Slider />
        <h1>Search</h1>
        <SearchBox />
        <DropdownFavorites/>
        <br />
        <h1 />
        <br />
        <br />
      </div>
    );
  }
}
export default Filter;
