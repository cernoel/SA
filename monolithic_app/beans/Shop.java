package beans;

import java.util.Random;

public class Shop {
    private long id;
    private float lon;
    private float lat;
    private String shop;
    private String city;
    private String name;
    private String postcode;
    private String street;
    private String housenumber;
    private String website;
    private String email;
    private String phone;

    public Shop(float lon, float lat, String shop, String city, String name, String postcode, String street, String housenumber, String website, String email, String phone) {
        this.lon = lon;
        this.lat = lat;
        this.shop = shop;
        this.city = city;
        this.name = name;
        this.postcode = postcode;
        this.street = street;
        this.housenumber = housenumber;
        this.website = website;
        this.email = email;
        this.phone = phone;

        Random rand = new Random();
        id = Math.abs(rand.nextInt());
    }

    // TODO: Assignment to himself?
    public Shop() {
        this.id = id;
        this.lon = lon;
        this.lat = lat;
        this.shop = shop;
        this.city = city;
        this.name = name;
        this.postcode = postcode;
        this.street = street;
        this.housenumber = housenumber;
        this.website = website;
        this.email = email;
        this.phone = phone;
    }

    public Shop(long id, float lon, float lat, String shop, String city, String name, String postcode, String street, String housenumber, String website, String email, String phone) {
        this.id = id;
        this.lon = lon;
        this.lat = lat;
        this.shop = shop;
        this.city = city;
        this.name = name;
        this.postcode = postcode;
        this.street = street;
        this.housenumber = housenumber;
        this.website = website;
        this.email = email;
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "Shop{" +
                "id=" + id +
                ", lon=" + lon +
                ", lat=" + lat +
                ", shop='" + shop + '\'' +
                ", city='" + city + '\'' +
                ", name='" + name + '\'' +
                ", postcode='" + postcode + '\'' +
                ", street='" + street + '\'' +
                ", housenumber='" + housenumber + '\'' +
                ", website='" + website + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                '}';
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public float getLon() {
        return lon;
    }

    public void setLon(float lon) {
        this.lon = lon;
    }

    public float getLat() {
        return lat;
    }

    public void setLat(float lat) {
        this.lat = lat;
    }

    public String getShop() {
        return shop;
    }

    public void setShop(String shop) {
        this.shop = shop;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getHousenumber() {
        return housenumber;
    }

    public void setHousenumber(String housenumber) {
        this.housenumber = housenumber;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}

