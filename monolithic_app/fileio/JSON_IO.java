/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fileio;

import org.json.simple.*;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class JSON_IO {

    private String filepath = "";
    JSONArray jsonarray = null;

    public JSONArray getJSONArray() {
        return jsonarray;
    }

    public JSON_IO() throws IllegalArgumentException {
        this("favorites.json");
    }

    public JSON_IO(String filepath) throws IllegalArgumentException {

        this.filepath = filepath;

        File f = new File(filepath);
        OutputStreamWriter writer = null;
        // if file is no existend, create a new one.. 
        if (!f.isFile()) {
            try {
                writer = new OutputStreamWriter(new FileOutputStream(filepath), StandardCharsets.UTF_8);
            } catch (FileNotFoundException fnfex) {
                throw new IllegalArgumentException(fnfex.getMessage());
            }

            try {
                writer.append("[]");
            } catch (IOException ioex) {
                throw new IllegalArgumentException(ioex.getMessage());
            }

            try {
                writer.close();
            } catch (IOException ioex) {
                throw new IllegalArgumentException(ioex.getMessage());
            }

            writer = null;

        }

        try {
            jsonarray = this.readJSONFile();
        } catch (IOException ioex) {
            throw new IllegalArgumentException(ioex.getMessage());
        }

    }

    private static String readTextfileToString(String filepath) throws IOException {

        // Check if file exists
        File f = new File(filepath);
        if (!f.isFile()) {
            return "";
        }

        // https://www.mkyong.com/java/how-to-read-utf-8-encoded-data-from-a-file-java/
        BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(filepath), "UTF8"));
        String line = null;
        StringBuilder stringBuilder = new StringBuilder();
        String ls = System.getProperty("line.separator");

        try {
            while ((line = reader.readLine()) != null) {
                stringBuilder.append(line);
                stringBuilder.append(ls);
            }
        } catch (UnsupportedEncodingException e) {
            System.out.println(e.getMessage());
        } catch (IOException e) {
            System.out.println(e.getMessage());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        } finally {
            reader.close();
        }

        // returns that String
        return stringBuilder.toString();
    }

    private static void writeStringToTextfile(String filepath, String input) {

        //https://stackoverflow.com/questions/1001540/how-to-write-a-utf-8-file-with-java
        OutputStreamWriter writer = null;
        try {
            writer = new OutputStreamWriter(new FileOutputStream(filepath), StandardCharsets.UTF_8);
        } catch (FileNotFoundException fnfex) {
            // TODO Auto-generated catch block
            fnfex.printStackTrace();
        }

        try {

            writer.write(input);
        } catch (IOException e) {
            System.out.println("Exception ");

        } finally {
            try {
                writer.close();
            } catch (IOException ioex) {
                // TODO Auto-generated catch block
                ioex.printStackTrace();
            }
        }
    }

    private static JSONArray readStringToJSONObject(String string) {
        JSONParser parser = new JSONParser();
        JSONArray jarr = null;
        try {
            jarr = (JSONArray) parser.parse(string);
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            // chat exception!
            e.printStackTrace();
        }

        return jarr;
    }

    public JSONArray readJSONFile() throws IOException {
        JSONArray jarr = null;

        try {
            jarr = readStringToJSONObject(readTextfileToString(filepath));
        } catch (IOException e) {
            e.printStackTrace();
        }

        return jarr;

    }

    public void writeJSONfile(Object jsonobject)
    {
        writeStringToTextfile(filepath, jsonobject.toString());
    }
    
    public void writeJSONfile(String filepath, Object jsonobject)
    {
        writeStringToTextfile(filepath, jsonobject.toString());
    }
    
    public static void main(String[] argv) throws IOException {

        JSON_IO jsonio = new JSON_IO();
        JSONArray favorites = jsonio.getJSONArray();

        if (favorites.isEmpty()) {
            System.out.println("No entries in favourites or fresh file!");
        } else {
            for (Object o : favorites) {
                if (o instanceof JSONObject) {
                    // print out all entry names... 
                    System.out.println(((JSONObject) o).get("entry").toString() + "|" + ((JSONObject) o).get("categories"));
                }
            }
        }

        /*
		String out = readTextfileToString("favourites.json");
		System.out.println(out);
		JSONArray jarr = readStringToJSONObject(out);
		
		for(Object o: jarr){
		    if ( o instanceof JSONObject ) {
		    	// print out all entry names... 
		    	System.out.println(((JSONObject) o).get("entry")); 
		    }
		}
		writeJSONtoTextfile("test2.json", jarr);
         */
    }

}
