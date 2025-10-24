import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

let _db = null;

// Lazily initialize and memoize the DB client. This avoids running
// `neon(process.env.DATABASE_URL)` at module import time which can
// throw during build-time (for example on Vercel when collecting page data).
export function getDb() {
	if (_db) return _db;
	const sql = neon(process.env.DATABASE_URL);
	_db = drizzle({ client: sql });
	return _db;
}
