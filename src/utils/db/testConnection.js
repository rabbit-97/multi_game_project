import dbpool from '../../db/database.js';

export const testConnection = async (pool) => {
  try {
    const [rows] = await dbpool.query('SELECT 1 + 1 AS solution');
    console.log('The solution is: ', rows[0].solution);
  } catch (error) {
    console.error('Error testing connection:', error);
  }
};
