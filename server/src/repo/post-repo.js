const pool = require('../pool');
const toCamelCase = require('./utils/to-camel-case');

class PostRepo {
	static async create(user_id, username, type, title, text, url) {
		const { rows } = await pool.query(
			`
        INSERT INTO posts(user_id, by, type, title, text, url)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `,
			[user_id, username, type, title, text, url]
		);
		return toCamelCase(rows)[0];
	}

	static async find() {
		const { rows } = await pool.query('SELECT * FROM posts');
		return toCamelCase(rows);
	}

	static async findById(id) {
		const { rows } = await pool.query('SELECT * FROM posts WHERE id = $1', [
			id,
		]);
		return toCamelCase(rows)[0];
	}

	static async findAllPostDesc() {
		const { rows } = await pool.query(
			'SELECT id, by, title, url, score, descendants FROM posts ORDER BY -score'
		);
		return toCamelCase(rows);
	}

	static async findAllNewPosts() {
		const { rows } = await pool.query(
			'SELECT id, created_at, by, title, url, score, descendants FROM posts ORDER BY created_at DESC'
		);
		return toCamelCase(rows);
	}

	static async findTypePosts(type) {
		const { rows } = await pool.query(
			'SELECT id, created_at, by, title, text, url, score, descendants FROM posts WHERE type = $1',
			[type]
		);
		return toCamelCase(rows);
	}

	static async findByIdAndDelete(id) {
		const { rows } = await pool.query(
			`
				DELETE FROM posts
				WHERE id = $1
			`,
			[id]
		);
		return toCamelCase(rows)[0];
	}

	static async increaseDescendants(id) {
		const { rows } = await pool.query(
			`
				UPDATE posts
				SET 
					descendants = descendants + 1
				WHERE id = $1
				RETURNING *
			`,
			[id]
		);
		return toCamelCase(rows)[0];
	}

	static async findByIdAndUpdate(id, title, text, url) {
		console.log(id, title, text, url);
		const { rows } = await pool.query(
			`
    UPDATE posts
    SET
      title = COALESCE($2, title),
      text = COALESCE($3, text),
      url = COALESCE($4, url)
    WHERE id = $1
		RETURNING *;
    `,
			[id, title, text, url]
		);
		return toCamelCase(rows)[0];
	}

	static async decreaseDescendants(id) {
		const { rows } = await pool.query(
			`
				UPDATE posts
				SET 
					descendants = descendants - 1
				WHERE id = $1
				RETURNING *
			`,
			[id]
		);
		return toCamelCase(rows)[0];
	}

	static async increaseScore(id) {
		const { rows } = await pool.query(
			`
				UPDATE posts
				SET 
					score = score + 1
				WHERE id = $1
				RETURNING *
			`,
			[id]
		);
		return toCamelCase(rows)[0];
	}

	static async decreaseScore(id) {
		const { rows } = await pool.query(
			`
				UPDATE posts
				SET 
					score = score - 1
				WHERE id = $1
				RETURNING *
			`,
			[id]
		);
		return toCamelCase(rows)[0];
	}
}

module.exports = PostRepo;
