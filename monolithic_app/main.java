
import java.awt.EventQueue;
import ui.window_main;
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author plex
 */
public class main {
    public static void main(String[] args) {
		
		//But First.. Log In
		EventQueue.invokeLater(new Runnable() {
			@Override
			public void run() {
				try {
                                    window_main MainWindow = new window_main();
                                    MainWindow.show();
				} catch (Exception e) {
					e.printStackTrace();    
				}
			}
		});
			
	}
}
