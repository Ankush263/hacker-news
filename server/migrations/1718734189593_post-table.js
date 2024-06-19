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
    CREATE TYPE post_types AS ENUM ('post', 'show', 'ask');

    CREATE TABLE posts (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      user_id INTEGER REFERENCES users(id),
      by VARCHAR(30) REFERENCES users(username),
      type post_types DEFAULT 'post',
      title VARCHAR(200),
      text VARCHAR(2000),
      url VARCHAR(50),
      score INTEGER NOT NULL DEFAULT 0,
      descendants INTEGER NOT NULL DEFAULT 0
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
    DROP TYPE post_types;
    DROP TABLE posts;
    `
	);
};
