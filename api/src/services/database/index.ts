import DatabaseService from './db';
import MySQLDB from './mysqldb';

function createDatabaseService(): DatabaseService {
	return new MySQLDB();
}

export { DatabaseService, createDatabaseService };
