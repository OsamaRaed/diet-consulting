// import * as dotenv from "dotenv";
const dotenv = require("dotenv");
dotenv.config();

console.log("test env");
module.exports = {
    dialect: 'mysql',
    host: process.env.PROD_DATABASE_HOST || 'localhost',
    port: parseInt(process.env.PROD_DATABASE_PORT, 10) || 5432,
    username: process.env.PROD_DATABASE_USERNAME || 'root',
    password: process.env.PROD_DATABASE_PASSWORD || '',
    database: process.env.PROD_DATABASE_NAME || '',
}