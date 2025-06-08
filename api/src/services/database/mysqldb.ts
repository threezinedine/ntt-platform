import DatabaseService from './db';
import { MYSQL_DB_CONFIG } from '../../config';
import mysql from 'mysql2/promise';
import { User } from '@/v1/routes/auth/user';

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
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`,
		);
	}

	async down(): Promise<void> {
		console.log('Downing MySQL database');

		await this.connection.execute(`DROP TABLE IF EXISTS users`);
	}

	// users
	async createNewUser(user: User): Promise<void> {
		await this.connection.execute(
			`INSERT INTO users (id, username, password, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`,
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
}

export default MySQLDB;
