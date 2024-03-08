import mysql from "mysql2/promise";

export const executeQuery = async (query: string, values?: any[]) => {
    const dbConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DBNAME
    };

    const dbConnection = await mysql.createConnection(dbConfig);

    try {
        const [rows] = await  dbConnection.execute(query,values);
        dbConnection.end();
        return rows;
    } catch (error) {
        throw error;
    } 
    
};