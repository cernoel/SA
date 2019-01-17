/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ui;

import beans.Favorite;
import beans.Poi;
import database.DB_Access;
import fileio.IO_Favorite;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 *
 * @author plex
 */
public class window_favorite_editor extends javax.swing.JFrame {

    private List<Favorite> favoritesList = null;
    List<Poi> PointOfInterest = new ArrayList<>();
   // private List<> test = ne
    /**
     * Creates new form window_favorite_editor
     */
    public window_favorite_editor() {
        window_favorite_editor("");
    }

    public void window_favorite_editor(String favorite) {
        initComponents();
        cmbFavorites.removeAllItems();
        cmbCategory.removeAllItems();

        // Fill favorites Combobox
        IO_Favorite io = new IO_Favorite(); // defaults to favorites.json
        favoritesList = io.getFavorites();

        for (Favorite fav : favoritesList) {
            cmbFavorites.addItem(fav.getEntryname());
        }

        fillcmbCategories();

        selectCategory(0);

        txtComment.setText("");
        txtDistance.setText("");
//        txtPoiid.setText("");
        txtSearchString.setText("");

        this.setLocationRelativeTo(null); // sets windows into the midst of the screen
    }

    public window_favorite_editor(Integer poiid,String PoiName, String searchstring, String category, int distance, String comment) {
        initComponents();
        cmbFavorites.removeAllItems();
        cmbCategory.removeAllItems();
        

        // Fill favorites Combobox
        IO_Favorite io = new IO_Favorite(); // defaults to favorites.json
        favoritesList = io.getFavorites();

        cmbFavorites.addItem("");
        for (Favorite fav : favoritesList) {
            cmbFavorites.addItem(fav.getEntryname());
        }
        
       /* for (Favorite fav : favoritesList){
            
        }*/
        fillcmbPOIs();
        fillcmbCategories();

        selectCategory(0);

        cmbFavorites.getEditor().setItem("");
        cmbPOI.setSelectedIndex(poiid);
//  txtPoiid.setText(poiid);
        txtSearchString.setText(searchstring);
        selectCategory(category);
        txtDistance.setText(Integer.toString(distance));
        txtComment.setText(comment);

        this.setLocationRelativeTo(null); // sets windows into the midst of the screen

    }

    private boolean selectFavorite(String favorite) {
        for (int i = 1; i < cmbFavorites.getItemCount(); i++) {
            if (favorite.equals(cmbFavorites.getItemAt(i))) {
                cmbFavorites.setSelectedIndex(i);
                return true;
            }
        }
        // TODO: empty entry?
        cmbFavorites.setSelectedIndex(0);
        return false;
    }

    private void selectCategory(int index) {
        cmbCategory.setSelectedIndex(index);
    }

    private boolean selectCategory(String category) {
        for (int i = 1; i < cmbCategory.getItemCount(); i++) {
            if (category.equals(cmbCategory.getItemAt(i))) {
                cmbCategory.setSelectedIndex(i);
                return true;
            }
        }
        // TODO: empty entry?
        cmbCategory.setSelectedIndex(0);
        return false;
    }

    private void fillcmbPOIs() {
        DB_Access db = null;
        try {
            db = new DB_Access();
        } catch (SQLException ex) {
            simple_dialog.infoBox("Problem mit Datenbankverbindung!");
        }

        try {
            PointOfInterest = db.getAllPOIs();
        } catch (SQLException ex) {
            simple_dialog.infoBox("Fehler beim lesen der POIs!");
        }

        // We do this, because we dont know if there aren't double entries.
        // so we store a counter, which should be the same es the combobox id
        cmbPOI.removeAllItems();
        cmbPOI.addItem("");
        int i = 1;
        for (Poi poi : PointOfInterest) {
            poi.setCounter(i);
            cmbPOI.addItem(poi.getName());
            i++;
        }
    }
    
    
    private void fillcmbCategories() {
        DB_Access db = null;
        try {
            db = new DB_Access();
        } catch (SQLException ex) {
            simple_dialog.infoBox("Problem mit Datenbankverbindung!");
        }

        List<String> categories = new ArrayList<>();

        try {
            categories = db.getAllCategories();
        } catch (SQLException ex) {
            simple_dialog.infoBox("Fehler beim lesen der Kategorien!");
        }

        Collections.sort(categories); // Sort list

        cmbCategory.addItem(""); // Empty Item
        for (String cat : categories) {
            cmbCategory.addItem(cat);
        }
    }

    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        cmbFavorites = new javax.swing.JComboBox<>();
        txtSearchString = new javax.swing.JTextField();
        txtDistance = new javax.swing.JTextField();
        cmbCategory = new javax.swing.JComboBox<>();
        txtComment = new javax.swing.JTextField();
        btnDelete = new javax.swing.JButton();
        btnSave = new javax.swing.JButton();
        btnSelect = new javax.swing.JButton();
        jPanel1 = new javax.swing.JPanel();
        jLabel1 = new javax.swing.JLabel();
        jLabel2 = new javax.swing.JLabel();
        jLabel3 = new javax.swing.JLabel();
        jLabel4 = new javax.swing.JLabel();
        jLabel5 = new javax.swing.JLabel();
        jLabel6 = new javax.swing.JLabel();
        cmbPOI = new javax.swing.JComboBox<>();

        setDefaultCloseOperation(javax.swing.WindowConstants.DISPOSE_ON_CLOSE);

        cmbFavorites.setEditable(true);
        cmbFavorites.setModel(new javax.swing.DefaultComboBoxModel<>(new String[] { "Item 1", "Item 2", "Item 3", "Item 4" }));

        txtSearchString.setText("SuchString");

        txtDistance.setText("Distance in Meters");

        cmbCategory.setModel(new javax.swing.DefaultComboBoxModel<>(new String[] { "Item 1", "Item 2", "Item 3", "Item 4" }));

        txtComment.setText("Comment");

        btnDelete.setText("Löschen");
        btnDelete.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                btnDeleteMouseClicked(evt);
            }
        });

        btnSave.setText("Änderung speichern");
        btnSave.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                btnSaveMouseClicked(evt);
            }
        });
        btnSave.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnSaveActionPerformed(evt);
            }
        });

        btnSelect.setText("Favorit bearbeiten");
        btnSelect.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                btnSelectMouseClicked(evt);
            }
        });

        javax.swing.GroupLayout jPanel1Layout = new javax.swing.GroupLayout(jPanel1);
        jPanel1.setLayout(jPanel1Layout);
        jPanel1Layout.setHorizontalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 528, Short.MAX_VALUE)
        );
        jPanel1Layout.setVerticalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 0, Short.MAX_VALUE)
        );

        jLabel1.setText("Favorit");

        jLabel2.setText("Suchstring");

        jLabel3.setText("Point of Interest");

        jLabel4.setText("Distanz (Meter)");

        jLabel5.setText("Kategorie");

        jLabel6.setText("Kommentar");

        cmbPOI.setModel(new javax.swing.DefaultComboBoxModel<>(new String[] { "Item 1", "Item 2", "Item 3", "Item 4" }));
        cmbPOI.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                cmbPOIActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING, false)
                            .addGroup(javax.swing.GroupLayout.Alignment.LEADING, layout.createSequentialGroup()
                                .addComponent(jLabel1)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                .addComponent(cmbFavorites, javax.swing.GroupLayout.PREFERRED_SIZE, 447, javax.swing.GroupLayout.PREFERRED_SIZE))
                            .addComponent(jPanel1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addGap(0, 160, Short.MAX_VALUE))
                    .addComponent(btnSelect, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addGroup(layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(jLabel2)
                            .addComponent(jLabel3)
                            .addComponent(jLabel4)
                            .addComponent(jLabel5)
                            .addComponent(jLabel6))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(layout.createSequentialGroup()
                                .addComponent(btnDelete, javax.swing.GroupLayout.PREFERRED_SIZE, 107, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                .addComponent(btnSave, javax.swing.GroupLayout.PREFERRED_SIZE, 168, javax.swing.GroupLayout.PREFERRED_SIZE))
                            .addGroup(layout.createSequentialGroup()
                                .addGap(12, 12, 12)
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addComponent(txtSearchString)
                                    .addComponent(txtDistance)
                                    .addComponent(txtComment)
                                    .addComponent(cmbCategory, 0, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                    .addComponent(cmbPOI, 0, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))))))
                .addContainerGap())
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGap(22, 22, 22)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(cmbFavorites, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jLabel1))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(btnSelect)
                .addGap(18, 18, 18)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(txtSearchString, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jLabel2))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel3)
                    .addComponent(cmbPOI, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(txtDistance, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jLabel4))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel5, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(cmbCategory, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(txtComment, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jLabel6))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(btnDelete)
                    .addComponent(btnSave))
                .addGap(61, 61, 61)
                .addComponent(jPanel1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addContainerGap())
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void btnSelectMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_btnSelectMouseClicked

        // selects also the entered text
        String selected = cmbFavorites.getEditor().getItem().toString();

        boolean Favfound = false;

        for (final Favorite favorite : favoritesList) {
            if (favorite.getEntryname().equals(selected)) {
                Favfound = true;

                txtSearchString.setText(favorite.getSearchstring());
//                txtPoiid.setText(favorite.getPoiid());
                txtDistance.setText(Integer.toString(favorite.getMeters()));

                if (!favorite.getCategory().isEmpty()) {
                    if (selectCategory(favorite.getCategory()) == false) {
                        simple_dialog.infoBox("Kategorie existiert nicht in der Datenbank. Abfrage ergibt somit keine Ergebnisse. "
                                + "Entweder Kategorie ändern oder Eintrag löschen!");
                    }
                } else {
                    selectCategory("");
                }

                txtComment.setText(favorite.getComment());
                break;
            }

        }
        if (Favfound == false) {
            simple_dialog.infoBox("Favorit '" + selected + "' existiert nicht in den Favoriten. Um ihn anzulegen, einfach auf speichern klicken!");
        }

    }//GEN-LAST:event_btnSelectMouseClicked

    private void btnDeleteMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_btnDeleteMouseClicked
        // TODO add your handling code here:

        if (simple_dialog.yesNoBox("Tatsächlich löschen?") == false) {
            simple_dialog.infoBox("Nix passiert.");
            return;
        }

        String selected = cmbFavorites.getEditor().getItem().toString();

        for (final Favorite favorite : favoritesList) {
            if (favorite.getEntryname().equals(selected)) {
                favoritesList.remove(favorite);
                break;
            }
        }

        // Refresh entries
        cmbFavorites.removeAllItems();
        for (final Favorite favorite : favoritesList) {
            cmbFavorites.addItem(favorite.getEntryname());
        }
        txtSearchString.setText("");
//        txtPoiid.setText("");
        txtDistance.setText("");
        if (cmbCategory.getItemCount() > 0) {
            cmbCategory.setSelectedIndex(0);
        }
        txtComment.setText("");
        simple_dialog.infoBox("Eintrag gelöscht.");

        IO_Favorite io = new IO_Favorite(); // defaults to favorites.json
        io.saveFavorites(favoritesList);

    }//GEN-LAST:event_btnDeleteMouseClicked

    private void btnSaveMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_btnSaveMouseClicked
        // TODO add your handling code here:

        String entryname = cmbFavorites.getEditor().getItem().toString();
        //String poiid = txtPoiid.getText();
        String searchstring = txtSearchString.getText();
        String category = cmbCategory.getItemAt(cmbCategory.getSelectedIndex());
        String comment = txtComment.getText();
        Integer POIIndex = cmbPOI.getSelectedIndex();
        
        // if entry exists
        if (cmbFavorites.getEditor().getItem().toString().isEmpty()) {
            simple_dialog.infoBox("Achtung leerer Name! Bitte einen Namen eingeben!");
            return;
        }

        for (final Favorite favorite : favoritesList) {
            if (favorite.getEntryname().equals(entryname)) {
                if (simple_dialog.yesNoBox("Eintrag existiert bereits, überschreiben?") == false) {
                    simple_dialog.infoBox("Speichern abgebrochen.");
                    return;
                }
                favoritesList.remove(favorite);
                break;
            }
           
        }

        //TODO: more error handling? 
        int meters = Integer.parseInt(txtDistance.getText());
        Favorite fav = new Favorite(entryname, POIIndex, searchstring, category,
                comment, meters);
        favoritesList.add(fav);
        IO_Favorite io = new IO_Favorite(); // defaults to favorites.json
        io.saveFavorites(favoritesList);
        // cleanup
        cmbFavorites.removeAllItems();
        for (final Favorite favorite : favoritesList) {
            cmbFavorites.addItem(favorite.getEntryname());
        }
       
        selectFavorite(entryname);

        // TODO: select saved item in cmb!
        simple_dialog.infoBox("Gespeichert!");
        
        
     
    }//GEN-LAST:event_btnSaveMouseClicked

    private void btnSaveActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnSaveActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_btnSaveActionPerformed

    private void cmbPOIActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_cmbPOIActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_cmbPOIActionPerformed

    /**
     * @param args the command line arguments
     */
    public static void main(String args[]) {
        /* Set the Nimbus look and feel */
        //<editor-fold defaultstate="collapsed" desc=" Look and feel setting code (optional) ">
        /* If Nimbus (introduced in Java SE 6) is not available, stay with the default look and feel.
         * For details see http://download.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html 
         */
        try {
            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (ClassNotFoundException ex) {
            java.util.logging.Logger.getLogger(window_favorite_editor.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(window_favorite_editor.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(window_favorite_editor.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(window_favorite_editor.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>

        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new window_favorite_editor().setVisible(true);
            }
        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton btnDelete;
    private javax.swing.JButton btnSave;
    private javax.swing.JButton btnSelect;
    private javax.swing.JComboBox<String> cmbCategory;
    private javax.swing.JComboBox<String> cmbFavorites;
    private javax.swing.JComboBox<String> cmbPOI;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JLabel jLabel5;
    private javax.swing.JLabel jLabel6;
    private javax.swing.JPanel jPanel1;
    private javax.swing.JTextField txtComment;
    private javax.swing.JTextField txtDistance;
    private javax.swing.JTextField txtSearchString;
    // End of variables declaration//GEN-END:variables

}
