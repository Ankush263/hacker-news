const pool = require('../pool');
const toCamelCase = require('./utils/to-camel-case');

class CommentRepo {
	static async create(user_id, username, content, post_id, parent_id) {
		const { rows } = await pool.query(
			`
      INSERT INTO comments(user_id, by, content, post_id, parent_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
      `,
			[user_id, username, content, post_id, parent_id]
		);
		return toCamelCase(rows)[0];
	}

	static async find() {
		const { rows } = await pool.query('SELECT * FROM comments');
		return toCamelCase(rows);
	}

	static async findById(id) {
		const { rows } = await pool.query('SELECT * FROM comments WHERE id = $1', [
			id,
		]);
		return toCamelCase(rows)[0];
	}

	static async findByPostId(postId) {
		const { rows } = await pool.query(
			'SELECT * FROM comments WHERE post_id = $1',
			[postId]
		);

		return toCamelCase(rows);
	}

	static async findByIdAndUpdate(id, content) {
		const { rows } = await pool.query(
			`
    UPDATE comments
    SET
      content = COALESCE($2, content)
    WHERE id = $1
		RETURNING *;
    `,
			[id, content]
		);
		return toCamelCase(rows)[0];
	}

	static async upvote(id) {
		const { rows } = await pool.query(
			`
			UPDATE comments
			SET
				score = score + 1
			WHERE id = $1
			RETURNING *;
			`,
			[id]
		);
		return toCamelCase(rows)[0];
	}

	static async downvote(id) {
		const { rows } = await pool.query(
			`
			UPDATE comments
			SET
				score = score - 1
			WHERE id = $1
			RETURNING *;
			`,
			[id]
		);
		return toCamelCase(rows)[0];
	}

	static async findByIdAndDelete(id) {
		const { rows } = await pool.query(
			`
			DELETE FROM comments WHERE id = $1
			`,
			[id]
		);
		return toCamelCase(rows);
	}
}

module.exports = CommentRepo;
