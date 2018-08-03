import { Pool } from 'pg';
const connectionString = 'postgres://dahyzgbc:cI4ELzuh2kiOMu7tm6BixGAHv36KBNa5@stampy.db.elephantsql.com:5432/dahyzgbc'

const pool = new Pool({
  connectionString: connectionString,
});

export default pool;
