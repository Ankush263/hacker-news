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
    CREATE TABLE comments (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      user_id INTEGER REFERENCES users(id),
      by VARCHAR(30) REFERENCES users(username),
      content VARCHAR(300) NOT NULL,
      post_id INTEGER REFERENCES posts(id),
      score INTEGER NOT NULL DEFAULT 0,
      parent_id INTEGER REFERENCES comments(id)
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
    DROP TABLE comments;
    `
	);
};
