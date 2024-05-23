import mysql from "mysql2/promise";
import { RowDataPacket } from "mysql2";

export const executeQuery = async (query: string, values?: any[]) : Promise<RowDataPacket[]> => {
    const dbConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DBNAME
    };

    const dbConnection = await mysql.createConnection(dbConfig);

    try {
        const [rows] = await  dbConnection.execute<RowDataPacket[]>(query,values);
        dbConnection.end();
        return rows;
    } catch (error) {
        throw error;
    } 
    
};