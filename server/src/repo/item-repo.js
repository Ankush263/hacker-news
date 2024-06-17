const pool = require('../pool');
const toCamelCase = require('./utils/to-camel-case');

class ItemRepo {
	static async create(user_id, username, type, title, text, url, poll, parent) {
		const { rows } = await pool.query(
			`
        INSERT INTO items(user_id, by, type, title, text, url, poll, parent)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
      `,
			[user_id, username, type, title, text, url, poll, parent]
		);
		return toCamelCase(rows)[0];
	}

	static async find() {
		const { rows } = await pool.query('SELECT * FROM items');
		return toCamelCase(rows);
	}

	static async findById(id) {
		const { rows } = await pool.query('SELECT * FROM items WHERE id = $1', [
			id,
		]);
		return toCamelCase(rows)[0];
	}

	static async findByIdAndDelete(id) {
		const { rows } = await pool.query(
			`
				DELETE FROM items
				WHERE id = $1
			`,
			[id]
		);
		return toCamelCase(rows)[0];
	}

	static async increaseDescendants(id) {
		const { rows } = await pool.query(
			`
				UPDATE items
				SET 
					descendants = descendants + 1
				WHERE id = $1
				RETURNING *
			`,
			[id]
		);
		return toCamelCase(rows)[0];
	}

	static async decreaseDescendants(id) {
		const { rows } = await pool.query(
			`
				UPDATE items
				SET 
					descendants = descendants - 1
				WHERE id = $1
				RETURNING *
			`,
			[id]
		);
		return toCamelCase(rows)[0];
	}
}

module.exports = ItemRepo;
