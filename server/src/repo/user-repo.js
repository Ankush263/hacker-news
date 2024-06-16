const pool = require('../pool');
const toCamelCase = require('./utils/to-camel-case');

class UserRepo {
	static async create(username, email, password) {
		const { rows } = await pool.query(
			`
      INSERT INTO users(username, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
			[username, email, password]
		);
		return toCamelCase(rows)[0];
	}

	static async find() {
		const { rows } = await pool.query('SELECT * FROM users');
		return toCamelCase(rows);
	}

	static async findByEmail(email) {
		const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [
			email,
		]);
		return toCamelCase(rows);
	}

	static async findByUsername(username) {
		const { rows } = await pool.query(
			'SELECT * FROM users WHERE username = $1',
			[username]
		);
		return toCamelCase(rows);
	}

	static async findById(id) {
		const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [
			id,
		]);
		return toCamelCase(rows)[0];
	}

	static async findByIdAndUpdate(id, username, email) {
		const { rows } = await pool.query(
			`
    UPDATE users
    SET
      username = COALESCE($2, username),
      email = COALESCE($3, email)
    WHERE id = $1
		RETURNING *;
    `,
			[id, username, email]
		);
		return toCamelCase(rows)[0];
	}
}

module.exports = UserRepo;
