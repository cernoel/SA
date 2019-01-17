package database;

import beans.Poi;
import beans.Shop;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class DB_Access {

    private DB_Database db = null;

    // constructor, connect!
    public DB_Access() throws SQLException {
        db = new DB_Database();
    }

    // do check if db is closed
    public boolean dbIsClosed() throws SQLException {
        return db.getCon().isClosed();
    }

    // expose db connection
    public Connection getDbConn() {
        return db.getCon();
    }

    public void addShop(Shop shop) throws SQLException {
        // ignore id, self created?
        String sqlString = "INSERT INTO shop (lon, lat, shoptype, city, name, postcode, street, housenumber, website, email, phone) "
                + "VALUES( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)";
        PreparedStatement pStat = db.getCon().prepareStatement(sqlString);
        pStat.setFloat(1, shop.getLon());
        pStat.setFloat(2, shop.getLat());
        pStat.setString(3, shop.getShop() + "");
        pStat.setString(4, shop.getCity());
        pStat.setString(5, shop.getName() + "");
        pStat.setString(6, shop.getPostcode() + "");
        pStat.setString(7, shop.getStreet() + "");
        pStat.setString(8, shop.getHousenumber() + "");
        pStat.setString(9, shop.getWebsite() + "");
        pStat.setString(10, shop.getEmail() + "");
        pStat.setString(11, shop.getPhone() + "");

        System.out.println(pStat);
        pStat.executeUpdate();

       

        pStat.close();
    }

    public void deleteShop(String name, String street, String housenumber) throws SQLException {
        String sqlString = "DELETE FROM shop WHERE name = ? and street = ? and housenumber = ?";
        PreparedStatement pStat = db.getCon().prepareStatement(sqlString);
        pStat.setString(1, name);
        pStat.setString(2, street);
        pStat.setString(3, housenumber);

        int anzahl = pStat.executeUpdate();

        System.out.println("Number of shops deleted: " + anzahl);

        pStat.close();
    }

    public void deleteShop(String id) throws SQLException {
        String sqlString = "DELETE FROM shop WHERE id = ?";
        PreparedStatement pStat = db.getCon().prepareStatement(sqlString);

        pStat.setLong(1, Long.parseLong(id));

        int anzahl = pStat.executeUpdate();

        System.out.println("Number of shops deleted: " + anzahl);

        pStat.close();
    }

    public void updateShop(Shop shop) throws SQLException {
        String sqlString
                = "UPDATE shop SET "
                + "lon = ?, "
                + "lat = ?, "
                + "shoptype = ?, "
                + "city = ?, "
                + "name = ?, "
                + "postcode = ?, "
                + "street = ?, "
                + "housenumber = ?, "
                + "website = ?, "
                + "email = ?, "
                + "phone = ? "
                + "WHERE id = ?";
        PreparedStatement pStat = db.getCon().prepareStatement(sqlString);
        pStat.setFloat(1, shop.getLon());
        pStat.setFloat(2, shop.getLat());
        pStat.setString(3, shop.getShop() + "");
        pStat.setString(4, shop.getCity());
        pStat.setString(5, shop.getName() + "");
        pStat.setString(6, shop.getPostcode() + "");
        pStat.setString(7, shop.getStreet() + "");
        pStat.setString(8, shop.getHousenumber() + "");
        pStat.setString(9, shop.getWebsite() + "");
        pStat.setString(10, shop.getEmail() + "");
        pStat.setString(11, shop.getPhone() + "");
        pStat.setLong(12, shop.getId());

        System.out.println(pStat);
        int anzahl = pStat.executeUpdate();

        System.out.println("Number of shops updated: " + anzahl);

        pStat.close();
    }

    /*
    // TODO: getShopsAroundPoi as List
    public List<Shop> getShopsAroundPoi(String poiId, int meters) {
        List<Shop> shopList = new ArrayList<>();

        String sqlString = "SELECT * FROM shop WHERE \n"
                + "ST_DWithin(ST_Point(shop.lon, shop.lat), (SELECT ST_Point(poi.lon, poi.lat) FROM public.poi WHERE poi.id = '?')::geometry, ?, true)";

        PreparedStatement pStat = null;

        try {
            pStat = db.getCon().prepareStatement(sqlString);
        } catch (SQLException ex) {
            Logger.getLogger(DB_Access.class.getName()).log(Level.SEVERE, null, ex);
        }

        try {
            pStat.setString(1, poiId);
            pStat.setInt(2, meters);
        } catch (SQLException ex) {
            Logger.getLogger(DB_Access.class.getName()).log(Level.SEVERE, null, ex);
        }

        return shopList;
    }
     */
 /*
    public ResultSet getShopsAroundPoiResultSet(String poiId, int meters) throws SQLException {
        Connection dba = db.getCon();

        if (dba.isClosed()) {
            throw new SQLException("Database closed?!");
        }

        String sqlString = "SELECT *FROM shopsbypoi WHERE poiID = ? and meters = ?";

        // TODO: preparedStatement!
        //String sqlString = "SELECT * FROM shopsbypoi('W23786584', 80);";
        
        Statement statement = null;

        statement = dba.createStatement();

        return statement.executeQuery(sqlString);
    }
     */
    // TODO: getAllCategories as String Array
    public List<String> getAllCategories() throws SQLException {
        List<String> categories = new ArrayList<>();

        Connection dba = db.getCon();

        if (db.getCon().isClosed()) {
            throw new SQLException("Database closed?!");
        }

        String sqlString = "SELECT DISTINCT shoptype FROM public.shop;";
        ResultSet resultset = db.fireExecuteQuery(sqlString);

        while (resultset.next()) {
            String entry = resultset.getString(resultset.findColumn("shoptype"));
            if (!(entry == null)) {
                String[] fields = entry.split(";");
                for (String cat : fields) {
                    if (!categories.contains(cat)) {
                        categories.add(cat.trim());
                    }
                }
            }
        }
        return categories;
    }

    public List<Poi> getAllPOIs() throws SQLException {
        List<Poi> POIs = new ArrayList<>();

        if (db.getCon().isClosed()) {
            throw new SQLException("Database closed?!");
        }

        String sqlString = "SELECT * FROM public.poi;";
        ResultSet resultset = db.fireExecuteQuery(sqlString);

        while (resultset.next()) {
            String id = resultset.getString(resultset.findColumn("id"));
            String name = resultset.getString(resultset.findColumn("name"));
            Poi poi = new Poi(id, name);
            POIs.add(poi);
        }
        return POIs;
    }

    //
    public List<Shop> filterShops(String category, String name, String poi, int distance) throws SQLException {

        String sqlString = "";

        boolean poiset = false;
        boolean catset = false;
        boolean nameset = false;
        boolean whereset = false;

        if (poi.isEmpty()) {
            sqlString = "SELECT * FROM shop ";
        } else {
            poiset = true;
            sqlString = "SELECT * FROM shopsbypoi(?, ?) ";
        }

        String sqlWhere = "";

        if (!(category.isEmpty())) {
            catset = true;
            sqlWhere += " shoptype LIKE ?";
            whereset = true;
        }

        if (!(name.isEmpty())) {
            nameset = true;
            if (whereset) {
                sqlWhere += " AND ";
            }
            sqlWhere += " name LIKE ? ";
            whereset = true;
        }

        if (whereset) {
            sqlString += " WHERE " + sqlWhere;
        }

        System.out.println(sqlString);

        int nr = 1;

        // wenn er nichts an gibt, bekommt er alles?
        /*
        if (category == null && name == null && poi == null) {
            throw new RuntimeException("No filter selected");
        }
         */
        List<Shop> shopList = new ArrayList<>();

        /* verstehe ich nicht.. 
        if(poi != null)
        {
            shopList = getShopsAroundPoi(poi,distance);
            if(category != null)
            {
                shopList = shopList.stream().filter(s -> !s.getShop().equals(category)).collect(Collectors.toList());
            }
            if(name != null)
            {
                shopList = shopList.stream().filter(s -> !s.getName().equals(name)).collect(Collectors.toList());
            }
            return shopList;
        }
         */
 /*
        if (category != null) {
            sqlString += " shop = ?";
            nr++;
        }
        if (name != null) {
            sqlString += nr == 1 ? " AND name = ?" : " name = ?";
            nr++;
        }
         */
        PreparedStatement pStat = db.getCon().prepareStatement(sqlString);

        if (poiset) {
            pStat.setString(nr, poi);
            nr++;

            pStat.setInt(nr, distance);
            nr++;

        }

        if (catset) {
            pStat.setString(nr, "%" + category + "%");
            nr++;
        }

        if (nameset) {
            pStat.setString(nr, "%" + name + "%");
            nr++;
        }

        /*
        if (category != null) {
            pStat.setString(1, category);
        }
        if (name != null) {
            //Es wurde nur ein Filter übergeben
            if (nr == 1) {
                pStat.setString(1, name);
            }
            if(nr == 2)
            {
                pStat.setString(2, name);
            }

        }
         */
        //Wir erstellen aus jeden eintrag den wir aus der Datenbank bekommen ein eigenes shop object
        //und speichern es in die Liste
        //Query wird executed und kommt auf die Klasse ResultSet (rs) drauf gespeichert
        ResultSet rs = pStat.executeQuery();
        System.out.println("FIRE!");

        System.out.println(pStat.toString());

        //Die gesamte Tabelle wird durchsucht
        while (rs.next()) {
            long id = rs.getLong("id");
            float lon = rs.getFloat("lon");
            float lat = rs.getFloat("lat");
            String catego = rs.getString("shoptype");
            String city = rs.getString("city");
            String shopname = rs.getString("name");
            String postcode = rs.getString("postcode");
            String street = rs.getString("street");
            String housenumber = rs.getString("housenumber");
            String website = rs.getString("website");
            String email = rs.getString("email");
            String phone = rs.getString("phone");

            Shop shop = new Shop(id, lon, lat, catego, city, shopname, postcode, street, housenumber, website, email, phone);

            shopList.add(shop);
        }
        return shopList;
    }

    public List<Shop> filterShops(String sid) throws SQLException {

        String sqlString = "SELECT * FROM shop WHERE id = ?";

        List<Shop> shopList = new ArrayList<>();

        PreparedStatement pStat = db.getCon().prepareStatement(sqlString);

        
        pStat.setLong(1, Long.parseLong(sid));
        System.out.println(pStat.toString());
        //Wir erstellen aus jeden eintrag den wir aus der Datenbank bekommen ein eigenes shop object
        //und speichern es in die Liste
        //Query wird executed und kommt auf die Klasse ResultSet (rs) drauf gespeichert
        ResultSet rs = pStat.executeQuery();

        System.out.println(pStat.toString());

        //Die gesamte Tabelle wird durchsucht
        while (rs.next()) {
            long id = rs.getLong("id");
            float lon = rs.getFloat("lon");
            float lat = rs.getFloat("lat");
            String catego = rs.getString("shoptype");
            String city = rs.getString("city");
            String shopname = rs.getString("name");
            String postcode = rs.getString("postcode");
            String street = rs.getString("street");
            String housenumber = rs.getString("housenumber");
            String website = rs.getString("website");
            String email = rs.getString("email");
            String phone = rs.getString("phone");

            Shop shop = new Shop(id, lon, lat, catego, city, shopname, postcode, street, housenumber, website, email, phone);

            shopList.add(shop);
        }
        return shopList;
    }

    public static void main(String[] args) {
        DB_Access dba = null;
        try {
            dba = new DB_Access();
            //Add new shop to database
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
            return;
        }

        /*
        Shop shop = new Shop(15.4700f,47.0590f,"supermarkt","Graz","IT-Shop","8010","Hugo Wolfgasse","10","","","");
        try{
            // dba.addShop(shop);
            // dba.deleteShop("IT-Shop","Hugo Wolfgasse","10");
            // shop.setEmail("random@email.com");
            // dba.updateShop(shop);
            List<Shop> shopList = dba.filterShops("supermarket","Billa",null);
            for (Shop shop1: shopList) {
                System.out.println(shop1);
            }
            System.out.println(shopList.size());
        }catch (Exception e)
        {
            System.out.println(e.toString());
            e.printStackTrace();
        }
         */
    }
}
