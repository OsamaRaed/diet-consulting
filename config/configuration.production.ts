import * as dotenv from "dotenv";
dotenv.config();

export default () => ({
    database: {
        dialect: 'mysql',
        host: process.env.PROD_DATABASE_HOST || 'localhost',
        port: parseInt(process.env.PROD_DATABASE_PORT, 10) || 5432,
        username: process.env.PROD_DATABASE_USERNAME || 'root',
        password: process.env.PROD_DATABASE_PASSWORD || '',
        database: process.env.PROD_DATABASE_NAME || '',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'secret',
    },
});
