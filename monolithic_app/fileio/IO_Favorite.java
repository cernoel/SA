/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fileio;

import beans.Favorite;
import java.io.IOException;
import org.json.simple.JSONArray;
import java.util.ArrayList;
import java.util.List;
import org.json.simple.JSONObject;

/**
 *
 * @author plex
 */
public class IO_Favorite {

    public IO_Favorite() {
    }

    public List<Favorite> getFavorites() {
        JSON_IO favorites_file = new JSON_IO("favorite.json");
        JSONArray favorites = favorites_file.getJSONArray();
        List<Favorite> favoritesList = new ArrayList<>();

        if (favorites.isEmpty()) {
            System.out.println("No entries in favourites or fresh file!");
        } else {
            for (Object o : favorites) {
                if (o instanceof JSONObject) {
                    String entryname = "";
                    String poiid = "";
                    Integer POIIndex = 0;
                    String searchstring = "";
                    String category = "";
                    String comment = "";
                    int meters = 100;
                    try {
                        String sMeters = ((JSONObject) o).get("meters").toString();
                        meters = Integer.parseInt(sMeters);
                    } catch (NullPointerException ex) {
                        // is ma wuascht 
                    }

                    try {
                        entryname = ((JSONObject) o).get("entryname").toString();
                    } catch (NullPointerException ex) {
                        // is ma wuascht 
                    }

                    try {
                        poiid = ((JSONObject) o).get("poiid").toString();
                    } catch (NullPointerException ex) {
                        // is ma wuascht 
                    }
                    
                     try {
                       POIIndex = Integer.parseInt(((JSONObject) o).get("POIIndex").toString());
                       
                    } catch (NullPointerException ex) {
                        // is ma wuascht 
                    }

                    try {
                        searchstring = ((JSONObject) o).get("searchstring").toString();
                    } catch (NullPointerException ex) {
                        // is ma wuascht 
                    }

                    try {
                        category = ((JSONObject) o).get("category").toString();
                    } catch (NullPointerException ex) {
                        // is ma wuascht 
                    }

                    try {
                        comment = ((JSONObject) o).get("comment").toString();
                    } catch (NullPointerException ex) {
                        // is ma wuascht 
                    }

                    if (entryname.isEmpty()) {
                        break; // ignore it.
                    }

                    Favorite favorite = new Favorite(
                            entryname,
                            POIIndex,
                            searchstring,
                            category,
                            comment,
                            meters
                    );
                    favoritesList.add(favorite);

                }
            }
        }

        return favoritesList;
    }

    public void saveFavorites(List<Favorite> favoritesList) {
        JSON_IO favorites_file = new JSON_IO("favorite.json");
        JSONArray json_favorites = new JSONArray();

        for (final Favorite favorite : favoritesList) {
            JSONObject jobj = new JSONObject();
            jobj.put("entryname", favorite.getEntryname());
            jobj.put("searchstring", favorite.getSearchstring());
            jobj.put("POIIndex", favorite.getPOIIndex());

//            jobj.put("poiid", favorite.getPoiid());
            jobj.put("meters", favorite.getMeters());
            jobj.put("category", favorite.getCategory());
            jobj.put("comment", favorite.getComment());
            json_favorites.add(jobj);
        }

        favorites_file.writeJSONfile(json_favorites);
        //TODO: More error handling

        return;
    }
}
