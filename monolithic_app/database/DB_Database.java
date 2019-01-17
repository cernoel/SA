package database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class DB_Database implements DB_Config {
    private Connection con = null;

    public DB_Database() throws SQLException{
            con = DriverManager.getConnection("jdbc:postgresql://"+DB_HOST+"/"+DB_NAME,DB_USER,DB_PASSWD);
    }
    
    public Connection getCon() {
        return con;
    }
    
    public ResultSet fireExecuteQuery(String statement) throws SQLException
    {
        Statement stmt = null;
        ResultSet resultset = null;
        stmt = this.con.createStatement();
        resultset = stmt.executeQuery(statement);
        return resultset;
    }
}
