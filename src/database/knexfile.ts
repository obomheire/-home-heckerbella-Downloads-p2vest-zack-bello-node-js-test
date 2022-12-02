import type { Knex } from "knex";
import dotenv from "dotenv";
dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql",
    connection: {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "Secret@123",
      database: "p2vest_db",
    },
    migrations: {
      tableName: "migrations",
      directory: "../../migrations",
    },
  },

  production: {
    client: "mysql",
    connection: {
      host: process.env.PRODUCTION_HOST,
      port: 3306,
      user: process.env.PRODUCTION_USERNAME,
      password: process.env.PRODUCTION_PASSWORD,
      database: process.env.PRODUCTION_DATABASE,
    },
    migrations: {
      tableName: "migrations",
      directory: "../../migrations",
    },
  },

  test: {
    client: "mysql",
    connection: {
      host: process.env.localhost,
      port: 3306,
      user: process.env.user,
      password: process.env.password,
      database: process.env.test_database,
    },
    migrations: {
      tableName: "migrations",
      directory: "../../migrations",
    },
  },
};

export default config;
