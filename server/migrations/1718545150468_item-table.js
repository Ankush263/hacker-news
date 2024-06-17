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
    CREATE TYPE item_types AS ENUM ('comment', 'post', 'story', 'job', 'poll', 'pollopt');

    CREATE TABLE items (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      user_id INTEGER REFERENCES users(id),
      by VARCHAR(30) REFERENCES users(username),
      type item_types DEFAULT 'post',
      title VARCHAR(200),
      text VARCHAR(2000),
      url VARCHAR(50),
      poll VARCHAR(300),
      parent INTEGER REFERENCES items(id),
      kids INTEGER[],
      parts INTEGER[],
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
    DROP TYPE item_types;
    DROP TABLE posts;
    `
	);
};
