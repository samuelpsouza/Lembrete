module.exports = {
    development: {
        username: process.env.DEV_DB_USERNAME,
        password: process.env.DEV_DB_PASSWORD,
        database: process.env.DEV_DB_DATABASE,
        host: process.env.DEV_DB_HOSTNAME,
        dialect: 'postgres',
    },
    test: {
        username: process.env.TEST_DB_USERNAME,
        password: process.env.TEST_DB_PASSWORD,
        database: process.env.TEST_DB_DATABASE,
        host: process.env.DB_HOSTNAME,
        dialect: 'postgres',
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.PROD_DB_DATABASE,
        host: process.env.DB_HOSTNAME,
        dialect: 'postgres',
    }
};