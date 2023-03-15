"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = __importDefault(require("mssql"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    server: process.env.SERVERDB,
    database: process.env.DATABASE,
    user: process.env.USERDB,
    password: process.env.PASSWORDDB,
    options: {
        TrustServerCertificate: true,
        encrypt: false
    }
};
exports.default = {
    name: 'dbConnection',
    execute: () => {
        let connection = new mssql_1.default.ConnectionPool(config, (err) => {
            if (err)
                console.log(err);
            return;
        });
        return connection.connect();
    }
};
