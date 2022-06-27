import * as dotenv from "dotenv";
dotenv.config();


export default () => ({
    database: {
        dialect: 'mysql',
        host: process.env.DEV_DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DEV_DATABASE_PORT, 10) || 3306,
        username: process.env.DEV_DATABASE_USERNAME || 'root',
        password: process.env.DEV_DATABASE_PASSWORD || '',
        database: process.env.DEV_DATABASE_NAME || '',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'secret',
    },
});
