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
public class Poi {

    private String id;
    private String name;
    private int counter;

    public void setCounter(int counter) {
        this.counter = counter;
    }

    public int getCounter() {
        return counter;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Poi(String id, String name) {
        this.id = id;
        this.name = name;
    }

}
