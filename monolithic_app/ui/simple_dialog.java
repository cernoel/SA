/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ui;

import javax.swing.JOptionPane;

/**
 *
 * @author plex
 */
public class simple_dialog {

    public static void infoBox(String infoMessage) {
        String titleBar = "Info!";
        JOptionPane.showMessageDialog(null, infoMessage, titleBar, JOptionPane.INFORMATION_MESSAGE);
    }

    public static boolean yesNoBox(String infoMessage) {
        String titleBar = "Yes No!";
        int answer = JOptionPane.showConfirmDialog(null, infoMessage, titleBar, JOptionPane.YES_NO_OPTION);

        if (answer == JOptionPane.YES_OPTION) {
            return true;
        } else {
            return false;
        }
    }
}
