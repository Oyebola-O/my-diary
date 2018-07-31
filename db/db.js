import { Pool } from 'pg';
const connectionString = 'postgresql://postgres:@localhost:5432/postgres'

const pool = new Pool({
  connectionString: connectionString,
});

// pool.query('SELECT * FROM public.users', (err, res) => {
//   let thi = JSON.stringify(res.rows);
//   console.log(thi);
//   pool.end()
// });

export default pool;
