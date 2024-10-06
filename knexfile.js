require('dotenv');
module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DATABASE_HOSTNAME,
      user: process.env.DATABAE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }
};
