const dotenv = require("dotenv").config();

const DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
const DATABASE_PORT = process.env.DATABASE_PORT || "3306";
const DATABASE_USER = process.env.DATABASE_USER || "antonio";
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "password_1234";
const DATABASE_NAME = process.env.DATABASE_NAME || "plataforma_db";

const knexConfig = {
  client: 'mysql',
  connection: {
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations'
  },
  seeds: {
    tableName: 'knex_seeds',
    directory: './seeds',
  }
}

module.exports = knexConfig;