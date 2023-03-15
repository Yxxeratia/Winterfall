import sql from 'mssql';
import dotenv from 'dotenv';
dotenv.config();

interface Config {
    server: string,
    database: string,
    user: string,
    password: string,
    options: {
        TrustServerCertificate: boolean,
        encrypt: boolean
    }
}

const config: Config = {
    server: process.env.SERVERDB!,
    database: process.env.DATABASE!,
    user: process.env.USERDB!,
    password: process.env.PASSWORDDB!,
    options: {
        TrustServerCertificate: true,
        encrypt: false
    }
};

export default {
    name: 'dbConnection',
    execute: () => {
        let connection = new sql.ConnectionPool(config, (err) => {
            if (err) console.log(err);
            return;
        })
        return connection.connect();   
    }
}