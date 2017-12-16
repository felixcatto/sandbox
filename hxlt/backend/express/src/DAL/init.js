import pgp from 'pg-promise';
const db = pgp()('postgres://felixcatto:1@127.0.0.1:5432/trash');
export default db;
