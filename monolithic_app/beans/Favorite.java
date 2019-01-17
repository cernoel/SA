/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package beans;

/**
 *
 * @author plex
 */
public class Favorite {

    private String entryname = "";
    private String searchstring = "";
    private String poiid = "";
    private int POIIndex = 0;
    private int meters = 0;
    private String category = "";
    private String comment = "";

    // Chaining, cause in Java we have no optionals..
    //habe überall pooid rausgelöscht
   public Favorite(String name,Integer POIIndex) {
        this(name, POIIndex, "");
    }

    public Favorite(String name,Integer POIIndex, String searchstring) {
        this(name,POIIndex, searchstring,"");
    }

    public Favorite(String name, Integer POIIndex, String searchstring, String category) {
        this(name, POIIndex, searchstring, category, "");
    }

    public Favorite(String name, Integer POIIndex, String searchstring, String category, String comment) {
        this(name, POIIndex, searchstring, category, comment, 100);
    }

    public Favorite(String name,Integer POIIndex, String searchstring, String category, String comment, int meters) {
        this.entryname = name;
        this.POIIndex = POIIndex;
        this.meters = meters;
        this.searchstring = searchstring;
        this.category = category;
        this.comment = comment;
    }   

   /* public String getPoiid() {
        return poiid;
    }
*/    public int getPOIIndex()
    {
        return POIIndex;
    }

    public int getMeters() {
        return meters;
    }

    public String getComment() {
        return comment;
    }

    public String getEntryname() {
        return entryname;
    }

    public String getSearchstring() {
        return searchstring;
    }

    public String getCategory() {
        return category;
    }

}
