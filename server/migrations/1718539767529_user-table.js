/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
	pgm.sql(
		`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      username VARCHAR(30) NOT NULL UNIQUE,
      email VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(50) NOT NULL CHECK (LENGTH(password) >= 8),
      karma INTEGER NOT NULL DEFAULT 0,
      about VARCHAR(600)
    );
    `
	);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
	pgm.sql(
		`
    DROP TABLE users;
    `
	);
};
