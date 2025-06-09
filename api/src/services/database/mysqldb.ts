import DatabaseService from './db';
import { MYSQL_DB_CONFIG } from '../../config';
import mysql from 'mysql2/promise';
import { User } from '../../v1/routes/auth/user';
import Blog from '../../v1/routes/blog/blog';

class MySQLDB implements DatabaseService {
	private connection: mysql.Connection;

	async connect(): Promise<void> {
		console.log(MYSQL_DB_CONFIG);
		this.connection = await mysql.createConnection({
			host: MYSQL_DB_CONFIG.host,
			port: Number(MYSQL_DB_CONFIG.port),
			user: MYSQL_DB_CONFIG.user,
			password: MYSQL_DB_CONFIG.password,
			database: MYSQL_DB_CONFIG.database,
		});

		if (!this.connection) {
			throw new Error('Failed to connect to MySQL database');
		}

		console.log('Connected to MySQL database');
	}

	async disconnect(): Promise<void> {
		if (this.connection) {
			await this.connection.end();
			console.log('Disconnected from MySQL database');
		}
	}

	async up(): Promise<void> {
		console.log('Upping MySQL database');
		await this.connection.execute(
			`CREATE TABLE users (
                id varchar(36) PRIMARY KEY,
                username varchar(50) NOT NULL UNIQUE,
                password varchar(255) NOT NULL,
                role varchar(50) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`,
		);

		await this.connection.execute(
			`CREATE TABLE blogs (
				id varchar(36) PRIMARY KEY,
				authorId varchar(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
				title varchar(600) NOT NULL,
				description varchar(1000) NOT NULL,
				content text NOT NULL,
				createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
			)`,
		);

		await this.connection.execute(
			`CREATE TABLE comments (
				id varchar(36) PRIMARY KEY,
				blogId varchar(36) NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
				ownerId varchar(36) REFERENCES users(id) ON DELETE SET NULL,
				parentId varchar(36) REFERENCES comments(id) ON DELETE CASCADE,
				content text NOT NULL,
				createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
			)`,
		);

		await this.connection.execute(
			`CREATE TABLE commment_reactions (
				id varchar(36) PRIMARY KEY,
				commentId varchar(36) NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
				userId varchar(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
				reaction int NOT NULL,
				createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			)`,
		);

		await this.connection.execute(
			`CREATE TABLE blog_reactions (
				id varchar(36) PRIMARY KEY,
				blogId varchar(36) NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
				userId varchar(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
				reaction int NOT NULL,
				createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			)`,
		);
	}

	async down(): Promise<void> {
		console.log('Downing MySQL database');

		await this.connection.execute(
			`DROP TABLE IF EXISTS commment_reactions`,
		);
		await this.connection.execute(`DROP TABLE IF EXISTS blog_reactions`);
		await this.connection.execute(`DROP TABLE IF EXISTS comments`);
		await this.connection.execute(`DROP TABLE IF EXISTS blogs`);
		await this.connection.execute(`DROP TABLE IF EXISTS users`);
	}

	// users
	async createNewUser(user: User): Promise<void> {
		await this.connection.execute(
			`INSERT INTO users (id, username, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)`,
			[
				user.id,
				user.username,
				user.password,
				user.role,
				user.createdAt,
				user.updatedAt,
			],
		);
	}

	async getUserByUsername(username: string): Promise<User> {
		const [rows] = await this.connection.execute(
			`SELECT * FROM users WHERE username = ?`,
			[username],
		);
		return rows[0] as User;
	}

	async getUserById(id: string): Promise<User> {
		const [rows] = await this.connection.execute(
			`SELECT * FROM users WHERE id = ?`,
			[id],
		);
		return rows[0] as User;
	}

	async getAllBlogs(limit: number, offset: number): Promise<Blog[]> {
		const [rows] = await this.connection.execute(
			`SELECT * FROM blogs
				ORDER BY createdAt DESC
				LIMIT ${limit}
				OFFSET ${offset}`,
		);
		return rows as Blog[];
	}
}

export default MySQLDB;
